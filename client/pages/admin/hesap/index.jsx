"use client"
import React, { useEffect, useState } from 'react'
import useStore from '../../../State Management/Store';
import { useRouter } from 'next/navigation'
import AdminMenu from '@/components/admin-menu';
import Link from 'next/link';
import Head from 'next/head';
import {Spin } from 'antd';

const Hesap = () => {
  const {  api,setSign,sign } = useStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Asenkron fonksiyonumuzu tanımlıyoruz.
    setIsLoading(true);
    
      const checkUser = async () => {
        try {
          // Fetch isteğini await ile asenkron bir şekilde bekliyoruz.
          const response = await fetch(`${api}/api/users/isUser`, {
            method: 'GET',
            credentials: 'include', // Tarayıcının çerezleri göndermesini sağlar.
          });
  
          // İsteğin başarılı olup olmadığını kontrol ediyoruz.
          if (!response.ok) {
            // İstek başarısızsa, hatayı JSON olarak alıp throw kullanarak hata atıyoruz.
            const errData = await response.json();
            throw new Error(errData.error);
          }
  
          const data = await response.json();
  
          // Data ile ilgili işlemler yapabiliriz.
          if (data.message === "no token") {
            setSign("false");
            router.push('/login-owner')
          } else {
            setSign("true");
  
          }
          setIsLoading(false);
  
        } catch (error) {
          // Hataları yakalıyoruz.
          console.error('Hata:', error.message);
          setIsLoading(false);
        }
      };
  
      // Fonksiyonumuzu çağırıyoruz.
      checkUser();
  
    
  }, []);

  if (sign=="false") {
    return null
  }
  else if (isLoading) {
    return (
      <div className=' w-screen h-screen flex flex-row justify-center items-center '>
      <Spin className=' loading-spin z-10' />
    </div>
    )  
  }
  else{
  return (
    <>
    <Head>
      <title>
        Admin - Hesap
      </title>
    </Head>
      <div className=' w-screen h-screen flex flex-row '>
        <AdminMenu/>
        <div className='flex flex-col gap-8 grow h-full py-16 px-24 bg-[#F2F3F5]'>
        <Link href={'/admin/istatistikler'}>tıkla</Link>
        </div>
        
      </div>
    </>

  )
  }
}

export default Hesap