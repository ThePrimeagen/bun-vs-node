import { Request } from "express";

type LLNode = {
    value: number;
    time: number;
    next?: LLNode;
    prev?: LLNode;
}

let nodeValue = 0;

function createNode(next?: LLNode): LLNode {
    return {
        value: nodeValue++,
        time: Date.now(),
        next,
        prev: undefined
    };
}

function print() {
    console.log("printing list");
    for (let current = tail; current; current = current.prev!) {
        console.log("    ", current.value);
    }
}

let head: LLNode = createNode();
let tail: LLNode = head;
let maxTime = 10000;

export function run(_: Request) {
    const nextHead = createNode(head);
    head.prev = nextHead;
    head = nextHead;

    const now = Date.now();
    while (tail.prev!.time < now - maxTime) {
        tail = tail.prev!;
        tail.next = undefined;
    }
}

type Setup = {
    maxTime?: number;
}

export function setup(req: Request) {
    const setup = req.body as Setup;

    if (!setup) {
        return;
    }

    console.log("setup", setup);
    maxTime = setup.maxTime || maxTime;

    console.log("maxTime", maxTime);
}
