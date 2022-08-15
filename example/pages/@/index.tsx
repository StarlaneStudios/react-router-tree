import { defineRoute } from "../../../lib";

function IndexPage() {
	return (
		<div>
			Index page
		</div>
	)
}

export default defineRoute({
	element: <IndexPage />
});