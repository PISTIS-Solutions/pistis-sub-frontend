"use client";

import { Eye, EyeOff, KeyRound, Loader2, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import mainLogo from "@/public/mainLogo.png";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { urls } from "@/utils/endpoint";

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

      console.log(response, "response from signin");
      if (response.status === 200) {
        Cookies.set("authToken", response?.data?.access, {
          sameSite: "None",
          secure: true,
        });

        Cookies.set("refreshToken", response?.data?.refresh, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("userId", response.data.user.id, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("status", response.data.user.status, {
          sameSite: "None",
          secure: true,
        });
        Cookies.set("pfp", response.data.user.profile_photo, {
          sameSite: "None",
          secure: true,
        });
        toast.success("Email and password accepted!");
        router.replace("/courses");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={onsubmitLogin}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm space-y-2"
      >
        {/* <h2 className="text-xl text-black font-semibold text-center">Login</h2> */}
        <Image className="mx-auto" src={mainLogo} alt="logo" priority />
        <p className="text-xs text-center my-5 text-gray-500">
          Welcome, Login with the provided email and password
        </p>
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
    </div>
  );
}
