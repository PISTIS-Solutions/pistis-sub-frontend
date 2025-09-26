"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  CustomH2,
  code,
  customH3,
  customOL,
  customP,
  customTD,
  customTH,
  customUL,
  strong,
  customLink,
  customTable,
} from "@/utils/markDownComp";

interface Props {
  path: string;
}

export default function MarkdownViewer({ path }: Props) {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      const res = await fetch(
        `https://api.github.com/repos/${process.env.NEXT_src_GITHUB_OWNER}/${process.env.NEXT_src_GITHUB_REPO}/contents/${path}?ref=${process.env.NEXT_src_GITHUB_BRANCH}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_src_GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      const data = await res.json();
      if (data?.content && data?.encoding === "base64") {
        const decoded = atob(data.content);
        setMarkdown(decoded);
      }
    };

    fetchMarkdown();
  }, [path]);

  return (
    <div className="prose dark:prose-invert max-w-none mt-8">
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkGfm]}
        components={{
          h2: CustomH2,
          h3: customH3,
          ol: customOL,
          p: customP,
          ul: customUL,
          th: customTH,
          td: customTD,
          strong: strong,
          code: code,
          table: customTable,
          a: customLink,
        }}
      />
    </div>
  );
}
