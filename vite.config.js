import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import styleImport from 'vite-plugin-style-import';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		reactRefresh(),

		styleImport({
			libs: [
				{
					libraryName: 'zarm',
					esModule: true,
					resolveStyle: (name) => {
						return `zarm/es/${name}/style/css`;
					},
				},
			],
		}),
	],
	css: {
		modules: {
			localsConvention: 'dashesOnly',
		},
		preprocessorOptions: {
			less: {
				// 支持JavaScript内联
				javascriptEnabled: true,
			},
		},
	},
	server: {
		proxy: {
			'/api': {
				//当遇到/api路径时，将其转化成target的值
				target: 'http://api.chennick.wang/api/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''), //将/api重写为空
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'), //src路径
			utils: path.resolve(__dirname, 'src/utils'), //src路径
		},
	},
});
