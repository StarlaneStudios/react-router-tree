import { buildRouteObjects, RouteTree } from '../lib';

import { BrowserRouter as Router, RouteObject, useRoutes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

const mainTree: RouteTree = {
	prefix: './pages',
	routes: import.meta.glob('./pages/**/*.tsx', { eager: true })
}

const otherTree: RouteTree = {
	prefix: './other-pages',
	routes: import.meta.glob('./other-pages/**/*.tsx', { eager: true })
}

const routes = buildRouteObjects([mainTree, otherTree]);
const root = createRoot(document.getElementById('root')!);

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