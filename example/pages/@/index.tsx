import { defineRoute } from "../../../lib";

function IndexPage() {
	return (
		<div>
			Index page
			<br/>
			<br/>
			Try the following paths:
			<pre>
				<li>
					<ol>/</ol>
					<ol>/example</ol>
					<ol>/example/:anything</ol>
					<ol>/help</ol>
					<ol>/extra</ol>
				</li>
			</pre>
		</div>
	)
}

export default defineRoute({
	element: <IndexPage />
});