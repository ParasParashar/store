import AxiosBase from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { useEffect, useState } from "react";
import Slider from "react-slick";

// array of product details in hero section
const heroProduct = [
  {
    img: "/heroSection/fashion1.jpg",
    title: "Elevate",
    subTitle: "Your Style",
    description: "Discover the latest in luxury fashion and timeless elegance.",
  },
  {
    img: "/heroSection/fashion2.jpg",
    title: "Discover",
    subTitle: "New Outfit",
    description: "Explore our latest collection of premium fashion.",
  },
  {
    img: "/heroSection/fashion3.jpg",
    title: "Soul",
    subTitle: "Threads",
    description: "Fashion with a soul, for the soul.",
  },
  {
    img: "/heroSection/fashion4.jpg",
    title: "Style",
    subTitle: "Curator",
    description: "Handpicked fashion for discerning minds.",
  },
  {
    img: "/heroSection/fashion5.jpeg",
    title: "Armoire",
    subTitle: "of Dreams",
    description: "Discover your dream wardrobe, one piece at a time.",
  },
  {
    img: "/heroSection/fashion6.jpg",
    title: "Urban",
    subTitle: "Canvas",
    description: "Express yourself, with effortless styles.",
  },
];

const HeroSection = () => {

  const [slidesToShow, setSlidesToShow] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(heroProduct[0]);

  // fetching data for hero banners
  // const {data: Banners} = useQuery({
  //   queryKey : ["Banners"],
  //   queryFn : async () => {
  //     const {data} = await AxiosBase.get("/api/store/category")
  //     return data.data
  //   }
  // })
  
  // useEffect for update the slides according to screen size
  useEffect(() => {

    // function for update the slides according to scrren size
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width < 1024) setSlidesToShow(3);
      else if (width < 1240) setSlidesToShow(4);
      else if (width < 1536) setSlidesToShow(5);
      else setSlidesToShow(6);
    };

    // gsap animation for first hero section animation
    const timeline = gsap.timeline();
    timeline.fromTo(
      ".description-line",
      { opacity: 0, y: 20 },
      { opacity: 1, y: -20, duration: 1, delay: 0.5, stagger: 0.3 }
    );

    window.addEventListener("resize", updateSlidesToShow);
    updateSlidesToShow();

    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  // change background images with flash effect
  const changeBackgroundEffect = (img:string) => {
    const backgroundElement = document.querySelector(".background");
    gsap.to(backgroundElement, { opacity: 0.6, duration: 0.3, onComplete: () => {
      if (backgroundElement) {
        (backgroundElement as HTMLElement).style.backgroundImage = `url(${img})`;
      }
      gsap.to(backgroundElement, { opacity: 1, duration: 0.3 });
    }});
  };

  // details for right slider
  const settings = {
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    beforeChange: (_:number, newIndex:number) => {
      const nextProduct = heroProduct[newIndex];
      changeBackgroundEffect(nextProduct.img);
      setTimeout(() => setCurrentProduct(nextProduct), 500);
    },
    afterChange: () => {
      gsap.timeline().fromTo(
        ".description-line",
        { opacity: 0, y: 20 },
        { opacity: 1, y: -20, duration: 1, delay: 0.5, stagger: 0.3 }
      );
    },
  };

  return (
    <div className="parent fixed w-screen h-screen overflow-hidden flex items-center z-10">

      {/* Background Image */}
      <div
        className="background absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity"
        style={{ backgroundImage: `url(${currentProduct.img})` }}
      />

      <div className="container h-full mx-auto ">

      {/* Description */}
      <div className=" description absolute top-36 md:top-28 left-5 sm:left-14 lg:left-24 z-10 text-white">
        <h1 className="description-line text-6xl sm:text-8xl lg:text-9xl font-bold mb-4">
          {currentProduct.title}
        </h1>
        <h2 className="description-line text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 uppercase">
          {currentProduct.subTitle}
        </h2>
        <p className="description-line text-sm md:text-base lg:text-lg font-semibold bg-black/50 px-4 py-2 rounded-full mb-6 text-white w-fit">
          {currentProduct.description}
        </p>
        <button className="description-line px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition">
          Shop Now
        </button>
      </div>

      {/* Slider */}
      <div
        className={`slider-container  hidden md:block`}
      >
        <Slider
          {...settings}
          className="slider absolute top-1/2 left-1/2 w-full flex px-5 py-2 rounded-lg items-center gap-3 transition-opacity duration-500"
        >
          {heroProduct.map((product, index) => (
            <div key={index}>
              <img
                src={product.img}
                alt="fashion"
                className="w-60 h-64 bg-cover bg-center rounded-md mr-4"
              />
            </div>
          ))}
        </Slider>
      </div>
      </div>
    </div>
  );
}

export default HeroSection;