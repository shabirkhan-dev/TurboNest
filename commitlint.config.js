// commitlint.config.js (in root)
module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"fix",
				"docs",
				"style",
				"refactor",
				"perf",
				"test",
				"chore",
				"revert",
				"ci",
				"build",
			],
		],
		"type-case": [2, "always", "lowerCase"],
		"subject-case": [2, "always", ["lowerCase", "sentence-case"]],
		"subject-empty": [2, "never"],
		"subject-full-stop": [2, "never", "."],
		"header-max-length": [2, "always", 72],
	},
};
