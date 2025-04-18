import express from "express";
import type { Express, Request, Response } from "express";

export const app: Express = express();
// ┌──────────────────────────────────────────┐
//│            Middlewares                   │
//└─────────────────────────────────────────┘
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ℹ️ Routes will be added here
app.get("/health", (_req: Request, res: Response): void => {
	res.send("OK");
});
