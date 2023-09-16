#!/usr/bin/env sh

targets=("bun" "bun-express" "node-express" "bun-elysia" "rust-rocket")
tags=("hello" "json-copy" "json-struct" "json-walk")
files=("small" "medium")

if [ $# -ne 3 ]
then
  echo "Usage: utils/script.sh <target> <tag> <json>"
  exit 1
fi

target_found=0
tag_found=0
json_found=0

for target in "${targets[@]}"; do
  if [ "$target" == "$1" ]; then
    target_found=1
    break
  fi
done

for tag in "${tags[@]}"; do
  if [ "$tag" == "$2" ]; then
    tag_found=1
    break
  fi
done

for json in "${files[@]}"; do
  if [ "$json" == "$3" ]; then
    json_found=1
    break
  fi
done

if [ "$target_found" -eq 0 ]; then
  echo "Invalid target: $1"
  exit 1
fi

if [ "$tag_found" -eq 0 ]; then
  echo "Invalid tag: $2"
  exit 1
fi

if [ "$json_found" -eq 0 ]; then
  echo "Invalid json: $3"
  exit 1
fi

export JSON="$(cat ./utils/json/"$files".json)"

if [[ $1 == *"bun"* ]]
then
  cd $1
  bun install
  bun run build
  bun run start 2>/dev/null &
  pid=$!
elif [[ $1 == *"node"* ]]
then
  cd $1
  npm install
  npm run build
  npm start 2>/dev/null &
  pid=$!
elif [[ $1 == *"rust"* ]]
then
  cd $1
  cargo build --release
  ./target/release/$1 2>/dev/null &
  pid=$!
fi

cd ..

# wait for the server to start and benchmark
sleep 2
mkdir -p ./utils/results/$1/$2
drill -ns --benchmark ./utils/benches/drill.yaml --tags $2 > ./utils/results/$1/$2/temp

# separate the data and stats
pwd=$(pwd)
cd ./utils/results/$1/$2
cat temp | tail -n +7 | head -n -22 > data
cat temp | tail -n 21 > stats 
rm temp

# generate the graph
gnuplot "$pwd/utils/benches/drill.p"
cd $pwd
mv ./utils/results/$1/$2/graph.jpg ./utils/results/$1/$2/$1-$2.jpg 

# kill the server
pkill -TERM -P $pid
