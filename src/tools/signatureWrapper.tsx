import { defaultSignatureParams, useArconnect } from "react-arconnect";
import wrapToBase64 from "./base64";

export default function signatureWrapper() {
  const { createSignature, getPublicKey } = useArconnect();

  const wrapSignature = async (message: string) => {
    const publicKey = await getPublicKey();
    const encodedMessage = new TextEncoder().encode(message);

    const signature = (await createSignature(
      encodedMessage,
      defaultSignatureParams,
      "Uint8Array",
      "new"
    )) as Uint8Array;
    return wrapToBase64(message, publicKey, signature);
  };

  return { wrapSignature };
}
