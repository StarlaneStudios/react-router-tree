import { Outlet } from "react-router-dom";
import { defineRoute } from "../../../../../lib";

function ExampleSubParentPage() {
	return (
		<div>
			This is the sub parent
			<br/>
			<br/>
			<Outlet />
		</div>
	)
}

export default defineRoute({
	element: <ExampleSubParentPage />
});