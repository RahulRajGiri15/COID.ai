import Lookup from "@/data/Lookup";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function PricingModel() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [selectedOption, setSelectedOption] = useState();

  const UpdateToken = useMutation(api.users.UpdateToken);
  useEffect(() => {
    console.log(userDetail);
  }, [userDetail]);

  const onPaymentSuccess = async (pric, usr) => {
    console.log(selectedOption);
    console.log(pric);
    console.log(usr);
    const token = Number(usr?.token) + Number(pric?.value);
    console.log(token);
    await UpdateToken({
      token: token,
      userId: userDetail?._id,
    });
  };
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
      {Lookup.PRICING_OPTIONS.map((pricing, index) => (
        <div
          className="flex flex-col gap-6 border rounded-xl p-10 justify-between"
          key={index}
        >
          <h2 className="font-bold text-4xl">{pricing.name}</h2>
          <h2 className="font-medium text-lg">{pricing.tokens} Tokens</h2>
          <p className="text-gray-400">{pricing.desc}</p>
          <h2 className="font-bold text-4xl text-center mt-6">
            {pricing.price}$
          </h2>
          {/* <Button>Upgrade to {pricing.name}</Button>
           */}
          {userDetail && (
            <div
              onClick={() => {
                setSelectedOption(pricing);
                console.log(pricing);
              }}
            >
              <PayPalButtons
                style={{ layout: "horizontal" }}
                disabled={!userDetail}
                onCancel={() => console.log("payment cancel")}
                onClick={() => {
                  setSelectedOption(pricing);
                  console.log(pricing);
                }}
                onApprove={() => {
                  setSelectedOption(pricing);
                  console.log(pricing);
                  let pric = pricing;
                  let usr = userDetail;
                  onPaymentSuccess(pric, usr);
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: pricing.price,
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PricingModel;
