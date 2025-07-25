#!/usr/bin/env bun

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function runAudit() {
	try {
		console.log("Running security audit...");

		// Check for vulnerabilities in dependencies
		const { stdout, stderr } = await execAsync("bun pm audit");

		if (stderr) {
			console.error("Audit warnings:", stderr);
		}

		console.log("Audit results:", stdout);

		// If we get here, the audit passed
		process.exit(0);
	} catch (error) {
		console.error("Security audit failed:", error.message);
		process.exit(1);
	}
}

runAudit();
