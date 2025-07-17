"use client";

import axios from "axios";
import { CheckCircle, ChevronLeft, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { baseURL } from "@/utils/endpoint";
import { toast } from "sonner";

const PaymentVerification = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [txRef, setTxRef] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTxRef(params.get("reference"));
  }, []);

  const transactionProcess = async () => {
    if (!txRef) return;

    try {
      const response = await axios.get(
        `${baseURL}/subscriptions/payment/callback/${txRef}`
      );

      if (response.status === 200) {
        toast.success("Payment Successful!");
        setPaymentSuccess(true);
      } else {
        toast.error("Something went wrong!");

        setPaymentSuccess(false);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      setPaymentSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (txRef) {
      transactionProcess();
    }
  }, [txRef]);

  return (
    <div className="">
      <button
        className="flex items-center outline-none gap-x-1 text-[#2E2E2E] font-medium text-lg"
        onClick={() => router.push("/sign-in")}
      >
        <ChevronLeft size={24} /> Pricing Plan
      </button>
      <div className="h-screen p-2">
        <div className="flex flex-col items-center justify-center min-h-[70%]">
          {/* Always show loading first */}
          {loading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="animate-spin text-gray-500 w-12 h-12" />
              <p className="text-gray-700 text-lg mt-3">
                Processing Transaction...
              </p>
            </div>
          ) : paymentSuccess ? (
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
              {/* Success UI */}
              <CheckCircle className="text-green-500 w-16 h-16 mx-auto animate-bounce" />
              <h2 className="text-2xl font-semibold text-green-600 mt-4">
                Payment Successful!
              </h2>
              <p className="text-gray-700 mt-2">
                Your transaction was processed successfully. Please, close
                previous tab and login again to proceed
              </p>
              <button
                onClick={() => router.push("/sign-in")}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
              >
                Continue!
              </button>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
              <XCircle className="text-red-500 w-16 h-16 mx-auto animate-pulse" />
              <h2 className="text-2xl font-semibold text-red-600 mt-4">
                Payment Failed!
              </h2>
              <p className="text-gray-700 mt-2">
                Something went wrong with your transaction.
              </p>
              <button
                onClick={() => router.push("/sign-in")}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Continue!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentVerification;
