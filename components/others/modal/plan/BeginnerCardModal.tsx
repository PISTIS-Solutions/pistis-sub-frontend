"use client";

import { useRouter } from "next/navigation";

const BeginnerCardModal = () => {
  const router = useRouter();

  return (
    <>
      <button
        disabled
        className="bg-main  disabled:cursor-not-allowed rounded-[10px] font-semibold mt-6 mb-2 h-[52px] flex items-center justify-center text-white"
        onClick={() => router.push("/create-account")}
      >
        {/* Join our upcoming bootcamp */}
        Register Now
      </button>
    </>
  );
};

export default BeginnerCardModal;
