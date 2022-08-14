import { defineConfig } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
	plugins: [
		react(),
		typescript({
			'declaration': true,
			'declarationDir': resolve(__dirname, 'dist'),
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'lib/index.ts'),
			name: 'react-router-tree',
			fileName: 'react-router-tree'
		},
		rollupOptions: {
			external: [
				'react',
				'react-router',
				'react-router-dom'
			]
		}
	}
})
