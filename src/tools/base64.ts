export default async function wrapToBase64(
  message: string,
  publicKey: string,
  signature: Uint8Array
) {
  const base64Message = btoa(message);
  const base64PublicKey = btoa(publicKey);
  const base64Signature = btoa(Buffer.from(signature).toString("base64"));

  const based64 = {
    publicKey: base64PublicKey,
    message: base64Message,
    signature: base64Signature,
  };

  return based64;
}
