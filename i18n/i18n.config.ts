import { DEFAULT_LOCALE, messages } from './messages';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: DEFAULT_LOCALE,
  messages: messages
}));
