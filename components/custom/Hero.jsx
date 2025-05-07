"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import React, { useContext, useState } from "react";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FaUserPlus,
  FaClipboardList,
  FaVideo,
  FaChartLine,
  FaComments,
  FaKeyboard,
  FaEdit,
  FaEye,
  FaCloudUploadAlt,
  FaLink,
} from "react-icons/fa";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";

function Hero() {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    if (userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return;
    }
    const msg = {
      role: "user",
      content: input,
    };
    setMessages(msg);

    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });
    console.log(workspaceId);
    router.push("/workspace/" + workspaceId);
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-12 mt-24 sm:mt-32 xl:mt-40 gap-4">
      {/* Heading */}
      <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-center bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300 mb-2">
        {Lookup.HERO_HEADING}
      </h2>

      {/* Description */}
      <p className="text-blue-400 font-medium text-center text-sm sm:text-base max-w-xl">
        {Lookup.HERO_DESC}
      </p>

      {/* Input Box */}
      <div
        className="p-4 sm:p-5 border border-gray-800 rounded-xl w-full max-w-2xl mt-4 shadow-md sm:shadow-lg transition-all duration-300 backdrop-blur-sm"
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className="flex gap-2">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-28 sm:h-32 max-h-56 resize-none text-sm sm:text-base text-white placeholder:text-gray-400"
            onChange={(event) => setUserInput(event.target.value)}
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-gradient-to-r from-blue-500 to-pink-500 p-2 h-10 w-12 rounded-md cursor-pointer hover:scale-105 transition-transform duration-200"
            />
          )}
        </div>
        <div>
          <div>
            <Link className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-2 sm:gap-3">
        {Lookup.SUGGSTIONS.map((suggestion, index) => (
          <h2
            key={index}
            onClick={() => onGenerate(suggestion)}
            className="px-3 py-1 border border-gray-800 rounded-full text-xs sm:text-sm text-white hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 hover:bg-clip-text transition duration-300 cursor-pointer"
          >
            {suggestion}
          </h2>
        ))}
      </div>

      {/* Roadmap Section */}
      {!userDetail?.name && (
        <section className="py-16 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
              How It Works
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 mt-4">
              Effortlessly Bring Your Imagination to Life with Our Guide.
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-6">
            <VerticalTimeline lineColor="hsl(var(--border))">
              {/* Step 1 */}
              <VerticalTimelineElement
                className="vertical-timeline-element--work "
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  boxShadow:
                    "0 4px 15px -1px rgba(29, 78, 246, 0.6), 0 2px 8px -2px rgba(29, 78, 246, 0.6)",
                  borderRadius: "var(--radius)",
                  padding: "1.5rem",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid hsl(var(--border))",
                }}
                iconStyle={{ background: "#00bcd4", color: "#fff" }}
                icon={<FaUserPlus />}
              >
                <h3 className="vertical-timeline-element-title text-xl font-bold text-foreground">
                  Step 1: Sign Up
                </h3>
                <p className="text-muted-foreground mt-2">
                Initialize your account setup to access AI-driven code generation services.
                </p>
              </VerticalTimelineElement>

              {/* Step 2 */}
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  boxShadow:
                    "0 4px 15px -1px rgba(29, 78, 246, 0.6), 0 2px 8px -2px rgba(29, 78, 246, 0.6)",
                  borderRadius: "var(--radius)",
                  padding: "1.5rem",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid hsl(var(--border))",
                }}
                iconStyle={{ background: "#f7b52d", color: "#fff" }}
                icon={<FaKeyboard />}
              >
                <h3 className="vertical-timeline-element-title text-xl font-bold text-foreground">
                  Step 2: Craft Your Prompt
                </h3>
                <p className="text-muted-foreground mt-2">
                  Provide a clear and detailed prompt to generate high-quality
                  code tailored to your needs.
                </p>
              </VerticalTimelineElement>

              {/* Step 3 */}
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  boxShadow:
                    "0 4px 15px -1px rgba(29, 78, 246, 0.6), 0 2px 8px -2px rgba(29, 78, 246, 0.6)",
                  borderRadius: "var(--radius)",
                  padding: "1.5rem",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid hsl(var(--border))",
                }}
                iconStyle={{ background: "#ff6f6f", color: "#fff" }}
                icon={<FaEdit />}
              >
                <h3 className="vertical-timeline-element-title text-xl font-bold text-foreground">
                  Step 3: Refine with Feedback
                </h3>
                <p className="text-muted-foreground mt-2">
                  If you'd like modifications or improvements, simply share your
                  feedback with the AI to update the code accordingly.
                </p>
              </VerticalTimelineElement>

              {/* Step 4 */}
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  boxShadow:
                    "0 4px 15px -1px rgba(29, 78, 246, 0.6), 0 2px 8px -2px rgba(29, 78, 246, 0.6)",
                  padding: "1.5rem",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid hsl(var(--border))",
                }}
                iconStyle={{ background: "#4caf50", color: "#fff" }}
                icon={<FaEye />}
              >
                <h3 className="vertical-timeline-element-title text-xl font-bold text-foreground">
                  Step 4: Preview the Output
                </h3>

                <p className="text-muted-foreground mt-2">
                  Review the generated code in a live preview to ensure it meets
                  your expectations.
                </p>
              </VerticalTimelineElement>

              {/* Step 5 */}
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  boxShadow:
                    "0 4px 15px -1px rgba(29, 78, 246, 0.6), 0 2px 8px -2px rgba(29, 78, 246, 0.6)",
                  borderRadius: "var(--radius)",
                  padding: "1.5rem",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid hsl(var(--border))",
                }}
                iconStyle={{ background: "#7952b3", color: "#fff" }}
                icon={<FaLink />}
              >
                <h3 className="vertical-timeline-element-title text-xl font-bold text-foreground">
                  Step 5: Deploy the Project and Get the Link
                </h3>
                <p className="text-muted-foreground mt-2">
                  After deploying your project, you’ll receive a unique link to
                  access and share your live project.
                </p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
        </section>
      )}

      {/* FAQ Section */}

      {!userDetail?.name && (
        <div className="w-full max-w-2xl mt-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-gray-800">
              <AccordionTrigger className="text-lg font-semibold text-white py-4 flex items-center justify-between w-full">
                What is NovaCode AI?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                NovaCode AI is a platform that helps you turn your ideas into
                fully functional code using AI. Simply input your project idea
                and get high-quality code suggestions in seconds.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-gray-800">
              <AccordionTrigger className="text-lg font-semibold text-white py-4 flex items-center justify-between w-full">
                How does it work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                The tool uses advanced AI algorithms to understand your prompt
                and generate relevant code snippets. You can refine the output
                by providing feedback or asking for modifications.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-gray-800">
              <AccordionTrigger className="text-lg font-semibold text-white py-4 flex items-center justify-between w-full">
                Do I need coding experience to use it?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                Not at all! NovaCode AI is built for both beginners and
                experienced developers. You can generate, review, and refine
                code even if you're just starting out.given time period.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-gray-800">
              <AccordionTrigger className="text-lg font-semibold text-white py-4 flex items-center justify-between w-full">
                Can I edit the generated code?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                Yes, you can edit the code directly or provide feedback to the
                AI for improvements. It's designed to be flexible to your needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-gray-800">
              <AccordionTrigger className="text-lg font-semibold text-white py-4 flex items-center justify-between w-full">
                How do I deploy my project?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                After previewing your code, simply click the deploy button.
                NovaCode AI will host your project and give you a live shareable
                link instantly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-b border-gray-800">
              <AccordionTrigger className="text-lg font-semibold text-white py-4 flex items-center justify-between w-full">
                Is my data secure?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-4">
                Yes, your data is protected with strong encryption. We never
                share your input or generated code without your consent.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {/* SignIn Dialog */}
      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />

      {/* Footer */}
      <div className="w-full bottom-0 left-0 mt-8 right-0 p-4 text-xs sm:text-sm backdrop-blur-md bg-black/50">
        <footer className="text-white text-center w-full">
          <div className="text-center text-xs sm:text-sm">
            <p>© 2025 NovaCode AI - All Rights Reserved</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Hero;
