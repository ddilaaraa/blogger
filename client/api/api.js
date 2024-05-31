import React from 'react'
import useStore from '../State Management/Store';
import { notification } from 'antd';
import { useRouter } from 'next/navigation'


export default function useApi() {
    const { setteknikBloglar,setProjelerOpen,setTeknikBloglarOpen,setHayatimdanBloglarOpen,selectedBlogID,setTags, setKeywords, setblogData, setIsLoading, setSign, api, setcreateBlogSlug, setcreateBlogBaslik, setcreateBlogMetaAciklama, setcreateBlogAnahtarKelimeler, setcreateBlogOneCikanGorselLinki, setcreateBlogIcerik, setcreateBlogOneCikarilmaBilgisi, setcreateBlogEtiketler, setcreateBlogBlogTuru, createBlogSlug, createBlogBaslik, createBlogBlogTuru, createBlogMetaAciklama, createBlogAnahtarKelimeler, createBlogOneCikanGorselLinki, createBlogIcerik, createBlogOneCikarilmaBilgisi, createBlogEtiketler, createBlogYayinlanmaDurumu, sethayatimdanBloglar,setprojeler } = useStore();
    const router = useRouter();
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
            if (data.message === "no token" || data.message ==="Lütfen tekrar giriş yapın" ) {
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
            router.push('/login-owner')
        }
    };

    //////////TÜM BLOGLARI GETİREN API
    async function getAllBlogs() {
        try {
            const response = await fetch(`${api}/api/blogs/getAll`, {
                method: 'POST',
                credentials: 'include', // Tarayıcının çerezleri göndermesini sağlar.
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error);
            }
            const rawData = await response.json(); // API'den gelen veriyi JSON olarak al

            // API'den gelen veriyi tablonun beklediği formata dönüştür
            const formattedData = rawData.map((item, index) => ({
                key: item._id,
                slug:item.slug,
                name: item.baslik,
                genre: item.blog_turu,
                state: item.yayinlanma_durumu,
                tags: item.etiketler,
                featured: item.one_cikarilma_bilgisi,
                views: item.goruntulenme_sayisi,
                content:item.icerik,
                featuredImage:item.one_cikan_gorsel_linki
            }));
     
            setblogData(formattedData);
            


        } catch (error) {
            console.error('Veri çekme işlemi sırasında bir hata oluştu:', error);
        }
    }

    //////////

    //////////ID YE GÖRE BLOG GETİREN FONKSİYON
    async function getBlogById(blogId) {
        const url = {};
        const data = {
            _id: blogId
        };

        try {
            const response = await fetch(`${api}/api/blogs/getByID`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Blog getirme işlemi başarısız.');
            }

            const blog = await response.json();
            
            setcreateBlogSlug(blog.slug);
            setcreateBlogBaslik(blog.baslik);
            setcreateBlogBlogTuru(blog.blog_turu);
            setcreateBlogMetaAciklama(blog.meta_aciklama);
            setcreateBlogAnahtarKelimeler(blog.anahtar_kelimeler);
            setKeywords(blog.anahtar_kelimeler);
            setcreateBlogOneCikanGorselLinki(blog.one_cikan_gorsel_linki);
            setcreateBlogIcerik(blog.icerik);
            setcreateBlogOneCikarilmaBilgisi(blog.one_cikarilma_bilgisi);
            setcreateBlogEtiketler(blog.etiketler);
            setTags(blog.etiketler);




            // Blog verisini işleme veya kullanıcıya gösterme işlemleri burada yapılabilir.
        } catch (error) {
            console.error('Blog getirilirken bir hata oluştu:', error);
        }
    }

    //////////

    //////////SLUG'A GÖRE BLOG GETİREN FONKSİYON
async function getBlogBySlug(blogSlug) {
    const url = 'http://localhost:8080/api/blogs/getBySlug';
    const data = {
        slug: blogSlug
    };

    try {
        const response = await fetch(`${api}/api/blogs/getBySlug`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Blog getirme işlemi başarısız.');
        }

        const blog = await response.json();
      
        setcreateBlogSlug(blog.slug);
        setcreateBlogBaslik(blog.baslik);
        setcreateBlogBlogTuru(blog.blog_turu);
        setcreateBlogMetaAciklama(blog.meta_aciklama);
        setcreateBlogAnahtarKelimeler(blog.anahtar_kelimeler);
        setKeywords(blog.anahtar_kelimeler);
        setcreateBlogOneCikanGorselLinki(blog.one_cikan_gorsel_linki);
        setcreateBlogIcerik(blog.icerik);
        setcreateBlogOneCikarilmaBilgisi(blog.one_cikarilma_bilgisi);
        setcreateBlogEtiketler(blog.etiketler);
        setTags(blog.etiketler);

        // Blog verisini işleme veya kullanıcıya gösterme işlemleri burada yapılabilir.
    } catch (error) {
        console.error('Blog getirilirken bir hata oluştu:', error);
    }
}



    ///////////BLOG KAYIT APİ İSTEĞİ

    async function createBlog() {
        const url = 'http://localhost:8080/api/blogs/create';
        const blogData = {
            slug: createBlogSlug,
            baslik: createBlogBaslik,
            blog_turu: createBlogBlogTuru,
            meta_aciklama: createBlogMetaAciklama,
            anahtar_kelimeler: createBlogAnahtarKelimeler,
            one_cikan_gorsel_linki: createBlogOneCikanGorselLinki,
            icerik: createBlogIcerik,
            one_cikarilma_bilgisi: createBlogOneCikarilmaBilgisi,
            etiketler: createBlogEtiketler,
            yayinlanma_durumu: createBlogYayinlanmaDurumu
        };

        try {
            const response = await fetch(`${api}/api/blogs/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blogData)
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.hata);
            }

            const result = await response.json();
            setHayatimdanBloglarOpen(false);
            setTeknikBloglarOpen(false);
            setProjelerOpen(false);
            notification.success({
                message: 'Başarılı!',
                description: `${result.mesaj} "${createBlogYayinlanmaDurumu}"`,
                duration: 4.5,
            });

            

        } catch (error) {
            console.error(error.message);
            notification.error({
                message: 'Hata!',
                description: `${error.message}`,
                duration: 4.5,
            });
        }
    }

    ////////////

    ///////////BLOG GÜNCELLEME API İSTEĞİ

    async function updateBlog() {
        const url = 'http://localhost:8080/api/blogs/update';
        const blogData = {
            _id:selectedBlogID,
            slug: createBlogSlug,
            baslik: createBlogBaslik,
            blog_turu: createBlogBlogTuru,
            meta_aciklama: createBlogMetaAciklama,
            anahtar_kelimeler: createBlogAnahtarKelimeler,
            one_cikan_gorsel_linki: createBlogOneCikanGorselLinki,
            icerik: createBlogIcerik,
            one_cikarilma_bilgisi: createBlogOneCikarilmaBilgisi,
            etiketler: createBlogEtiketler,
            yayinlanma_durumu: createBlogYayinlanmaDurumu
        };

        try {
            const response = await fetch(`${api}/api/blogs/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blogData)
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.hata);
            }

            const result = await response.json();
            setHayatimdanBloglarOpen(false);
            setTeknikBloglarOpen(false);
            setProjelerOpen(false);
            notification.success({
                message: 'Başarılı!',
                description: `${result.mesaj} "${createBlogYayinlanmaDurumu}"`,
                duration: 4.5,
            });

            

        } catch (error) {
            console.error(error.message);
            notification.error({
                message: 'Hata!',
                description: `${error.message}`,
                duration: 4.5,
            });
        }
    }

    ////////////


      //////////BLOG COUNT GETİREN FONKSİYON
  async function getBlogCount() {


    try {
      const response = await fetch(`${api}/api/blogs/getCount`, {
        method: 'POST',
        credentials: 'include', // Tarayıcının çerezleri göndermesini sağlar.
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error);
      }
      const data = await response.json(); // API'den gelen veriyi JSON olarak al


      // Veriyi işle ve değişkenlere ata
       setteknikBloglar(data.find(blog => blog.blog_turu === 'Teknik Bloglar'));
       sethayatimdanBloglar(data.find(blog => blog.blog_turu === 'Hayatımdan Bloglar'));
       setprojeler(data.find(blog => blog.blog_turu === 'Projeler'));

      

    } catch (error) {
      console.error('Veri çekme işlemi sırasında bir hata oluştu:', error);
    }
  }

  //////////



  async function deleteBlog(blogId) {
    const data = {
        _id: blogId
    };

    try {
        const response = await fetch(`${api}/api/blogs/delete`, {
            method: 'POST', // HTTP metodu DELETE olarak güncellendi
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.hata);
        }

        // Başarılı bir şekilde silme işlemi yapıldıktan sonra geri dönüş
        const result = await response.json();
        notification.success({
            message: 'Başarılı!',
            description: `${result.mesaj}`,
            duration: 4.5,
        });
        getAllBlogs();
        // Burada, blog silindikten sonra yapılacak işlemleri ekleyebilirsin.
        // Örneğin, kullanıcı arayüzünü güncellemek, kullanıcıya bir bildirim göndermek vs.
    } catch (error) {
        console.error(error.message);
            notification.error({
                message: 'Hata!',
                description: `${error.message}`,
                duration: 4.5,
            });
    }
}



    return { checkUser, getAllBlogs, getBlogById, createBlog,updateBlog,getBlogCount,getBlogBySlug,deleteBlog };
}
