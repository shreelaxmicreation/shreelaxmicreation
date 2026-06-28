'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section id="hero" className="relative w-full min-h-[85vh] lg:min-h-screen overflow-hidden bg-[var(--canvas)] lg:bg-transparent flex flex-col justify-start">
      
      {/* Background Image (All Screens) */}
      <div className="absolute inset-0 z-0 top-[80px]">
        <Image 
          src="/images/hero.PNG"
          alt="Reliable Shirting Fabric solution"
          fill
          className="object-cover object-[center_top]"
          priority
        />
      </div>

      {/* Gradient overlay for mobile only - fades out so model is visible at bottom */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#F7F4EB] via-[#F7F4EB]/80 to-transparent backdrop-blur-[2px] lg:hidden" />

      <div className="container mx-auto px-4 md:px-6 relative z-20 flex flex-col lg:flex-row items-center lg:items-start justify-between pt-24 pb-20 lg:pt-40 lg:pb-32 flex-grow">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left mt-6 lg:my-auto"
        >
          <h1 className="font-display text-5xl sm:text-6xl xl:text-[4.75rem] mb-8 tracking-tight font-medium text-[#1C315E] leading-[1.15]">
            Reliable Shirting <br /> Fabric solution
          </h1>
          <p className="text-xl md:text-2xl text-[#1C315E]/80 lg:text-[#8A8578] mb-12 max-w-xl font-medium lg:font-normal leading-relaxed">
            Shree Laxmi Creation <br className="hidden sm:block" />
            Ahmedabad • Mumbai • Ichalkaranji
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto mt-4">
            <Link href="/products">
              <Button size="lg" className="rounded-full px-6 sm:px-10 bg-[#1C315E] hover:bg-[var(--brand)] text-white text-base sm:text-lg h-14 transition-all hover:scale-105 shadow-xl font-medium whitespace-nowrap">
                View Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-6 sm:px-10 border-2 border-[#1C315E] text-[#1C315E] hover:bg-[#1C315E] hover:text-white text-base sm:text-lg h-14 transition-all hover:scale-105 bg-white/50 backdrop-blur-sm font-medium whitespace-nowrap">
                Get in Touch
              </Button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
