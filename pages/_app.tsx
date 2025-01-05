import Head from "next/head";
import "./globals.css";

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ComponentType<any>;
  pageProps: any;
}) {
  return (
    <>
      <Head>
        <title>My Next.js App</title>
      </Head>
      <div className="antialiased">
        <Component {...pageProps} />
      </div>
    </>
  );
}
