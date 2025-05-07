"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";
import { toast } from "sonner";

export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const { toggleSidebar } = useSidebar();
  const UpdateToken = useMutation(api.users.UpdateToken);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  /**
   * Used to Get Workspace data using Workspace ID
   */
  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
  };
  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    // return;
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    console.log({ PROMPT });
    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });
    console.log(result.data.result);
    const aiResp = {
      role: "ai",
      content: result.data.result,
    };
    setMessages((prev) => [...prev, aiResp]);

    // update token to database

    await UpdateMessages({
      messages: [...messages, aiResp],
      workspaceId: id,
    });
    console.log("LEN", countToken(JSON.stringify(aiResp)));
    const token =
      Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
    setUserDetail((prev) => ({ ...prev, token: token }));
    await UpdateToken({
      token: token,
      userId: userDetail?._id,
    });

    setLoading(false);
  };

  const onGenerate = (input) => {
    if (userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return;
    }
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setUserInput("");
  };

  return (
    <div className="relative h-[83vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide pl-10">
        {messages?.length > 0 &&
          messages?.map((msg, index) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 flex gap-2 items-center justify-start leading-7"
              style={{
                backgroundColor: Colors.CHAT_BACKGROUND,
              }}
            >
              {msg?.role == "user" && (
                <Image
                  src={userDetail?.picture}
                  alt="userImage"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
              <ReactMarkdown className="flex flex-col">
                {msg?.content}
              </ReactMarkdown>
            </div>
          ))}
        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-center justify-start"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating response...</h2>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="flex gap-2 items-end ">
        {userDetail && (
          <Image
            onClick={toggleSidebar}
            src={userDetail?.picture}
            alt="userImage"
            width={30}
            height={30}
            className="rounded-full cursor-pointer"
          />
        )}
        <div
          className="p-5 border rounded-xl max-w-2xl w-full mt-3"
          style={{
            backgroundColor: Colors.BACKGROUND,
          }}
        >
          <div className="flex gap-2">
            <textarea
              placeholder={Lookup.INPUT_PLACEHOLDER}
              className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
              onChange={(event) => setUserInput(event.target.value)}
              value={userInput}
            />
            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-gradient-to-r from-blue-500 to-pink-500 p-2 w-10 h-10 rounded-md cursor-pointer"
              />
            )}
          </div>
          <div>
            <Link className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatView;
