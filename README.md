<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/StarlaneStudios/react-router-tree/main/.github/logo.svg" height="164">
</p>

# React Router Tree

Implement Next.js style page directories in your single page application. Supports React projects created using [Vite](https://vitejs.dev/) and [CRA](https://create-react-app.dev/) (or any other webpack implementation).

## Installation

Install the package using NPM

```
npm install react-router-tree
```

## Page folder structure

Pages are defined using a folder structure in your application. Subfolders denote path segments, while pages map to `index.tsx` or `index.jsx` files. In react-router-tree, each page is given it's own directory, in which assets and styles can be placed, allowing for a clean and structured page setup.

### URL Parameters
Parameters can be defined by using `[name]` as folder name. This will automatically translate into `:name` when building routes.

### Index mapping
Folders named `@` will map to the index page of the parent directory.

### Example folder structure
```
pages/
	@/
		index.tsx
		styles.tsx
	help/
		index.tsx
		style.scss
	settings/
		nested/
			index.tsx
		[param]/
			index.tsx
```

The above example translates to the given routes

```
/
/help
/settings/nested
/settings/:param
```

# Exporting page components
Each page is expected to contain a default export of it's `RouteObject`. For TypeScript users a `defineRoute` helper function is included. The `path` property will automatically be populated when parsing the tree, so it may be omitted.

```tsx
import { defineRoute } from "../../../lib";

function IndexPage() {
	return (
		<div>
			Page content
		</div>
	)
}

export default defineRoute({
	element: <IndexPage />
});
```

## Usage
```ts
// Using vite:
const pageTree: RouteTree = {
	prefix: './pages',
	routes: import.meta.glob('./pages/**/*.tsx', { eager: true })
};

// Using Create React App:
const pageTree: RouteTree = {
	prefix: './',
	routes: require.context('./pages/', true, /\.tsx$/)
};

// Combine page trees into a single array of routes
const routes = buildRouteObjects([pageTree]);
```

## Example
An example implementation can be found [here](https://github.com/StarlaneStudios/react-router-tree/tree/main/example).

## License

react-router-tree is licensed under [MIT](https://github.com/StarlaneStudios/react-router-tree/blob/main/LICENSE)

Copyright (c) 2022-present, [Starlane Studios](https://starlane.studio/)
