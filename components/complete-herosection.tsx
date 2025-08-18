"use client"

import type React from "react"
import { useEffect, useState } from "react"

const CompleteHeroSection: React.FC = () => {
  const [dimensions, setDimensions] = useState({
    radius: 340,
    cardSize: 120,
  })

  // Built-in images - aap apni images yahan replace kar sakte hain
  const images = [
    "/hero1.jpg",
    "/hero2.jpg",
    "/welfare-work.png",
    "/head-logo.png",
    "/footer-logo.png",
    "/ultra-detailed_close-up_side_profile_of_a_dark-skinned_model_wearing_futuristic_chrome_wraparound_s_ps17q5ms2ptu5t6bdru6_2.png",
    "/slide.png",
  ]

  const [backgroundImage, setBackgroundImage] = useState<string | null>(images[0] || null)
  const [, setIsTransitioning] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(0)
  const [clickedImagePosition, setClickedImagePosition] = useState<{ x: number; y: number } | null>(null)
  const [animatingImage, setAnimatingImage] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [contentTransition, setContentTransition] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Built-in content for each image
  const imageContent = [
    {
      heading: "Rozgar Aur Umeed, Har Ghar Tak",
      paragraph:
        "Har haath ko kaam, har ghar mein khushi – hum aapko rozgar ke mauqay aur behtareen mustaqbil ki taraf le ja rahe hain.",
      buttons: ["Apply for Assistance", "What We have Served"],
    },
    {
      heading: `Har Hunar Ko Milyga Moka`,
      paragraph:
        "Aapke skills ko unke sahi muqaam tak pohanchana hamara mission hai – training, support aur employment ke sath.",
      buttons: ["Apply for Assistance", "What We have Served"],
    },
    {
      heading: "Madad Jo Badle Gi Zindagi",
      paragraph:
        "Free of cost support aur employment solutions jo aapki zindagi ko ek nayi raah par le jayein.",
      buttons: ["Apply for Assistance", "What We have Served"],
    },
    {
      heading: "Harr Mustaqbil Hoo Roshan",
      paragraph:
        "Rozgar ke zariye apne aur apne ghar walon ka mustaqbil behtar banayein.",
      buttons: ["Apply for Assistance", "What We have Served"],
    },
    {
      heading: "Rozgar Se Mily Gi Khudmukhtari",
      paragraph:
        "Financial independence aur self-respect ka safar yahin se shuru hota hai.",
      buttons: ["Apply for Assistance", "What We have Served"],
    },
    {
      heading: "Harr Qadam Taraqi Ki Raah Parr",
      paragraph:
        "Rozgar ke har mauqe ke sath aapke sapnon ko haqiqat mein tabdeel karna.",
      buttons: ["Apply for Assistance", "What We have Served"],
    },
    {
      heading: "Rozgar Aur Khushi Saath Saath",
      paragraph:
        "Employment ke sath sath muskurahat bhi aapke ghar le aana hamari zimmedari hai.",
      buttons: ["Apply for Assistance", "What We have Served"],
    },
  ]

  const currentContent = activeImageIndex !== null ? imageContent[activeImageIndex] : imageContent[0]

  const handleImageClick = (imageSrc: string, index: number, event: React.MouseEvent) => {
    if (backgroundImage === imageSrc) return

    const rect = event.currentTarget.getBoundingClientRect()
    setClickedImagePosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })

    setAnimatingImage(imageSrc)
    setIsTransitioning(true)

    // Smooth content transition
    setContentTransition(true)
    setTimeout(() => {
      setActiveImageIndex(index)
      setContentTransition(false)
    }, 200)

    // Auto advance carousel after setting background
    setTimeout(() => {
      setBackgroundImage(imageSrc)
      // Move to next slide automatically
      setCurrentSlide((prev) => (prev + 1) % Math.max(1, images.length - 2))
      setTimeout(() => {
        setIsTransitioning(false)
        setAnimatingImage(null)
        setClickedImagePosition(null)
      }, 800)
    }, 300)
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setDimensions({ radius: 200, cardSize: 80 })
      } else if (width < 1024) {
        setDimensions({ radius: 280, cardSize: 100 })
      } else {
        setDimensions({ radius: 340, cardSize: 120 })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (activeImageIndex !== null) {
      const text = currentContent.paragraph
      setTypedText("")
      setIsTyping(true)

      let index = 0
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setTypedText(text.substring(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(typeInterval)
        }
      }, 50) // Speed of typing

      return () => clearInterval(typeInterval)
    }
  }, [activeImageIndex, currentContent.paragraph])



  // Carousel auto-move every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const maxSlide = Math.max(0, images.length - 3);
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Sync background and content with currentSlide
  useEffect(() => {
    setActiveImageIndex(currentSlide);
    setBackgroundImage(images[currentSlide]);
  }, [currentSlide, images]);

  // Carousel navigation handlers (sync background)
  const handlePrev = () => {
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, images.length - 3);
      const next = prev <= 0 ? maxSlide : prev - 1;
      setActiveImageIndex(next);
      setBackgroundImage(images[next]);
      return next;
    });
  };
  const handleNext = () => {
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, images.length - 3);
      const next = prev >= maxSlide ? 0 : prev + 1;
      setActiveImageIndex(next);
      setBackgroundImage(images[next]);
      return next;
    });
  };

  // Background style object
  const backgroundStyle = backgroundImage
    ? {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }
    : {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };

  return (
    <>
      {/* Built-in CSS Styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes flyUp {
          0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -150%) scale(1.2) rotate(5deg);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -300%) scale(2) rotate(10deg);
            opacity: 0;
          }
        }

        @keyframes float-professional {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-15px) translateX(5px) rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-25px) translateX(-5px) rotate(180deg);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-10px) translateX(10px) rotate(270deg);
            opacity: 0.4;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fly-up {
          animation: flyUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-float-professional {
          animation: float-professional 6s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .typing-cursor {
          animation: blink 1s infinite;
        }

        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        .typewriter-text {
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 3s steps(40, end);
        }
      `}</style>

      <section
        className="relative overflow-hidden min-h-[88vh] pt-0 pb-12 md:pt-0 md:pb-16 lg:pt-0 lg:pb-20 lg:mt-[-25px] w-full"
        style={backgroundStyle}
      >
        {/* Animated background overlay */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${backgroundImage ? "bg-black/5 md:bg-black/10" : "bg-transparent"
            }`}
        />

        {/* Professional grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Left Side VIP Content */}
        <div className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 max-w-2xl">
          <div
            className={`space-y-6 md:space-y-8 transition-all duration-500 ease-out ${contentTransition ? "opacity-0 transform translate-x-8" : "opacity-100 transform translate-x-0"
              }`}
          >


            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{
                // textShadow:"0 2px 4px rgba(0,0,0,0.7), 0 0 8px rgba(255,255,255,0.1)",
                // filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
              }}
            >
              <span style={{ color: "#1B0073"}}>
                {currentContent.heading.split(" ").slice(0, Math.ceil(currentContent.heading.split(" ").length / 2)).join(" ")}
              </span>{" "}
              <span style={{ color: "#00A5E0" }}>
                {currentContent.heading.split(" ").slice(Math.ceil(currentContent.heading.split(" ").length / 2)).join(" ")}
              </span>
            </h1>


            {/* Glassmorphic Paragraph with typing animation */}
            <p
              className=" text-white leading-relaxed text-xl"
              style={{
                textShadow: "0 1px 3px rgba(0,0,0,0.4), 0 0 6px rgba(255,255,255,0.05)",
                filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.3))"
              }}
            >
              {typedText}
              {isTyping && <span className="inline-block ml-1 typing-cursor text-blue-300">|</span>}
            </p>

            {/* Enhanced Buttons with better styling */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-2 md:pt-3 ">
              {currentContent.buttons.map((buttonText, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index === 0) {
                      // Apply for Assistance - link to signup
                      window.location.href = '/signup';
                    } else {
                      // What We have Served - link to stats section
                      window.location.href = '/stats-sec';
                    }
                  }}
                  className={`px-6 md:px-8 py-3 md:py-3.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${index === 0
                      ? "bg-gradient-to-r from-[#1B0073] to-[#00A5E0] hover:opacity-90 text-white"
                      : "bg-white/10 backdrop-blur-[2px] border-2 border-[#00A5E0] text-white hover:bg-white/20 hover:border-[#00A5E0]"
                    }`}
                  style={{
                    textShadow: index === 0 ? "none" : "1px 1px 2px rgba(0,0,0,0.8)",
                    boxShadow: index === 0
                      ? "0 4px 15px rgba(0,0,0,0.2), 0 0 20px rgba(255,255,255,0.3)"
                      : "0 4px 15px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)"
                  }}
                >
                  <span className="text-sm md:text-base font-bold">{buttonText}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Upward flying image animation */}
        {animatingImage && clickedImagePosition && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              left: clickedImagePosition.x,
              top: clickedImagePosition.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="w-16 md:w-20 h-16 md:h-20 rounded-xl overflow-hidden shadow-2xl animate-fly-up"
              style={{
                animation: "flyUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
              }}
            >
              <img src={animatingImage || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Right Corner Horizontal Carousel (align near buttons height) */}
        <div className="absolute right-4 md:right-6 top-[80%] md:top-[80%] -translate-y-1/2 z-20">
          <div className="relative bg-gradient-to-r from-black/40 via-black/30 to-black/40 backdrop-blur-2xl border border-white/30 rounded-2xl p-4 md:p-3 overflow-hidden">
            {/* Professional accent lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

            {/* Carousel navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200"
              style={{ marginLeft: '-18px' }}
              aria-label="Previous"
            >
              <span className="text-xl">&#8592;</span>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200"
              style={{ marginRight: '-18px' }}
              aria-label="Next"
            >
              <span className="text-xl">&#8594;</span>
            </button>

            {/* Carousel container */}
            <div className="relative overflow-hidden rounded-xl" style={{ width: `${dimensions.cardSize * 3.5}px` }}>
              <div
                className="flex gap-3 md:gap-4 transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentSlide * (dimensions.cardSize * 0.8 + 16)}px)`,
                }}
              >
                {images.map((src, i) => {
                  const isActive = activeImageIndex === i;
                  const isVisible = i >= currentSlide && i < currentSlide + 3;

                  return (
                    <div
                      key={i}
                      className={`opacity-0 animate-slide-in cursor-pointer group relative flex-shrink-0 ${isVisible ? "z-10" : "z-0"}`}
                      style={{
                        width: dimensions.cardSize * 0.8,
                        height: dimensions.cardSize * 0.8,
                        animationDelay: `${i * 100}ms`,
                        animationFillMode: "forwards",
                      }}
                      onClick={(e) => handleImageClick(src, i, e)}
                    >
                      <div
                        className={`relative rounded-xl shadow-2xl overflow-hidden ring-1 transition-all duration-700 ease-out w-full h-full ${isActive
                          ? "ring-2 ring-white/70 shadow-white/30 scale-105 brightness-110"
                          : "ring-white/30 bg-white/5 hover:ring-white/50 hover:scale-110 hover:shadow-2xl hover:shadow-white/20"
                        }`}
                        style={{
                          transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <img
                          src={src || "/placeholder.svg"}
                          alt=""
                          className={`block w-full h-full object-cover transition-all duration-700 ${isActive
                            ? "brightness-110 contrast-110 saturate-120"
                            : "group-hover:brightness-105 group-hover:scale-110"
                          }`}
                          draggable={false}
                        />
                        {/* Professional overlay gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        {/* Active state indicator */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-blue/20" />
                        )}
                        {/* Professional corner accent */}
                        <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-white/60 to-transparent rounded-full opacity-80" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CompleteHeroSection


// oolors.co/visualizer/140152-ffffff-00a5e0-18997b-c3c3c3
