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
 * A route object with a required path
 */
export type AlternativeRouteObject<T extends RouteObject> = Partial<T> & { path: string };

/**
 * An extension of {@link RouteObject} with optional alternative paths to this route.
 */
export interface TreeRouteObject extends RouteObject {
	alternatives?: AlternativeRouteObject<Omit<this, 'alternatives'>>[];
}

/**
 * Helper function used to define a route
 * 
 * @param route The route to define
 * @returns The input route
 */
export function defineRoute<R extends TreeRouteObject = TreeRouteObject>(route: R): R {
	return route;
}

/**
 * Compile the given array of route trees into a single
 * merged array of route objects.
 * 
 * @param trees The route trees to merge
 * @returns The routing objects
 */
export function buildRouteObjects<R extends TreeRouteObject = TreeRouteObject>(trees: RouteTree|RouteTree[]): R[] {
	const routeMap: Record<string, R> = {};
	const treeList = Array.isArray(trees) ? trees : [trees];

	for(const { prefix, routes } of treeList) {
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
	
	const index: Record<string, any> = {};
	const paths = Object.entries(routeMap);
	const routes: [string[], R][] = paths
		.sort(([a], [b]) => {
			const la = a.split('/').length;
			const lb = b.split('/').length;

			if (la - lb !== 0) {
				return la - lb;
			}

			const ua = a.split('_').length;
			const ub = b.split('_').length;

			return ub - ua;
		})
		.map(([path, value]) => [
			path.replace(/(\/@)/, '')			// Ignore @ folders
				.replace(/\/[^\/]+$/, '')		// Remove file name
				.replace(/\[(\w+)\]/, ':$1')	// Convert [param] to :param
				.slice(1)
				.split('/'),
			value
		]);

	for (const [path, route] of routes) {
		const last = path[path.length - 1];
		const segments = last == '_' ? path.slice(0, -1) : path;
		placeNode(index, segments, route);
	}

	return expandNode(index);
}

/**
 * Attempt to place a node in a tree structure based on the
 * given path segments.
 * 
 * @param root The root object
 * @param segments The path segments
 * @param value The value to place
 */
function placeNode(root: any, segments: string[], value: TreeRouteObject) {
	let matched = false;

	for (let i = 0; i < segments.length; i++) {
		const built = segments.slice(0, i + 1).join('/');

		if (root[built]) {
			placeNode(root[built].children, segments.slice(i + 1), value);
			matched = true;
			break;
		}
	}

	if (!matched) {
		root[segments.join('/')] = {
			children: {},
			value: value
		};

		if (value.alternatives) {
			for (const alternative of value.alternatives) {
				root[alternative.path] = {
					children: {},
					value: {...value, ...alternative}
				};
			}
		}
	}
}

/**
 * Expand the object structure into arrays
 * of route objects.
 * 
 * @param root The root object
 * @returns The route objects
 */
function expandNode(root: any): any[] {
	const result = [];

	for (const [path, info] of Object.entries(root) as [string, any]) {
		result.push({
			path: path.startsWith('/') ? path.substring(1) : path,
			children: expandNode(info.children),
			...info.value
		});
	}

	return result;
}

function isViteImport(routes: ViteImport | WebpackImport): routes is ViteImport {
	return typeof routes === 'object';
}