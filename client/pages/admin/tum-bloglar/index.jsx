"use client"
import React, { useEffect, useState } from 'react'
import useStore from '../../../State Management/Store';
import Head from 'next/head';
import AdminMenu from '@/components/admin-menu';
import { Space, Tag, ConfigProvider, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import trTR from 'antd/lib/locale/tr_TR';
import HayatimdanBloglarModal from '@/components/HayatımdanBloglarModal';
import TeknikBloglarModal from '@/components/TeknikBloglarModal';
import ProjelerModal from '@/components/ProjelerModal';
const DynamicAntTable = dynamic(() => import('antd/lib/table'), {
  ssr: false, // Sunucu tarafı render etmeyi devre dışı bırak
});
import useApi from '../../../api/api';



const TumBloglar = () => {
  const { checkUser,getAllBlogs,deleteBlog } = useApi(); // Custom hook'u kullan


  const { selectedBlogID,setselectedBlogID, sign, setHayatimdanBloglarOpen, setTeknikBloglarOpen, setProjelerOpen,setIsLoading,IsLoading,blogData,setblogData } = useStore();
  const [uniqueTagsWithColors, setUniqueTagsWithColors] = useState({});
  

  //////////KULLANICI SORGULAMA

  useEffect(() => {
    // Asenkron fonksiyonumuzu tanımlıyoruz.
    setIsLoading(true);
    checkUser();
    getAllBlogs();


  }, []);
  ///////////


  /////////////ETİKET FİLTRELEME VE RENKLENDİRME

  useEffect(() => {
    const tags = {};
    const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
    if (blogData) {
      blogData.forEach(item => {
        item.tags.forEach(tag => {
          if (!tags[tag]) {
            tags[tag] = colors[Math.floor(Math.random() * colors.length)];
          }
        });
      });
      setUniqueTagsWithColors(tags);
    }

  }, [blogData]);

  const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']; // Renkler listesi

  blogData.forEach(item => {
    item.tags.forEach(tag => {
      if (!uniqueTagsWithColors[tag]) {
        // Eğer bu tag için bir renk atanmadıysa, rastgele bir renk atayın
        uniqueTagsWithColors[tag] = colors[Math.floor(Math.random() * colors.length)];
      }
    });
  });

  //////////////


  ///////////TABLO FONKSİYONLARI

  //////////BLOG TÜRÜ BULMA & FİLTRELEME FONKSİYONLARI

  const uniqueGenres = blogData.reduce((acc, current) => {
    const genre = current.genre;
    if (!acc.includes(genre)) {
      acc.push(genre);
    }
    return acc;
  }, []);

  // Filtreler için uygun formatı hazırla
  const genreFilters = uniqueGenres.map(genre => ({
    text: genre,
    value: genre,
  }));

  // `genre` alanındaki benzersiz değerleri bul
  const uniqueStates = blogData.reduce((acc, current) => {
    const state = current.state;
    if (!acc.includes(state)) {
      acc.push(state);
    }
    return acc;
  }, []);

  // Filtreler için uygun formatı hazırla
  const stateFilters = uniqueStates.map(state => ({
    text: state,
    value: state,
  }));



  const columns = [
    {
      title: 'Blog Adı',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      fixed: 'left',
      width: 200,
      render: text => <div className='text-[17px]'>{text}</div>
    },
    {
      title: 'Blog Türü',
      dataIndex: 'genre',
      key: 'genre',
      sorter: (a, b) => a.genre.localeCompare(b.genre), // Burada `name` yerine `genre` olmalı
      sortDirections: ['descend', 'ascend'],
      width: 200,
      render: text => <div className='text-[17px]'>{text}</div>,
      filters: genreFilters, // Benzersiz `genre` değerlerini filtre olarak ekle
      onFilter: (value, record) => record.genre === value,
    },
    {
      title: 'Durum',
      dataIndex: 'state',
      key: 'state',
      sorter: (a, b) => a.state.localeCompare(b.state), // Burada `name` yerine `genre` olmalı
      sortDirections: ['descend', 'ascend'],
      width: 200,
      render: text => <div className='text-[17px]'>{text}</div>,
      filters: stateFilters, // Benzersiz `genre` değerlerini filtre olarak ekle
      onFilter: (value, record) => record.state === value,
    },
    {
      title: 'Blog Etiketleri',
      dataIndex: 'tags',
      key: 'tags',
      render: tags => (
        <>
          {tags.map(tag => (
            <Tag className='px-2 py-1 rounded-none text-[15px]' color={uniqueTagsWithColors[tag]} key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
      // Filtreleri etiketlere göre dinamik olarak oluşturma
      filters: Object.keys(uniqueTagsWithColors).map(tag => ({ text: tag, value: tag })),
      onFilter: (value, record) => record.tags.includes(value),
    },
    {
      title: 'Öne Çıkarıldı',
      dataIndex: 'featured',
      key: 'featured',
      render: featured => (featured ? <CheckCircleOutlined style={{ color: 'green', fontSize: '20px' }} /> : null),
      sorter: (a, b) => a.featured - b.featured,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Görüntülenme Sayısı',
      dataIndex: 'views',
      key: 'views',
      sorter: (a, b) => a.views - b.views,
      sortDirections: ['descend', 'ascend'],
      render: text => <div className='text-[17px]'>{text}</div>

    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <Space className='flex flex-row gap-4' size="middle">
          <EditOutlined className='text-blue-500  px-4 py-2 bg-blue-50' style={{ fontSize: '20px' }} onClick={() => {

            setselectedBlogID(record.key);

            if (record.genre === "Hayatımdan Bloglar") {
              setHayatimdanBloglarOpen(true);
              
            } else if (record.genre === "Teknik Bloglar") {
              setTeknikBloglarOpen(true);
              
            } else if (record.genre === "Projeler") {
              setProjelerOpen(true);
              
            }
          }} />
          <DeleteOutlined className='text-red-500  px-4 py-2 bg-red-50' style={{ fontSize: '20px' }} onClick={() => {deleteBlog(record.key)}} />

        </Space>
      ),
      width: 150
    },
  ];


  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  ////////////////

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
      <>
        <Head>
          <title>
            Admin - Tüm Bloglar
          </title>
        </Head>
        <div className=' w-screen h-screen flex flex-row '>
          <AdminMenu />
          <div className='tum-bloglar-page w-full flex flex-col  items-center gap-8 grow h-full py-16 px-24 bg-[#F2F3F5]'>
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
                <h1 className=' font-clash-medium text-[36px]'>Tüm Bloglar</h1>
              </div>
            </div>
            <ConfigProvider locale={trTR}>
              <DynamicAntTable className='tum-bloglar-tablo w-[1200px] max-w-[100%] min-w-[30%] transition-all ' columns={columns} dataSource={blogData} onChange={onChange} pagination={{
                pageSizeOptions: [5, 10, 15, 20],
                defaultPageSize: 5
              }} scroll={{ x: 'max-content' }} />
            </ConfigProvider>
            <HayatimdanBloglarModal selectedBlogID={selectedBlogID} setselectedBlogID={setselectedBlogID} setblogData={setblogData}/>
            <TeknikBloglarModal selectedBlogID={selectedBlogID} setselectedBlogID={setselectedBlogID} setblogData={setblogData}/>
            <ProjelerModal selectedBlogID={selectedBlogID} setselectedBlogID={setselectedBlogID} setblogData={setblogData}/>
          </div>

        </div>
      </>

    )
  }
}

export default TumBloglar