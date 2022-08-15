import { defineConfig } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		react(),
		dts()
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'lib/index.ts'),
			name: 'react-router-tree',
			fileName: 'react-router-tree'
		}
	}
})
