export function MarkdownBody({ html }: { html: string }) {
  return (
    <div
      className="prose prose-invert max-w-none font-body"
      data-pagefind-body
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
