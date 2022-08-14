import { defineRoute } from "../../../lib";

function ExtraPage() {
	return (
		<div>
			Extra page
		</div>
	)
}

export default defineRoute({
	element: <ExtraPage />
});