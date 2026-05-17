type MinimarkNode = [tag: string, attrs: Record<string, unknown>, text: string];

export function getPreviewText(body: unknown, maxLength = 150): string {
  const typed = body as { value?: MinimarkNode[] } | undefined;
  const paragraphs = typed?.value ?? [];
  const firstPara = paragraphs.find(p => p[0] === 'p');
  if (!firstPara) return '';
  return firstPara[2].slice(0, maxLength);
}
