"use client"
import React, { useEffect, useState } from 'react'
import useStore from '../State Management/Store';
import { useRouter } from 'next/navigation'
import resim from '../public/media/blog.png'
import Image from 'next/image';
import { Form, Input, Button, notification, Spin } from 'antd';
import Head from 'next/head';


const loginOwner = () => {
  const { api} = useStore();

  const [isLoading, setIsLoading] = useState(true);
  const {sign, setSign, email, setEmail, password, setPassword } = useStore();
  const router = useRouter();


  useEffect(() => {
    // Asenkron fonksiyonumuzu tanımlıyoruz.
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
        } else {
          setSign("true");
          router.push('/admin');
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
    console.log("hoşgeldin kral reis abimiz. dünkü yanlışlık için kusurumuza bakma :)")
  }, []);


  
    const loginUser = async () => {
      const userData = {
        email: email,
        password: password
      };
    
      try {
        const response = await fetch(`${api}/api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Çerezleri dahil et
          body: JSON.stringify(userData)
        });
    
        if (!response.ok) {
          // Response ok değilse, yanıtın JSON olup olmadığını kontrol et ve bir hata fırlat
          const errData = await response.json();
          throw new Error(errData.message || 'Beklenmeyen bir hata oluştu'); // Hata mesajı atıldı
          
        }
        
        const data = await response.json();
        setSign("true"); 
        router.push('/admin');
        // login başarılı olduğunda bildirim göster
        notification.success({
          message: 'Giriş Başarılı',
          description: 'Başarıyla giriş yaptınız.',
          placement: 'top',
        });
        
        
      } catch (error) {
        // Hata durumunda bildirim göster
        notification.error({
          message: 'Giriş Başarısız',
          description: error.message || 'Giriş yaparken bir hata oluştu.',
          placement: 'top',
        });
        
        console.error('Login sırasında hata:', error.message || error);
      }
    };
  
    if (sign=="true") {
      return null
    }
    else if (isLoading) {
      return (
        <div className=' w-screen h-screen flex flex-row justify-center items-center '>
        <Spin className=' loading-spin z-10' />
      </div>
      )  
    }
  return (
    <>
    <Head>
      <title>Hoşgeldin Blogger</title>
    </Head>
    <div className='w-screen h-screen bg-[#F2F3F5] flex flex-col items-center justify-center'>
      <div className='w-fit h-fit flex flex-col items-center gap-[12px]'>
      <Image className='header-profile-photo rounded-[8px]  ' src={resim} width={128} height={128} alt="Picture of the author"/>
      <h1 className=" site-big-title font-melodrama-medium text-[72px] whitespace-nowrap">Blogger</h1>
      <p className=" site-big-title font-clash-regular text-[32px] whitespace-nowrap">Hoşgeldiniz</p>
      <Form onFinish={loginUser} className="login-form flex flex-col justify-center items-center gap-[6px]">
        <Form.Item key={"1"}
          name="email"
          rules={[{ required: true, message: 'Lütfen e-posta adresinizi girin!' }]}
        >
          <Input
          prefix={
          <svg id="Group_432" data-name="Group 432" xmlns="http://www.w3.org/2000/svg" width="37.278" height="37.278" viewBox="0 0 37.278 37.278">
          <g id="vuesax-linear-blogger">
            <g id="vuesax-linear-blogger-2" data-name="vuesax-linear-blogger">
              <g id="blogger">
                <path id="Vector" d="M20.582,31.665h-9.5C3.166,31.665,0,28.5,0,20.582v-9.5C0,3.166,3.166,0,11.083,0h9.5C28.5,0,31.665,3.166,31.665,11.083v9.5C31.665,28.5,28.5,31.665,20.582,31.665Z" transform="translate(2.807 2.807)" fill="#befaa0"/>
                <path id="BG_1" data-name="BG 1" d="M0,0H37.278V37.278H0Z" fill="none" opacity="0.58"/>
                <path id="Vector-2" data-name="Vector" d="M0,0H37.278V37.278H0Z" fill="none" opacity="0"/>
              </g>
            </g>
          </g>
          <g id="vuesax-linear-user-square" transform="translate(17.627 17.628)">
            <g id="vuesax-linear-user-square-2" data-name="vuesax-linear-user-square" transform="translate(-12 -12)">
              <g id="user-square">
                <path id="Vector-3" data-name="Vector" d="M14.3,4.65a15.022,15.022,0,0,1-3.657.38H3.657A15.022,15.022,0,0,1,0,4.65C.256,2.05,3.366,0,7.151,0S14.046,2.05,14.3,4.65Z" transform="translate(5.86 18.992)" fill="#fff" stroke="#22c55d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                <path id="Vector-4" data-name="Vector" d="M14.315,0H7.708C2.2,0,0,2.206,0,7.722V14.34c0,4.17,1.255,6.453,4.25,7.3.242-2.868,3.182-5.129,6.761-5.129s6.519,2.261,6.761,5.129c3-.849,4.25-3.133,4.25-7.3V7.722C22.022,2.206,19.82,0,14.315,0Zm-3.3,13.425a3.955,3.955,0,1,1,3.942-3.96A3.951,3.951,0,0,1,11.011,13.425Z" transform="translate(2 2)" fill="#22c55d" stroke="#22c55d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                <path id="Vector-5" data-name="Vector" d="M7.16,3.58A3.58,3.58,0,1,1,3.58,0,3.58,3.58,0,0,1,7.16,3.58Z" transform="translate(9.431 7.841)" fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                <path id="Vector-6" data-name="Vector" d="M0,0H26.022V26.022H0Z" fill="none" opacity="0"/>
              </g>
            </g>
          </g>
        </svg>
        }
          className='login-email-input w-[275px] h-[45px] rounded-none'
            type="email"
            placeholder="E-posta"
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </Form.Item>
        <Form.Item key={"2"}
          name="password"
          rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
        >
          <Input
          prefix={
          <svg xmlns="http://www.w3.org/2000/svg" width="37.278" height="37.278" viewBox="0 0 37.278 37.278">
          <g id="Group_513" data-name="Group 513" transform="translate(-442.361 -411)">
            <g id="Group_432" data-name="Group 432" transform="translate(442.361 411)">
              <g id="vuesax-linear-blogger">
                <g id="vuesax-linear-blogger-2" data-name="vuesax-linear-blogger">
                  <g id="blogger">
                    <path id="Vector" d="M20.582,31.665h-9.5C3.166,31.665,0,28.5,0,20.582v-9.5C0,3.166,3.166,0,11.083,0h9.5C28.5,0,31.665,3.166,31.665,11.083v9.5C31.665,28.5,28.5,31.665,20.582,31.665Z" transform="translate(2.807 2.807)" fill="#fecaca"/>
                    <path id="BG_1" data-name="BG 1" d="M0,0H37.278V37.278H0Z" fill="none" opacity="0.58"/>
                    <path id="Vector-2" data-name="Vector" d="M0,0H37.278V37.278H0Z" fill="none" opacity="0"/>
                  </g>
                </g>
              </g>
              <g id="vuesax-linear-user-square" transform="translate(17.627 17.628)">
                <g id="vuesax-linear-user-square-2" data-name="vuesax-linear-user-square" transform="translate(-12 -12)">
                  <g id="user-square">
                    <path id="Vector-3" data-name="Vector" d="M14.3,4.65a15.022,15.022,0,0,1-3.657.38H3.657A15.022,15.022,0,0,1,0,4.65C.256,2.05,3.366,0,7.151,0S14.046,2.05,14.3,4.65Z" transform="translate(5.86 18.992)" fill="#ef4444" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                    <path id="Vector-4" data-name="Vector" d="M14.315,0H7.708C2.2,0,0,2.206,0,7.722V14.34c0,4.17,1.255,6.453,4.25,7.3.242-2.868,3.182-5.129,6.761-5.129s6.519,2.261,6.761,5.129c3-.849,4.25-3.133,4.25-7.3V7.722C22.022,2.206,19.82,0,14.315,0Zm-3.3,13.425a3.955,3.955,0,1,1,3.942-3.96A3.951,3.951,0,0,1,11.011,13.425Z" transform="translate(2 2)" fill="#ef4444" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                    <path id="Vector-5" data-name="Vector" d="M7.16,3.58A3.58,3.58,0,1,1,3.58,0,3.58,3.58,0,0,1,7.16,3.58Z" transform="translate(9.431 7.841)" fill="#ef4444" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                    <path id="Vector-6" data-name="Vector" d="M0,0H26.022V26.022H0Z" fill="none" opacity="0"/>
                  </g>
                </g>
              </g>
            </g>
            <path id="Vector-7" data-name="Vector" d="M10.452,7.589a4.449,4.449,0,0,1-4.463,1.1l-2.766,2.76a1.136,1.136,0,0,1-.875.288l-1.28-.176a1.109,1.109,0,0,1-.881-.881L.01,9.4A1.183,1.183,0,0,1,.3,8.521l2.76-2.76a4.446,4.446,0,1,1,7.394,1.826Z" transform="translate(455.123 423.771)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path id="Vector-8" data-name="Vector" d="M0,0,1.351,1.351" transform="translate(457.999 432.863)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
            <path id="Vector-9" data-name="Vector" d="M1.762.881A.881.881,0,1,1,.881,0a.881.881,0,0,1,.881.881Z" transform="translate(461.587 427.29)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
          </g>
        </svg>
        }
          className='w-[275px] h-[45px] rounded-none'
            type="password"
            placeholder="Şifre"
            onChange={(e) => setPassword(e.target.value)}
            
          />
        </Form.Item>
        <Form.Item key={"3"}>
          <Button htmlType="submit" className="login-form-button w-[150px] h-[45px] rounded-none ">
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
    </>
  )
}

export default loginOwner