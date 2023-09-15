import { Request } from 'express';

export async function jsonCopy(req: Request): Promise<string> {
    return JSON.stringify(JSON.parse(JSON.stringify(req.body)));
}


