"use client";
import React, { useState } from "react";
import Image from "next/image";

import logo from "@/src/pistis_logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, KeyRound, Loader2Icon, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";

import axios from "axios";
import { urls } from "@/utils/endpoint";
import { toast } from "sonner";

const ResendToken = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const resendToken = async (e: any) => {
    e.preventDefault();

    const cleanedEmail = email.trim();
    if (!cleanedEmail) {
      toast.error("Input email address");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        urls.resendToken,
        { email: cleanedEmail },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 204) {
        toast.success("Check your email for a new token");
      }
    } catch (error: any) {
      if (error?.message === "Network Error") {
        toast.error("Check your network!");
      } else if (
        error?.response?.data?.email?.[0] === "Email does not Exist "
      ) {
        toast.error("Email address is invalid");
      } else {
        toast.error(error?.response?.data?.detail || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="lg:max-w-[75.4%] flex flex-col lg:my-6 w-full gap-y-6">
        <div className="flex justify-end">
          <Image src={logo} alt="pistis_logo" className="" priority />
        </div>
        <div className="">
          <h1 className="md:text-4xl sm:text-2xl text-xl font-semibold">
            Resend Validation Email?
          </h1>
          <h3 className="md:text-2xl sm:text-lg text-base">
            Please provide your registered email address
          </h3>
        </div>
        <div className="flex flex-col">
          <div>
            <div>
              <label className="md:text-xl text-lg font-medium">
                Email Address
              </label>
              <div>
                <div className="relative">
                  <Mail className="mr-2 absolute top-4 text-[#4F5B67] left-3 h-5 w-5" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="py-6 bg-[#FAFAFA] placeholder:text-[#4F5B67] mb-10 rounded-[6px] indent-6"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              {/* <FormMessage /> */}
            </div>
            <Button
              disabled={loading || !email}
              onClick={(e) => {
                resendToken(e);
              }}
              type="submit"
              className="w-full disabled:cursor-not-allowed disabled:bg-sub/20 mt-10 bg-[#33CC99] py-6 font-medium text-sm md:text-xl lg:text-2xl text-black hover:text-white"
            >
              {loading ? <Loader2Icon className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResendToken;
