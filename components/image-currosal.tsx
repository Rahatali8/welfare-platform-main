"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const carouselImages = [
  {
    src: "/quality-education.jpg?height=600&width=1200",
    alt: "Students in classroom learning",
    title: "Quality Education",
    description: "Providing world-class education to underserved communities",
  },
  {
    src: "/food-security.jpg?height=600&width=1200",
    alt: "Food distribution to families",
    title: "Food Security",
    description: "Ensuring no family goes hungry in our communities",
  },
  {
    src: "/health-care.jpg?height=600&width=1200",
    alt: "Medical camp providing healthcare",
    title: "Healthcare Access",
    description: "Bringing essential medical services to remote areas",
  },
  {
    src: "/environment.jpg?height=600&width=1200",
    alt: "Tree planting environmental initiative",
    title: "Environmental Care",
    description: "Creating a sustainable future through environmental initiatives",
  },
  {
    src: "/skill-devp.jpg?height=600&width=1200",
    alt: "Technical training center",
    title: "Skills Development",
    description: "Empowering youth with technical and vocational skills",
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