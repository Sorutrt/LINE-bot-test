import * as https from "https";
import express from "express";
//import { dotenv } from "dotenv";

const app = express();

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.LINE_ACCESS_TOKEN;

// ミドルウェア設定
app.use(express.json());
app.use(
    express.urlencoded({
        entended: true,
    })
);

// ルーティングロジック
app.get("/", (req, res) => { // ドメインのルート("/")へのHTTP GET requestに
    res.sendStatus(200); // ステータス"200"を返す
});

// リクエスト処理
app.post("/webhook", function (req, res) { // /webhook エンドポイントにHTTP POSTリクエストが送られてくる
    res.send("HTTP POST requiest sent to the webhook URL!");
    
    // ユーザーがボットにメッセージを送ったとき応答メッセージを送る
    if (req.body.events[0].type === "message") {
        const dataString = JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [ // 返信メッセージ
                {
                    type: "text",
                    text: "Hello, world!",
                },
                {
                    type: "text",
                    text: "May I help you?",
                },
            ],
        });

        // request header (check Messaging API reference)
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
        };

        const webhookOptions = {
            hostname: "api.line.me",
            path: "/v2/bot/message/reply",
            method: "POST",
            headers: headers,
            body: dataString,
        };

        // difine request
        const request = https.request(webhookOptions, (res) => {
            res.on("error", (err) => {
                console.error(err);
            });
        });

        // send request
        request.write(dataString);
        request.end();
    }
});

// サーバーにリスナー設定
app.listen(PORT, () => {
    console.log("Example app listening at http://localhost:${PORT}");
});
