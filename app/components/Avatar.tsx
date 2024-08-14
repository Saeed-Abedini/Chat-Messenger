"use client";

import { User } from "@prisma/client";
import useActiveList from "hooks/useActiveList";
import Image from "next/image";

interface AvatarProps {
  user: User;
  messageBox?: boolean;
}

const Avatar = ({ user, messageBox }: AvatarProps) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div
        className={`relative inline-block rounded-full overflow-hidden  ${
          messageBox ? "h-6 w-6 md:h-7 md:w-7" : " h-8 w-8 md:h-10 md:w-10"
        }`}
      >
        <Image
          alt="avatar"
          src={user?.image || "/images/placeholder.png"}
          fill
        />
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
      )}
    </div>
  );
};

export default Avatar;
