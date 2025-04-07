#!/bin/bash

# Output file name
OUTPUT_FILE="combined_scripts.txt"

# Clear the output file if it exists
> "$OUTPUT_FILE"

# Find all .js files in the current directory and concatenate them
for file in *.js; do
    if [ -f "$file" ]; then
        echo "Adding $file to $OUTPUT_FILE..."
        echo "===== $file =====" >> "$OUTPUT_FILE"
        cat "$file" >> "$OUTPUT_FILE"
        echo -e "\n\n" >> "$OUTPUT_FILE"  # Add some spacing between files
    else
        echo "No .js files found in the current directory."
        exit 1
    fi
done

echo "All scripts have been combined into $OUTPUT_FILE."