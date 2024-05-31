import { Inter } from "next/font/google";
import Header from "@/components/header";
import Anasayfa from "@/components/homepage";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Blogger</title>
        <meta name="description" content="Bu bir blog sitesidir." />
        <meta name="keywords" content="blog" />
        <meta name="author" content="Blogger" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/static/blog.ico" />

      
        <meta property="og:title" content="Blogger" />
        <meta property="og:description" content="Bu bir blog sitesidir" />
        <meta property="og:image" content="/static/blog.png" />
        <meta property="og:url" content="https://www.blogger.com" />
      </Head>
      <main className="w-screen h-screen flex absolute flex-col">
        <Header />
        <Anasayfa />
      </main>
    </>
  );
}
