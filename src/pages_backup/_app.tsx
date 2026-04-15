import type { AppProps } from "next/app";
import "./nextra-theme.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
