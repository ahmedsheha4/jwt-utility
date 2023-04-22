const base64url = (value: {}) => {
  const json = JSON.stringify(value);
  const buffer = Buffer.from(json);
  const base64 = buffer
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return base64;
};

export default base64url;
