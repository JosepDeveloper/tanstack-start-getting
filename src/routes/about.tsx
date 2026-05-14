import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<div>Hello "/about"!</div>
			<p>Esta es la pagina sobre mi proyecto</p>
		</>
	);
}
