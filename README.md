# perf-machine

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Drill benchmarks

``` bash
bash ./utils/script.sh <target> <tag> <json>
```

### Dependencies
- rust
- bun
- node (npm)
- drill
- gnuplot

### Targets
- bun
- bun-elysia
- bun-express
- node-express
- rust-rocket

### Tags
- hello
- json-copy
- json-struct
- json-walk

### json
- small
- medium
