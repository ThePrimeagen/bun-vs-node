import { Request } from 'express';

export async function structuredCopy(req: Request): Promise<string> {
    return JSON.stringify(structuredClone(req.body));
}



