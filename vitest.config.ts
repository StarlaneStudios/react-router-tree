import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		include: [
			"lib/tests/**/*.test.ts",
			"lib/tests/**/*.test.tsx"
		],
		exclude: [
			"node_modules"
		],
		watchExclude: [
			"node_modules"
		]
	}
});