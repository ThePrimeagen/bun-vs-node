async function requireModule(moduleName: string): Promise<string> {
    const m = require(moduleName);
    const out = String(m);
    delete require.cache[require.resolve(moduleName)];

    return out;
}

export function run(req: Request) {
    return requireModule(req.body as any as string);
}


