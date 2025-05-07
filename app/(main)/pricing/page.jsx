// 'use client';
// import PricingModel from '@/components/custom/PricingModel';
// import { UserDetailContext } from '@/context/UserDetailContext';
// import Lookup from '@/data/Lookup';
// import React, { useContext } from 'react';

// function Pricing() {
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);
//   return (
//     <div className="mt-20 flex flex-col items-center p-10 md:px-32 lg:px-48 w-full ">
//       <h2 className="font-bold text-5l">pricing</h2>
//       <p className="text-gray-400 max-w-xl text-center mt-4">
//         {Lookup.PRICING_DESC}
//       </p>
//     <div className="p-5 border rounded-xl w-full flex justify-between">
//         <h2 className="text-lg">
//           <span className="font-bold">{userDetail?.token}</span> Tokens Left
//         </h2>
//         <div>
//           <h2>Need more token?</h2>
//           <p>Upgrade your plane below</p>
//         </div>
//       </div>
//     <PricingModel />
//     </div>
//   );
// }

// export default Pricing;

"use client";
import PricingModel from "@/components/custom/PricingModel";
import { UserDetailContext } from "@/context/UserDetailContext";
import Lookup from "@/data/Lookup";
import React, { useContext } from "react";

function Pricing() {
  const { userDetail } = useContext(UserDetailContext);

  return (
    <div className="mt-15 flex flex-col items-center p-6 md:px-32 lg:px-48 w-full">
      <h2 className="font-bold text-4xl text-center mb-4">Pricing</h2>
      <p className="text-gray-500 max-w-xl text-center mb-8">
        {Lookup.PRICING_DESC}
      </p>

      <div className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-lg font-medium text-center sm:text-left">
          <span className="font-bold text-blue-600">
            {userDetail?.token ?? 0}
          </span>{" "}
          Tokens Left
        </h2>
        <div className="text-center sm:text-right">
          <h3 className="font-semibold">Need more tokens?</h3>
          <p className="text-sm text-gray-400">Upgrade your plan below</p>
        </div>
      </div>

      <PricingModel />
    </div>
  );
}

export default Pricing;
