import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 container mx-auto px-4 flex items-center justify-center ">
      <span>
        {" "}
        Built with{" "}
        <a
          className="underline"
          href="https://github.com/fengyuanchen/compressorjs"
        >
          compressorjs
        </a>{" "}
        . The source code is available on{" "}
        <a className="underline" href="#">
          GitHUb
        </a>
        .
      </span>
    </footer>
  );
};

export default Footer;
