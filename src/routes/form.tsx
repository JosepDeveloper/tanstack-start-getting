import type { GithubApi } from "#/apiGithub";
import {
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";

const getRepos = async (query: string) => {
	const res = await fetch(
		`https://api.github.com/search/repositories?q=${query}&per_page=10`,
	);
	const json: GithubApi = await res.json();
	return json.items;
};

type FormSearch = {
	q?: string;
};

export const Route = createFileRoute("/form")({
	loader: async ({ location }) => {
		const q = (location.search as { q?: string }).q ?? "";

		if (!q) {
			return {
				items: [],
			};
		}

		const items = await getRepos(q);

		return {
			items,
		};
	},
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>): FormSearch => {
		return {
			q: typeof search.q === "string" ? search.q : undefined,
		};
	},
});

function RouteComponent() {
	const navigate = useNavigate();
	const { items } = Route.useLoaderData();

	const search = useSearch({ from: "/form" });
	const query = search.q ?? "";

	const searchRepos = (value: string) => {
		navigate({
			to: "/form",
			search: (prev) => ({
				...prev,
				q: value,
			}),
		});
	};

	return (
		<>
			<form
				className="
					flex items-center gap-2
					rounded-xl border border-zinc-800
					bg-zinc-950/40 px-3 py-2
					text-sm
					focus-within:border-zinc-700
				"
				onSubmit={(e) => {
					e.preventDefault();
					if (!query) return;
					searchRepos(query);
				}}
			>
				<input
					type="text"
					name="q"
					placeholder="Search repositories..."
					className="
						w-full bg-transparent
						text-zinc-300 placeholder:text-zinc-600
						outline-none
					"
					value={query}
					onChange={(e) => searchRepos(e.target.value)}
				/>

				<button
					type="submit"
					className="
						rounded-lg bg-zinc-900 px-3 py-1.5
						text-xs text-zinc-300
						transition-colors
						hover:bg-zinc-800 hover:text-white
					"
				>
					Search
				</button>
			</form>

			<section className="mx-auto max-w-4xl px-6 py-16">
				<header className="mb-10">
					<h2 className="text-2xl font-semibold text-white">Repositories</h2>
					<p className="mt-2 text-sm text-zinc-500">Search for a repository</p>
				</header>

				{items?.length > 0 ? (
					<ul className="space-y-4">
						{items.map((repo) => (
							<li key={repo.id}>
								<a
									href={repo.html_url}
									target="_blank"
									rel="noreferrer"
									className="
										group block rounded-2xl
										border border-zinc-900
										bg-zinc-950/40 p-5
										transition-all
										hover:border-zinc-800 hover:bg-zinc-900/40
									"
								>
									<div className="flex items-start justify-between gap-4">
										<div className="space-y-3">
											<div className="flex items-center gap-2 text-sm text-zinc-500">
												<img
													src={repo.owner.avatar_url}
													alt={repo.owner.login}
													className="h-5 w-5 rounded-full border border-zinc-800"
												/>
												<span>{repo.owner.login}</span>
												<span className="h-1 w-1 rounded-full bg-zinc-700" />
												<span>{repo.language ?? "Unknown"}</span>
											</div>

											<h3 className="text-lg font-medium text-zinc-100 group-hover:text-white">
												{repo.name}
											</h3>

											<p className="text-sm text-zinc-500 line-clamp-2">
												{repo.description}
											</p>

											<div className="flex flex-wrap gap-2 pt-1">
												{repo.topics?.slice(0, 4).map((topic) => (
													<span
														key={topic}
														className="rounded-full border border-zinc-800 px-2.5 py-1 text-xs text-zinc-500"
													>
														#{topic}
													</span>
												))}
											</div>
										</div>

										<div className="flex flex-col items-end gap-2 text-xs text-zinc-500">
											<span>⭐ {repo.stargazers_count}</span>
											<span>🍴 {repo.forks_count}</span>
											<span>👁 {repo.watchers_count}</span>
										</div>
									</div>
								</a>
							</li>
						))}
					</ul>
				) : (
					<p className="text-sm text-zinc-500">No repositories found</p>
				)}
			</section>
		</>
	);
}
