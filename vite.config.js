import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [react()],
// });

export default defineConfig(({ command, mode }) => {
	// Load env file based on `mode` in the current working directory.
	// Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
	
	const env = loadEnv(mode, process.cwd(), '');
	console.log(env);
	return {
	// vite config
		define: {
			plugins: [react()],
			VITE_APP_APP_DOMAIN: env.VITE_APP_APP_DOMAIN,
			VITE_APP_BASE_URL: env.VITE_APP_BASE_URL,
			VITE_APP_LOCATION_API_KEY: env.VITE_APP_LOCATION_API_KEY,
		},
	};
});
 
