"use client";

import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { usePlanStore } from "@/store/plan-store";
import IntermediateCard from "@/components/others/pricing/IntermediateCard";

const PaymentPlan = () => {
  const { fetchPlans, isLoading } = usePlanStore();
  const router = useRouter();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Back Button
        <button
          className="absolute top-2 left-2 flex items-center gap-1 text-[#2E2E2E] text-lg font-medium hover:underline"
          onClick={() => router.back()}
        >
          <ChevronLeft size={20} />
          Back
        </button> */}

        <section className="text-center pt-16 pb-12 px-4">
          <span className="inline-block bg-[#E6F6FF] text-main text-sm md:text-base font-medium rounded-full px-5 py-1.5 mb-6">
            Pricing Plans
          </span>
          <h1 className="text-2xl md:text-4xl font-semibold mb-4 leading-tight">
            We’ve got a plan that’s perfect for you.
          </h1>
          <p className="text-[#484848] text-sm md:text-lg max-w-3xl mx-auto">
            Elevate your skills and enhance your learning experience with our
            flexible and affordable payment options tailored to fit your budget
            and learning goals. Now is the perfect time to accelerate your
            career journey!
          </p>
        </section>

        <div className="flex justify-center gap-6 flex-wrap pb-12">
          <IntermediateCard />
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;
