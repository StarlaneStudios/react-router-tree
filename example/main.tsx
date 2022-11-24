import { buildRouteObjects, RouteTree } from '../lib';

import { BrowserRouter as Router, RouteObject, useRoutes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

const mainTree: RouteTree = {
	prefix: './pages',
	routes: import.meta.glob('./pages/**/index.tsx', { eager: true })
}

const otherTree: RouteTree = {
	prefix: './other-pages',
	routes: import.meta.glob('./other-pages/**/index.tsx', { eager: true })
}

const spreadTree: RouteTree = {
	prefix: './spread-pages',
	routes: import.meta.glob('./spread-pages/**/index.tsx', { eager: true })
}

const routes = buildRouteObjects([mainTree, otherTree, spreadTree]);
const root = createRoot(document.getElementById('root')!);

export { routes };

console.log('Generated routes:', routes);

root.render(
	<StrictMode>
		<Router>
			<App routes={routes} />
		</Router>
	</StrictMode>
)

interface AppProps {
	routes: RouteObject[];
}

function App({ routes }: AppProps) {
	return useRoutes(routes);
}