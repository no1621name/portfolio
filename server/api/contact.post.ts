export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.name || !body.telegram) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and Telegram are required'
    });
  }

  if (!body.telegram.startsWith('@')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Telegram must start with @'
    });
  }

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

👤 <b>Имя:</b> ${body.name}
✈️ <b>Telegram:</b> ${body.telegram}
${body.message ? `📝 <b>Сообщение:</b> ${body.message}` : ''} `.trim();

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
