"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

const UserList = ({ items }: UserListProps) => {
  return (
    <aside className="fixed inset-y-0 lg:left-20  lg:w-80 lg:block overflow-y-auto border-r border-gray-200 dark:border-black dark:bg-darkSideBar block w-full left-0">
      <div className="text-xl py-2 pl-5 font-bold text-neutral-800 dark:text-white border-b border-b-gray-300 dark:border-b-gray-600">
        People
      </div>
      <div className="flex-col">
        <div className="text-2xl font-bold text-neutral-800">
          {items.map((item) => (
            <UserBox key={item.id} data={item} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default UserList;
