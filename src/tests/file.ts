import assert from "assert";
import { Request } from "express";

import fs from "fs/promises";

let count = 0;
async function fileOps(data: string): Promise<string> {
    const name = `/tmp/${count++}.txt`;

    await fs.writeFile(name, data);
    const dataOut = await fs.readFile(name, "utf-8");
    await fs.unlink(name);

    assert.strictEqual(data, dataOut);

    return "";
}

export function run(req: Request) {
    return fileOps(JSON.stringify(req.body));
}
