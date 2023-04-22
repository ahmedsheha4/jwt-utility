import crypto from "crypto";
import base64url from "./utils";
import JWTPayload from "./type";

class JWT {
  static create(
    payload: Partial<JWTPayload>,
    expirationInSecs: number,
    JWTHeaders?: { [key: string]: string }
  ) {
    const header = {
      alg: "HS256",
      typ: "JWT",
      ...JWTHeaders,
    };

    const base64Header = base64url(header);
    const base64Payload = base64url({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + expirationInSecs,
    });

    const signature = crypto
      .createHmac("sha256", process.env.JWT_SECRET_KEY ?? "")
      .update(base64Payload)
      .digest()
      .toString();

    return [base64Header, base64Payload, base64url(signature)].join(".");
  }

  static verify(token: string) {
    const [_, payload, signature] = token.split(".");

    const recreatedSignature = crypto
      .createHmac("sha256", process.env.JWT_SECRET_KEY ?? "")
      .update(payload)
      .digest()
      .toString();
    const recreatedSignatureBase64 = base64url(recreatedSignature);
    if (recreatedSignatureBase64 === signature) {
      const exp = JWT.extractPayload(token).exp;
      if (Math.floor(Date.now() / 1000) > exp) return false;
      return true;
    }
    return false;
  }

  static extractPayload = (token: string) => {
    const [_, payload, __] = token.split(".");
    return JSON.parse(Buffer.from(payload, "base64").toString()) as JWTPayload;
  };
}

export default JWT;
