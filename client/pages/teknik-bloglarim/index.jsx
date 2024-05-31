"use client"
import React from 'react'
import { useState } from 'react';
import { Pagination } from 'antd';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import BenKimimHeader from '@/components/benKimimHeader';
import Link from 'next/link';
import useApi from '../../api/api';
import useStore from '../../State Management/Store';
import { useEffect } from 'react';
import blogPic from '../../public/media/blog.png'
import Head from "next/head";


const Teknikbloglarim = () => {
  const { getAllBlogs } = useApi();
  const { blogData } = useStore();

  useEffect(() => {
    getAllBlogs();


  }, []);
 


  const router = useRouter();


  // State tanımlamaları
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1; // Her sayfada gösterilecek blog sayısı

  // Aktif sayfadaki blog postunu hesapla
  const featuredPosts = blogData.filter(post => post.featured&& post.genre === "Teknik Bloglar" && post.state === "Yayında");
  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPost = featuredPosts.slice(indexOfFirstPost, indexOfLastPost);


  const [currentPage2, setCurrentPage2] = useState(1);
  const pageSize2 = 3; // Her sayfada gösterilecek blog sayısı

  // Aktif sayfadaki blog postunu hesapla
  const nonfeaturedPosts = blogData.filter(post => !post.featured&& post.genre === "Teknik Bloglar" && post.state === "Yayında");
  const indexOfLastPost2 = currentPage2 * pageSize2;
  const indexOfFirstPost2 = indexOfLastPost2 - pageSize2;
  const currentPost2 = nonfeaturedPosts.slice(indexOfFirstPost2, indexOfLastPost2);


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
        <title>Blog Sayfası</title>
        <meta name="description" content="Teknik Bloglarım" />
        <meta name="keywords" content="Blog" />
        <meta name="author" content="Blogger" />
       

      </Head>
    <div className="  w-screen h-screen flex flex-col items-center ">
      <BenKimimHeader headerColor="#F1D6FF" />
      <div className='teknik-bloglar w-full max-w-[1400px] pb-10'>
        <div className='page-navigator w-full  bg-transparent flex flex-row gap-[36px] py-[32px] px-[32px] lg:px-[96px] 2xl:px-0 items-center'>
          <span className='teknik-blog-title  font-clash-semibold text-[28px] md:text-[28px] '>Bloglarımız</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="26.485" height="13.116" viewBox="0 0 26.485 13.116">
            <g id="Group_344" data-name="Group 344" transform="translate(-320.441 -146.453)">
              <path id="Path_3067" data-name="Path 3067" d="M12551.441,4839.568h24.071l-11.409-11.409" transform="translate(-12231 -4681)" fill="none" stroke="#000" strokeWidth="2" />
            </g>
          </svg>
          <h1 className=' font-Inter-Light text-[22px]  md:text-[22px]'>Blog Sayfası</h1>
        </div>
        <div className='teknik-bloglar-content w-full flex flex-col justify-center px-[32px] md:px-[128px] lg:px-[196px] lg:py-[32px] 2xl:px-0 gap-[64px]'>
          <span className="text-[23px] font-clash-medium font-bold">Öne Çıkanlar</span>
          <div className='one-cikanlar w-full flex flex-col justify-center items-center gap-4 '>
            {currentPost.map((post) => (
              post.featured && (
                <Link className='w-full' href={`/teknik-bloglarim/${post.slug}`} key={post.key}>
                  <div className='one-cikanlar-post black-and-white w-full h-[650px] xl:h-[400px] border border-gray-200 shadow-md rounded rounded-md flex flex-col xl:flex-row justify-center items-center gap-4 cursor-pointer'>
                    <div className='one-cikanlar-post-resim xl:w-2/5 w-full relative h-full'>
                      <Image style={{objectFit:"cover"}} className='rounded rounded-md' src={checkImageSrc(post.one_cikan_gorsel_linki)} sizes="100%" priority={true} fill  alt="Picture of the author" />
                    </div>
                    <div className='one-cikanlar-post-content xl:w-3/4 w-full h-full xl:px-8 xl:py-12 p-4 font-Inter-Light '>
                      <div className='flex flex-col justify-between h-full w-full'>
                        <div className='flex xl:flex-row xl:gap-0 gap-4 flex-col justify-between'>
                          <h1 className='teknik-blog-title font-clash-medium text-[26px]'>{post.name}</h1>
                        </div>
                        <p dangerouslySetInnerHTML={{__html: post.content}} className=" mobile-short-content font-Inter-Light text-[20px] line-clamp-3 w-full"></p>
                        <div className='flex flex-row justify-between'>
                          <div className="flex flex-row gap-4">
                            <span className="w-fit h-fit bg-red-200 text-red-500 px-4 py-2 rounded">{post.tags[0]}</span>
                            <span className="w-fit h-fit bg-yellow-200 text-yellow-500 px-4 py-2 rounded">{post.tags[1]}</span>
                          </div>
                          <div className="flex flex-row items-center">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            ))}


            <Pagination className=' one-cikanlar-pagination font-clash-regular w-full flex flex-row justify-center items-center'
              current={currentPage}
              onChange={(page) => setCurrentPage(page)}
              total={featuredPosts.length}
              pageSize={pageSize}
            />
          </div>
          <span className="text-[23px] font-clash-medium flex flex-col font-bold">Tüm Bloglar</span>
          <div className='tum-bloglar w-full grid xl:grid-cols-3 grid-cols-1 gap-4 '>
            {currentPost2.map((post) => (
              <Link className='w-full' href={`/teknik-bloglarim/${post.slug}`} key={post.key}>
              <div className='one-cikanlar-post black-and-white w-full h-[600px] p-4 border border-gray-200 shadow-md rounded rounded-md flex flex-col justify-center items-center gap-4 cursor-pointer'  >
                <div className='one-cikanlar-post-resim  w-full  relative h-full'>
                <Image style={{objectFit:"cover"}} className=' rounded rounded-md' src={checkImageSrc(post.one_cikan_gorsel_linki)} sizes="100%" fill priority={true}  alt="Picture of the author" />                </div>
                <div className=' tum-bloglar-post-content w-full  h-full font-Inter-Light '>
                  <div className='flex flex-col justify-between h-full w-full'>
                    <div className='flex xl:flex-row flex-col '>
                      <h1 className=' font-clash-medium text-[26px]'>{post.name}</h1>
                    </div>
                    <p dangerouslySetInnerHTML={{__html: post.content}} className="mobile-short-content font-Inter-Light text-[20px] line-clamp-3 w-full"></p>                    <div className='flex flex-row justify-between'>
                      <div className=" flex flex-row gap-4">
                      <span className="w-fit h-fit bg-red-200 text-red-500 px-4 py-2 rounded">{post.tags[0]}</span>
                        <span className="w-fit h-fit bg-yellow-200 text-yellow-500 px-4 py-2 rounded">{post.tags[1]}</span>
                      </div>
                      <div className="post-sirasi flex flex-row items-center">
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              </Link>
            ))}
          </div>
          <Pagination className=' one-cikanlar-pagination font-clash-regular w-full flex flex-row justify-center items-center'
            current={currentPage2}
            onChange={(page) => setCurrentPage2(page)}
            total={nonfeaturedPosts.length}
            pageSize={pageSize2}
          />
        </div>
      </div>


    </div>
    </>
  )
}


export default Teknikbloglarim