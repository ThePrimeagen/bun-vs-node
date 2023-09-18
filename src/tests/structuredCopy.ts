import { Request } from 'express';

export async function run(req: Request): Promise<string> {
    return JSON.stringify(structuredClone(req.body));
}



