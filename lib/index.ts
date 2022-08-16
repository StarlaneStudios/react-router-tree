import { RouteObject } from "react-router-dom";

export type ViteImport = Record<string, { default: RouteObject }>;
export type WebpackImport = { keys: () => string[]; } & ((key: string) => { default: RouteObject });

/**
 * An imported tree of routes.
 */
export interface RouteTree {
	prefix: string;
	routes: ViteImport | WebpackImport;
}

/**
 * Helper function used to define a route
 * 
 * @param route The route to define
 * @returns The input route
 */
export function defineRoute<R extends RouteObject = RouteObject>(route: R): R {
	return route;
}

/**
 * Compile the given array of route trees into a single
 * merged array of route objects.
 * 
 * @param trees The route trees to merge
 * @returns The routing objects
 */
export function buildRouteObjects<R extends RouteObject = RouteObject>(trees: RouteTree[]): R[] {
	const routeMap: Record<string, R> = {};

	for(const { prefix, routes } of trees) {
		const list = isViteImport(routes) ? Object.keys(routes) : routes.keys();
		const fixed = prefix.endsWith('/')
			? prefix.slice(0, -1)
			: prefix;

		for (const route of list) {
			const path = route.substring(fixed.length);
			const object: any = isViteImport(routes) ? routes[route]?.default : routes(route)?.default;

			// Paths cannot be relative, prefix must be incorrect
			if (path.startsWith('.')) {
				console.warn('Invalid route path: ' + path);
				continue;
			}

			// Page must be a component
			// TODO Improved validation
			if ( typeof object !== 'object') {
				console.warn('Invalid route object: ' + path);
				continue;
			}
			
			// Detect page overwriting
			if (routeMap[path]) {
				console.warn(`Existing route ${path} was overriden`);
			}

			routeMap[path] = object;
		}
	}

	const paths = Object.keys(routeMap);
	const sorted = paths.sort(path => -path.split('/').length);
	const routes: R[] = [];

	for (const path of sorted) {
		const object = routeMap[path];
		const fullPath = path
			.replace(/(\/@)/, '')			// Ignore @ folders
			.replace(/\/[^\/]+$/, '')			// Remove file name
			.replace(/\[(\w+)\]/, ':$1');   // Convert [param] to :param

		routes.push({
			...object,
			path: fullPath || '/'
		});
	}

	return routes;
}

function isViteImport(routes: ViteImport | WebpackImport): routes is ViteImport {
	return typeof routes === 'object';
}