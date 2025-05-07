"use client";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      const user = userInfo.data;
      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuid4(),
      });
      if (typeof window !== undefined) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      setUserDetail(userInfo?.data);
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          {/* <DialogDescription> */}
          <div className="flex flex-col justify-center items-center gap-3">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
              {Lookup.SIGNIN_HEADING}
            </h2>
            <p className="text-blue-300 mt-2 text-center text-xl">
              {Lookup.SIGNIN_SUBHEADING}
            </p>
            <Button
              className="bg-gradient-to-r text-white from-blue-500 to-pink-500 p-4   hover:from-blue-600 hover:to-pink-600 transition duration-300 mt-4"
              onClick={() => googleLogin()}
            >
              Signin In With Google
            </Button>
            {/* <p>{Lookup.SIGNIn_AGREEMENT_TEXT}</p> */}
          </div>
          {/* </DialogDescription> */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
