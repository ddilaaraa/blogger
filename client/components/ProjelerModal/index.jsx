import React, { useState, useEffect, useRef, } from 'react';
import { Button, Modal, Form, Input, Checkbox, Space, Tag, theme, Tooltip, notification } from 'antd';
import useStore from '@/State Management/Store';
import { PlusOutlined } from '@ant-design/icons';
import useApi from '../../api/api';
import { useRouter } from 'next/router';

const ProjelerModal = ({selectedBlogID, setselectedBlogID}) => {


    const [form] = Form.useForm();
    const router = useRouter();
    const { getBlogById,createBlog,updateBlog,getAllBlogs } = useApi(); // Custom hook'u kullan


        /////BLOG-EKLE YÖNETİMİ STATE

        const { ProjelerOpen, setProjelerOpen, tags, setTags,keywords,setKeywords,setcreateBlogSlug, setcreateBlogBaslik, setcreateBlogMetaAciklama, setcreateBlogAnahtarKelimeler, setcreateBlogOneCikanGorselLinki, setcreateBlogIcerik, setcreateBlogOneCikarilmaBilgisi, setcreateBlogEtiketler, setcreateBlogYayinlanmaDurumu, setcreateBlogBlogTuru, createBlogSlug, createBlogBaslik, createBlogMetaAciklama, createBlogOneCikanGorselLinki, createBlogIcerik, createBlogOneCikarilmaBilgisi } = useStore();


        ////////////


    // Keywords için State'ler
    const [keywordInputVisible, setKeywordInputVisible] = useState(false);
    const [keywordInputValue, setKeywordInputValue] = useState('');
    const [keywordEditInputIndex, setKeywordEditInputIndex] = useState(-1);
    const [keywordEditInputValue, setKeywordEditInputValue] = useState('');
    const keywordInputRef = useRef(null);
    const keywordEditInputRef = useRef(null);

    useEffect(() => {
        
        if (selectedBlogID && ProjelerOpen) {
            getBlogById(selectedBlogID);
        }
    }, [selectedBlogID]);

    useEffect(() => {
        
        if (!ProjelerOpen) {
            handleCancel();
        }
    }, [ProjelerOpen]);

        ///////API DEN GELEN VERİ İLE FORM ELEMANLARINI GÜNCELLEME
        useEffect(() => {
            form.setFieldsValue({
                slug:createBlogSlug,
              title: createBlogBaslik,
              metaDescription:createBlogMetaAciklama,
              keywords:keywords,
              featuredImage:createBlogOneCikanGorselLinki,
              tags:tags,
              content:createBlogIcerik,
              highlight:createBlogOneCikarilmaBilgisi
            });
          }, [createBlogBaslik]);

    // Input alanlarının focus yönetimi
    useEffect(() => {
        if (keywordInputVisible) {
            keywordInputRef.current?.focus();
        }
    }, [keywordInputVisible]);

    useEffect(() => {
        if (keywordEditInputIndex !== -1) {
            keywordEditInputRef.current?.focus();
        }
    }, [keywordEditInputValue, keywordEditInputIndex]);

    // Bir keyword'ü kaldırma işlemi
    const handleCloseKeyword = (removedKeyword) => {
        const newKeywords = keywords.filter((keyword) => keyword !== removedKeyword);
        setKeywords(newKeywords);
    };

    // Yeni keyword eklemek için input alanını gösterme
    const showKeywordInput = () => {
        setKeywordInputVisible(true);
    };

    // Keyword input değerindeki değişiklikleri işleme
    const handleKeywordInputChange = (e) => {
        setKeywordInputValue(e.target.value);
    };

    // Yeni bir keyword eklemeyi veya mevcut birini düzenlemeyi onaylama
    const handleKeywordInputConfirm = () => {
        if (keywordInputValue && !keywords.includes(keywordInputValue)) {
            setKeywords([...keywords, keywordInputValue]);
        }
        setKeywordInputVisible(false);
        setKeywordInputValue('');
    };

    // Düzenleme input'undaki değişiklikleri işleme
    const handleKeywordEditInputChange = (e) => {
        setKeywordEditInputValue(e.target.value);
    };

    // Bir keyword düzenlemeyi onaylama
    const handleKeywordEditInputConfirm = () => {
        const newKeywords = [...keywords];
        newKeywords[keywordEditInputIndex] = keywordEditInputValue;
        setKeywords(newKeywords);
        setKeywordEditInputIndex(-1);
        setKeywordEditInputValue('');
    };

    // Input ve "Yeni Keyword Ekle" butonu için stil tanımlamaları
    const keywordInputStyle = {
        width: '100px',
        height: '30px',
        marginRight: '8px',
        verticalAlign: 'top',
        fontSize: '16px',
    };
    const addKeywordStyle = {
        height: '30px',
        background: "white",
        borderStyle: 'dashed',
        fontSize: '16px',
    };




 /////ETİKET YÖNETİMİ STATE
 const { token } = theme.useToken();
 const [inputVisible, setInputVisible] = useState(false);
 const [inputValue, setInputValue] = useState('');
 const [editInputIndex, setEditInputIndex] = useState(-1);
 const [editInputValue, setEditInputValue] = useState('');
 const inputRef = useRef(null);
 const editInputRef = useRef(null);
 ////////////

 ///////////ETİKET YÖNETİMİ FONKSİYONLARI

 useEffect(() => {
     if (inputVisible) {
         inputRef.current?.focus();
     }
 }, [inputVisible]);
 useEffect(() => {
     editInputRef.current?.focus();
 }, [editInputValue]);
 const handleClose = (removedTag) => {
     const newTags = tags.filter((tag) => tag !== removedTag);
     console.log(newTags);
     setTags(newTags);
 };
 const showInput = () => {
     setInputVisible(true);
 };
 const handleInputChange = (e) => {
     setInputValue(e.target.value);
 };
 const handleInputConfirm = () => {
     if (inputValue && !tags.includes(inputValue)) {
         setTags([...tags, inputValue]);
     }
     setInputVisible(false);
     setInputValue('');
 };
 const handleEditInputChange = (e) => {
     setEditInputValue(e.target.value);
 };
 const handleEditInputConfirm = () => {
     const newTags = [...tags];
     newTags[editInputIndex] = editInputValue;
     setTags(newTags);
     setEditInputIndex(-1);
     setEditInputValue('');
 };
 const tagInputStyle = {
     width: '100px',
     height: 30,
     marginInlineEnd: 8,
     verticalAlign: 'top',
     fontSize:'16px',
     
 };
 const tagPlusStyle = {
     height: 30,
     background: token.colorBgContainer,
     borderStyle: 'dashed',
     fontSize:'16px'
 };

 /////////////////

 const handleCancel = () => {
    setProjelerOpen(false);
    form.resetFields();
    setTags([]);
    setKeywords([]);
    setcreateBlogSlug("");
    setcreateBlogBaslik("");
    setcreateBlogBlogTuru("");
    setcreateBlogMetaAciklama("");
    setcreateBlogAnahtarKelimeler([]);
    setcreateBlogOneCikanGorselLinki("");
    setcreateBlogIcerik("");
    setcreateBlogOneCikarilmaBilgisi(false);
    setcreateBlogEtiketler([]);
    setcreateBlogYayinlanmaDurumu("");
    if (router.asPath=="/admin/tum-bloglar") {
        setselectedBlogID(null);
        getAllBlogs();
    }
    else if (router.asPath=="/admin") {
        
    }
    
    
};
    

    ///////////FORM SUBMIT FONKSİYONLARI

    useEffect(() => {
        setcreateBlogEtiketler(tags);
    }, [tags])
    useEffect(() => {
        setcreateBlogAnahtarKelimeler(keywords);
    }, [keywords])


    const onFinish = () => {
        if (selectedBlogID) {
            updateBlog();
        }
        else{
            createBlog();
        }
        //console.log(createBlogSlug, createBlogBaslik, createBlogBlogTuru, createBlogMetaAciklama, createBlogAnahtarKelimeler, createBlogOneCikanGorselLinki, createBlogIcerik, createBlogOneCikarilmaBilgisi, createBlogEtiketler, createBlogYayinlanmaDurumu);

        


    };


    /////////////////




  



    return (
        <div>
            <Modal forceRender className="HayatimdanBloglarModal flex !w-full lg:!w-[1000px] flex-col justify-start items-center bg-white h-fit p-0" title={null} closable={false} open={ProjelerOpen} maskClosable={false} footer={null} centered={true} onCancel={handleCancel}>
                <div className='w-[45px] h-[45px] absolute  mt-0 right-0 flex flex-col justify-center items-center bg-[#FAEB37] cursor-pointer text-[25px]' onClick={handleCancel}>X</div>

                <div className='hayatimdan-bloglar-modal-header !w-full h-[72px] flex flex-row justify-between items-center bg-[#EAAF01] p-2'>
                    <div className='w-full h-fit flex flex-row justify-start items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 46.489 46.489">
                            <g id="vuesax-linear-blogger" transform="translate(12 12)">
                                <g id="vuesax-linear-blogger-2" data-name="vuesax-linear-blogger" transform="translate(-12 -12)">
                                    <g id="blogger">
                                        <path id="Vector" d="M25.668,39.489H13.821C3.949,39.489,0,35.54,0,25.668V13.821C0,3.949,3.949,0,13.821,0H25.668C35.54,0,39.489,3.949,39.489,13.821V25.668C39.489,35.54,35.54,39.489,25.668,39.489Z" transform="translate(3.5 3.5)" fill="#faeb37" />
                                        <path id="BG_1" data-name="BG 1" d="M0,0H46.489V46.489H0Z" fill="none" opacity="0.58" />
                                        <path id="Vector-2" data-name="Vector" d="M.03,6.4V19.132A5.629,5.629,0,0,0,6.4,25.5H19.132A5.629,5.629,0,0,0,25.5,19.132V12.765a2.006,2.006,0,0,0-2.122-2.122A2.006,2.006,0,0,1,21.254,8.52V6.4A5.629,5.629,0,0,0,14.887.03H6.4A5.629,5.629,0,0,0,.03,6.4Z" transform="translate(10.48 10.48)" fill="#eaaf01" stroke="#eaaf01" strokeWidth="1.5" />
                                        <path id="Vector-3" data-name="Vector" d="M0,0H3.5" transform="translate(19.541 19.371)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <path id="Vector-4" data-name="Vector" d="M0,0H7" transform="translate(19.745 27.119)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <path id="Vector-5" data-name="Vector" d="M0,0H46.489V46.489H0Z" fill="none" opacity="0" />
                                    </g>
                                </g>
                            </g>
                        </svg>

                        <span className='text-[24px] text-white font-Inter-Medium'>Projelerim</span>
                    </div>

                </div>
                <div className='hayatimdan-bloglar-modal-body !w-full bg-white gap-2 p-2'>
                    <Form
                        form={form}
                        className=' w-full h-fit flex flex-col px-8 py-2 gap-4'
                        name="ProjelerForm"
                        layout="vertical"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 100 }}
                        onFinish={onFinish}

                    >
                        <div className='content-top w-full flex flex-col md:flex-row gap-8'>
                            <div className='content-left w-full'>
                                <Form.Item

                                    label="Slug"
                                    name="slug"
                                    rules={[{ required: true, message: 'Slug boş olamaz!' }]}
                                >
                                    <Input className='h-[30px] rounded-none border-gray-300 shadow-sm' onChange={(e) => setcreateBlogSlug(e.target.value)} />
                                </Form.Item>

                                <Form.Item

                                    label="Başlık"
                                    name="title"
                                    rules={[{ required: true, message: 'Başlık boş olamaz!' }]}
                                >
                                    <Input className='h-[30px] rounded-none border-gray-300 shadow-sm' onChange={(e) => setcreateBlogBaslik(e.target.value)}/>
                                </Form.Item>

                                <Form.Item
                                    label="Meta Açıklama"
                                    name="metaDescription"
                                    rules={[{ required: true, message: 'Meta Açıklama boş olamaz!' }]}
                                >
                                    <Input className='h-[30px] rounded-none border-gray-300 shadow-sm' onChange={(e) => setcreateBlogMetaAciklama(e.target.value)} />
                                </Form.Item>

                                <Form.Item
                                    label="Anahtar Kelimeler"
                                    name="keywords"
                                >
                                     <Space size={[0, 8]} wrap>
                                        {keywords.map((keyword, index) => {
                                            if (keywordEditInputIndex === index) {
                                                return (
                                                    <Input
                                                        ref={keywordEditInputRef}
                                                        key={keyword}
                                                        size="small"
                                                        style={keywordInputStyle}
                                                        value={keywordEditInputValue}
                                                        onChange={handleKeywordEditInputChange}
                                                        onBlur={handleKeywordEditInputConfirm}
                                                        onPressEnter={handleKeywordEditInputConfirm}
                                                    />
                                                );
                                            }
                                            const isLongKeyword = keyword.length > 20;
                                            const keywordElem = (
                                                <Tag
                                                    className='flex flex-row justify-center items-center'
                                                    key={keyword}
                                                    closable={true}
                                                    style={{
                                                        userSelect: 'none',
                                                        fontSize: '16px',
                                                        height: '30px'
                                                    }}
                                                    onClose={() => handleCloseKeyword(keyword)}
                                                >
                                                    <span
                                                        onDoubleClick={(e) => {
                                                            setKeywordEditInputIndex(index);
                                                            setKeywordEditInputValue(keyword);
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        {isLongKeyword ? `${keyword.slice(0, 20)}...` : keyword}
                                                    </span>
                                                </Tag>
                                            );
                                            return isLongKeyword ? (
                                                <Tooltip title={keyword} key={keyword}>
                                                    {keywordElem}
                                                </Tooltip>
                                            ) : (
                                                keywordElem
                                            );
                                        })}
                                        {keywordInputVisible ? (
                                            <Input
                                                ref={keywordInputRef}
                                                type="text"
                                                size="small"
                                                style={keywordInputStyle}
                                                value={keywordInputValue}
                                                onChange={handleKeywordInputChange}
                                                onBlur={handleKeywordInputConfirm}
                                                onPressEnter={handleKeywordInputConfirm}
                                            />
                                        ) : (
                                            <Tag className='flex flex-row justify-center items-center' style={addKeywordStyle} icon={<PlusOutlined />} onClick={showKeywordInput}>
                                                Anahtar Kelime Ekle
                                            </Tag>
                                        )}
                                    </Space>
                                </Form.Item>

                                <Form.Item
                                    className='one-cikan-gorsel'
                                    label="Öne Çıkan Görsel Linki"
                                    name="featuredImage"
                                    rules={[{ required: true, message: 'Öne Çıkan Görsel boş olamaz!' }]}
                                >
                                    <Input className='h-[30px] rounded-none border-gray-300 shadow-sm' onChange={(e) => setcreateBlogOneCikanGorselLinki(e.target.value)}/>
                                </Form.Item>
                                <Form.Item
                                    className='etiketler'
                                    label="Etiketler"
                                    name="tags"
                                >
                                    <Space size={[0, 8]} wrap>
                                        {tags.map((tag, index) => {
                                            if (editInputIndex === index) {
                                                return (
                                                    <Input
                                                        
                                                        ref={editInputRef}
                                                        key={tag}
                                                        size="small"
                                                        style={tagInputStyle}
                                                        value={editInputValue}
                                                        onChange={handleEditInputChange}
                                                        onBlur={handleEditInputConfirm}
                                                        onPressEnter={handleEditInputConfirm}
                                                    />
                                                );
                                            }
                                            const isLongTag = tag.length > 20;
                                            const tagElem = (
                                                <Tag
                                                className='flex flex-row justify-center items-center'
                                                    key={tag}
                                                    closable={true}
                                                    style={{
                                                        userSelect: 'none',
                                                        fontSize:'16px',
                                                        height:'30px'
                                                    }}
                                                    onClose={() => handleClose(tag)}
                                                >
                                                    <span
                                                        onDoubleClick={(e) => {
                                                            if (index !== 0) {
                                                                setEditInputIndex(index);
                                                                setEditInputValue(tag);
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                                    </span>
                                                </Tag>
                                            );
                                            return isLongTag ? (
                                                <Tooltip title={tag} key={tag}>
                                                    {tagElem}
                                                </Tooltip>
                                            ) : (
                                                tagElem
                                            );
                                        })}
                                        {inputVisible ? (
                                            <Input
                                                ref={inputRef}
                                                type="text"
                                                size="small"
                                                style={tagInputStyle}
                                                value={inputValue}
                                                onChange={handleInputChange}
                                                onBlur={handleInputConfirm}
                                                onPressEnter={handleInputConfirm}
                                            />
                                        ) : (
                                            <Tag className='flex flex-row justify-center items-center' style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
                                                Etiket Ekle
                                            </Tag>
                                        )}
                                    </Space>
                                </Form.Item>
                            </div>
                            <div className='content-right w-full'>
                                <Form.Item
                                    name="content"
                                    label="İçerik"
                                    wrapperCol={{ span: 100 }}
                                    rules={[{ required: true, message: 'İçerik boş olamaz!' }]}
                                >
                                    <Input.TextArea className=' rounded-none border-gray-300 shadow-sm' rows={15}  onChange={(e) => setcreateBlogIcerik(e.target.value)}/>
                                </Form.Item>

                                <Form.Item
                                    name="highlight"
                                    valuePropName="checked"
                                    wrapperCol={{ offset: 0, span: 100 }}
                                >
                                    <Checkbox onChange={() => { setcreateBlogOneCikarilmaBilgisi(!createBlogOneCikarilmaBilgisi) }}>Öne Çıkar</Checkbox>
                                </Form.Item>
                            </div>
                        </div>
                        <div className='content-bottom w-full flex flex-row justify-center items-center'>
                            <Form.Item>
                                <Button onClick={() => { setcreateBlogYayinlanmaDurumu("Yayında") }} className='w-fit md:w-[145px] h-[45px] rounded-none bg-[#22C55D] hover:!bg-[#22C55D] text-white hover:!text-white hover:shadow-lg border-none hover:border-none  ' htmlType="submit">
                                    Yayınla
                                </Button>

                            </Form.Item>

                            <Form.Item>
                                <Button onClick={() => { setcreateBlogYayinlanmaDurumu("Taslak") }} className='w-fit md:w-[145px] h-[45px] rounded-none bg-[#EAAF01] hover:!bg-[#EAAF01] text-white hover:!text-white hover:shadow-lg border-none hover:border-none' style={{ margin: '0 8px' }} htmlType="submit">
                                    Taslağı Kaydet
                                </Button>
                            </Form.Item>

                            <Form.Item>
                                <Button onClick={() => { setcreateBlogYayinlanmaDurumu("Arşivde") }} className='w-fit md:w-[145px] h-[45px] rounded-none bg-[#585858] hover:!bg-[#585858] text-white hover:!text-white hover:shadow-lg border-none hover:border-none' htmlType="submit">
                                    Arşive Ekle
                                </Button>
                            </Form.Item>

                            <Form.Item>
                                <Button className='w-fit md:w-[145px] h-[45px] rounded-none bg-[#EF4444] hover:!bg-[#EF4444] text-white hover:!text-white hover:shadow-lg border-none hover:border-none' style={{ margin: '0 8px' }}>
                                    Sil
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>

                </div>
            </Modal>

        </div>



    );
};
export default ProjelerModal;