import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ArconnectProvider } from "react-arconnect";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ArconnectProvider>
      <Component {...pageProps} />
    </ArconnectProvider>
  );
}
