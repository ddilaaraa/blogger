"use client"
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Modal } from 'antd';

const Anasayfa = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Container'ın boyutlarını canvas'a uygula
    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    const lines = Array(8).fill().map(() => ({ x: Math.random() * width, dx: (Math.random() - 0.5) * 3 }));

    const drawLine = (line) => {
      ctx.beginPath();
      ctx.moveTo(line.x, 0);
      ctx.lineTo(line.x, height);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'; // %50 opaklıkta siyah
      ctx.lineWidth = 0.9;
      ctx.stroke();
    };

    const updateLine = (line) => {
      line.x += line.dx;
      if (line.x > width || line.x < 0) {
        line.dx *= -1;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      lines.forEach(line => {
        drawLine(line);
        updateLine(line);
      });
      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  const showModal = () => {
    Modal.info({
      title: <p className='text-[25px] font-clash-regular'>Bilgi</p>,
      content: (
        <div className='text-[25px] font-clash-regular'>
          <p>Bu alan yakında eklenecektir.</p>
        </div>
      ),
      maskClosable: true, // Modal dışına tıklanıldığında kapanır
      centered: true, // Modal'ı ekranın tam ortasında gösterir
      footer: null, // Modal'ın altında hiçbir buton gösterilmez
      width: 700,
      
    });
  };

  return (
    <div ref={containerRef} className='w-full h-full  relative'>
      <canvas ref={canvasRef} className='absolute top-0 left-0 w-full h-full' />
      {/* Üzerine yerleştirmek istediğin HTML elementleri buraya ekle */}
      <div className='primary-menu p-[36px] md:p-[48px] lg:p-[64px] xl:p-[96px] top-0  left-0 w-full h-full flex flex-wrap justify-center items-center gap-[64px] '>

        
        
        <div className='lg:w-fit w-[280px]  h-fit '>
          <h1 className=' font-clash-semibold text-[35px] lg:text-[38px] xl:text-[42px]  highlighted'>Bloglarımız</h1>
          <hr className=' h-2 border-transparent' />
          <Link className='' href={{ pathname: '/teknik-bloglarim' }}>
            <h2 className=' underline text-[25px]  '>Blog Sayfası</h2>
          </Link>
          
        </div>
        

      </div>
      <footer className='w-full bg-transparent relative lg:absolute lg:bottom-0 px-12 py-8'>
        <div className=" flex flex-col md:flex-row lg:flex-row justify-between sm:items-center">
          <h6 className='font-clash-regular text-center text-[25px]'>©2024 Blogger.</h6>
          <a href="mailto:contact@bloger.com"><h6 className='font-clash-regular text-center  text-[25px]'>contact@blogger.com</h6></a>

        </div>
      </footer>
    </div>
    
  );
};

export default Anasayfa;
