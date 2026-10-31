#!/bin/bash
# Runs the growth-curve recorder under several timing configurations, one at a time.
set -u
cd "$(dirname "$0")/.."
N20=/home/claude/node20/node_modules/.bin/node
N22=$(command -v node)
$N20 revision/curves.js node20_idle
$N20 --regexp-interpret-all revision/curves.js node20_interpreter
$N22 revision/curves.js node22_idle
# CPU contention: saturate both cores with busy loops while measuring
yes > /dev/null & P1=$!; yes > /dev/null & P2=$!
$N20 revision/curves.js node20_contention
kill $P1 $P2
WARMUP=20 $N20 revision/curves.js node20_warmup
echo ALL_DONE
