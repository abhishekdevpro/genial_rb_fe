import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image4 from "./Images/homeimage1.jpg";
import image5 from "./Images/homeimage2.jpg";
import image6 from "./Images/homeimage3.jpg";
// import image1 from "./Images/frenchresume1.jpg";
// import image2 from "./Images/frenchresume2.jpg";
// import image3 from "./Images/frenchresume3.jpg";
import linkedin from "./Images/linkedin.png";
import Image from "next/image";
import Home_second from "./Home_second";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation

import ImageSlider from "./Slider_details";
import Home_step from "./Home-steps";
import ATSResumeSection from "./ATS-section";
import Home_third from "./Home_third";

function Home_first() {
  const { t } = useTranslation(); // Initialize useTranslation hook
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the token (you can adjust based on where the token is stored)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [image4, image5, image6];

  return (
    <>
      <div className="bg-gradient-to-b from-zinc-300 via-emerald-500 to-[#5a23b2]  pt-10 w-full overflow-hidden">
        <div className="container mx-auto">
          <div className="flex justify-center md:hidden">
            <Link
              href="/Home/FAQ/Contact"
              className="text-black bg-red-300 px-3 py-4 rounded-3xl font-bold text-center"
            >
              {t("contact_us")} {/* Use translation key */}
            </Link>
          </div>

          <div className="py-9 px-5 flex gap-3 md:gap-10 md:justify-evenly items-center flex-col md:flex-row">
            {/* Content Section */}
            <div className="px-3 py-3 w-full md:w-[500px]">
              <div className="flex flex-col gap-4">
                <h1 className="font-extrabold text-5xl font-sans">
                  {t("resume_tool_live")}
                </h1>

                <div className="text-lg font-medium text-white">
                  {t("resume_features")}
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={
                      isAuthenticated ? "/dashboard/resume-builder" : "/login2"
                    }
                  >
                    <button className="text-white bg-[#5a23b2] text-lg px-6 py-2 rounded-full font-bold hover:shadow-2xl hover:shadow-slate-500 hover:bg-emerald-500">
                      {t("build_resume")} {/* Use translation key */}
                    </button>
                  </Link>
                </div>
                <div className="font-bold text-base">
                  <i className="fa-solid fa-star text-emerald-500"></i>{" "}
                  <i className="fa-solid fa-star text-emerald-500"></i>{" "}
                  <i className="fa-solid fa-star text-emerald-500"></i>{" "}
                  <i className="fa-solid fa-star text-emerald-500"></i>{" "}
                  <i className="fa-solid fa-star text-emerald-500"></i>{" "}
                  {t("reviews_certified")}
                </div>
                <div className="flex items-center align-middle">
                  <div className="text-lg font-bold">{t("featured_on")}</div>
                  <div>
                    <Image
                      // src="https://png.pngtree.com/png-clipart/20190613/original/pngtree-linked-in-icon-png-image_3584856.jpg"
                      src={linkedin}
                      className="h-24 w-24"
                    />
                  </div>
                  <div>
                    <img
                      src="https://parspng.com/wp-content/uploads/2021/09/instagram-7.png"
                      className="h-16 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-3">
              <div className="hidden md:block md:max-w-lg p-4">
                <Slider {...settings}>
                  {images?.map((image, index) => (
                    <div key={index} className="w-full text-center">
                      <Image
                        src={image}
                        alt={`slide-${index}`}
                        width={320}
                        height={240}
                        className="transition-transform transform hover:scale-105 md:h-auto md:w-96"
                      />
                      {/* <p className="mt-2 text-lg font-semibold text-gray-700">
                        {index < 3 ? t("french_resume") : t("english_resume")}
                      </p> */}
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Home_step />
      <ATSResumeSection />
      <Home_third />
    </>
  );
}

export default Home_first;
