"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem = ({ href, icon: Icon, onClick, active }: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 
        dark:bg-darkBg
        dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-black dark:hover:bg-slate-800 hover:bg-gray-100`,
        active && "dark:bg-slate-800 bg-gray-100 dark:!text-white !text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
