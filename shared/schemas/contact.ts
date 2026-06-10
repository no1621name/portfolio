import { object, string, minLength, optional, pipe, startsWith, type InferOutput } from 'valibot';
import type { messages } from '@@/i18n';
import { DEFAULT_LOCALE } from '@@/i18n';

type Messages = typeof messages;

const getContactMessages = (locale: string, messages: Messages) => {
  const contactForm = messages[locale as keyof Messages]?.contactForm || messages[DEFAULT_LOCALE].contactForm;
  return contactForm;
};

export const createContactSchema = (locale: string, messages: Messages) => {
  const t = getContactMessages(locale, messages);

  return object({
    name: pipe(
      string(),
      minLength(1, t.nameRequired)
    ),
    telegram: pipe(
      string(),
      minLength(1, t.telegramRequired),
      startsWith('@', t.telegramInvalid)
    ),
    message: optional(string())
  });
};

export type ContactSchema = InferOutput<ReturnType<typeof createContactSchema>>;
