// import React from 'react';
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
// } from '@/components/ui/sidebar';
// import Image from 'next/image';
// import { Button } from '../ui/button';
// import { MessageCircleCodeIcon } from 'lucide-react';
// import WorkspaceHistory from './WorkspaceHistory';
// import SideBarFooter from './SideBarFooter';

// function AppSideBar() {
//   return (

//       <Sidebar>
//         <SidebarHeader className="p-5">
//             <Image src={'/logo.png'} alt="logo" width={30} height={30} />
//             <Button className="mt-5"><MessageCircleCodeIcon /> Start New Chat</Button>
//         </SidebarHeader>
//         <SidebarContent className="">
//           <SidebarGroup>
//             <WorkspaceHistory />
//           </SidebarGroup>
//           {/* <SidebarGroup /> */}
//         </SidebarContent>
//         <SidebarFooter>
//             <SideBarFooter></SideBarFooter>
//         </SidebarFooter>
//       </Sidebar>

//   );
// }

// export default AppSideBar;

import React from "react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCodeIcon } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
import SideBarFooter from "./SideBarFooter";

function AppSideBar() {
  const router = useRouter();

  const handleGoToInitialPage = () => {
    router.push("/"); // Navigate to the initial page (homepage)
  };
  return (
    <Sidebar className="bg-white shadow-lg border-r w-64">
      <SidebarHeader className="flex flex-col items-center gap-4 p-6 border-b">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <h1 className="text-lg font-semibold text-white">NovaCodeAI</h1>
        </div>
        <Button
          onClick={handleGoToInitialPage}
          className="w-full gap-2 bg-gradient-to-r text-white from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 transition duration-300 rounded-xl shadow"
        >
          <MessageCircleCodeIcon size={18} />
          Start New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent className="p-4 overflow-y-auto">
        <SidebarGroup>
          <h2 className="text-[24px] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 mb-2 px-2 text-center">
            Logbook
          </h2>

          <div className="space-y-2">
            <WorkspaceHistory />
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;
