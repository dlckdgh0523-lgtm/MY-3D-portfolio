import siteData from "../data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-10 px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#555568]" style={{ fontSize: "0.8rem" }}>
          &copy; {new Date().getFullYear()} {siteData.name}. All rights
          reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href={siteData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#555568] transition-colors duration-300 hover:text-[#b8b9ff]"
            style={{ fontSize: "0.8rem" }}
          >
            GitHub
          </a>
          <a
            href={siteData.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#555568] transition-colors duration-300 hover:text-[#b8b9ff]"
            style={{ fontSize: "0.8rem" }}
          >
            Blog
          </a>
        </div>
      </div>
    </footer>
  );
}
