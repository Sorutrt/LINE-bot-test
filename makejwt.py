import jwt
import time
import os
from os.path import join, dirname
from dotenv import load_dotenv

load_dotenv(verbose=True)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

privateKey = os.environ.get("AUTHERTION_KEY_PRIVATE")
headers = {
    "alg": "RS256",
    "typ": "JWT",
    "kid": os.environ.get("1434a113-1f73-4434-9e76-7c963f6bb670")
}

payload = {
  "iss": os.environ.get("CHANNEL_ID"),
  "sub": os.environ.get("CHANNEL_ID"),
  "aud": "https://api.line.me/",
  "exp": int(time.time()) + (60 * 30),
  "token_exp": 60 * 60 * 24 * 30
}

# 直接 `privateKey` を使って署名
JWT = jwt.encode(payload, privateKey, algorithm="RS256", headers=headers)
print(JWT)
