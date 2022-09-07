import { defineRoute } from "../../../../../lib";

function ExampleDeepNestPage() {
	return (
		<div>
			Deeply nested child
		</div>
	)
}

export default defineRoute({
	element: <ExampleDeepNestPage />
});