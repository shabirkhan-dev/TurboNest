import type { Request, Response } from "express";
import { app } from "./app";

app.get("/", (_req: Request, res: Response): void => {
	res.send("Hello World");
});

app.get("/api/v1/health", (_req: Request, res: Response): void => {
	res.send("OK");
});

const PORT: number = 8081;

app.listen(PORT, async (): Promise<void> => {
	console.log(`Server is running on port ${PORT}`);
});
