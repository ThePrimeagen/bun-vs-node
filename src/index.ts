import express, { Request } from 'express';
const app = express();
const port = 42069;
import * as methods from "./tests";
import bodyParser from 'body-parser';

type Runnable = {
    run: (req: Request) => Promise<Buffer | ArrayBuffer | Uint8Array | string | undefined>,
    setup?: (req: Request) => Promise<void>,
};

const methodList: Record<string, Runnable> = methods as any;

app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const method = req.headers["x-method"];
    const found = methodList[method as string];
    if (!found) {
        res.status(404).send("Method not found");
        return;
    }

    const out = await found.run(req);
    res.status(200).send(out);
});

app.post('/setup', async (req, res) => {
    const method = req.headers["x-method"];
    const found = methodList[method as string];
    if (!found) {
        res.status(404).send("Method not found");
        return;
    }

    if (found.setup) {
        console.log("found setup");
        await found.setup(req);
    } else {
        console.log("no setup for", method);
    }

    res.status(200).end();
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


