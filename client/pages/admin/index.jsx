"use client"
import React, { useEffect } from 'react'
import useStore from '../../State Management/Store';
import AdminMenu from '@/components/admin-menu';
import Head from 'next/head';
import { Button, Dropdown, Spin } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import HayatimdanBloglarModal from '@/components/HayatımdanBloglarModal';
import TeknikBloglarModal from '@/components/TeknikBloglarModal';
import ProjelerModal from '@/components/ProjelerModal';
import useApi from '../../api/api';

const AdminPanel = () => {

  const { IsLoading, sign, setProjelerOpen, setTeknikBloglarOpen, setHayatimdanBloglarOpen, setcreateBlogBlogTuru,hayatimdanBloglar,teknikBloglar,projeler } = useStore();
  const { checkUser,getBlogCount } = useApi(); // Custom hook'u kullan


  useEffect(() => {
    checkUser();
    getBlogCount();
  }, []);


  const items = [
    
    {
      key: '2',
      label: (
        <div onClick={() => { setTeknikBloglarOpen(true); setcreateBlogBlogTuru("Teknik Bloglar"); }} className='w-full text-[18px] w-full '>

          Blog

        </div>
      ),
    },
    
  ];

  if (sign == "false") {
    return null
  }
  else if (IsLoading) {
    return (
      <div className=' w-screen h-screen flex flex-row justify-center items-center '>
        <Spin className=' loading-spin z-10' />
      </div>
    )
  }
  else {
    return (
      <div className='admin bg-[#F2F3F5]'>
        <Head>
          <title>
            Admin
          </title>
        </Head>
        <div className=' w-screen h-screen flex flex-row '>
          <HayatimdanBloglarModal />
          <TeknikBloglarModal />
          <ProjelerModal />
          <AdminMenu />
          <div className='flex flex-col gap-8 grow h-fit py-16 px-24 bg-[#F2F3F5]'>
            <div className='admin-genel-top w-full flex flex-row justify-between items-center'>
              <div className='flex flex-row items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 46.489 46.489">
                  <g id="vuesax-linear-blogger" transform="translate(12 12)">
                    <g id="vuesax-linear-blogger-2" data-name="vuesax-linear-blogger" transform="translate(-12 -12)">
                      <g id="blogger">
                        <path id="Vector" d="M25.668,39.489H13.821C3.949,39.489,0,35.54,0,25.668V13.821C0,3.949,3.949,0,13.821,0H25.668C35.54,0,39.489,3.949,39.489,13.821V25.668C39.489,35.54,35.54,39.489,25.668,39.489Z" transform="translate(3.5 3.5)" fill="#181d19" />
                        <path id="BG_1" data-name="BG 1" d="M0,0H46.489V46.489H0Z" fill="none" opacity="0.58" />
                        <path id="Vector-2" data-name="Vector" d="M.03,6.4V19.132A5.629,5.629,0,0,0,6.4,25.5H19.132A5.629,5.629,0,0,0,25.5,19.132V12.765a2.006,2.006,0,0,0-2.122-2.122A2.006,2.006,0,0,1,21.254,8.52V6.4A5.629,5.629,0,0,0,14.887.03H6.4A5.629,5.629,0,0,0,.03,6.4Z" transform="translate(10.48 10.48)" fill="#fff" stroke="#fff" strokeWidth="1.5" />
                        <path id="Vector-3" data-name="Vector" d="M0,0H3.5" transform="translate(19.541 19.371)" fill="none" stroke="#181d19" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <path id="Vector-4" data-name="Vector" d="M0,0H7" transform="translate(19.745 27.119)" fill="none" stroke="#181d19" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <path id="Vector-5" data-name="Vector" d="M0,0H46.489V46.489H0Z" fill="none" opacity="0" />
                      </g>
                    </g>
                  </g>
                </svg>
                <h1 className=' font-clash-medium text-[36px]'>Blog</h1>
              </div>
              <Button htmlType="submit" className="login-form-button w-[150px] h-[45px] flex flex-row justify-center items-center gap-2 rounded-none ">
                <span className="button-content font-Inter-Medium text-[18px]">Siteye Git</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 18.263 18.263">
                  <g id="Group_442" data-name="Group 442" transform="translate(-1263.25 -66.369)">
                    <g id="Group_453" data-name="Group 453">
                      <g id="Group_454" data-name="Group 454">
                        <path id="Vector" d="M0,6.873,6.873,0" transform="translate(1273.22 67.789)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path id="Vector-2" data-name="Vector" d="M4.023,4.023V0H0" transform="translate(1276.739 67.119)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                      <path id="Vector-3" data-name="Vector" d="M7.543,0H5.867C1.676,0,0,1.676,0,5.867V10.9c0,4.191,1.676,5.867,5.867,5.867H10.9c4.191,0,5.867-1.676,5.867-5.867V9.219" transform="translate(1264 67.119)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                  </g>
                </svg>
              </Button>
            </div>
            <div className="admin-genel-middle grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-4 w-full">
              
              <div className='w-full max-h-[250px] flex flex-col bg-white p-4 gap-4'>
                <div className='flex flex-row justify-start items-center gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 46.489 46.489">
                    <g id="Group_487" data-name="Group 487" transform="translate(-317 -148)">
                      <g id="vuesax-linear-blogger" transform="translate(329 160)">
                        <g id="vuesax-linear-blogger-2" data-name="vuesax-linear-blogger" transform="translate(-12 -12)">
                          <g id="blogger">
                            <path id="Vector" d="M25.668,39.489H13.821C3.949,39.489,0,35.54,0,25.668V13.821C0,3.949,3.949,0,13.821,0H25.668C35.54,0,39.489,3.949,39.489,13.821V25.668C39.489,35.54,35.54,39.489,25.668,39.489Z" transform="translate(3.5 3.5)" fill="#f2d6ff" />
                            <path id="BG_1" data-name="BG 1" d="M0,0H46.489V46.489H0Z" fill="none" opacity="0.58" />
                            <path id="Vector-2" data-name="Vector" d="M0,0H46.489V46.489H0Z" fill="none" opacity="0" />
                          </g>
                        </g>
                      </g>
                      <path id="Vector-3" data-name="Vector" d="M.032,6.639V19.854a5.841,5.841,0,0,0,6.607,6.607H19.854a5.841,5.841,0,0,0,6.607-6.607V13.247a2.081,2.081,0,0,0-2.2-2.2,2.081,2.081,0,0,1-2.2-2.2v-2.2A5.841,5.841,0,0,0,15.449.032H6.639A5.841,5.841,0,0,0,.032,6.639Z" transform="translate(326.998 158.48)" fill="#bd3cff" stroke="#bd3cff" strokeWidth="1.5" />
                      <text className=' font-Inter-Medium text-[13px]' id="_8" data-name="8" transform="translate(330 181)" fill="#fff"   ><tspan x="0" y="0">{teknikBloglar ? teknikBloglar.toplamSayi:"0"}</tspan></text>
                    </g>
                  </svg>
                  <span className='text-[24px] font-Inter-Medium'>Bloglar</span>
                </div>
                <div className='w-full grid grid-cols-2 gap-3'>
                  <div className='h-[40px] w-full bg-red-50 text-red-500 flex flex-col justify-center items-center'>{teknikBloglar ? teknikBloglar.yayinDurumlari.Yayinda:"0"} Yayında</div>
                  <div className='h-[40px] w-full bg-green-50 text-green-500 flex flex-col justify-center items-center'>{teknikBloglar ? teknikBloglar.oneCikarilanSayi:"0"} Öne Çıkarılan</div>
                  <div className='h-[40px] w-full bg-orange-50 text-orange-500 flex flex-col justify-center items-center'>{teknikBloglar ? teknikBloglar.yayinDurumlari.Taslak:"0"} Taslak</div>
                  <div className='h-[40px] w-full bg-blue-50 text-blue-500 flex flex-col justify-center items-center'>{teknikBloglar ? teknikBloglar.yayinDurumlari.Arsivde:"0"} Arşiv</div>
                </div>
              </div>
              
            </div>
            
           
            <div id='admin-dropdown-container' className='admin-genel-top w-full flex flex-row justify-end items-center'>
              <Dropdown menu={{ items }} placement="top" getPopupContainer={() => document.getElementById('admin-dropdown-container')}>
                <Button className="login-form-button w-[150px] h-[45px] font-Inter-Medium  text-[18px] flex flex-row justify-center items-center gap-2 rounded-none ">   Ekle
                  <UpOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>

        </div>

      </div>

    )
  }


}

export default AdminPanel