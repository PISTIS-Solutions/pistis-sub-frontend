
export const CustomH2 = ({ node, ...props }: any) => (
  <h2 className="text-lg md:text-xl font-bold my-3 text-main" {...props} />
);

export const customH3 = ({ node, ...props }: any) => (
  <h3 className="text-base md:text-lg font-semibold py-2" {...props} />
);

export const customOL = ({ node, ...props }: any) => (
  <ol className="list-decimal text-sm md:text-base px-5 py-2 space-y-1" {...props} />
);

export const customUL = ({ node, ...props }: any) => (
  <ul className="list-disc text-sm md:text-base px-5 py-2 space-y-1" {...props} />
);

export const customP = ({ node, ...props }: any) => (
  <p className="text-[#3E3E3E] text-sm md:text-base text-justify py-2" {...props} />
);

export const customTable = ({ node, ...props }: any) => (
  <div className="overflow-x-auto my-4">
    <table className="w-full border-collapse border border-black" {...props} />
  </div>
);

export const customTH = ({ node, ...props }: any) => (
  <th
    className="bg-main text-white text-xs md:text-sm lg:text-base font-medium p-2 text-left border border-black"
    {...props}
  />
);

export const customTD = ({ node, ...props }: any) => (
  <td
    className="border border-black text-xs md:text-sm lg:text-base p-2 align-top"
    {...props}
  />
);

export const strong = ({ node, ...props }: any) => (
  <strong className="font-semibold text-black" {...props} />
);

export const code = ({ node, ...props }: any) => (
  <code className="text-xs md:text-sm text-white bg-main px-2 py-1 rounded" {...props} />
);

export const customLink = ({ href, children }: any) => {
  if (!href) return null;

  const isYouTube = href.includes("youtube.com") || href.includes("youtu.be");
  const isVimeo = href.includes("vimeo.com");
  const isVideoFile = href.match(/\.(mp4|webm|ogg)$/);

  if (isVideoFile) {
    return (
      <video
        controls
        className="w-full max-w-4xl my-4 rounded-md mx-auto"
        src={href}
      />
    );
  }

  if (isYouTube) {
    const videoId = href.includes("watch?v=")
      ? href.split("watch?v=")[1].split("&")[0]
      : href.split("/").pop();

    return (
      <div className="w-full aspect-video max-w-4xl mx-auto my-4">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full h-full rounded-md"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }

  if (isVimeo) {
    return (
      <div className="w-full aspect-video max-w-4xl mx-auto my-4">
        <iframe
          src={href}
          className="w-full h-full rounded-md"
          title="Vimeo video"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-main font-semibold underline hover:text-main/80 transition-colors"
    >
      {children}
    </a>
  );
};
