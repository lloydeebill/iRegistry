'use client'

import React from "react";
import CertifyAndConsent from "../components/CertifyAndConsent";
import Navbar from "../components/Navbar";
import PoweredBy from "../components/PoweredBy";
import Footer from "../components/Footer";
import DisclosureButton from "../components/DisclosureButton";

const ReqstCoD= () => {
  const title = "Request Certificate of Death";
  const link = "https://forms.gle/UpGV36dbVrWxer8RA";

  return (
    <main>
        <Navbar/>
        <div className="mt-28 container mx-auto px-12 py-0">
            <div className="col-span-4 place-self-center place-items-center grid lg:place-items-start">
              <CertifyAndConsent
                title={title}
                link={link}
              />  
            </div>
            <div className="bg-white p-2 rounded-2xl">
              <DisclosureButton
            question="Payment & Fees: Request of Certificate of Death"
            answer="If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked."
             />
              <DisclosureButton
                question="Requirements: Request of Certificate of Death"
                answer="No."
             />
            </div>
            <div className="mt-6 pt-6">
            <PoweredBy/>
            </div>
            <div><Footer/></div>
        </div>
    </main>
  )
};

export default ReqstCoD;
