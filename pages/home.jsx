import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page - My Next.js App</title>
        <meta name="description" content="Welcome to the best app in the world!" />
        <meta name="keywords" content="next.js, react, app, website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-white">
        <h1>Welcome to the Home Page</h1>
        <p>This is the home page of your application.</p>
      </div>
    </>
  );
}
