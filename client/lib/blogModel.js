const mongoose = require('mongoose');
const { Database } = require('./mongodb');

const blogSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    baslik: {
        type: String,
        required: true
    },
    blog_turu: {
        type: String,
        required: true
    },
    meta_aciklama: {
        type: String
    },
    anahtar_kelimeler: [String], 
    one_cikan_gorsel_linki: {
        type: String,
    },
    icerik: {
        type: String,
        required: true
    },
    one_cikarilma_bilgisi: {
        type: Boolean,
        required: true,
        default: false
    },
    etiketler: [String], 
    goruntulenme_sayisi: {
        type: Number,
        required: true,
        default: 0
    },
    yayinlanma_durumu: {
        type: String,
        enum: ['Taslak', 'Yayında','Arşivde'],
        default: 'Yayında'
    }
}, { timestamps: true });


blogSchema.statics.createBlog= async function(slug, baslik,blog_turu,meta_aciklama,anahtar_kelimeler,one_cikan_gorsel_linki,icerik,one_cikarilma_bilgisi,etiketler,yayinlanma_durumu){

    if (!slug||!baslik) {
        throw new Error('alanlar boş geçilemez');
    }

    const kontrolBlogSlug= await this.findOne({slug})
    const kontrolBlogBaslik= await this.findOne({baslik})

    if (kontrolBlogSlug&&kontrolBlogBaslik) {
        throw new Error('Aynı blog adı veya aynı slug zaten mevcut');
    }

    const blog = await this.create({ slug, baslik,blog_turu,meta_aciklama,anahtar_kelimeler,one_cikan_gorsel_linki,icerik,one_cikarilma_bilgisi,etiketler,yayinlanma_durumu });

    return blog;
}

blogSchema.statics.updateBlog = async function(_id, slug, baslik, blog_turu, meta_aciklama, anahtar_kelimeler, one_cikan_gorsel_linki, icerik, one_cikarilma_bilgisi, etiketler, yayinlanma_durumu) {
  if (!_id) {
    throw new Error('_id belirtilmedi');
  }

  const updateData = {
    slug,
    baslik,
    blog_turu,
    meta_aciklama,
    anahtar_kelimeler,
    one_cikan_gorsel_linki,
    icerik,
    one_cikarilma_bilgisi,
    etiketler,
    yayinlanma_durumu
  };

  const updatedBlog = await this.findByIdAndUpdate(_id, updateData, { new: true });

  if (!updatedBlog) {
    throw new Error('Belirtilen _id ile blog bulunamadı veya güncellenemedi');
  }

  return updatedBlog;
};


blogSchema.statics.blogsCount = async function() {

    const istatistikler = await this.aggregate([
        {
          $group: {
            _id: "$blog_turu",
            toplamSayi: { $sum: 1 },
            oneCikarilanSayi: {
              $sum: {
                $cond: [{ $eq: ["$one_cikarilma_bilgisi", true] }, 1, 0]
              }
            },
            yayinDurumlari: {
              $push: {
                yayinlanma_durumu: "$yayinlanma_durumu",
                id: "$_id"
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            blog_turu: "$_id",
            toplamSayi: 1,
            oneCikarilanSayi: 1,
            yayinDurumlari: {
              $reduce: {
                input: "$yayinDurumlari",
                initialValue: { Yayinda: 0, Arsivde: 0, Taslak: 0 },
                in: {
                  $cond: [
                    { $eq: ["$$this.yayinlanma_durumu", "Yayında"] },
                    { Yayinda: { $add: ["$$value.Yayinda", 1] }, Arsivde: "$$value.Arsivde", Taslak: "$$value.Taslak" },
                    {
                      $cond: [
                        { $eq: ["$$this.yayinlanma_durumu", "Arşivde"] },
                        { Yayinda: "$$value.Yayinda", Arsivde: { $add: ["$$value.Arsivde", 1] }, Taslak: "$$value.Taslak" },
                        { Yayinda: "$$value.Yayinda", Arsivde: "$$value.Arsivde", Taslak: { $add: ["$$value.Taslak", 1] } }
                      ]
                    }
                  ]
                }
              }
            }
          }
        }
      ]);
      
    return istatistikler;
    
    
};

blogSchema.statics.getAllBlogs = async function() {

    
        const blogs = await this.find({});
        return blogs;
     
    
    
};

blogSchema.statics.getByIDBlog = async function(_id) {
  if (!_id) {
    throw new Error('_id belirtilmedi');
  }

  // _id'ye göre blogu bul
  const blog = await this.findById(_id);

  if (!blog) {
    throw new Error('Belirtilen _id ile blog bulunamadı');
  }

  return blog;
};


blogSchema.statics.getBySlugBlog = async function(slug) {
  if (!slug) {
    throw new Error('Slug belirtilmedi');
  }

  // slug'a göre blogu bul
  const blog = await this.findOne({ slug: slug });

  if (!blog) {
    throw new Error('Belirtilen slug ile blog bulunamadı');
  }

  return blog;
};



const Blog = Database.model('Blog', blogSchema);

module.exports = Blog;