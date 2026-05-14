/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export type Posts = Post[];

export interface Post {
	type_of: string;
	id: number;
	title: string;
	description: string;
	readable_publish_date: string;
	slug: string;
	path: string;
	url: string;
	comments_count: number;
	public_reactions_count: number;
	collection_id: any;
	published_timestamp: string;
	positive_reactions_count: number;
	cover_image: string;
	social_image: string;
	canonical_url: string;
	created_at: string;
	edited_at: any;
	crossposted_at: any;
	published_at: string;
	last_comment_at: string;
	reading_time_minutes: number;
	tag_list: string[];
	tags: string;
	user: User;
	flare_tag: FlareTag;
}

export interface User {
	name: string;
	username: string;
	twitter_username: string;
	github_username: string;
	user_id: number;
	website_url: any;
	profile_image: string;
	profile_image_90: string;
}

export interface FlareTag {
	name: string;
	bg_color_hex: string;
	text_color_hex: string;
}

export const Route = createFileRoute("/posts")({
	loader: async () => {
		const data = await fetch("https://dev.to/api/articles");
		const posts: Posts = await data.json();

		return posts;
	},
	component: RouteComponent,
});

function RouteComponent() {
	const posts = Route.useLoaderData();

	return (
		<>
			<h1 className="text-3xl font-bold">Gay tu paju</h1>

			<Outlet />

			<section className="mt-16">
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl font-semibold tracking-tight text-white">
						Posts
					</h2>

					<span className="text-sm text-zinc-500">{posts.length} articles</span>
				</div>

				<ul className="space-y-4">
					{posts.map((post) => (
						<li key={post.id}>
							<Link
								to={`/posts/$idPost`}
								params={{ idPost: post.id.toString() }}
								className="group block rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5 transition-all hover:border-zinc-800 hover:bg-zinc-900/40"
							>
								<article className="space-y-4">
									<header className="space-y-3">
										<div className="flex items-center gap-2 text-xs text-zinc-500">
											<span>#{post.id}</span>

											<span className="w-1 h-1 rounded-full bg-zinc-700" />

											<span>{post.reading_time_minutes} min read</span>

											<span className="w-1 h-1 rounded-full bg-zinc-700" />

											<span>{post.readable_publish_date}</span>
										</div>

										<h3 className="text-xl font-medium tracking-tight text-zinc-100 group-hover:text-white transition-colors">
											{post.title}
										</h3>

										<p className="text-sm leading-6 text-zinc-500 line-clamp-2">
											{post.description}
										</p>
									</header>

									<footer className="flex items-center justify-between gap-4 pt-2">
										<div className="flex flex-wrap gap-2">
											{post.tag_list.slice(0, 3).map((tag) => (
												<span
													key={tag}
													className="rounded-full border border-zinc-800 px-2.5 py-1 text-xs text-zinc-400"
												>
													#{tag}
												</span>
											))}
										</div>

										<div className="flex items-center gap-4 text-sm text-zinc-500">
											<span>❤️ {post.public_reactions_count}</span>
											<span>💬 {post.comments_count}</span>
										</div>
									</footer>
								</article>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
