'use client';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useSidebar } from '../ui/sidebar';

function WorkspaceHistory() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [workspaceList, setWorkSpaceList] = useState();
  const convex = useConvex();
  const { toggleSidebar } = useSidebar();
  useEffect(() => {
    userDetail && GetAllWorkspace();
  }, [userDetail]);

  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail?._id,
    });
    setWorkSpaceList(result);
  };

  return (
    <div>
      {/* <h2 className="font-medium text-lg">Your Chats</h2> */}
      <div>
        {workspaceList &&
          workspaceList?.map((workspace, index) => (
            <Link key={index} href={"/workspace/" + workspace?._id}>
              <h2
                onClick={toggleSidebar}
                className="text-sm text-gray-300 mt-2 font-light hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-600 transition duration-300 cursor-pointer"
              >
                {workspace?.messages[0]?.content}
              </h2>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default WorkspaceHistory;
