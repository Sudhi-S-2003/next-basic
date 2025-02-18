// pages/_app.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import './globals.css';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>My Next.js App</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <div className="antialiased">
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </>
  );
}
