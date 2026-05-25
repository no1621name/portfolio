import { object, string, minLength, optional, pipe, startsWith, type InferOutput } from 'valibot';

export const contactSchema = object({
  name: pipe(string(), minLength(1)),
  telegram: pipe(string(), minLength(1), startsWith('@')),
  message: optional(string())
});

export type ContentSchema = InferOutput<typeof contactSchema>;
