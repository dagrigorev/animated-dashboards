#!/usr/bin/env python3
"""
Directory Structure Model Parser
Reads .sm files and recreates the directory structure without overwriting existing files.
Properly handles tree traversal with indentation tracking.
"""

import os
import sys
import argparse
from pathlib import Path
import re


class DirectoryModelParser:
    def __init__(self, base_dir=None, verbose=False, dry_run=False):
        """
        Initialize the parser.
        
        Args:
            base_dir: Base directory where structure should be created (default: current directory)
            verbose: Print detailed information about operations
            dry_run: Only show what would be created without actually creating anything
        """
        self.base_dir = Path(base_dir) if base_dir else Path.cwd()
        self.verbose = verbose
        self.dry_run = dry_run
        
    def parse_sm_file(self, filepath):
        """
        Parse a .sm file and extract directory structure.
        Returns a list of absolute paths to create.
        """
        sm_file = Path(filepath)
        if not sm_file.exists():
            raise FileNotFoundError(f"File not found: {filepath}")
            
        with open(sm_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        # Remove empty lines
        lines = [line.rstrip('\n') for line in lines if line.strip()]
        
        if not lines:
            return [], []
        
        # The first line is always the root
        root_line = lines[0].strip()
        root_name = root_line.rstrip('/')
        items_to_create = []
        
        # Parse each line
        for i, line in enumerate(lines):
            # Count the visual indentation level
            # Tree characters count as part of the visual structure
            visual_line = line
            indent = 0
            
            # Replace tree characters but count their position
            # We need to find where the actual content starts
            if '── ' in line:
                # Find where the file/directory name starts
                content_start = line.find('── ') + 3
                # Count visual indent (spaces + tree characters)
                indent = len(line[:content_start].replace(' ', 'x').replace('│', 'x').replace('├', 'x').replace('└', 'x'))
            else:
                # No tree characters, just count leading spaces
                indent = len(line) - len(line.lstrip())
            
            # Extract the item name (remove tree characters and whitespace)
            # Find where the actual name starts (after '── ' or at beginning)
            name_start = 0
            if '── ' in line:
                name_start = line.find('── ') + 3
            else:
                # Find first non-space, non-tree character
                for j, char in enumerate(line):
                    if char not in [' ', '│', '├', '└']:
                        name_start = j
                        break
            
            item_name = line[name_start:].strip()
            
            if not item_name:
                continue
                
            # Store with indent level (0-based)
            items_to_create.append({
                'indent': indent,
                'name': item_name,
                'line': i
            })
        
        # Now build the directory tree
        dir_stack = [root_name]  # Stack of directory names at each level
        files = []
        dirs = [root_name]
        
        # Process items starting from the second line (first is root)
        for i in range(1, len(items_to_create)):
            item = items_to_create[i]
            prev_item = items_to_create[i-1]
            
            # If current indent is less than or equal to previous, pop from stack
            while len(dir_stack) > 1 and item['indent'] <= items_to_create[dir_stack[-1]]['indent'] if isinstance(dir_stack[-1], int) else 0:
                dir_stack.pop()
            
            # Build the full path
            if len(dir_stack) > 1:
                # Get the index of the directory at this level
                dir_index = dir_stack[-1] if isinstance(dir_stack[-1], int) else 0
                base_dir_items = [items_to_create[idx]['name'] for idx in dir_stack[1:] if isinstance(idx, int)]
                if base_dir_items:
                    full_path = os.path.join(root_name, *base_dir_items, item['name'])
                else:
                    full_path = os.path.join(root_name, item['name'])
            else:
                full_path = os.path.join(root_name, item['name'])
            
            # Remove trailing / from directories
            if item['name'].endswith('/'):
                item['name'] = item['name'].rstrip('/')
                full_path = full_path.rstrip('/')
                dirs.append(full_path)
                # Push this directory index onto stack
                dir_stack.append(i)
            else:
                files.append(full_path)
        
        return dirs, files
    
    def parse_sm_file_simple(self, filepath):
        """
        Simpler parsing algorithm that tracks directory stack properly.
        """
        sm_file = Path(filepath)
        if not sm_file.exists():
            raise FileNotFoundError(f"File not found: {filepath}")
            
        with open(sm_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        # Remove empty lines
        lines = [line.rstrip('\n') for line in lines if line.strip()]
        
        if not lines:
            return [], []
        
        # Parse tree structure
        root = lines[0].strip().rstrip('/')
        dirs = [root]
        files = []
        
        # Directory stack: keeps track of current path
        dir_stack = [root]
        last_indent = -1
        
        for line_num, line in enumerate(lines[1:], 1):  # Skip root line
            # Calculate indentation level
            # Count characters until we hit a non-tree character
            indent = 0
            for char in line:
                if char in [' ', '│', '├', '└']:
                    indent += 1
                else:
                    break
            
            # Extract the item name
            # Find where the name starts (after '── ' or similar)
            if '── ' in line:
                name_start = line.find('── ') + 3
            else:
                # Find first non-whitespace, non-tree character
                name_start = 0
                for i, char in enumerate(line):
                    if char not in [' ', '│', '├', '└']:
                        name_start = i
                        break
            
            item_name = line[name_start:].strip()
            
            if not item_name:
                continue
            
            # Adjust directory stack based on indentation
            if indent <= last_indent:
                # We're moving up in the tree
                levels_to_pop = (last_indent - indent) // 4 + 1
                for _ in range(min(levels_to_pop, len(dir_stack) - 1)):
                    dir_stack.pop()
            
            # Build full path
            if len(dir_stack) > 1:
                full_path = os.path.join(*dir_stack[1:], item_name)
            else:
                full_path = item_name
            
            # Complete path including root
            complete_path = os.path.join(root, full_path) if full_path != root else root
            
            # Check if it's a directory
            if item_name.endswith('/'):
                dir_name = item_name.rstrip('/')
                dirs.append(complete_path)
                # Add to directory stack for next items
                if len(dir_stack) > 1:
                    dir_stack.append(dir_name)
                else:
                    dir_stack = [root, dir_name]
            else:
                files.append(complete_path)
            
            last_indent = indent
        
        return dirs, files
    
    def create_structure(self, dirs, files):
        """
        Create the directory structure.
        
        Args:
            dirs: List of directories to create
            files: List of files to create
        """
        if self.dry_run:
            print("=== DRY RUN MODE ===")
            print("The following would be created:")
        
        # Create directories
        created_dirs = 0
        skipped_dirs = 0
        
        for dir_path in sorted(set(dirs)):  # Remove duplicates and sort
            full_path = self.base_dir / dir_path
            
            if not full_path.exists():
                if not self.dry_run:
                    full_path.mkdir(parents=True, exist_ok=True)
                if self.verbose or self.dry_run:
                    print(f"📁 Created directory: {full_path}")
                created_dirs += 1
            else:
                if self.verbose:
                    print(f"📁 Directory already exists: {full_path}")
                skipped_dirs += 1
        
        # Create files
        created_files = 0
        skipped_files = 0
        
        for file_path in sorted(files):
            full_path = self.base_dir / file_path
            
            if not full_path.exists():
                if not self.dry_run:
                    # Ensure parent directory exists
                    full_path.parent.mkdir(parents=True, exist_ok=True)
                    # Create empty file
                    full_path.touch()
                    
                if self.verbose or self.dry_run:
                    print(f"📄 Created file: {full_path}")
                created_files += 1
            else:
                if self.verbose:
                    print(f"📄 File already exists (skipped): {full_path}")
                skipped_files += 1
        
        return created_dirs, skipped_dirs, created_files, skipped_files
    
    def parse_and_create(self, sm_filepath):
        """
        Parse .sm file and create the structure.
        
        Args:
            sm_filepath: Path to the .sm file
        """
        try:
            print(f"📋 Parsing {sm_filepath}...")
            dirs, files = self.parse_sm_file_simple(sm_filepath)
            
            print(f"\n📊 Found {len(dirs)} directories and {len(files)} files to create")
            
            if self.verbose:
                print("\n📂 Directories:")
                for d in sorted(dirs):
                    print(f"  {d}/")
                
                print("\n📄 Files:")
                for f in sorted(files):
                    print(f"  {f}")
            
            print(f"\n🏗️  Creating structure in: {self.base_dir}")
            stats = self.create_structure(dirs, files)
            created_dirs, skipped_dirs, created_files, skipped_files = stats
            
            print(f"\n{'='*50}")
            print("📈 SUMMARY:")
            print(f"  Directories created: {created_dirs}")
            print(f"  Directories skipped (already exist): {skipped_dirs}")
            print(f"  Files created: {created_files}")
            print(f"  Files skipped (already exist): {skipped_files}")
            
            if not self.dry_run:
                print(f"\n✅ Directory structure created successfully!")
            else:
                print(f"\n✅ Dry run completed. No changes were made.")
                
        except Exception as e:
            print(f"❌ Error: {e}", file=sys.stderr)
            import traceback
            traceback.print_exc()
            return False
            
        return True


def main():
    parser = argparse.ArgumentParser(
        description="Create directory structure from .sm model files",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s structure.sm
  %(prog)s structure.sm --output ./myproject
  %(prog)s structure.sm --verbose --dry-run
  %(prog)s *.sm --output ./output
        """
    )
    
    parser.add_argument(
        "sm_files",
        nargs="+",
        help=".sm file(s) containing directory structure models"
    )
    
    parser.add_argument(
        "-o", "--output",
        default=".",
        help="Base directory where structure should be created (default: current directory)"
    )
    
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Print detailed information about operations"
    )
    
    parser.add_argument(
        "-n", "--dry-run",
        action="store_true",
        help="Only show what would be created without actually creating anything"
    )
    
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite existing files (default: skip existing files)"
    )
    
    args = parser.parse_args()
    
    # Process each .sm file
    success_count = 0
    for sm_file in args.sm_files:
        print(f"\n{'='*60}")
        print(f"Processing: {sm_file}")
        print('='*60)
        
        parser = DirectoryModelParser(
            base_dir=args.output,
            verbose=args.verbose,
            dry_run=args.dry_run
        )
        
        if parser.parse_and_create(sm_file):
            success_count += 1
    
    print(f"\n{'='*60}")
    print(f"Processed {success_count}/{len(args.sm_files)} file(s) successfully")
    
    if success_count < len(args.sm_files):
        sys.exit(1)


if __name__ == "__main__":
    main()