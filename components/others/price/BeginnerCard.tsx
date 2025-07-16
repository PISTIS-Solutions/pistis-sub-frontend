"use client";
import React from "react";

import stash from "@/src/assets/svg/stash.svg";
import bolt from "@/src/assets/bolt.png";
import Image from "next/image";
import BeginnerCardModal from "../modal/plan/BeginnerCardModal";

const BeginnerCard = () => {
  const services = [
    { serv: "Digital literacy" },
    { serv: "Getting familiar with IT" },
    { serv: "⁠Exploring different Tech Careers" },
    { serv: "Introduction to IT Career Services and guide" },
    { serv: "Introduction to DevOps" },
    { serv: "Data Infographics" },
    { serv: "Troubleshooting" },
  ];

  return (
    <div className="border-2 relative border-main rounded-[10px] w-full lg:w-[32%] px-2 flex-col flex self-stretch">
      <div className="flex justify-between flex-col h-full">
        <div className="px-4">
          <section className="border-b-[0.5px] border-[#CCCCCC] rounded-tr-[4px] rounded-tl-[4px] py-6 ">
            <div className="mb-4">
              <Image src={bolt} alt="thunder bolt icon" />
              {/* TODO: add font */}
            </div>
            <div>
              <h1 className="text-2xl text-[rgb(0,0,102)] font-sfProDisplay font-medium">Beginner</h1>
              <p className="text-sm text-[#3E3E3E] font-sfProDisplay mb-6">
                Introduction to DevOps concepts, tools, and basic practices.
              </p>
            </div>
            <h1 className="text-[40px] h-fit font-sfProDisplay text-main font-medium before:content-['₦'] pl-8 before:left-0 before:top-[6%] before:inline before:text-[26px] before:absolute relative">
              100,000
              <span className="text-main inline-flex text-base font-medium">
                / 8 Weeks
              </span>
            </h1>
          </section>
          <section className="mt-10 h-[45%] overflow-y-scroll">
            {services.map((service, i) => {
              return (
                <div key={i} className="flex py-2 items-top gap-x-1">
                  <Image src={stash} alt="double check mark icon" />
                  <p className="text-sm font-sfProDisplay text-[#1A1A1A] font-medium">
                    {service.serv}
                  </p>
                </div>
              );
            })}
          </section>
        </div>
        <BeginnerCardModal />
      </div>
    </div>
  );
};

export default BeginnerCard;
