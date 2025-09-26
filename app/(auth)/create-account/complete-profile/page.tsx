"use client";
import React, { useState } from "react";
import Image from "next/image";

import logo from "@/src/pistis_logo.png";
import Link from "next/link";

import Fulllogo from "@/src/assets/auth/full-logo.png";
import { useRouter } from "next-nprogress-bar";
import axios from "axios";
import { Loader2 } from "lucide-react";
import useFormStore from "@/store/create-account";
import { baseURL } from "@/utils/endpoint";
import { toast } from "sonner";
import { nigerianStates } from "@/data/data";

const Completeprofile = () => {
  const formStore = useFormStore();
  const [loading, setLoading] = useState<boolean>();
  const [success, setSuccess] = useState<boolean>(false);

  const router = useRouter();

  const onSubmitCompleteProfile = async (e: any) => {
    e.preventDefault();
    try {
      const user_id = localStorage.getItem("user_id");

      if (!user_id) {
        toast.error("User ID not found in local storage.");
        return;
      }
      const url = `${baseURL}/users/student/${user_id}/complete_profile/`;
      setLoading(true);
      const response = await axios.patch(url, {
        full_name: formStore.Fullname,
        phone_number: formStore.Phone,
        location: formStore.location,
      });

      if (response.status === 200) {
        toast.success("Profile Created Successfully!");
        setSuccess(true);
        // setLoading(true);
        router.push("/sign-in");
      }
    } catch (error: any) {
      if (error?.message === "Network Error") {
        toast.error("Check your network!");
      } else {
        toast.error(error?.response?.data?.detail || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:max-w-[75.4%] flex flex-col lg:my-6 w-full gap-y-6">
      <div className="h-auto block md:hidden w-full bg-main p-2">
        <Image src={Fulllogo} alt="logo" />
      </div>
      <div className="flex justify-end">
        <Image
          src={logo}
          alt="pistis_logo"
          className="md:block hidden"
          priority
        />
      </div>
      <div className="px-2 my-10 md:my-0 md:px-0">
        <h1 className="md:text-4xl sm:text-2xl text-xl font-semibold">
          Complete your profile
        </h1>
        <h3 className="md:text-2xl sm:text-lg text-base">
          Please provide personal details
        </h3>
      </div>
      <div></div>
      <div className="px-2 md:px-0">
        <form onSubmit={onSubmitCompleteProfile} className="space-y-3">
          <div>
            <label className="text-[#3E3E3E] md:text-xl sm:text-base text-sm">
              Full name
            </label>
            <input
              type="text"
              className="py-4 bg-[#FAFAFA] w-full text-xs md:text-base placeholder:text-[#4F5B67] rounded-[6px] indent-4"
              placeholder="Enter Full name"
              value={formStore.Fullname}
              onChange={(e) => formStore.setField("Fullname", e.target.value)}
            />
          </div>

          <div>
            <label className="text-[#3E3E3E] md:text-xl sm:text-base text-sm">
              Phone number
            </label>
            <input
              className="py-4 bg-[#FAFAFA] w-full text-xs md:text-base placeholder:text-[#4F5B67] rounded-[6px] indent-4"
              placeholder="Input phone number"
              type="text"
              value={formStore.Phone}
              onChange={(e) => formStore.setField("Phone", e.target.value)}
            />
          </div>

          <div>
            <label className="text-[#3E3E3E] md:text-xl sm:text-base text-sm">
              Location
            </label>
            <select
              className="py-4 bg-[#FAFAFA] w-full text-xs md:text-base placeholder:text-[#4F5B67] rounded-[6px] indent-4"
              value={formStore.location}
              onChange={(e) => formStore.setField("location", e.target.value)}
            >
              <option value="" disabled>
                Select Location
              </option>
              {nigerianStates.map((single, index) => (
                <option key={index} value={single}>
                  {single}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#33CC99] py-4 flex justify-center items-center rounded-[8px] font-medium text-lg md:text-2xl text-black hover:text-white"
          >
            {loading ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              <>Proceed</>
            )}
          </button>
        </form>
      </div>
      <div>
        <p className="text-center text-sm absolute bottom-2 md:sticky w-full md:text-lg font-normal ">
          Already have an account?{" "}
          <Link className="text-main font-semibold" href="/sign-in">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Completeprofile;
