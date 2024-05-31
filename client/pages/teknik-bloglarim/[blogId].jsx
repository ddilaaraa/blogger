"use client"
import React, { useEffect } from 'react'
import BenKimimHeader from '@/components/benKimimHeader'
import { useRouter } from 'next/router';
import Head from 'next/head';
// import Highlight.js and the languages you need
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/material-darker.min.css';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript)
import parse from 'html-react-parser';
import DOMPurify from "isomorphic-dompurify";
import Link from 'next/link';
import { XOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Database } from '../../lib/mongodb';
import Blog from '../../lib/blogModel';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import blogPic from '../../public/media/blog.png'


const TeknikBlogPage = ({ blog }) => {

  const cleanHtml = DOMPurify.sanitize(blog.icerik);
  const { asPath } = useRouter();

  useEffect(() => {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(code => {
      code.classList.add('language-js');
    });
    Prism.highlightAll();
  }, []);




  const updatedAt = new Date(blog.updatedAt);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = updatedAt.toLocaleDateString('tr-TR', options);


  function checkImageSrc(src) {
    // `src` değerini kontrol et
    if (!src || typeof src !== 'string') {
      return blogPic; // Varsayılan yerel dosya yolunu döndür
    }
  
    // Eğer src bir http veya https linki ise veya başında / varsa, src değeri geçerlidir.
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
      return src;
    } else {
      return blogPic; // Varsayılan yerel dosya yolunu döndür
    }
  }

  return (
    <>
      <Head>
        <title>{blog.baslik}</title>
        <meta name="description" content={blog.meta_aciklama} />
        <meta property="og:title" content={blog.baslik} />
        <meta property="og:description" content={blog.meta_aciklama} />
        <meta property="og:image" content={checkImageSrc(blog.one_cikan_gorsel_linki)} />
        <meta property="og:url" content={`https://blogger.com${asPath}&text=${blog.baslik}`} />
        <meta name="twitter:title" content={blog.baslik} />
        <meta name="twitter:description" content={blog.meta_aciklama} />
        <meta name="twitter:image" content={checkImageSrc(blog.one_cikan_gorsel_linki)} />
        <meta name="twitter:card" content="summary_large_image" />


      </Head>


      <div className="  w-screen h-screen flex flex-col items-center ">
        <BenKimimHeader headerColor="#F1D6FF" />
        <div className='teknik-bloglarim-blog w-full max-w-[1400px] pb-10'>

          <div className='page-navigator w-full text-gray-700 bg-transparent flex flex-row gap-[36px] py-[32px] px-[32px] lg:px-[96px] 2xl:px-0 items-center'>
            <span className='teknik-blog-title  font-clash-semibold text-[28px] md:text-[28px] '>Bloglarımız</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="26.485" height="13.116" viewBox="0 0 26.485 13.116">
              <g id="Group_344" data-name="Group 344" transform="translate(-320.441 -146.453)">
                <path id="Path_3067" data-name="Path 3067" d="M12551.441,4839.568h24.071l-11.409-11.409" transform="translate(-12231 -4681)" fill="none" stroke="#000" strokeWidth="2" />
              </g>
            </svg>
            <Link href={`/teknik-bloglarim`} ><h1 className=' font-Inter-Light text-[22px]  md:text-[22px]'>Blog Sayfası</h1></Link>
            <svg className='hidden md:block' xmlns="http://www.w3.org/2000/svg" width="26.485" height="13.116" viewBox="0 0 26.485 13.116">
              <g id="Group_344" data-name="Group 344" transform="translate(-320.441 -146.453)">
                <path id="Path_3067" data-name="Path 3067" d="M12551.441,4839.568h24.071l-11.409-11.409" transform="translate(-12231 -4681)" fill="none" stroke="#000" strokeWidth="2" />
              </g>
            </svg>
            <h2 className=' font-Inter-Light text-[22px] hidden md:block md:text-[22px]'>{blog.baslik}</h2>

          </div>
          <div className='teknik-bloglarim-content w-full flex flex-col justify-center px-[32px] md:px-[128px] lg:px-[196px] lg:py-[32px] 2xl:px-0 gap-[64px]'>
            <div className='blog-title w-full flex flex-row justify-center items-center'>
              <h1 className=' font-Inter-SemiBold text-[35px] md:text-[55px] text-center text-black'>{blog.baslik}</h1>
            </div>
            <div className='w-full flex flex-col justify-center items-end'>
              {formattedDate}
            </div>
            <div className='blog-content font-Inter-Light text-[22px] pt-4'>
              <ReactMarkdown children={cleanHtml} rehypePlugins={[rehypeRaw]} />
            </div>
            <div className='w- full flex flex-col justify-center items-center gap-4 pt-12'>
              <span className='text-[22px]'>Bu Blog'u Paylaş</span>
              <div className='w- full flex flex-row justify-center items-center gap-8'>
                <a className="twitter-share-button"
                  target="_blank"
                  href={`https://twitter.com/intent/tweet?url=https://alibugatekin.com${asPath}&text=${blog.baslik}`}>
                  <XOutlined style={{ fontSize: '40px' }} />
                </a>
                <a
                  className="twitter-share-button"
                  target="_blank"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://alibugatekin.com${asPath}
              `}
                >
                  <LinkedinOutlined style={{ fontSize: '40px' }} />
                </a>
              </div>
            </div>
          </div>
        </div>


      </div>


    </>

  )
}


export default TeknikBlogPage



export async function getStaticPaths() {
  // Veritabanına bağlan (Eğer bağlantı zaten açıksa, mongoose bu işlemi atlayacaktır)
  await Database;

  // "Hayatımdan Bloglar" olan blogları filtreleyin ve alın
  const blogs = await Blog.find({ blog_turu: 'Teknik Bloglar' }).lean();

  // Her bir blog için parametreleri oluşturun
  const paths = blogs.map((blog) => ({
    params: { blogId: blog.slug },
  }));

  return { paths, fallback: 'blocking' };
}


export async function getStaticProps({ params }) {
  // Veritabanına bağlan
  await Database;

  // Slug'a göre blogu alın
  const blog = await Blog.findOne({ slug: params.blogId }).lean();

  // Blog bulunamazsa, 404 döndür
  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: { blog: JSON.parse(JSON.stringify(blog)) }, // Serileştirme
    revalidate: 60, // İsteğe bağlı: İçeriği yenileme süresi
  };
}