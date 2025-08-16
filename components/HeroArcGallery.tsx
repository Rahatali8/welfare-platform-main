"use client"

import React, { useEffect, useState } from "react"

// Images function - aap ye customize kar sakte hain
const getGalleryImages = () => {
  return [
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&q=80", // Ocean sunset
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80", // Mountain landscape
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80", // Forest path
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80", // Lake reflection
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop&q=80", // Desert landscape
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop&q=80", // Tropical beach
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=600&fit=crop&q=80", // Waterfall
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80", // Snow mountains
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop&q=80", // Green hills
    "https://images.unsplash.com/photo-1418065460487-3956ef138d69?w=800&h=600&fit=crop&q=80"  // Autumn forest
  ]
}

// Alternative images function for different themes
const getTechImages = () => {
  return [
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&q=80", // Tech workspace
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=80", // Code on screen
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&q=80", // Modern office
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop&q=80", // Laptop coding
    "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop&q=80", // Server room
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80", // Abstract tech
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&q=80", // Digital art
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80"  // Space tech
  ]
}

const getCityImages = () => {
  return [
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&q=80", // City skyline
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=600&fit=crop&q=80", // Night city
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop&q=80", // Urban street
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop&q=80", // City lights
    "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800&h=600&fit=crop&q=80", // Modern architecture
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=600&fit=crop&q=80", // Bridge view
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80", // Downtown
    "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&h=600&fit=crop&q=80"  // Sunset city
  ]
}

interface HeroArcGalleryProps {
  images?: string[]
  imageTheme?: 'nature' | 'tech' | 'city' | 'custom'
  title?: string
  subtitle?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  startAngle?: number
  endAngle?: number
  radiusLg?: number
  radiusMd?: number
  radiusSm?: number
  cardSizeLg?: number
  cardSizeMd?: number
  cardSizeSm?: number
  autoSlideInterval?: number
  className?: string
}

const HeroArcGallery: React.FC<HeroArcGalleryProps> = ({
  images,
  imageTheme = 'nature',
  title = "Beautiful Gallery Experience",
  subtitle = "Experience stunning visuals with automatic slideshow. Click any image to set as background.",
  primaryButtonText = "Explore Gallery",
  secondaryButtonText = "Learn More",
  onPrimaryClick = () => alert("Gallery button clicked!"),
  onSecondaryClick = () => alert("Learn more clicked!"),
  startAngle = 180,
  endAngle = 0,
  radiusLg = 400,
  radiusMd = 320,
  radiusSm = 240,
  cardSizeLg = 120,
  cardSizeMd = 100,
  cardSizeSm = 80,
  autoSlideInterval = 4000,
  className = "",
}) => {
  // Images selection based on theme or custom images
  const getImages = () => {
    if (images && images.length > 0) {
      return images
    }
    
    switch (imageTheme) {
      case 'tech':
        return getTechImages()
      case 'city':
        return getCityImages()
      case 'nature':
      default:
        return getGalleryImages()
    }
  }

  const galleryImages = getImages()

  const [dimensions, setDimensions] = useState({
    radius: radiusLg,
    cardSize: cardSizeLg,
  })

  const [backgroundImage, setBackgroundImage] = useState<number | null>(null)
  const [autoSlideIndex, setAutoSlideIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm })
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd })
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm])

  // Auto slide functionality
  useEffect(() => {
    if (galleryImages.length === 0) return

    const interval = setInterval(() => {
      setAutoSlideIndex((prev) => (prev + 1) % galleryImages.length)
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [galleryImages.length, autoSlideInterval])

  // Load images
  useEffect(() => {
    if (galleryImages.length > 0) {
      const imagePromises = galleryImages.map((src) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = resolve
          img.src = src
        })
      })

      Promise.all(imagePromises).then(() => {
        setTimeout(() => setImagesLoaded(true), 500)
      })
    }
  }, [galleryImages])

  const handleImageClick = (index: number) => {
    setBackgroundImage((prev) => {
      if (prev === index) {
        return null
      }
      return index
    })
  }

  const handleDotClick = (index: number) => {
    setBackgroundImage(index)
  }

  if (galleryImages.length === 0) {
    return (
      <section className={`relative overflow-hidden min-h-screen flex items-center justify-center bg-gray-900 ${className}`}>
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">No Images Available</h1>
          <p className="text-gray-300">Loading beautiful images...</p>
        </div>
      </section>
    )
  }

  const count = Math.max(galleryImages.length, 2)
  const step = (endAngle - startAngle) / (count - 1)
  const currentBackgroundImage = backgroundImage !== null ? backgroundImage : autoSlideIndex

  // Theme-based titles
  const getThemeTitle = () => {
    if (title !== "Beautiful Gallery Experience") return title
    
    switch (imageTheme) {
      case 'tech':
        return "Technology & Innovation"
      case 'city':
        return "Urban Landscapes"
      case 'nature':
      default:
        return "Beautiful Nature Gallery"
    }
  }

  const getThemeSubtitle = () => {
    if (subtitle !== "Experience stunning visuals with automatic slideshow. Click any image to set as background.") return subtitle
    
    switch (imageTheme) {
      case 'tech':
        return "Explore the world of technology and digital innovation. Click any image to set as background."
      case 'city':
        return "Discover amazing urban landscapes and city views. Click any image to set as background."
      case 'nature':
      default:
        return "Experience stunning natural landscapes with automatic slideshow. Click any image to set as background."
    }
  }

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <section className={`relative overflow-hidden min-h-screen flex flex-col ${className}`}>
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div
            className="transition-all duration-1000 ease-in-out rounded-full shadow-2xl"
            style={{
              width: "60vw",
              height: "60vw",
              maxWidth: "700px",
              maxHeight: "700px",
              minWidth: "320px",
              minHeight: "320px",
              backgroundImage: `url(${galleryImages[currentBackgroundImage]})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "blur(0.5px) brightness(0.85)",
              opacity: 0.85,
            }}
          >
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)"
              }}
            />
          </div>

          {/* Navigation Dots */}
          <div 
            className="absolute bottom-8 z-10 flex space-x-4"
            style={{
              left: "50%",
              transform: "translateX(-50%)"
            }}
          >
            {galleryImages.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentBackgroundImage ? "bg-white" : "bg-white/40 hover:bg-white/70"
                }`}
                style={{
                  boxShadow: index === currentBackgroundImage ? "0 0 15px rgba(255,255,255,0.9)" : "none",
                  transform: index === currentBackgroundImage ? "scale(1.3)" : "scale(1)"
                }}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        {!imagesLoaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-xl">Loading {imageTheme} gallery...</p>
            </div>
          </div>
        )}

        {/* 3D Arc Container */}
        <div
          className="relative mx-auto z-10"
          style={{
            width: "100%",
            height: `${dimensions.radius + 120}px`,
            perspective: "1200px",
            paddingTop: "80px"
          }}
        >
          <div
            className="absolute"
            style={{
              left: "50%",
              top: `0px`,
              transform: "translateX(-50%)",
              transformStyle: "preserve-3d",
            }}
          >
            {galleryImages.map((src, i) => {
              const angle = startAngle + step * i
              const angleRad = (angle * Math.PI) / 180

              const isBackground = backgroundImage === i
              const isAutoSlide = backgroundImage === null && autoSlideIndex === i
              const isActive = isBackground || isAutoSlide

              const x = Math.cos(angleRad) * dimensions.radius
              const y = -Math.sin(angleRad) * dimensions.radius

              return (
                <div
                  key={i}
                  className="absolute cursor-pointer transition-all duration-700 ease-out animate-float"
                  style={{
                    width: dimensions.cardSize,
                    height: dimensions.cardSize,
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: `translate(-50%, -50%) translateZ(${isActive ? -30 : 15}px) rotateY(${angle * 0.2}deg) scale(${isActive ? 0.75 : 1})`,
                    opacity: imagesLoaded ? (isActive ? 0.6 : 1) : 0,
                    animationDelay: `${i * 200}ms`,
                    zIndex: isActive ? 1 : count - i + 10,
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => handleImageClick(i)}
                >
                  <div
                    className="rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 w-full h-full hover:scale-110 hover:rotate-3"
                    style={{
                      transform: `rotate(${angle / 10}deg) rotateX(8deg)`,
                      filter: isActive ? "brightness(1.3) saturate(1.5) contrast(1.1)" : "brightness(1) saturate(1)",
                      boxShadow: isActive
                        ? "0 0 0 4px rgba(255, 215, 0, 0.8), 0 30px 60px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.5)"
                        : "0 25px 35px -5px rgba(0, 0, 0, 0.5), 0 15px 15px -5px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <img
                      src={src || "/placeholder.svg"}
                      alt={`${imageTheme} image ${i + 1}`}
                      className="block w-full h-full object-cover"
                      draggable={false}
                      style={{
                        transform: `scale(${isActive ? 0.9 : 1})`,
                      }}
                    />
                    
                    {/* Active glow overlay */}
                    {isActive && (
                      <div 
                        className="absolute inset-0 animate-pulse"
                        style={{
                          background: "linear-gradient(135deg, rgba(255, 215, 0, 0.4) 0%, transparent 50%, rgba(147, 51, 234, 0.4) 100%)"
                        }}
                      />
                    )}
                    
                    {/* Hover overlay */}
                    <div 
                      className="absolute inset-0 transition-all duration-300 opacity-0 hover:opacity-100"
                      style={{
                        background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, transparent 50%, rgba(236, 72, 153, 0.3) 100%)"
                      }}
                    />

                    {/* Image number indicator */}
                    <div 
                      className="absolute top-2 right-2 w-6 h-6 bg-black/50 text-white text-xs rounded-full flex items-center justify-center font-bold"
                      style={{
                        backdropFilter: "blur(4px)"
                      }}
                    >
                      {i + 1}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-20 flex-1 flex items-center justify-center px-6 py-12">
          <div
            className="text-center max-w-4xl px-6 opacity-0 animate-fade-in"
            style={{
              animationDelay: "1200ms",
              animationFillMode: "forwards",
            }}
          >
            <h1 
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
              style={{
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 0, 0, 0.6)"
              }}
            >
              {getThemeTitle()}
            </h1>
            <p 
              className="text-xl sm:text-2xl text-white/90 mb-8"
              style={{
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)"
              }}
            >
              {getThemeSubtitle()}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={onPrimaryClick}
                className="w-full sm:w-auto px-12 py-5 rounded-full text-white font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                }}
              >
                {primaryButtonText}
              </button>
              <button
                onClick={onSecondaryClick}
                className="w-full sm:w-auto px-12 py-5 rounded-full text-white text-lg font-semibold transition-all duration-300 hover:scale-105 transform hover:-translate-y-1"
                style={{
                  border: "2px solid rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)"
                }}
              >
                {secondaryButtonText}
              </button>
            </div>

            {/* Status Indicator */}
            <div 
              className="mt-8 text-base text-white/90 flex items-center justify-center gap-3"
              style={{
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.6)"
              }}
            >
              <div 
                className={`w-3 h-3 rounded-full animate-pulse ${backgroundImage !== null ? 'bg-yellow-400' : 'bg-green-400'}`}
                style={{
                  boxShadow: `0 0 10px ${backgroundImage !== null ? 'rgba(255, 215, 0, 1)' : 'rgba(34, 197, 94, 1)'}`
                }}
              />
              {backgroundImage !== null ? (
                <span>🎯 Manual selection active • Click same image to enable auto-slide</span>
              ) : (
                <span>🔄 Auto-sliding every {autoSlideInterval / 1000}s • Click any image to override</span>
              )}
            </div>

            {/* Image counter and theme */}
            <div className="mt-4 text-white/70 text-sm">
              Showing {galleryImages.length} beautiful {imageTheme} images
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroArcGallery

// Export image functions for external use
export { getGalleryImages, getTechImages, getCityImages }