"use client"
import React, { useEffect, useState } from 'react'
import useStore from '../State Management/Store';
import { useRouter, usePathname } from 'next/navigation'
import { notification } from 'antd'; // Üstteki importlara eklenecek


  

  // Menü öğelerinizi burada tanımlayabilirsiniz, örneğin:

  
const AdminMenu = () => {
  const [menuStyle, setMenuStyle]=useState('left-[-300px]');
  const [exitStyle, setExitStyle]=useState('hidden');


  
  
  const { api,setSign, setEmail, setPassword } = useStore();
  const router = useRouter();

  const logoutUser = async () => {
    try {
      const response = await fetch(`${api}/api/users/logout`, {
        method: 'POST', // veya 'GET', API'nizin tasarımına bağlı
        credentials: 'include', // Çerezleri dahil etmek için
      });
  
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Çıkış işleminde bir hata oluştu.');
      }
      router.push('/login-owner');

      notification.success({
        message: 'Çıkış Yapıldı',
        description: 'Başarıyla çıkış yapıldı.',
        placement: 'top', // Bildirimi ekranın üst kısmında göster
      });
  
      
      setEmail("");
      setPassword("");
      setSign("false");
    } catch (error) {
      notification.error({
        message: 'Çıkış Yapılamadı',
        description: error.message || 'Çıkış yaparken bir hata oluştu.',
        placement: 'top', // Bildirimi ekranın üst kısmında göster
      });
      console.error('Çıkış yapılırken hata:', error);
    }
  };
  const pathname = usePathname();



  const menuItems = [
    { path: '/admin', label: 'Genel' },
    { path: '/admin/tum-bloglar', label: 'Tüm Bloglar' },
    
  ];

const openMenu=()=>{
  setMenuStyle('left-[0px]');
  setExitStyle('block');
}
const closeMenu=()=>{
  setMenuStyle('left-[-300px]');
  setExitStyle('hidden');
}

  return (
    <div className=' z-10'>
    <div onClick={openMenu} className={` cursor-pointer absolute block lg:hidden m-2`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 46.489 46.489">
  <g id="Group_514" data-name="Group 514" transform="translate(-4919.756 -5604.511)">
    <path id="Vector" d="M25.668,39.489H13.821C3.949,39.489,0,35.54,0,25.668V13.821C0,3.949,3.949,0,13.821,0H25.668C35.54,0,39.489,3.949,39.489,13.821V25.668C39.489,35.54,35.54,39.489,25.668,39.489Z" transform="translate(4923.256 5608.011)" fill="#181d19"/>
    <path id="BG_1" data-name="BG 1" d="M0,0H46.489V46.489H0Z" transform="translate(4919.756 5604.511)" fill="none" opacity="0.58"/>
    <path id="Vector-2" data-name="Vector" d="M0,0H46.489V46.489H0Z" transform="translate(4919.756 5604.511)" fill="none" opacity="0"/>
    <line id="Line_44" data-name="Line 44" x2="23" transform="translate(4931.5 5618.5)" fill="none" stroke="#fff" strokeWidth="1"/>
    <line id="Line_45" data-name="Line 45" x2="23" transform="translate(4931.5 5627.755)" fill="none" stroke="#fff" strokeWidth="1"/>
    <line id="Line_46" data-name="Line 46" x2="23" transform="translate(4931.5 5637.011)" fill="none" stroke="#fff" strokeWidth="1"/>
  </g>
</svg>
    </div>
    <div className=' h-full flex flex-row '>
        <div className={`admin-menu w-[300px] h-full bg-[#181D19] absolute lg:relative ${menuStyle} lg:left-[0px] lg:flex flex flex-col justify-between items-center px-8 py-16`}>
          <h1 className=" font-melodrama-medium text-white text-[42px] whitespace-nowrap">Blogger</h1>
          <div className='menu w-full flex flex-col justify-center items-start gap-2'>
          {menuItems.map((item) => (
          <div
            key={item.label}
            className={`menu-item w-full py-4 px-4 hover:bg-[#959595] transition-all duration-300 cursor-pointer font-Inter text-[22px] ${
              pathname === item.path ? 'bg-[#959595]' : 'bg-transparent'
            } text-white`}
            onClick={() => router.push(item.path)}
          >
            {item.label}
          </div>
        ))}
          </div>
          <div onClick={logoutUser} className='admin-logout cursor-pointer flex flex-row justify-center items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
              <g id="vuesax-linear-logout-1" transform="translate(0)">
                <g id="vuesax-linear-logout-1-2" data-name="vuesax-linear-logout-1">
                  <g id="logout">
                    <path id="Vector" d="M12.6,5.07C12.29,1.47,10.44,0,6.39,0H6.26C1.79,0,0,1.79,0,6.26v6.52c0,4.47,1.79,6.26,6.26,6.26h.13c4.02,0,5.87-1.45,6.2-4.99" transform="translate(2.5 3.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path id="Vector-2" data-name="Vector" d="M0,0H11.38" transform="translate(9 12)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path id="Vector-3" data-name="Vector" d="M0,0,3.35,3.35,0,6.7" transform="translate(18.15 8.65)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path id="Vector-4" data-name="Vector" d="M0,24H24V0H0Z" transform="translate(0 0)" fill="none" opacity="0" />
                  </g>
                </g>
              </g>
            </svg>
            <span className=' font-Inter text-[22px] text-white' >Çıkış Yap</span>

          </div>

        </div>
        <div onClick={closeMenu} className={` cursor-pointer text-[36px] ${exitStyle} absolute lg:hidden left-[320px]`}>X</div>
        </div>
        </div>
  )
}

export default AdminMenu