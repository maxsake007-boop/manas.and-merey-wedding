export interface RsvpPayload {
  names: string;
  attendance: string;
  submittedAt: string;
}

export async function sendRsvp(payload: RsvpPayload): Promise<{ success: boolean; message?: string }> {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  const sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;

  let telegramSent = false;
  let sheetsSent = false;

  // 1. Отправка в Telegram бота (если указаны токен и chatId)
  if (token && chatId) {
    try {
      const text = `💍 <b>Новый ответ на свадебное приглашение!</b>\n\n` +
        `👤 <b>Гость / Гости:</b> ${escapeHtml(payload.names)}\n` +
        `💌 <b>Присутствие:</b> ${escapeHtml(payload.attendance)}\n` +
        `📅 <b>Время отправки:</b> ${new Date(payload.submittedAt).toLocaleString('ru-RU')}`;

      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
        }),
      });

      if (res.ok) {
        telegramSent = true;
      } else {
        console.warn('Telegram Bot API response error:', await res.text());
      }
    } catch (err) {
      console.warn('Не удалось отправить в Telegram:', err);
    }
  }

  // 2. Отправка в Google Таблицы (через Google Apps Script Webhook)
  if (sheetsUrl) {
    try {
      await fetch(sheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      sheetsSent = true;
    } catch (err) {
      console.warn('Не удалось отправить в Google Таблицу:', err);
    }
  }

  // Всегда сохраняем в локальное хранилище браузера
  try {
    localStorage.setItem('wedding_rsvp_response', JSON.stringify(payload));
  } catch {
    // ignore
  }

  return {
    success: true,
    message: telegramSent || sheetsSent ? 'Отправлено успешно' : 'Сохранено локально',
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
