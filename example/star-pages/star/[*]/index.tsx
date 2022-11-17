import { useParams } from "react-router-dom";
import { defineRoute } from "../../../../lib";

function StarPage() {

	const params = useParams();

	return (
		<div>
			Star page with params:
			<br />
			params: {JSON.stringify(params)}
		</div>
	)
}

export default defineRoute({
	element: <StarPage />
});