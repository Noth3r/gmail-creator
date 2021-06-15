process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express()

const bot = new TelegramBot('ISI TOKEN DISINI', {
    polling: true
});
let chatId = "ISI CHAT ID DISINI"

app.get('/gmail/no', async (req, res) => {
    await bot.sendMessage(chatId, 'Request No Hp')
    bot.onText(/\d+/, async (msg, match) => {
        const resp = match[0]
        try {
            res.json({
                no: resp
            })
            await bot.sendMessage(chatId, 'No Hp Sedang di Proses')
        } catch (e) {}
    })
})

app.get('/gmail/otp/:nohp', async (req, res) => {
    const nohp = req.params.nohp
    await bot.sendMessage(chatId, `Request OTP => ${nohp}`)
    bot.onText(/\d+/, async (msg, match) => {
        const resp = match[0]
        try {
            res.json({
                otp: resp
            })
            await bot.sendMessage(chatId, 'OTP sedang di proses')
        } catch (e) {}
    })
})

app.get('/gmail/success/:email/:success', async (req, res) => {
    const email = req.params.email
    const success = req.params.success
    await bot.sendMessage(chatId, `${email} => ${success}`)
    res.json({
        success: 'Berhasil'
    })
})

app.listen(3000, (err ,res) => {
	console.log('[+] Tele Bot On')
})
