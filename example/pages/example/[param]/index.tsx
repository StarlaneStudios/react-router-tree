import { useParams } from "react-router-dom";
import { defineRoute } from "../../../../lib";

function ExampleParamPage() {
	const { param } = useParams();

	return (
		<div>
			Route parameter: {param}
		</div>
	)
}

export default defineRoute({
	element: <ExampleParamPage />
});