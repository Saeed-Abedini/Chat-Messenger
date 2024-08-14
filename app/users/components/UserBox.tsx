"use client";

import { User } from "@prisma/client";
import axios from "axios";
import Avatar from "components/Avatar";
import LoadingModal from "components/LoadingModal";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
  data: User;
}

const UserBox = ({ data }: UserBoxProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { userId: data.id })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}

      <div
        className="w-full relative flex items-center space-x-3 bg-white dark:bg- px-3 py-2 dark:bg-transparent dark:hover:!bg-gray-600 hover:bg-neutral-100 transition cursor-pointer"
        onClick={handleClick}
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {data.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
