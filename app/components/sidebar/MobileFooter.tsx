"use client";

import useConversation from "hooks/useConversation";
import useRoutes from "hooks/useRoutes";
import MobileItem from "./MobileItem";
import SettingsModal from "./SettingsModal";
import { useState } from "react";
import { User } from "@prisma/client";
import Avatar from "components/Avatar";
interface MobileFooterProps {
  currentUser: User;
}
const MobileFooter = ({ currentUser }: MobileFooterProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }
  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white dark:bg-darkBg border-t-[1px] dark:border-t-black lg:hidden">
        <div className="w-full flex items-center justify-center pt-2.5">
          <div
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </div>
        {routes.map(({ href, active, icon, onClick }) => (
          <MobileItem
            key={href}
            href={href}
            active={active}
            icon={icon}
            onClick={onClick}
          />
        ))}
      </div>
    </>
  );
};

export default MobileFooter;
