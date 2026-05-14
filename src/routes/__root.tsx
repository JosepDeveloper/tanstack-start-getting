import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Getting Started with TanStack",
			},
			{
				name: "description",
				content:
					"A starter template for TanStack Router, React, and Tailwind CSS.",
				"data-rh": "description",
			},
			{
				name: "keywords",
				content: "react, router, tanstack, tailwind, starter",
				"data-rh": "keywords",
			},
			{
				// open graph
				property: "og:title",
				content: "Getting Started with TanStack",
				"data-rh": "og:title",
			},
			{
				property: "og:description",
				content:
					"A starter template for TanStack Router, React, and Tailwind CSS.",
				"data-rh": "og:description",
			},
			{
				property: "og:image",
				content: "/image.png",
				"data-rh": "og:image",
			},
			{
				property: "og:url",
				content: "https://localhost:3000",
				"data-rh": "og:url",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
				"data-rh": "twitter:card",
			},
			{
				name: "twitter:title",
				content: "Getting Started with TanStack",
				"data-rh": "twitter:title",
			},
			{
				name: "twitter:description",
				content:
					"A starter template for TanStack Router, React, and Tailwind CSS.",
				"data-rh": "twitter:description",
			},
			{
				name: "twitter:image",
				content: "/image.png",
				"data-rh": "twitter:image",
			},
			{
				name: "twitter:url",
				content: "https://localhost:3000",
				"data-rh": "twitter:url",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

const navLinks = [
	{ to: "/about", text: "About" },
	{ to: "/posts", text: "Posts" },
	{ to: "/form", text: "Form" },
];

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<header className="sticky top-0 z-50 border-b border-zinc-900/80 bg-black/70 backdrop-blur">
					<div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
						<Link
							to="/"
							className="text-sm font-medium tracking-tight text-white"
						>
							blog.
						</Link>

						<nav>
							<ul className="flex items-center gap-1 text-sm text-zinc-500">
								{navLinks.map(({ to, text }) => (
									<li key={to}>
										<Link
											to={to}
											className="
							inline-flex
							items-center
							rounded-lg
							px-3
							py-2
							transition-colors
							hover:bg-zinc-900
							hover:text-white
						"
										>
											{text}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</header>
				<div className="p-8">{children}</div>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
