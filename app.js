const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Создаем экземпляр приложения Express
const app = express();

// Парсинг данных формы
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Обрабатываем POST-запрос с формы и отправляем письмо
 app.post('/send-email', (req, res) => {
    const { name, phone } = req.body;

    // Создаем транспортер Nodemailer
    const transporter = nodemailer.createTransport({
        host: "imap.yandex.ru",
        port:  993,
        secure: true,
        auth: {
            user: 'maximhuix@yandex.ru', // Ваш адрес электронной почты Яндекс
            pass: '1918171615MaxikIvanov' // Ваш пароль от электронной почты Яндекс
        }
    });

    // Опции письма
    const mailOptions = {
        from: 'maximivanov11ivanov@yandex.ru', // Адрес отправителя
        to: ' maximhuix@yandex.ru', // Адрес получателя
        subject: 'Новая заявка',
        text: `Имя: ${name}\nТелефон: ${phone}`
        };

    // Отправляем письмо
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Произошла ошибка при отправке письма.');
        } else {
            console.log('Письмо успешно отправлено: ' + info.response);
            res.status(200).send('Письмо успешно отправлено.');
        }
    });
});

// Запускаем сервер
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});