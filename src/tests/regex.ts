

function findTheFirstDigit(str: string) {
    return str.search(/\d/);
}

export function run(req: Request) {
    const data = req.body as any as string;
    return data.split("\n").map(findTheFirstDigit).reduce((acc, line) => acc + line, 0);
}

