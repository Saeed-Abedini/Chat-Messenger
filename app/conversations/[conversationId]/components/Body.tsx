"use client";

import useConversation from "hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import { FullMessageType } from "types";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@libs/pusher";
import { find } from "lodash";
interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body = ({ initialMessages }: BodyProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    if (typeof conversationId === "string") {
      pusherClient.subscribe(conversationId);
      bottomRef?.current?.scrollIntoView();

      const messageHandler = (message: FullMessageType) => {
        axios.post(`/api/conversations/${conversationId}/seen`);
        setMessages((current) => {
          if (find(current, { id: message.id })) {
            return current;
          }
          return [...current, message];
        });
        bottomRef?.current?.scrollIntoView();
      };

      const updateMessageHandler = (newMessage: FullMessageType) => {
        setMessages((current) =>
          current.map((currentMessage) => {
            if (currentMessage.id === newMessage.id) {
              return newMessage;
            }
            return currentMessage;
          })
        );
      };

      pusherClient.bind("messages:new", messageHandler);
      pusherClient.bind("messages:update", updateMessageHandler);

      return () => {
        pusherClient.unsubscribe(conversationId);
        pusherClient.unbind("messages:new", messageHandler);
        pusherClient.unbind("messages:update", updateMessageHandler);
      };
    }
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => {
        const previousSenderId =
          index > 0 ? messages[index - 1].sender.id : null;
        return (
          <MessageBox
            key={message.id}
            data={message}
            isLast={index === messages.length - 1}
            previousSenderId={previousSenderId!}
          />
        );
      })}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
