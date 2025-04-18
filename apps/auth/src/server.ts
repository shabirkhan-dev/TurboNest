import type { Request, Response } from "express";
import { app } from "./app";

app.get("/", (_req: Request, res: Response): void => {
	res.send("Hello World");
});

const PORT: number = 8080;

app.listen(PORT, async (): Promise<void> => {
	console.log(`Server is running on port ${PORT}`);
});
