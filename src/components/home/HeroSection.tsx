import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const images = [
  "/fashion1.jpg",
  "/fashion2.jpg",
  "/fashion3.jpg",
  "/fashion5.jpeg",
];

export function HeroSection() {
  const [slidesToShow, setSlidesToShow] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(images[0]);

  useEffect(() => {
    // handle responsive slider based on screen width
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width < 400) setSlidesToShow(1);
      else if (width < 600) setSlidesToShow(2);
      else if (width < 768) setSlidesToShow(2);
      else if (width < 1024) setSlidesToShow(3);
      else if (width < 1240) setSlidesToShow(4);
      else setSlidesToShow(5);
    };

    window.addEventListener("resize", updateSlidesToShow);
    updateSlidesToShow();
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const settings = {
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    beforeChange: (newIndex: number) => {
      setBackgroundImage(images[newIndex]);
    },
  };

  useGSAP(() => {
    let tl = gsap.timeline();

    gsap.to(".parent .slider", {
      scrollTrigger: {
        trigger: ".parent",
        scroller: "body",
        pin: true,
      },
    });

    tl.from(".description h1 ", {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 1,
    });

    tl.from(".description p ", {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.5,
    });
  });

  return (
    <div className=" parent relative w-full h-screen overflow-hidden flex items-center">
      {/* background image */}
      <div
        className=" background absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* description */}
      <div className=" description absolute top-16 left-5 sm:left-14 lg:left-24 z-10 text-white">
        <h1 className=" text-6xl sm:text-8xl lg:text-9xl  font-bold mb-4">
          Discover{" "}
        </h1>
        <h1 className=" text-2xl sm:text-4xl lg:text-5xl  font-bold mb-4 uppercase ">
          Your Style
        </h1>
        <p className="text-sm md:text-base lg:text-lg font-semibold bg-black/50 px-4 py-2 rounded-full mb-6 text-white w-fit ">
          Explore our latest collection of premium fashion
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition">
          Shop Now
        </button>
      </div>

      {/* slider */}
      <div className="slider-container border-2 border-black ">
        <Slider
          {...settings}
          className={` slider absolute top-1/2 left-1/2 w-full flex px-5 py-2 rounded-lg items-center gap-3 transition-opacity duration-500 `}
        >
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={`${image}`}
                alt="fashion"
                className="w-60 h-64 bg-cover bg-center rounded-md mr-4"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
