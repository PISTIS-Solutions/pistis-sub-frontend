"use client";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { usePlanStore } from "@/store/plan-store";
import useCheckStatusStore from "@/store/checkStatus";
import IntermediateCard from "@/components/others/pricing/IntermediateCard";

const PaymentPlan = () => {
  const { fetchPlans, isLoading } = usePlanStore();
  const router = useRouter();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return (
    <div className="w-full min-h-screen relative bg-white flex justify-center items-center flex-col">
      <div className="max-w-screen-xl  px-6 mt-6">
        <button
          className="flex items-center absolute top-2 left-2 outline-none gap-x-1 text-[#2E2E2E] font-medium text-lg"
          onClick={() => router.back()}
        >
          <ChevronLeft size={24} />
        </button>
        <section className="text-center text-black flex justify-center items-center flex-col pt-5 pb-10 mx-auto mt-6">
          <span className="bg-[#E6F6FF] rounded-full py-2 px-6 text-main mb-8">
            Pricing Plans
          </span>
          <h1 className="font-semibold pb-2 md:pb-5 text-xl sm:text-xl md:text-5xl">
            We’ve got a plan that’s perfect for you.
          </h1>
          <p className="md:max-w-[65vw] max-w-full md:text-lg sm:text-sm text-xs text-[#484848]">
            Elevate your skills and enhance your learning experience with our
            flexible and affordable payment options tailored to fit your budget
            and learning plans. Now is the perfect time to accelerate
            your career journey!
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-center pb-5 gap-2">
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-between">
            <IntermediateCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;
