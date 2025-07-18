"use client";

import { Eye, EyeOff, KeyRound, Loader2, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import mainLogo from "@/public/mainLogo.png";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { baseURL, urls } from "@/utils/endpoint";
import bg from "@/public/assets/signIn/sign-in-bg.png";
import kim from "@/public/assets/signIn/kim.png";
import google from "@/public/assets/auth/google.svg";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function containsSpecialCharacters(str: string): boolean {
    const specialCharacters = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;
    return specialCharacters.test(str);
  }

  const onsubmitLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!containsSpecialCharacters(password)) {
        toast.error("Password must contain at least one special character.");
        return;
      }

      if (email === "" || password === "") {
        toast.error("Input email and password.");
        return;
      }

      const url = urls.signin;

      const response = await axios.post(url, {
        email,
        password,
      });

      if (response.status === 200) {
        Cookies.set("authToken", response?.data?.access, {
          sameSite: "None",
          secure: true,
        });

        Cookies.set("refreshToken", response?.data?.refresh, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("userId", response?.data?.user?.id, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("status", response?.data?.user?.status, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("pfp", response?.data?.user?.profile_phote, {
          sameSite: "None",
          secure: true,
        });
        toast.success("Email and password accepted!");
        // router.replace("/courses");
        response?.data?.user?.status === "Paid"
          ? router.replace("/courses")
          : router.replace("/payment-plan");
      }
    } catch (error: any) {
      if (error?.message === "Network Error") {
        toast.error("Check your network!");
      } else if (
        error.response.data.detail ===
        "No active account found with the given credentials"
      ) {
        toast.error("Incorrect password or email!");
      } else {
        toast.error(error?.response?.data?.detail);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    router.push(`${baseURL}/google/init/`);
  };

  return (
    <div className="flex justify-between">
      <div className="hidden md:block p-2 w-1/2 h-screen relative">
        <div className="relative  h-full ">
          <Image
            onClick={() => router.replace("/")}
            src={bg}
            alt="auth image"
            className=" object-fill w-full h-full"
          />
          <div className="w-[80%] p-3 bg-white/5 border-2 rounded-[20px] border-white absolute bottom-5 left-2 ">
            <p className="font-normal  text-white text-xs lg:text-sm">
              “The most powerful thing about DevOps is the way it encourages
              cross-team collaboration and learning. It breaks down silos and
              enables everyone to contribute to the entire lifecycle of
              software, from idea to production, fostering a culture of
              continuous improvement and innovation.”
            </p>
            <div className="flex items-center gap-2 my-2">
              <Image src={kim} alt="gene" />
              <p className="lg:text-2xl text-lg font-semibold text-white">
                Gene Kim
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full md:w-1/2 overflow-y-scroll h-screen">
        <div className="bg-white w-[100%]  h-screen rounded-none lg:rounded-tl-[40px] lg:rounded-bl-[40px] flex flex-col justify-center gap-y-6 lg:gap-y-10 px-5  md:px-6 lg:px-10">
          <Image className="mx-auto" src={mainLogo} alt="logo" priority />
          <div>
            <h1 className="text-main text-center text-xl sm:text-2xl md:text-[32px] font-bold">
              Welcome Back
            </h1>
            <p className="text-xs text-center  text-gray-500">
              Glad to have you back! Enter your details and jump right back in.
            </p>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className=" flex items-center py-2 justify-center sm:text-base text-sm outline-none rounded-lg border border-[#DADADA] bg-white shadow-sm hover:bg-[#E0E0E0] text-[#666666] font-medium gap-x-2"
          >
            <Image src={google} alt="google icon" />
            Log in with Google
          </button>

          <span className="before:absolute relative before:h-[1px] before:w-[45%] before:-left-0 text-center before:bg-[#BDBDBD] before:top-[45%] font-medium text-[#666666] after:absolute after:h-[1px] after:w-[45%] after:-right-0 after:bg-[#BDBDBD] after:top-[45%]">
            or
          </span>
          <form onSubmit={onsubmitLogin} className=" w-full space-y-2">
            <div>
              <label className="text-[#2E2E2E] mb-1 sm:text-base text-sm">
                Email Address
              </label>
              <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
                <div className="border-[#DADADA] h-[70%] border-r-[1.5px] pr-3 items-center flex">
                  <Mail className=" text-[#9F9F9F] h-5 w-5" />
                </div>
                <input
                  type="email"
                  className="outline-none bg-transparent sm:text-base text-sm placeholder:text-[#9F9F9F] w-full"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-[#2E2E2E] mb-1 sm:text-base text-sm">
                Password
              </label>
              <div className="h-[50px] flex items-center bg-[#FAFAFA] px-[14px] gap-3 rounded-[6px] border border-[#DADADA]">
                <div className="border-[#DADADA] h-[70%] border-r-[1.5px] pr-3 items-center flex">
                  <KeyRound className=" text-[#666666] h-5 w-5" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  className="outline-none sm:text-base text-sm bg-transparent placeholder:text-[#9F9F9F] w-full"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div
                  className="hover:cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className=" text-[#666666] h-5 w-5" />
                  ) : (
                    <EyeOff className=" text-[#666666] h-5 w-5" />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-main text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex justify-center">
                  <Loader2 className="animate-spin" />
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div>
            <p className="text-center font-medium text-sm my-2 md:text-base">
              Don't have an account?{" "}
              <Link className="text-main font-semibold" href="/create-account">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
