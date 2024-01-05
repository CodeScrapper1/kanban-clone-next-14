import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import localFont from "next/font/local";
const font = localFont({
  src: "../../public/fonts/font.woff2",
});

const Header = () => {
  return (
    <div className="fixed z-50 top-0 px-4 w-full h-14 border-b  shadow-sm bg-white flex items-center justify-between">
      <div className="hidden md:flex">
        <Link href="/">
          <div className="hover:opacity-70 transition flex items-center gap-x-2">
            <Image src="/logo.png" alt="Logo" height={50} width={50} />
            <p className={cn("text-lg text-slate-500 pb-1", font.className)}>
              Code Scrapper
            </p>
          </div>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          appearanace={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearanace={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Header;
