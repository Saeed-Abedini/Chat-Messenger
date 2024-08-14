"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users: User[];
}
const AvatarGroup = ({ users }: AvatarGroupProps) => {
  const slicedUsers = users.slice(0, 3);
  const positionMap = {
    0: "top-0 left-[13px]",
    1: "bottom-1 ",
    2: "bottom-1 right-0.5",
  };

  return (
    <div className="relative h-10 w-10 border rounded-full">
      {slicedUsers.map((user, index) => (
        <div
          className={`absolute inline-block rounded-full overflow-hidden h-[16px] w-[16px] ${
            positionMap[index as keyof typeof positionMap]
          }`}
          key={user.id}
        >
          <Image
            alt="Avatar"
            fill
            src={user?.image || "/images/placeholder.png"}
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
