const axios = require('axios');

const API_URL = 'https://api-inference.huggingface.co/models/facebook/bart-large-mnli';
const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

const coinSymbols = [
  "1INCH", "AAVE", "ADA", "ALGO", "APE", "APT", "AR", "ARB", "ARKM", "ASTR", "ATOM",
  "AVAX", "AXL", "AXS", "BAL", "BAT", "BCH", "BEAM", "BGB", "BLUR", "BNB", "BNX",
  "BOME", "BONK", "BRETT", "BSV", "BTC", "BTG", "BTT", "CAKE", "CFX", "CHZ", "CKB",
  "COMP", "CORE", "CRO", "CRV", "DAI", "DASH", "DOGE", "DOT", "DYDX", "EGLD", "ENA",
  "ENJ", "ENS", "ETC", "ETH", "ETHFI", "FET", "FIL", "FLOKI", "FLOW", "FLR", "FTM",
  "FTT", "GALA", "GMO", "GRT", "GT", "HBAR", "HNT", "ICP", "IMX", "INJ", "IOTA",
  "IOTX", "JASMY", "JUP", "KASPA", "KAVA", "KLAY", "KNC", "KSC", "LDO", "LEO", "LINK",
  "LPT", "LRC", "LTC", "LUNA", "LUNC", "MANA", "MATIC", "MEME", "MINA", "MKR", "MNT",
  "MOG", "MX", "NEAR", "NEO", "NEXO", "NOT", "OKB", "OM", "ONDO", "OP", "ORDI",
  "PAXG", "PENDLE", "PEOPLE", "PEPE", "PYTH", "PYUSD", "QNT", "RAY", "REN", "RNDR",
  "RON", "ROSE", "RPL", "RUNE", "SAFE", "SAND", "SEI", "SHIB", "SNX", "SOL", "SSV",
  "STX", "STRK", "SUI", "SUSHI", "TFUEL", "THETA", "TIA", "TON", "TRX", "TUSD",
  "TWT", "UMA", "UNI", "USDC", "USDD", "USDT", "VET", "WIF", "WLD", "WOO", "XAUT",
  "XDC", "XEC", "XLM", "XMR", "XRP", "XTZ", "YFI", "ZEC", "ZK", "ZRX"
];

const generalCategories = [
  "ADMINISTRATIVE EVENTS",
  "AIRDROP",
  "ALTCOIN",
  "ASIA",
  "BLOCKCHAIN",
  "BUSINESS",
  "COMMODITY",
  "EXCHANGE",
  "FIAT",
  "FORKS",
  "MARKET",
  "MINING",
  "OTHER",
  "REGULATION",
  "RESEARCH",
  "SPONSORED",
  "TECHNOLOGY",
  "TOKEN LISTING AND DELISTING",
  "TOKEN SALE",
  "TRADING",
  "WALLET"
];
const categoryLabels = [...coinSymbols, ...generalCategories];
module.exports.classifyCategory = async (text) => {
  try {
    const cleanText = text.trim().toUpperCase();
    if (categoryLabels.includes(cleanText)) {
      return cleanText;
    }
    const response = await axios.post(
      API_URL,
      {
        inputs: text,
        parameters: { candidate_labels: categoryLabels, multi_label: false },
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;

    if (data.error) throw new Error(data.error);

    const Label = data.labels[0];

    return Label;
  } catch (error) {
    console.error('Hugging Face classification error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
};


