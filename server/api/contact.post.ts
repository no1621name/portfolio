import { safeParse } from 'valibot';
import { contactSchema } from '@@/shared/schemas/contact';
import { escapeHtml } from '@@/server/utils/escape-html';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = safeParse(contactSchema, body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid payload'
    });
  }

  const validBody = result.output;

  const config = useRuntimeConfig(event);

  if (!config.telegramBotToken || !config.telegramChatId) {
    console.error('Telegram configuration is missing');
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
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
      statusMessage: 'Failed to send message'
    });
  }
});
