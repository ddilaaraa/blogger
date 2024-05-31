import "@/styles/globals.css";
import Head from 'next/head'



export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Blogger</title>
        <meta name="description" content="Blogger" />
        <meta name="keywords" content="blog" />
        <meta name="author" content="Blogger" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Blogger" />
        <meta property="og:description" content="Blogger" />
        
        <meta property="og:url" content="https://www.blogger.com" />
        <meta name="google-site-verification" content="v2tY68B445XssE6j5d4Q4TBoqzamRu1BjnDyUM9KthM" />
        
      
      </Head>
      <Component {...pageProps} />
    </>
  )
}
