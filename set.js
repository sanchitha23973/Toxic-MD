const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUFiNE1MLzd5OW5lK0pNNXFJcHE5dVN5MFc0OVlEdEs0VC8wTVpZSlJGST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVXNQRzZRTmNaeE40MERsVmtTS3ROU2tYUlQ0VHlDNUR5akdNM0c4VkNtVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRSUkyWmkzZFlGYVYwd3RYakZDSzhWNmJiSmU1dnN2VFdoRWtGellOQ21ZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmSkJjeEZ0cFRrSjM4QUtMcm84MVpEVFJIV29UOWZFSFM3R3BKTVd2bzE0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldNUWZRczlicHp3RHBHd1BnNFljT1Nud2pYejhxc2xscFliNGxsZFo0bHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImR6TWtBMlNXNVZmaGFIaDIwcWVEMmV4RXdiNlJScVVUYjM5dUFsdVFJd2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUorajAveG9aS2JURlRodE9XM3V6R0RlYnlJMUVQOElMR2c3THJjZG9FRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM3l0bkFiWkhzR2N1dW1McS8xMEZqbXRJNWZ6SVM4U1VrUnYwSGdaMzhRRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkprUjdFT2RtWGNCaU1HVUNlaHdLSmd1aGpQZDYvMnRiL2EwYk0zS1AzbWJiTGVsc05xektoQzhiYmlDM2xqYUtrbHlNY3dTUUY4SDB6ZmFoNjM4ZUR3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA4LCJhZHZTZWNyZXRLZXkiOiJrUzVjTjdHU3UxRkNqcjUyMTFLRlpKNmRiWW1BeTI3UmhjN3NvWkNZOHJjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzAyNzIyNzY2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjdEODcxRDE1Njg1OUU1QkI1RDkwMUE1MzVGRDI5RkE0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTE4MTcwOTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzAyNzIyNzY2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE5QjJGMDAxMzIwRTEyN0EyRTY1NjY0RDA0Qzk0M0VDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTE4MTcwOTd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Im1rMGNqMFZfVFRleV9pZ25FTzVidHciLCJwaG9uZUlkIjoiZDBkOGJiZTMtMmRkYy00YTMxLTllZjAtYjljZDFlNWYzZDc1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNkbUxBWW43YzkzVHdrQ21kSDVKaXh1bFcwdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaaUJ3cnBET3RQYlQ3aWszM0VQUnc5TTdDMmM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQUJDRDEyMzQiLCJtZSI6eyJpZCI6Ijk0NzAyNzIyNzY2OjIyQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTg5NDM0Mzk4MDQ0Mzc1OjIyQGxpZCIsIm5hbWUiOiJS4bSHeO++oFPhtIDhtITKnMmqybTvvqDjg6QifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ052OS9Qc0RFTysycXNNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ii9zYTB1ZTRqRGxpby9LTUtXL0xwNElIVmRNZk0zRlBKTkprTyt6S0NHSFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjFZMXBzY0R5NnBXNUlXM0VsNW5sTDJHVm1WZFNmcitNL2NnakVSVXNhZWovZktTUzdmaFh3cWFGMjZkekRLMEVmaVhnTm1jS24xK0xmMHZNbi9lWEFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJiN2xwaWVDTXV1ZmdTSUhRb0ZjS29xc2FmU2hISHI1K05LZkluU1dvamJsRVhpVW13YjBsMFl6SmdlbktjUFFhYjZwUjRZTnhpRkRNQ2JJMklrQnJBdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzAyNzIyNzY2OjIyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmY3R3RMbnVJdzVZcVB5akNsdnk2ZUNCMVhUSHpOeFR5VFNaRHZzeWdoaDAifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTgxNzA4NSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPZGoifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "xh_clinton",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "94702722766",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
