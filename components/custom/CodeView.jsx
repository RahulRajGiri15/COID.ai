// "use client";
// import React, { useContext, useEffect, useState } from "react";

// import {
//   SandpackProvider,
//   SandpackLayout,
//   SandpackCodeEditor,
//   SandpackPreview,
//   SandpackFileExplorer,
// } from "@codesandbox/sandpack-react";
// import Lookup from "@/data/Lookup";
// import { MessagesContext } from "@/context/MessagesContext";
// import Prompt from "@/data/Prompt";
// import axios from "axios";
// import { useConvex, useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { useParams } from "next/navigation";
// import { Loader2Icon } from "lucide-react";
// import { countToken } from "./ChatView";
// import { UserDetailContext } from "@/context/UserDetailContext";
// import { toast } from "sonner";
// import SandpackPreviewClient from "./SandpackPreviewClient";
// import { ActionContext } from "@/context/ActionContext";

// function CodeView() {
//   const { id } = useParams();
//   const [activeTab, setActiveTab] = useState("code");
//   const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
//   const { messages, setMessages } = useContext(MessagesContext);
//   const UpdateFiles = useMutation(api.workspace.UpdateFiles);
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);
//   const { action, setAction } = useContext(ActionContext);

//   useEffect(() => {
//     (action?.actionType == "deploy" || action?.actionType == "export") &&
//       setActiveTab("preview");
//   }, [action]);

//   const convex = useConvex();
//   const [loading, setLoading] = useState(false);
//   const UpdateToken = useMutation(api.users.UpdateToken);

//   useEffect(() => {
//     id && GetFiles();
//   }, [id]);

//   const GetFiles = async () => {
//     setLoading(true);
//     const result = await convex.query(api.workspace.GetWorkspace, {
//       workspaceId: id,
//     });
//     const mergedFils = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
//     setFiles(mergedFils);
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (messages?.length > 0) {
//       console.log(messages);

//       const role = messages[messages?.length - 1].role;
//       if (role == "user") {
//         GenerateAiCode();
//       }
//     }
//   }, [messages]);

//   const GenerateAiCode = async () => {
//     if (userDetail?.token < 10) {
//       toast("You don't have enough token to generate code");
//       return;
//     }
//     // return;
//     setLoading(true);
//     const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
//     console.log({ PROMPT });
//     const result = await axios.post("/api/gen-ai-code", {
//       prompt: PROMPT,
//     });

//     console.log(result?.data);
//     const aiResp = result.data;
//     const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
//     setFiles(mergedFiles);
//     await UpdateFiles({
//       workspaceId: id,
//       files: aiResp?.files,
//     });
//     setLoading(false);
//     const token =
//       Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
//     setUserDetail((prev) => ({ ...prev, token: token }));
//     await UpdateToken({
//       token: token,
//       userId: userDetail?._id,
//     });
//   };

//   return (
//     <div className="relative ">
//       <div className="bg-[#181818] w-full p-2 border">
//         <div className="flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 justify-center rounded-full">
//           <h2
//             onClick={() => setActiveTab("code")}
//             className={`text-sm cursor-pointer ${activeTab == "code" && "bg-gradient-to-r text-white from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 transition duration-300 bg-opacity-25 p-1 px-2  rounded-full"} `}
//           >
//             Code
//           </h2>
//           <h2
//             onClick={() => setActiveTab("preview")}
//             className={`text-sm cursor-pointer ${activeTab == "preview" && "bg-gradient-to-r text-white from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 transition duration-300bg-opacity-25 p-1 px-2  rounded-full"} `}
//           >
//             Preview
//           </h2>
//         </div>
//       </div>
//       <SandpackProvider
//         files={files}
//         template="react"
//         theme={"dark"}
//         customSetup={{
//           dependencies: {
//             ...Lookup.DEPENDANCY,
//           },
//         }}
//         options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
//       >
//         <SandpackLayout>
//           {activeTab == "code" ? (
//             <>
//               <SandpackFileExplorer style={{ height: "80vh" }} />
//               <SandpackCodeEditor style={{ height: "80vh" }} />
//             </>
//           ) : (
//             <>
//               <SandpackPreviewClient />
//             </>
//           )}
//         </SandpackLayout>
//       </SandpackProvider>

//       {loading && (
//         <div className="p-10 bg-gray-900 bg-opacity-80 absolute top-0 w-full h-full flex justify-center items-center">
//           <Loader2Icon className="animate-spin w-10 h-10 text-white" />
//           <h2>Generating your files...</h2>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CodeView;



"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import {
  Loader2Icon,
  SmartphoneIcon,
  Maximize2 as Maximize2Icon,
  Minimize2 as MinimizeIcon,
} from "lucide-react";
import { countToken } from "./ChatView";
import { UserDetailContext } from "@/context/UserDetailContext";
import { toast } from "sonner";
import SandpackPreviewClient from "./SandpackPreviewClient";
import { ActionContext } from "@/context/ActionContext";

function CodeView() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const { messages } = useContext(MessagesContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action } = useContext(ActionContext);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [loading, setLoading] = useState(false);

  const convex = useConvex();
  const UpdateToken = useMutation(api.users.UpdateToken);

  useEffect(() => {
    (action?.actionType === "deploy" || action?.actionType === "export") &&
      setActiveTab("preview");
  }, [action]);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    if (userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return;
    }
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", { prompt: PROMPT });
    const aiResp = result.data;
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
    setFiles(mergedFiles);
    await UpdateFiles({
      workspaceId: id,
      files: aiResp?.files,
    });
    setLoading(false);
    const token =
      Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
    setUserDetail((prev) => ({ ...prev, token: token }));
    await UpdateToken({
      token: token,
      userId: userDetail?._id,
    });
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);

    if (isFullScreen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.margin = "0";
      document.body.style.padding = "0";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, [isFullScreen]);

  return (
    <div
      className={`bg-black ${
        isFullScreen
          ? "fixed inset-0 w-screen h-screen z-50 overflow-hidden"
          : "relative"
      }`}
    >
      {/* Topbar */}
      <div className="bg-[#181818] w-full p-2 border flex justify-between items-center">
        {/* Tabs */}
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 justify-center rounded-full">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${
              activeTab === "code"
                ? "bg-gradient-to-r text-white from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 transition duration-300 p-1 px-2 rounded-full"
                : "text-gray-300 p-1 px-2"
            }`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${
              activeTab === "preview"
                ? "bg-gradient-to-r text-white from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 transition duration-300 p-1 px-2 rounded-full"
                : "text-gray-300 p-1 px-2"
            }`}
          >
            Preview
          </h2>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          {/* Mobile View Toggle */}
          <button
            onClick={() => setIsMobileView(!isMobileView)}
            className="text-white p-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500"
            title={isMobileView ? "Desktop view" : "Mobile view"}
          >
            <SmartphoneIcon className="w-5 h-5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="text-white p-2 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500"
            title={isFullScreen ? "Exit full screen" : "Enter full screen"}
          >
            {isFullScreen ? (
              <MinimizeIcon className="w-5 h-5" />
            ) : (
              <Maximize2Icon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Sandpack Section */}
      <SandpackProvider
        files={files}
        template="react"
        theme="dark"
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY,
          },
        }}
        options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
      >
        <SandpackLayout
          style={{
            height: isFullScreen ? "calc(100vh - 56px)" : "80vh",
            width: "100%",
            minHeight: 0,
          }}
        >
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "100%" }} />
              <SandpackCodeEditor style={{ height: "100%" }} />
            </>
          ) : (
            <div
              className={`${
                isMobileView
                  ? "w-[320px] h-[637px] border rounded-md shadow-lg overflow-hidden mx-auto"
                  : "w-full h-full"
              }`}
              style={{
                height: isFullScreen ? "calc(100vh - 56px)" : "100%",
                boxShadow: isMobileView
                  ? "0 10px 30px rgba(0,0,0,0.7)"
                  : undefined,
              }}
            >
              <SandpackPreviewClient />
            </div>
          )}
        </SandpackLayout>
      </SandpackProvider>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex flex-col justify-center items-center gap-3 z-50">
          <Loader2Icon className="animate-spin w-10 h-10 text-white" />
          <h2 className="text-white">Generating your files...</h2>
        </div>
      )}
    </div>
  );
}

export default CodeView;
