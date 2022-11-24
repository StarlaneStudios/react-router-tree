import { useParams } from "react-router-dom";
import { defineRoute } from "../../../lib";

function StarPage() {

	const params = useParams();

	return (
		<div>
			main page:
			<br />
			params: {JSON.stringify(params) || "no params found..."}
		</div>
	)
}

export default defineRoute({
	element: <StarPage />
});