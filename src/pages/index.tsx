import signatureWrapper from "@/tools/signatureWrapper";
import { ArweavePermissions, useArconnect } from "react-arconnect";

export default function Home() {
  const { address, arconnectConnect, arconnectDisconnect } = useArconnect();
  const { wrapSignature } = signatureWrapper();

  const perms = [
    "ACCESS_ADDRESS",
    "SIGNATURE",
    "SIGN_TRANSACTION",
    "ACCESS_PUBLIC_KEY",
  ];

  const appInfo = { name: "Sig Test", logo: "" };

  const wrapAndUpload = async () => {
    const { publicKey, signature, message } = await wrapSignature("Wrapped!");

    const result = await fetch(
      `http://ar.molecule.sh/ar-auth/${publicKey}/${message}/${signature}`
    );
    const finalOutcome = await result.json();

    console.log(
      finalOutcome,
      "If it says {result: true}, it means the signature has been verified as authentic."
    );
  };

  return (
    <main className="flex flex-col gap-y-4">
      <button
        onClick={() => {
          // type supportedWallets = "arconnect" | "arweave.app" | "window.arweaveWallet";
          arconnectConnect(perms, appInfo, undefined, "arweave.app");
        }}
      >
        Connect
      </button>
      <button onClick={() => arconnectDisconnect()}>Disconnect</button>
      {address}
      <button onClick={() => wrapAndUpload()}>Create new signature</button>
    </main>
  );
}
