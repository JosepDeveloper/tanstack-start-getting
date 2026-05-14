/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { createFileRoute, useHydrated } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
	component: Home,
});

const currentTime = () => new Date().toLocaleTimeString();

function Home() {
	const hydrated = useHydrated();
	const [time, setTime] = useState(currentTime());

	useEffect(() => {
		setTime(currentTime());

		setInterval(() => {
			setTime(currentTime());
		}, 1000);
	});

	const timeZone = hydrated
		? Intl.DateTimeFormat().resolvedOptions().timeZone
		: "UTC";

	return (
		<div>
			<h1 className="text-4xl font-bold">Your time zone is {timeZone}</h1>
			<p className="mt-4 text-lg">
				Edit <code>src/routes/index.tsx</code> to get started.
			</p>

			<p className="mt-4 text-lg">Current time: {time}</p>

			<p>Esta es mi primer ruta</p>
		</div>
	);
}
