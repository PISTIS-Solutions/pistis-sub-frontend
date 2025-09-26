"use client";

import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useRef, useState } from "react";
import logo from "@/src/pistis_logo.png";
import Cookies from "js-cookie";
import axios from "axios";
import { urls } from "@/utils/endpoint";
import { usePlanStore } from "@/store/plan-store";
import { toast } from "sonner";
import refreshTokens from "@/utils/refreshToken";
import { Loader2, X } from "lucide-react";

const benefits = [
  "4 one-on-one mentorship sessions per month",
  "6 months of unlimited access",
  "15 courses",
  "15 projects",
  "Group Blocker Sessions",
];

const IntermediateCardModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { plans } = usePlanStore();
  const router = useRouter();

  const [selectedPlan, setSelectedPlan] = useState({
    basePrice: 400000,
    duration: "6months",
    discount: 0.2,
  });

  const [paying, setPaying] = useState(false);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      isOpen &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleClick = async () => {
    const userId = Cookies.get("userId");
    const plan = plans.find((p) => p.name.includes("INTERMEDIATE"));
    if (!plan) return toast.error("Intermediate plan not found.");

    try {
      setPaying(true);
      const accessToken = Cookies.get("authToken");

      const response = await axios.post(
        urls.makeIntermediatePayment,
        { user: userId, plan: plan.id, duration: selectedPlan.duration },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.status === 200) {
        window.open(response.data.payment_data.authorization_url, "_blank");
        toast.success(response.data.message);
        setIsOpen(false);
      } else {
        toast.error("Payment Failed!");
      }
    } catch (err: any) {
      if (err?.response?.status === 401 && !paying) {
        await refreshTokens();
        setTimeout(handleClick, 100);
      } else if (err?.message === "Network Error") {
        toast.error("Check your network!");
      } else {
        toast.error(
          `Payment Failed: ${
            err.response?.data?.user?.email?.[0] || "Unknown error"
          }`
        );
      }
    } finally {
      setPaying(false);
    }
  };

  return (
    <>
      <button
        className="bg-main hover:bg-main/90 transition rounded-[10px] font-semibold mt-6 mb-2 h-[52px] w-full flex items-center justify-center text-white"
        onClick={() => setIsOpen(true)}
      >
        Select Plan
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
          <div
            ref={modalRef}
            className="bg-white overflow-y-scroll h-[90vh] w-[90vw] max-w-xl rounded-2xl p-6 sm:p-10 shadow-xl relative animate-in slide-in-from-bottom"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="flex flex-col items-center gap-4">
              <Image src={logo} alt="Pistis Logo" className="w-16 h-16" />
              <h2 className="text-2xl sm:text-3xl font-bold text-main text-center">
                Intermediate Plan
              </h2>
              <p className="text-sm text-center text-gray-600 max-w-md">
                Before proceeding to payment, ensure you meet the following:
              </p>

              <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 text-left w-full sm:px-6 mt-4 space-y-2">
                {benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="w-full mt-6">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Select a payment schedule:
                </p>

                <div className="space-y-4">
                  {[
                    { basePrice: 400000, duration: "6months", discount: 0.2 },
                    { basePrice: 73000, duration: "30days", discount: 0 },
                  ].map((option) => {
                    const isActive = selectedPlan.duration === option.duration;

                    const discountedPrice =
                      option.basePrice * (1 - option.discount);
                    const vat = discountedPrice * 0.075;

                    return (
                      <div
                        key={option.duration}
                        onClick={() => setSelectedPlan(option)}
                        className={`w-full p-4 border rounded-xl cursor-pointer transition ${
                          isActive ? "border-sub bg-sub/10" : "border-gray-200"
                        }`}
                      >
                        <h3
                          className={`text-xl font-semibold ${
                            isActive ? "text-main" : "text-gray-500"
                          }`}
                        >
                          ₦{option.basePrice.toLocaleString()}
                          <span className="font-normal text-sm text-[#484848]">
                            {" "}
                            + (VAT 7.5%){" "}
                            <span className="text-medium text-[#484848]">
                              ₦
                              {vat.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </span>
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {option.duration === "6months"
                            ? "One-time payment (Save 20%)"
                            : "Billed Monthly for 6 Months"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleClick}
                disabled={paying}
                className="mt-8 w-full py-3 bg-main hover:bg-main/90 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex md:flex-row flex-col items-center justify-center"
              >
                {paying ? (
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                ) : (
                  <>
                    Proceed to Payment{" "}
                    <span className="ml-2 font-bold text-sub">
                      ₦
                      {Math.round(
                        selectedPlan.basePrice *
                          (1 - selectedPlan.discount || 0) *
                          1.075
                      ).toLocaleString()}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IntermediateCardModal;
