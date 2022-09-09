import { Link, RouteObject } from "react-router-dom";
import { defineRoute } from "../../../lib";
import { routes } from "../../main";

function IndexPage() {
	const paths: string[] = [];

	function traverse(path: string, routes: RouteObject[]) {
		for (const route of routes) {
			paths.push(path + route.path || '');

			if (route.children) {
				traverse(path + route.path + '/', route.children);
			}
		}
	}

	traverse('/', routes);

	return (
		<div>
			Index page
			<br/>
			<br/>
			Try the following paths:
			{paths.map(path => (
				<pre key={path}>
					<Link to={path}>{path}</Link>
				</pre>
			))}
		</div>
	)
}

export default defineRoute({
	element: <IndexPage />
});