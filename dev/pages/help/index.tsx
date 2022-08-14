import { defineRoute } from "../../../lib";

function HelpPage() {
	return (
		<div>
			Help page
		</div>
	)
}

export default defineRoute({
	element: <HelpPage />
});