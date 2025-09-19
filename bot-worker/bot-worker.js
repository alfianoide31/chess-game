const TelegramBot = require('node-telegram-bot-api');

// Ganti dengan token dari @BotFather
const token = "YOUR_BOT_TOKEN";

// short_name game harus sama dengan yg dibuat di BotFather /newgame
const gameShortName = "chess_game";

const bot = new TelegramBot(token, { polling: true });

// Command /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Halo! Ketik /play untuk main catur 🚀");
});

// Command /play
bot.onText(/\/play/, (msg) => {
  bot.sendGame(msg.chat.id, gameShortName);
});

// Handle callback_query saat user buka game
bot.on("callback_query", (query) => {
  if (query.game_short_name !== gameShortName) {
    bot.answerCallbackQuery(query.id, { text: "Game tidak dikenali." });
    return;
  }

  // Ganti URL ini dengan link GitHub Pages / Cloudflare Tunnel game lo
  const gameUrl = "https://username.github.io/chess-telegram/frontend/";

  bot.answerCallbackQuery({
    callback_query_id: query.id,
    url: gameUrl
  });
});
