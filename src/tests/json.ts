import { Request } from 'express';

function walkBody(body: any): any {
    if (Array.isArray(body)) {
        for (let key = 0; key < body.length; key++) {
            const value = body[key];
            if (typeof value === "object") {
                walkBody(value);
            } else if (typeof value === "number") {
                body[key] = value + 1;
            }
        }
    } else if (typeof body === "object") {
        for (const [key, value] of Object.entries(body)) {
            if (typeof value === "object") {
                walkBody(value);
            } else if (typeof value === "number") {
                body[key] = value + 1;
            }
        }
    }
    return body;
}

export async function run(req: Request): Promise<string> {
    const out = JSON.stringify(walkBody(req.body));
    return out;
}
