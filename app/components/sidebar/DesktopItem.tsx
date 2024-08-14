"use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem = ({
  href,
  icon: Icon,
  label,
  onClick,
  active,
}: DesktopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-black dark:hover:bg-slate-800 hover:bg-gray-100`,
          active && "dark:bg-slate-800 bg-gray-100 dark:!text-white !text-black"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
