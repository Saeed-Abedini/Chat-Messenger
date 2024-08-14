"use client";

import clsx from "clsx";
import Avatar from "components/Avatar";
import { useSession } from "next-auth/react";
import { FullMessageType } from "types";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
  previousSenderId: string;
  isGroup?: boolean;
}

const MessageBox = ({
  data,
  isLast,
  previousSenderId,
  isGroup,
}: MessageBoxProps) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");
  const isFirstMessageFromSender = data.sender.id !== previousSenderId;

  const container = clsx("flex gap-1 py-[0.3px] px-1", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx(
    `flex flex-col ${!isFirstMessageFromSender && isGroup && "px-9"}`,
    isOwn && "items-end"
  );

  const message = clsx(
    "text-sm w-fit overflow-hidden ",
    isOwn
      ? "bg-sky-500 dark:bg-firstChatBox text-white"
      : "bg-gray-100 dark:bg-secondChatBox dark:text-white",
    data.image ? "rounded-md " : "rounded-2xl py-1 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        {isGroup && isFirstMessageFromSender && (
          <div className={avatar}>
            <Avatar user={data.sender} messageBox={true} />
          </div>
        )}
      </div>
      <div className={body}>
        <div className="text-xs text-gray-500 dark:text-gray-100 px-2 pb-0.5">
          {isGroup && isFirstMessageFromSender && data.sender.name}
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt="Image"
              height={288}
              width={288}
              src={data.image}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div className="flex justify-between gap-3 items-center">
              <div>{data.body}</div>
              <div
                className={`text-[10px] pt-1 ${
                  isOwn ? "text-gray-100" : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {format(new Date(data.createdAt), "p")}
              </div>
            </div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500 dark:text-gray-200 pr-2 pt-0.5">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
