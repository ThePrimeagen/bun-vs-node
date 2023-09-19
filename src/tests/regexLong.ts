function findTheFirstDigit(str: string) {
    return str.search(/\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/);
}

export function run(req: Request) {
    const data = req.body as any as string;
    return data.split("\n").map(findTheFirstDigit).reduce((acc, line) => acc + line, 0);
}


