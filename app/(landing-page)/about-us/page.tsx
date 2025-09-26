"use client";
import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import aboutBack from "@/src/assets/landing/about/aboutBack.png";
import aboutImg from "@/src/assets/landing/about/abtImage.png";
import NavigationBar from "@/components/others/landing/nav";
import Benefits from "@/components/others/landing/benefits";
import Slides from "@/components/others/landing/slides";
import Learning from "@/components/others/landing/learning";
import Footer from "@/components/others/landing/footer";

const AboutUs = () => {
  return (
    <div className="bg-white">
      <NavigationBar />
      <div
        style={{ backgroundImage: `url(${aboutImg.src})` }}
        className=" mx-3 md:bg-none bg-cover md:rounded-none rounded-[32px] bg-abtImage md:mx-7 lg:mx-14 relative"
      >
        <Image
          src={aboutBack}
          alt="landing background"
          priority
          className="w-full hidden md:block"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:absolute static  ml-0 lg:ml-6 my-0 lg:my-14 p-4 lg:p-10 left-0 top-0"
        >
          <div className="rounded-[6px] text-white bg-white/20 inline-block px-4 py-1 lg:py-2 font-medium text-sm md:text-base lg:text-lg">
            🚀 Automate and Innovate
          </div>

          <h1 className="lg:text-4xl text-2xl md:text-3xl font-normal py-2 lg:py-4 text-white sm:text-left max-w-full md:max-w-[740px] text-center">
            Discover Our Mission to
            <span className=""> Empower Larners and Shape</span> <br />
            the Future of Education
          </h1>
          <p className="lg:text-base text-xs sm:text-left text-center md:text-sm font-normal max-w-[581px] pb-2 lg:pb-4 text-white">
            We're passionate about creating transformative learning experiences
            that equip individuals with the skills and knowledge they need to
            thrive. Learn more about our journey and the values that drive us
            forward.
          </p>
        </motion.div>
      </div>
      <Benefits />
      <Slides />
      <Learning />
      <Footer />
    </div>
  );
};

export default AboutUs;
