#!/bin/sh
# Overlay the Burninghouse logo as a watermark on a production still.
# Usage: scripts/watermark.sh input.jpg output.jpg
# Convention: logo 110px wide, 24px inset bottom-right, 60% opacity,
# white background keyed out.
LOGO="$(dirname "$0")/../img/burninghouse-logo.png"
ffmpeg -y -i "$1" -i "$LOGO" -filter_complex \
  "[1]format=rgba,colorkey=white:0.15:0.05,scale=110:-1,colorchannelmixer=aa=0.6[wm];[0][wm]overlay=W-w-24:H-h-24" \
  -q:v 4 "$2"
