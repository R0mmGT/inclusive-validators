#!/bin/bash
# Runs the growth-curve recorder under several timing configurations, one at a time.
set -u
cd "$(dirname "$0")/.."
N20=${NODE20:-node}   # path to a Node.js 20 binary (set NODE20 to override)
N22=${NODE22:-node}   # path to a Node.js 22 binary (set NODE22 to override)
$N20 revision/curves.js node20_idle
$N20 --regexp-interpret-all revision/curves.js node20_interpreter
$N22 revision/curves.js node22_idle
# CPU contention: saturate both cores with busy loops while measuring
yes > /dev/null & P1=$!; yes > /dev/null & P2=$!
$N20 revision/curves.js node20_contention
kill $P1 $P2
WARMUP=20 $N20 revision/curves.js node20_warmup
echo ALL_DONE
