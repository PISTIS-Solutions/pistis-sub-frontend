"use client";
import React from "react";
import doubleTick from "@/src/assets/payment/doubletick.svg";
import Image from "next/image";
import IntermediateCardModal from "../modal/plan/IntermediateCardModal";

const IntermediateCard = () => {
  const services = [
    "Hands-on experience",
    "Access to structured learning",
    "Personalized Project Feedback",
    "Real-world project-based learning approach",
    "Group Blocker Sessions",
    "6 months of unlimited access",
    "Resume reviews and mock interviews",
    "Expert-led monthly 4 one-on-one mentorship sessions",
  ];

  return (
    <div className="border-2 border-[#DADADA] rounded-[10px] w-full flex flex-col justify-between p-4 bg-white shadow-sm transition duration-200 hover:shadow-md">
      <section className="border-b border-[#CCCCCC] pb-6">
        <div className="flex items-center justify-between mb-4">
          <Image src={doubleTick} alt="check icon" />
          <span className="bg-[#C2E8FF] text-[#001D3D] text-xs px-3 py-1 rounded-sm font-semibold">
            Recommended
          </span>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl text-[#000066] font-semibold">Intermediate</h2>
          <p className="text-sm text-[#3E3E3E] mt-1">
            Expanding on foundational knowledge with practical tools and workflows.
          </p>
        </div>

        <h1 className="text-[36px] text-main font-bold relative pl-8">
          ₦400,000
          <span className="text-base font-medium ml-1">/ 6 Months</span>
        </h1>
      </section>

      <section className="mt-6 space-y-2 max-h-[220px] overflow-y-auto pr-1">
        {services.map((service, i) => (
          <div key={i} className="flex items-start gap-2">
            <Image src={doubleTick} alt="check mark" />
            <p className="text-sm text-[#1A1A1A] font-medium leading-snug">
              {service}
            </p>
          </div>
        ))}
      </section>

      <div className="mt-6">
        <IntermediateCardModal />
      </div>
    </div>
  );
};

export default IntermediateCard;
