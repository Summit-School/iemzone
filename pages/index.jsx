import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import SEO from "components/SEO";
import Setting from "components/Setting";
import Newsletter from "components/Newsletter";
import ShopLayout1 from "components/layouts/ShopLayout1";
import Section1 from "pages-sections/market-1/Section1";
import Section2 from "pages-sections/market-1/Section2";
import Section3 from "pages-sections/market-1/Section3";
import Section4 from "pages-sections/market-1/Section4";
import Section5 from "pages-sections/market-1/Section5";
import Section6 from "pages-sections/market-1/Section6";
import Section7 from "pages-sections/market-1/Section7";
import Section8 from "pages-sections/market-1/Section8";
import Section10 from "pages-sections/market-1/Section10";
import Section11 from "pages-sections/market-1/Section11";
import Section12 from "pages-sections/market-1/Section12";
import Section13 from "pages-sections/market-1/Section13";
import api from "utils/__api__/market-1";
// =============================================================================
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { allProducts } from "../src/redux/reducers/admin/product";
import { allBrands } from "../src/redux/reducers/admin/brand";

const MarketShop = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const marketProductsList = useSelector((state) => state.products.products);
  const products = marketProductsList?.products;
  const brands = useSelector((state) => state.brands.allBrands);

  useEffect(() => {
    dispatch(allProducts())
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          return enqueueSnackbar("Network error", {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
    dispatch(allBrands())
      .then((res) => {
        if (res.meta.requestStatus === "rejected") {
          return enqueueSnackbar("Network error", {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <ShopLayout1>
      <SEO title="Temzone" description="Multi-vendor Ecommerce Platform" />

      {/* HERO SLIDER SECTION */}
      <Section1 carouselData={props.mainCarouselData} />

      {/* FLASH DEALS SECTION */}
      <Section2 flashDeals={products} />

      {/* TOP CATEGORIES */}
      <Section3 categoryList={props.topCategories} />

      {/* TOP RATED PRODUCTS */}
      <Section4 topRatedList={products} topRatedBrands={brands} />

      {/* PROMO BANNERS */}
      <Section8
        img1={"/assets/images/banners/banner-new-1.jpg"}
        img2={"/assets/images/banners/banner-new.jpg"}
        md1={5}
        md2={7}
      />

      {/* NEW ARRIVAL LIST */}
      <Section5 newArrivalsList={products} />

      {/* BIG DISCOUNTS */}
      <Section13 bigDiscountList={products} />

      {/* CAR LIST */}
      <Section6 carBrands={props.carBrands} carList={products} />

      {/* MOBILE PHONES */}
      <Section7
        title="Mobile Phones"
        shops={props.mobileShops}
        brands={props.mobileBrands}
        productList={products}
      />

      {/* PROMO BANNERS */}
      <Section8
        img1={"/assets/images/banners/banner-new-2.jpeg"}
        img2={"/assets/images/banners/banner-new-3.png"}
        md1={6}
        md2={6}
      />

      {/* OPTICS / WATCH */}
      <Section7
        title="Optics / Watch"
        shops={props.opticsShops}
        brands={props.opticsBrands}
        productList={products}
      />

      {/* CATEGORIES */}
      <Section10 categories={props.bottomCategories} />

      {/* MORE FOR YOU */}
      <Section11 moreItems={products} />

      {/* SERVICE CARDS */}
      <Section12 serviceList={props.serviceList} />

      {/* POPUP NEWSLETTER FORM */}
      <Newsletter />

      {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
      <Setting />
    </ShopLayout1>
  );
};
export const getStaticProps = async ({ locale }) => {
  const carList = await api.getCarList();
  const carBrands = await api.getCarBrands();
  const moreItems = await api.getMoreItems();
  const mobileList = await api.getMobileList();
  const opticsList = await api.getOpticsList();
  const mobileShops = await api.getMobileShops();
  const opticsShops = await api.getOpticsShops();
  const serviceList = await api.getServiceList();
  const mobileBrands = await api.getMobileBrands();
  const flashDealsData = await api.getFlashDeals();
  const opticsBrands = await api.getOpticsBrands();
  const bottomCategories = await api.getCategories();
  const topCategories = await api.getTopCategories();
  const topRatedBrands = await api.getTopRatedBrand();
  const mainCarouselData = await api.getMainCarousel();
  const newArrivalsList = await api.getNewArrivalList();
  const bigDiscountList = await api.getBigDiscountList();
  const topRatedProducts = await api.getTopRatedProduct();
  let locales = await serverSideTranslations(locale ?? "en", ["common"]);
  return {
    props: {
      ...locales,
      carList,
      carBrands,
      moreItems,
      mobileList,
      opticsList,
      serviceList,
      mobileShops,
      opticsShops,
      mobileBrands,
      opticsBrands,
      topCategories,
      flashDealsData,
      topRatedBrands,
      newArrivalsList,
      bigDiscountList,
      mainCarouselData,
      topRatedProducts,
      bottomCategories,
    },
  };
};
export default MarketShop;
