import { safeParse, object, string, optional } from 'valibot';
import { createContactSchema } from '@@/shared/schemas/contact';
import { escapeHtml } from '@@/server/utils/escape-html';
import { messages, DEFAULT_LOCALE } from '@@/i18n';

const querySchema = object({
  locale: optional(string())
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const query = getQuery(event);

  const parsedQuery = safeParse(querySchema, query);

  const locale = (parsedQuery.success && parsedQuery.output.locale) || DEFAULT_LOCALE;
  const apiMessages = messages[locale as keyof typeof messages].api;
  const contactSchema = createContactSchema(locale, messages);
  const result = safeParse(contactSchema, body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      data: result.issues
    });
  }

  const validBody = result.output;

  const config = useRuntimeConfig(event);

  if (!config.telegramBotToken || !config.telegramChatId) {
    console.error('Telegram configuration is missing');
    throw createError({
      statusCode: 500,
      message: apiMessages.errors.internal
    });
  }

  const message = `
🔔 <b>Новая заявка с сайта!</b>

👤 <b>Имя:</b> ${escapeHtml(validBody.name)}
✈️ <b>Telegram:</b> ${escapeHtml(validBody.telegram)}
${validBody.message ? `📝 <b>Сообщение:</b> ${escapeHtml(validBody.message)}` : ''} `.trim();

  try {
    await $fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: config.telegramChatId,
        text: message,
        parse_mode: 'HTML'
      }
    });

    return { success: true };
  }
  catch (error) {
    console.error('Telegram API error:', error);
    throw createError({
      statusCode: 500,
      message: apiMessages.contact.failedSend
    });
  }
});
