/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { createFileRoute, Link } from "@tanstack/react-router";

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
	tag_list: string;
	tags: string[];
	body_html: string;
	body_markdown: string;
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

export interface Error404 {
	error: string;
	status: number;
}

export const Route = createFileRoute("/posts_/$idPost")({
	loader: async ({ params }) => {
		const data = await fetch(`https://dev.to/api/articles/${params.idPost}`);
		const post: Post | Error404 = await data.json();

		return post;
	},
	component: RouteComponent,
});

function RouteComponent() {
	const post = Route.useLoaderData();

	if ("error" in post) {
		return (
			<section className="flex min-h-[70vh] items-center justify-center px-6">
				<div className="max-w-md text-center">
					<div
						className="
				mx-auto
				mb-6
				flex
				h-14
				w-14
				items-center
				justify-center
				rounded-2xl
				border
				border-zinc-800
				bg-zinc-900/50
				text-xl
			"
					>
						⚠️
					</div>

					<h1 className="text-3xl font-semibold tracking-tight text-white">
						Post not found
					</h1>

					<p className="mt-4 text-base leading-7 text-zinc-500">
						The article you are looking for does not exist, was removed, or the
						URL is incorrect.
					</p>

					<Link
						to="/posts"
						className="
				mt-8
				inline-flex
				items-center
				rounded-xl
				border
				border-zinc-800
				bg-zinc-900/60
				px-4
				py-2.5
				text-sm
				text-zinc-300
				transition-all
				hover:border-zinc-700
				hover:bg-zinc-800
				hover:text-white
			"
					>
						← Back to posts
					</Link>
				</div>
			</section>
		);
	}

	return (
		<article className="mx-auto max-w-3xl px-6 py-20">
			<header className="mb-14">
				<div className="flex items-center gap-3 text-sm text-zinc-500">
					<img
						src={post.user.profile_image_90}
						alt={post.user.name}
						className="h-8 w-8 rounded-full border border-zinc-800"
					/>

					<div className="flex items-center gap-2">
						<span className="text-zinc-300">{post.user.name}</span>

						<span className="h-1 w-1 rounded-full bg-zinc-700" />

						<span>@{post.user.username}</span>
					</div>
				</div>

				<h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight text-white">
					{post.title}
				</h1>

				<p className="mt-5 text-lg leading-8 text-zinc-500">
					{post.description}
				</p>

				<div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-zinc-600">
					<span>{post.readable_publish_date}</span>

					<span className="h-1 w-1 rounded-full bg-zinc-700" />

					<span>{post.reading_time_minutes} min read</span>

					<span className="h-1 w-1 rounded-full bg-zinc-700" />

					<span>❤️ {post.public_reactions_count}</span>

					<span className="h-1 w-1 rounded-full bg-zinc-700" />

					<span>💬 {post.comments_count}</span>
				</div>

				{post.cover_image && (
					<img
						src={post.cover_image}
						alt={post.title}
						className="
					mt-10
					w-full
					rounded-3xl
					border
					border-zinc-900
					object-cover
				"
					/>
				)}
			</header>

			<div
				className="
		prose
		prose-invert
		max-w-none

		/* Base */
		text-[18px]
		leading-9
		text-zinc-300

		/* Headings */
		prose-headings:font-semibold
		prose-headings:tracking-tight
		prose-headings:text-white
		prose-headings:scroll-mt-24

		prose-h1:text-5xl
		prose-h2:mt-16
		prose-h2:mb-6
		prose-h2:text-3xl

		prose-h3:mt-12
		prose-h3:mb-4
		prose-h3:text-2xl

		/* Paragraphs */
		prose-p:my-7
		prose-p:leading-9
		prose-p:text-zinc-300

		/* Links */
		prose-a:text-zinc-100
		prose-a:underline
		prose-a:underline-offset-4
		prose-a:decoration-zinc-700
		hover:prose-a:decoration-zinc-400

		/* Bold */
		prose-strong:font-semibold
		prose-strong:text-white

		/* Lists */
		prose-ul:my-8
		prose-ol:my-8
		prose-li:my-2
		prose-li:text-zinc-300

		/* Quotes */
		prose-blockquote:border-l-zinc-700
		prose-blockquote:text-zinc-400
		prose-blockquote:italic

		/* Inline code */
		prose-code:rounded-md
		prose-code:bg-zinc-900
		prose-code:px-1.5
		prose-code:py-1
		prose-code:text-[15px]
		prose-code:text-zinc-100
		prose-code:before:content-none
		prose-code:after:content-none

		/* Code blocks */
		prose-pre:overflow-x-auto
		prose-pre:rounded-2xl
		prose-pre:border
		prose-pre:border-zinc-800
		prose-pre:bg-zinc-950
		prose-pre:px-5
		prose-pre:py-4

		/* Images */
		prose-img:rounded-2xl
		prose-img:border
		prose-img:border-zinc-900
		prose-img:shadow-2xl

		/* HR */
		prose-hr:border-zinc-800
	"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: post.body_html }}
			/>

			<footer className="mt-16 border-t border-zinc-900 pt-8">
				<div className="flex flex-wrap gap-2">
					{post.tags.map((tag) => (
						<span
							key={tag}
							className="
						rounded-full
						border
						border-zinc-800
						px-3
						py-1
						text-sm
						text-zinc-500
					"
						>
							#{tag}
						</span>
					))}
				</div>

				<Link
					to="/posts"
					className="
				mt-10
				inline-flex
				items-center
				text-sm
				text-zinc-500
				transition-colors
				hover:text-white
			"
				>
					← Back to posts
				</Link>
			</footer>
		</article>
	);
}
