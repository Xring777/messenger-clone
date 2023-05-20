"use client";

import Avatar from "@/app/components/avatar/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/avatar/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawOpen, setDrawOpen] = useState(false);
  const {members} = useActiveList()
  const isActive = members.indexOf(otherUser?.email!) !== -1
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : 'Offline';
  }, [conversation.isGroup, conversation.users.length, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawOpen}
        onClose={() => {
          console.log("down");

          setDrawOpen(false);
        }}
      />
      <div className="flex w-full items-center justify-between border-b-[1px] bg-white px-4 py-3 shadow-sm sm:px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Link
            className="block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden"
            href={"/conversations"}
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}

          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawOpen(true)}
          className="cursor-pointer text-sky-500 transition hover:text-sky-600"
        />
      </div>
    </>
  );
};

export default Header;