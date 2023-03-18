#!/bin/bash

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <input_file> <output_file>"
  exit 1
fi

if [[ ! -f "$1" ]]; then
  echo "Input file does not exist: $1"
  exit 1
fi

# Get the file extension
extension="${1##*.}"

# Determine the desired size based on the output file name
if [[ "$2" == *".ico" ]]; then
  size="16"
elif [[ "$2" == *".png" ]]; then
  size="128"
else
  echo "Output file must be PNG or ICO: $2"
  exit 1
fi

if [[ "$extension" == "svg" ]]; then
  # Resize SVG using Inkscape
  inkscape --export-width=$size --export-height=$size --export-png="$2" "$1"
else
  # Resize PNG using ImageMagick
  convert "$1" -resize $size "$2"
fi

echo "Done."
