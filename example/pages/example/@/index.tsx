import { defineRoute } from "../../../../lib";

function ExampleChildPage() {
	return (
		<div>
			Example child page
		</div>
	)
}

export default defineRoute({
	element: <ExampleChildPage />,
	alternatives: [
		'/alternative'
	]
});