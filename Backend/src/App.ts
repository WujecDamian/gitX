import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app.listen(3000);
console.log("Server is listening on port http://localhost:3000");
