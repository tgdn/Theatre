# !/bin/bash

# compile LESS
lessc ./less/main.less > ./css/main.css

# pre compile JSX
babel --presets react src/jsx/ --out-dir src/build/

electron ./
