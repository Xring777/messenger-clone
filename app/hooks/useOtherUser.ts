import { User } from "@prisma/client";
import { FullConversationType } from "../types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (conversation: FullConversationType | {
    users: User[]
})=>{
    const sesstion  = useSession()

    const otherUser = useMemo(() => {
        const currentUserEmail = sesstion?.data?.user?.email;

        const otherUser = conversation.users.filter(user=>user.email !== currentUserEmail);

        return otherUser[0];
    }, [conversation.users, sesstion?.data?.user?.email])

    return otherUser;
}

export default useOtherUser