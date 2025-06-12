import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/swiper-bundle.css";
import { useRef, useEffect } from "react";
import type SwiperCore from "swiper";
import { BiWorld } from "react-icons/bi";

function WorldKitchen() {
  const swiperRef = useRef<SwiperCore | null>(null);
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Handle touch events for better mobile support
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  const cuisineSlides = [
    {
      image: "/Images/Country_Meals/usa.webp",
      title: "United States",
      description: "Classic American burgers and fries, a true comfort food",
      flag: "/Images/Flags/usa.webp",
      recipesLink: "/meals/united-states",
    },
    {
      image: "/Images/Country_Meals/uk.webp",
      title: "United Kingdom",
      description: "Hearty Fish & Chips with mushy peas, a British staple",
      flag: "/Images/Flags/uk.webp",
      recipesLink: "/meals/united-kingdom",
    },
    {
      image: "/Images/Country_Meals/canada.webp",
      title: "Canada",
      description: "Delicious poutine with cheese curds and rich gravy",
      flag: "/Images/Flags/canada.webp",
      recipesLink: "/meals/canada",
    },
    {
      image: "/Images/Country_Meals/china.webp",
      title: "China",
      description: "Assorted dim sum, a traditional Chinese delight",
      flag: "/Images/Flags/china.webp",
      recipesLink: "/meals/china",
    },
    {
      image: "/Images/Country_Meals/croatia.webp",
      title: "Croatia",
      description: "Fresh seafood, a staple of Croatian coastal areas",
      flag: "/Images/Flags/croatia.webp",
      recipesLink: "/meals/croatia",
    },
    {
      image: "/Images/Country_Meals/netherlands.webp",
      title: "Netherlands",
      description: "Sweet and savory stroopwafels and bitterballen",
      flag: "/Images/Flags/netherlands.webp",
      recipesLink: "/meals/netherlands",
    },
    {
      image: "/Images/Country_Meals/egypt.webp",
      title: "Egypt",
      description: "Hearty ful medames, a traditional Egyptian breakfast",
      flag: "/Images/Flags/egypt.webp",
      recipesLink: "/meals/egypt",
    },
    {
      image: "/Images/Country_Meals/philippines.webp",
      title: "Philippines",
      description: "Classic adobo, a popular Filipino dish",
      flag: "/Images/Flags/philippines.webp",
      recipesLink: "/meals/philippines",
    },
    {
      image: "/Images/Country_Meals/france.webp",
      title: "France",
      description: "Flaky croissants and rich coq au vin",
      flag: "/Images/Flags/france.webp",
      recipesLink: "/meals/france",
    },
    {
      image: "/Images/Country_Meals/greece.webp",
      title: "Greece",
      description: "Savory moussaka and grilled souvlaki",
      flag: "/Images/Flags/greece.webp",
      recipesLink: "/meals/greece",
    },
    {
      image: "/Images/Country_Meals/india.webp",
      title: "India",
      description: "Aromatic curries and flavorful biryani",
      flag: "/Images/Flags/india.webp",
      recipesLink: "/meals/india",
    },
    {
      image: "/Images/Country_Meals/ireland.webp",
      title: "Ireland",
      description: "Hearty Irish stew and soda bread",
      flag: "/Images/Flags/ireland.webp",
      recipesLink: "/meals/ireland",
    },
    {
      image: "/Images/Country_Meals/italy.webp",
      title: "Italy",
      description: "Classic pizza and pasta dishes",
      flag: "/Images/Flags/italy.webp",
      recipesLink: "/meals/italy",
    },
    {
      image: "/Images/Country_Meals/jamaica.webp",
      title: "Jamaica",
      description: "Spicy jerk chicken and ackee with saltfish",
      flag: "/Images/Flags/jamaica.webp",
      recipesLink: "/meals/jamaica",
    },
    {
      image: "/Images/Country_Meals/japan.webp",
      title: "Japan",
      description: "Fresh sushi and savory ramen",
      flag: "/Images/Flags/japan.webp",
      recipesLink: "/meals/japan",
    },
    {
      image: "/Images/Country_Meals/kenya.webp",
      title: "Kenya",
      description: "Grilled nyama choma and ugali",
      flag: "/Images/Flags/kenya.webp",
      recipesLink: "/meals/kenya",
    },
    {
      image: "/Images/Country_Meals/malaysia.webp",
      title: "Malaysia",
      description: "Fragrant nasi lemak and satay skewers",
      flag: "/Images/Flags/malaysia.webp",
      recipesLink: "/meals/malaysia",
    },
    {
      image: "/Images/Country_Meals/mexico.webp",
      title: "Mexico",
      description: "Tacos, burritos, and flavorful enchiladas",
      flag: "/Images/Flags/mexico.webp",
      recipesLink: "/meals/mexico",
    },
    {
      image: "/Images/Country_Meals/morocco.webp",
      title: "Morocco",
      description: "Slow-cooked tagine and fluffy couscous",
      flag: "/Images/Flags/morocco.webp",
      recipesLink: "/meals/morocco",
    },
    {
      image: "/Images/Country_Meals/poland.webp",
      title: "Poland",
      description: "Traditional pierogi and hearty bigos",
      flag: "/Images/Flags/poland.webp",
      recipesLink: "/meals/poland",
    },
    {
      image: "/Images/Country_Meals/portugal.webp",
      title: "Portugal",
      description: "Salted cod (bacalhau) and pastel de nata",
      flag: "/Images/Flags/portugal.webp",
      recipesLink: "/meals/portugal",
    },
    {
      image: "/Images/Country_Meals/russia.webp",
      title: "Russia",
      description: "Classic borscht and savory pelmeni",
      flag: "/Images/Flags/russia.webp",
      recipesLink: "/meals/russia",
    },
    {
      image: "/Images/Country_Meals/spain.webp",
      title: "Spain",
      description: "Flavorful paella and diverse tapas",
      flag: "/Images/Flags/spain.webp",
      recipesLink: "/meals/spain",
    },
    {
      image: "/Images/Country_Meals/thailand.webp",
      title: "Thailand",
      description: "Spicy Pad Thai and aromatic Tom Yum soup",
      flag: "/Images/Flags/thailand.webp",
      recipesLink: "/meals/thailand",
    },
    {
      image: "/Images/Country_Meals/tunisia.webp",
      title: "Tunisia",
      description: "Rich couscous and crispy brik pastries",
      flag: "/Images/Flags/tunisia.webp",
      recipesLink: "/meals/tunisia",
    },
    {
      image: "/Images/Country_Meals/turkey.webp",
      title: "Turkey",
      description: "Savory kebabs and sweet baklava",
      flag: "/Images/Flags/turkey.webp",
      recipesLink: "/meals/turkey",
    },
    {
      image: "/Images/Country_Meals/ukraine.webp",
      title: "Ukraine",
      description: "Hearty borscht and delicious varenyky (dumplings)",
      flag: "/Images/Flags/ukraine.webp",
      recipesLink: "/meals/ukraine",
    },
    {
      image: "/Images/Country_Meals/uruguay.webp",
      title: "Uruguay",
      description: "Grilled asado and iconic chivito sandwich",
      flag: "/Images/Flags/uruguay.webp",
      recipesLink: "/meals/uruguay",
    },
    {
      image: "/Images/Country_Meals/vietnam.webp",
      title: "Vietnam",
      description: "Flavorful pho noodle soup and banh mi sandwiches",
      flag: "/Images/Flags/vietnam.webp",
      recipesLink: "/meals/vietnam",
    },
  ];

  return (
    <div className="py-5 px-4 bg-black/3 min-h-[calc(100vh-100px)] overflow-hidden">
      <motion.h1
        className="text-2xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-primary flex items-center justify-center gap-3"
        variants={itemVariants}
      >
        Discover Different Meals Around The World
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="hidden sm:block"
        >
          <BiWorld className="text-4xl md:text-5xl" />
        </motion.span>
      </motion.h1>

      <div className="px-2 sm:px-4 md:px-20 lg:px-40 relative">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay, Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".custom-swiper-button-prev",
            nextEl: ".custom-swiper-button-next",
            disabledClass: "opacity-50 cursor-not-allowed",
          }}
          centeredSlides={true}
          breakpoints={{
            480: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          className="h-[500px] sm:h-[600px] md:h-[700px]"
          touchRatio={1.5}
          touchAngle={45}
          resistance={true}
          resistanceRatio={0.85}
          watchOverflow={true}
          preventInteractionOnTransition={true}
        >
          {cuisineSlides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
            >
              <motion.a
                href={slide.recipesLink}
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 block cursor-pointer group"
                whileHover={{ scale: 1.03 }}
                style={{
                  WebkitTapHighlightColor: "transparent",
                  touchAction: "manipulation",
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 left-4 rounded-full h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center shadow-2xl border border-white bg-white/10 backdrop-blur-sm">
                  <motion.img
                    src={slide.flag}
                    alt={`${slide.title} flag`}
                    className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 drop-shadow-md"
                  >
                    {slide.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-base sm:text-lg opacity-90 drop-shadow-sm line-clamp-2"
                  >
                    {slide.description}
                  </motion.p>
                </div>
              </motion.a>
            </SwiperSlide>
          ))}
        </Swiper>
        <motion.div
          className="custom-swiper-button-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 bg-white/30 p-2 sm:p-3 rounded-full cursor-pointer shadow-lg hover:bg-white/50 transition-colors duration-300 hidden sm:flex items-center justify-center -ml-2 sm:-ml-4"
          whileHover={{ scale: 1.1 }}
          onClick={() => swiperRef.current?.slidePrev()}
          style={{
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </motion.div>
        <motion.div
          className="custom-swiper-button-next absolute top-1/2 right-0 -translate-y-1/2 z-10 bg-white/30 p-2 sm:p-3 rounded-full cursor-pointer shadow-lg hover:bg-white/50 transition-colors duration-300 hidden sm:flex items-center justify-center -mr-2 sm:-mr-4"
          whileHover={{ scale: 1.1 }}
          onClick={() => swiperRef.current?.slideNext()}
          style={{
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

export default WorldKitchen;
