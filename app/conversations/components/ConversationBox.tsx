"use client";

import clsx from "clsx";
import Avatar from "components/Avatar";
import useOtherUser from "hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { FullConversationType } from "types";
import { format } from "date-fns";
import AvatarGroup from "components/AvatarGroup";
import { MdGroups } from "react-icons/md";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center transition cursor-pointer px-3 py-2 `,
        selected
          ? "bg-neutral-100 dark:bg-selectedChat"
          : "bg-white dark:bg-transparent hover:!bg-neutral-100 dark:hover:!bg-gray-600"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1 ml-2">
            <p className=" flex gap-1 items-center text-sm font-medium text-gray-900 dark:text-white">
              {data.isGroup && (
                <span>
                  <MdGroups size={20} />
                </span>
              )}
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 dark:text-gray-100 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <div>
            <p
              className={clsx(
                `truncate text-sm ml-2`,
                hasSeen
                  ? "text-gray-500 dark:text-gray-300"
                  : "text-black dark:text-white font-medium"
              )}
            >
              {lastMessageText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
