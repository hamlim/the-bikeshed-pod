import Content, { frontmatter } from "./episode-bike-1.mdx";

export default function Page() {
  return (
    <article>
      <pre>{JSON.stringify(frontmatter, null, 2)}</pre>
      <hr />
      <Content />
    </article>
  );
}
