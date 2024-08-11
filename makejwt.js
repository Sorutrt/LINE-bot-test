import dotenv from "dotenv";
import * as jose from "node-jose";
// import { createSign } from "jose/JWS/createSign";

dotenv.config();

// Authortion private key
let privateKey = process.env.AUTHERTION_KEY_PRIVATE;

let header = {
  alg: "RS256",
  typ: "JWT",
  kid: "1434a113-1f73-4434-9e76-7c963f6bb670",
};

let payload = {
  iss: process.env.CHANNEL_ID,
  sub: process.env.CHANNEL_ID,
  aud: "https://api.line.me/",
  exp: Math.floor(new Date().getTime() / 1000) + 60 * 30,
  token_exp: 60 * 60 * 24 * 30,
};

jose.JWS.createSign(
  { format: "compact", fields: header },
  JSON.parse(privateKey)
)
  .update(JSON.stringify(payload))
  .final()
  .then((result) => {
    console.log(result);
  });