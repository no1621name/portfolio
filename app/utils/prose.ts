type MinimarkNode = [tag: string, attrs: Record<string, unknown>, text: string];

export function getPreviewText(body: unknown, maxLength = 150): string {
  const typed = body as { value?: MinimarkNode[] } | undefined;
  const paragraphs = typed?.value ?? [];
  const firstPara = paragraphs.find(p => p[0] === 'p');
  if (!firstPara) return '';
  const text = firstPara[2];
  return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
}
