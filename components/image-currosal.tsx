"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const carouselImages = [
  {
    src: "/welfare-work.png",
    alt: "Students in classroom learning",
    title: "Rozgar Aur Umeed, Har Ghar Tak",
    description: "Har haath ko kaam, har ghar mein khushi hum aapko rozgar ke mauqay aur behtareen mustaqbil ki taraf le ja rahe hain.",
  },
  {
    src: "/welfare-work.png",
    alt: "Medical camp providing healthcare",
    title: "Rozgar Se Mily Gi Sabko Khudmukhtari",
    description: "Financial independence aur self-respect ka safar yahin se shuru hota hai.",
  },
  {
    src: "/welfare-work.png",
    alt: "Tree planting environmental initiative",
    title: "Madad Jo Badle Zindagi",
    description: "Free of cost support aur employment solutions jo aapki zindagi ko ek nayi raah par le jayein.",
  },
  {
    src: "/welfare-work.png",
    alt: "Technical training center",
    title: "Harr Qadam Taraqi Ki Raah Parr",
    description: "Rozgar ke har mauqe ke sath aapke sapnon ko haqiqat mein tabdeel karna.",
  },
  {
    src: "/welfare-work.png",
    alt: "Food distribution to families",
    title: "Food Distribution Activities",
    description: "Hamara Azam Sehatmand Pakistan ke sath sath muskurahat bhi aapke ghar le aana hamari zimmedari hai.",
  },
]

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
  }

  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {/* Images */}
      <div className="relative w-full h-full">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in text-white drop-shadow-2xl">{image.title}</h2>
                <p className="text-xl md:text-2xl text-white animate-fade-in-delay drop-shadow-xl">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}