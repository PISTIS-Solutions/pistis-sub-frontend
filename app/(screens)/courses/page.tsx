"use client";

import MarkdownViewer from "@/components/others/markDownViewer";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import pistisLogo from "@/src/pistis_logo.png";
import { IoIosWarning } from "react-icons/io";

interface GitHubItem {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url: string | null;
}

export default function CoursesPage() {
  const [items, setItems] = useState<GitHubItem[]>([]);
  const [path, setPath] = useState("");
  const router = useRouter();
  const [selectedMarkdownPath, setSelectedMarkdownPath] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(true);

  const fetchContents = async (folder = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/repos/${process.env.NEXT_PUBLIC_GITHUB_OWNER}/${process.env.NEXT_PUBLIC_GITHUB_REPO}/contents/${folder}?ref=${process.env.NEXT_PUBLIC_GITHUB_BRANCH}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      const data = await res.json();
      setItems(data);
      setPath(folder);
      setSelectedMarkdownPath(null);
    } catch (err) {
      console.error("Failed to fetch GitHub contents", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const signOut = () => {
    Cookies.remove("authToken");
    router.replace("/");
  };

  return (
    <div className="sm:p-6 p-4 max-w-3xl sm:max-w-5xl mx-auto">
      <div className="flex items-center bg-main w-full fixed top-0 left-0">
        <Image src={pistisLogo} alt="logo" className="w-[50px]" priority />
        <p className="text-sm text-white sm:text-base font-semibold">
          Pistis TechHub
        </p>
      </div>
      <h1
        onClick={() => fetchContents("/")}
        className="md:text-3xl cursor-pointer text-base sm:text-2xl font-semibold mt-8 mb-4"
      >
        📁 Courses/Projects Explorer
      </h1>

      {path && (
        <button
          className="text-main text-sm sm:text-base underline mb-4"
          onClick={() => {
            const parent = path.split("/").slice(0, -1).join("/");
            fetchContents(parent);
          }}
        >
          ⬅️ Back
        </button>
      )}

      {loading ? (
        <span className="w-full text-sm sm:text-base flex items-center gap-2 justify-center">
          <Loader2 className="animate-spin" />
          <p>Loading</p>
        </span>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.path}
              className="sm:p-4 p-2 bg-white rounded shadow flex justify-between items-center hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                if (item.type === "dir") {
                  fetchContents(item.path);
                } else if (item.name.endsWith(".md")) {
                  setSelectedMarkdownPath(item.path);
                } else if (item.download_url) {
                  window.open(item.download_url, "_blank");
                }
              }}
            >
              <span className="text-sm sm:text-base">
                {item.type === "dir"
                  ? "📁"
                  : item.name.endsWith(".md")
                  ? "📝"
                  : "📄"}{" "}
                {item.name}
              </span>
              {item.download_url &&
                item.type === "file" &&
                !item.name.endsWith(".md") && (
                  <a
                    href={item.download_url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="sm:text-sm text-xs text-main"
                  >
                    Open
                  </a>
                )}
            </li>
          ))}
        </ul>
      )}

      {selectedMarkdownPath && (
        <>
          <h2 className="md:text-2xl text-sm sm:text-base mt-10 font-semibold">
            📝 Preview: {selectedMarkdownPath}
          </h2>
          <MarkdownViewer path={selectedMarkdownPath} />
        </>
      )}

      <hr className="my-5" />
      <div className="flex w-full items-center gap-2 mt-5 ">
        <IoIosWarning className="text-main flex-none w-5 h-5" />
        <div className="text-xs sm:text-sm">
          Note: Upon completion of every Projects, you're to send the project
          document link or your github repository link to this email address{" "}
          <a
            href="thepitistechhublearning@gmail.com"
            className="cursor-pointer text-main italic"
            target="_blank"
          >
            thepitistechhublearning@gmail.com
          </a>{" "}
          using this format; <br />
        </div>
      </div>
      <span className="text-xs sm:text-sm">
        <p>
          <span className="text-main font-semibold">Subject: </span>(Course
          Title) e.g Onboarding Project.
        </p>
        <p>
          <span className="text-main font-semibold">Body:</span> Paste or Attach
          the project link, then write few comments about the project you just
          completed.
        </p>
      </span>

      <div className="w-full flex justify-end">
        <button
          onClick={signOut}
          className="bg-sub text-white rounded-sm px-3 text-sm py-2 cursor-pointer mt-5"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
