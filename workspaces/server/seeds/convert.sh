#/bin/bash

for file in ./images/*; do
  ./rimage/rimage webp --quality 50 $file
done
