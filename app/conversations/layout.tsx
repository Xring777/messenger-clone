import getConversations from "../actions/getConversaions";
import getUsers from "../actions/getUsers";
import SiderBar from "../components/siderbar/SiderBar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  
  return (


    // @ts-expect-error Server Component
    <SiderBar>
      <div className="h-full">
        <ConversationList users={users} initialItems={conversations} />
        {children}
      </div>
    </SiderBar>
  );
}
