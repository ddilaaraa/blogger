import {create} from 'zustand';

const useStore = create((set) => ({
  //////// GENEL STATE
  sign: "false",
  email: "",
  password: "",
  HayatimdanBloglarOpen:false,
  TeknikBloglarOpen:false,
  ProjelerOpen:false,
  api:'http://localhost:8080',
  IsLoading:true,
  blogData: [],
  keywords: [],
  tags: [],
  selectedBlogID:"",
  verifyModalopen:false,
  hayatimdanBloglar:"",
  teknikBloglar:"",
  projeler:"",

  setSign: (sign) => set(() => ({ sign })),
  setEmail: (email) => set(() => ({ email })),
  setPassword: (password) => set(() => ({ password })),
  setHayatimdanBloglarOpen: (HayatimdanBloglarOpen) => set(() => ({ HayatimdanBloglarOpen })),
  setTeknikBloglarOpen: (TeknikBloglarOpen) => set(() => ({ TeknikBloglarOpen })),
  setProjelerOpen: (ProjelerOpen) => set(() => ({ ProjelerOpen })),
  setIsLoading: (IsLoading) => set(() => ({ IsLoading })),
  setblogData: (blogData) => set(() => ({ blogData })),
  setKeywords: (keywords) => set(() => ({ keywords })),
  setTags: (tags) => set(() => ({ tags })),
  setselectedBlogID: (selectedBlogID) => set(() => ({ selectedBlogID })),
  setverifyModalopen: (verifyModalopen) => set(() => ({ verifyModalopen })),
  sethayatimdanBloglar: (hayatimdanBloglar) => set(() => ({ hayatimdanBloglar })),
  setteknikBloglar: (teknikBloglar) => set(() => ({ teknikBloglar })),
  setprojeler: (projeler) => set(() => ({ projeler })),
  //////////




  ///////BLOG-CREATE STATE
  createBlogSlug: "",
  createBlogBaslik: "",
  createBlogBlogTuru: "",
  createBlogMetaAciklama: "",
  createBlogAnahtarKelimeler: [],
  createBlogOneCikanGorselLinki: "",
  createBlogIcerik: "",
  createBlogOneCikarilmaBilgisi: false,
  createBlogEtiketler:[],
  createBlogYayinlanmaDurumu: "",
  
  setcreateBlogSlug: (createBlogSlug) => set(() => ({ createBlogSlug })),
  setcreateBlogBaslik: (createBlogBaslik) => set(() => ({ createBlogBaslik })),
  setcreateBlogBlogTuru: (createBlogBlogTuru) => set(() => ({ createBlogBlogTuru })),
  setcreateBlogMetaAciklama: (createBlogMetaAciklama) => set(() => ({ createBlogMetaAciklama })),
  setcreateBlogAnahtarKelimeler: (createBlogAnahtarKelimeler) => set(() => ({ createBlogAnahtarKelimeler })),
  setcreateBlogOneCikanGorselLinki: (createBlogOneCikanGorselLinki) => set(() => ({ createBlogOneCikanGorselLinki })),
  setcreateBlogIcerik: (createBlogIcerik) => set(() => ({ createBlogIcerik })),
  setcreateBlogOneCikarilmaBilgisi: (createBlogOneCikarilmaBilgisi) => set(() => ({ createBlogOneCikarilmaBilgisi })),
  setcreateBlogEtiketler: (createBlogEtiketler) => set(() => ({ createBlogEtiketler })),
  setcreateBlogYayinlanmaDurumu: (createBlogYayinlanmaDurumu) => set(() => ({ createBlogYayinlanmaDurumu })),
  /////////


///////BLOG-SELECT STATE
selectedBlogSlug: "",
selectedBlogBaslik: "",
selectedBlogBlogTuru: "",
selectedBlogMetaAciklama: "",
selectedBlogAnahtarKelimeler: "",
selectedBlogOneCikanGorselLinki: "",
selectedBlogIcerik: "",
selectedBlogOneCikarilmaBilgisi: "",
selectedBlogEtiketler: "",
selectedBlogYayinlanmaDurumu: "",

setselectedBlogSlug: (selectedBlogSlug) => set(() => ({ selectedBlogSlug })),
setselectedBlogBaslik: (selectedBlogBaslik) => set(() => ({ selectedBlogBaslik })),
setselectedBlogBlogTuru: (selectedBlogBlogTuru) => set(() => ({ selectedBlogBlogTuru })),
setselectedBlogMetaAciklama: (selectedBlogMetaAciklama) => set(() => ({ selectedBlogMetaAciklama })),
setselectedBlogAnahtarKelimeler: (selectedBlogAnahtarKelimeler) => set(() => ({ selectedBlogAnahtarKelimeler })),
setselectedBlogOneCikanGorselLinki: (selectedBlogOneCikanGorselLinki) => set(() => ({ selectedBlogOneCikanGorselLinki })),
setselectedBlogIcerik: (selectedBlogIcerik) => set(() => ({ selectedBlogIcerik })),
setselectedBlogOneCikarilmaBilgisi: (selectedBlogOneCikarilmaBilgisi) => set(() => ({ selectedBlogOneCikarilmaBilgisi })),
setselectedBlogEtiketler: (selectedBlogEtiketler) => set(() => ({ selectedBlogEtiketler })),
setselectedBlogYayinlanmaDurumu: (selectedBlogYayinlanmaDurumu) => set(() => ({ selectedBlogYayinlanmaDurumu })),
/////////


}));

export default useStore;