import { Outlet } from "react-router-dom";
import { defineRoute } from "../../../../lib";

function ExampleParentPage() {
	return (
		<div>
			This is the parent
			<br/>
			<br/>
			<Outlet />
		</div>
	)
}

export default defineRoute({
	element: <ExampleParentPage />
});