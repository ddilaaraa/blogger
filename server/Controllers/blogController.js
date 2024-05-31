const blogModel = require('../Models/blogModel')


const createBlog = async (req, res) => {
    const { slug, baslik,blog_turu,meta_aciklama,anahtar_kelimeler,one_cikan_gorsel_linki,icerik,one_cikarilma_bilgisi,etiketler,yayinlanma_durumu } = req.body;
    try {
        const blog = await blogModel.createBlog(slug, baslik,blog_turu,meta_aciklama,anahtar_kelimeler,one_cikan_gorsel_linki,icerik,one_cikarilma_bilgisi,etiketler,yayinlanma_durumu);
        res.status(200).json({ mesaj:"kayıt başarıyla oluşturuldu." });
    } catch (error) {
        res.status(400).json({ hata: error.message });
        console.error(error.message);
       
    }
}

const updateBlog = async (req, res) => {
    const { _id,slug, baslik,blog_turu,meta_aciklama,anahtar_kelimeler,one_cikan_gorsel_linki,icerik,one_cikarilma_bilgisi,etiketler,yayinlanma_durumu } = req.body;
    try {
        const blog = await blogModel.updateBlog(_id,slug, baslik,blog_turu,meta_aciklama,anahtar_kelimeler,one_cikan_gorsel_linki,icerik,one_cikarilma_bilgisi,etiketler,yayinlanma_durumu);
        res.status(200).json({ mesaj:"Blog başarıyla güncellendi." });
    } catch (error) {
        res.status(400).json({ hata: error.message });
        console.error(error.message);
       
    }
}

const blogsCount = async (req, res) => {
    try {
        const blogs = await blogModel.blogsCount();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.getAllBlogs();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getByIDBlog = async (req, res) => {
    const { _id} = req.body;
    try {
        const blogs = await blogModel.getByIDBlog(_id);
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBySlugBlog = async (req, res) => {
    const {slug} = req.body;
    try {
        const blogs = await blogModel.getBySlugBlog(slug);
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteBlog = async (req, res) => {
    const {_id} = req.body;
    try {
        const blogs = await blogModel.deleteBlog(_id);
        res.status(200).json({ mesaj:"Blog başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createBlog, blogsCount, getAllBlogs, getByIDBlog, updateBlog,getBySlugBlog,deleteBlog
};


