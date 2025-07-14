"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
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
} from "@/utils/markDownComp";

interface Props {
  path: string;
}

export default function MarkdownViewer({ path }: Props) {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      const res = await fetch(
        `https://api.github.com/repos/${process.env.NEXT_PUBLIC_GITHUB_OWNER}/${process.env.NEXT_PUBLIC_GITHUB_REPO}/contents/${path}?ref=${process.env.NEXT_PUBLIC_GITHUB_BRANCH}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
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
          a: customLink,
        }}
      />
    </div>
  );
}
