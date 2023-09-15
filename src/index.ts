import express, { Request } from 'express';
const app = express();
const port = 42069;
import * as methods from "./tests";
import bodyParser from 'body-parser';

type Method = (req: Request) => Promise<Buffer | ArrayBuffer | Uint8Array | string | undefined>;
const methodList: Record<string, Method> = methods as any;

app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const method = req.headers["x-method"];
    const found = methodList[method as string];
    if (!found) {
        res.status(404).send("Method not found");
        return;
    }

    const out = await found(req);
    res.status(200).send(out);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


