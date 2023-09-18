import { Request } from 'express';

async function tick() {
    return new Promise(resolve => {
        setTimeout(resolve, 1);
    });
}
async function count(c: number) {
    while (c-- > 0) {
        await tick();
    }
}

export async function run(req: Request): Promise<string> {
    await count(+req.body || 10);
    return "";
}

