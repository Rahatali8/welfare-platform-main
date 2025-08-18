import Link from "next/link"
import { ArrowRight, Heart, Users } from "lucide-react"
import { motion } from "framer-motion"
export default function CallToAction() {
  return (
    <section className="py-12 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="relative mb-8">
          <div className="flex items-center justify-center">
            <div className="hidden lg:block flex-1 mr-8">
              <div className="h-0.5 bg-gradient-to-l from-blue-600 via-cyan-500 to-transparent"></div>
            </div>
            <div className="text-center px-8">
              <h2 className="text-5xl md:text-5xl font-bold mb-3 text-[#1B0073]">Join Our <span className="text-[#00A5E0]">Mission</span></h2>
              <p className="text-lg text-[#5F5F5F] max-w-3xl mx-auto">
                Together, we can create lasting change in the lives of those who need it most. Your support makes a real
                difference in our community.
              </p>
            </div>
            <div className="hidden lg:block flex-1 ml-8">
              <div className="h-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent"></div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Donate Card */}
          <motion.div 
            className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center border border-white/30 shadow-xl group"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="w-12 h-12  bg-gradient-to-r from-[#1B0073] to-[#00A5E0] hover:opacity-90 text-white backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 group-hover:rotate-[360deg] transition-transform duration-700"
            >
              <Heart className="w-6 h-6 text-bold text-white" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-3">Make a Donation</h3>
            <p className="text-gray mb-4 text-sm">
              Your generous contribution helps us continue our vital work in education, healthcare, and community
              support.
            </p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/donate"
                className="inline-flex items-center  bg-gradient-to-r from-[#1B0073] to-[#00A5E0] hover:opacity-90 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm group"
              >
                Donate Now
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Partner Card */}
          <motion.div 
            className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center border border-white/30 shadow-xl group"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="w-12 h-12  bg-gradient-to-r from-[#1B0073] to-[#00A5E0] hover:opacity-90 text-white backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 group-hover:rotate-[360deg] transition-transform duration-700"
            >
              <Users className="w-6 h-6 text-bold text-white" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-3">Become a Partner</h3>
            <p className="text-gray mb-4 text-sm">
              Join our network of volunteers and partners to make a direct impact in our community programs.
            </p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/donor/signup"
                className="inline-flex items-center  bg-gradient-to-r from-[#1B0073] to-[#00A5E0] hover:opacity-90 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm group"
              >
                Get Involved
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
