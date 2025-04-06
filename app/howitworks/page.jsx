'use client'

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StepsSection from "../components/StepsSection";
import CalltoAction from "../components/CalltoAction";

const HowItWorks= () => {

  return (
    <main>
        <Navbar/>
        <div className="mt-28 container mx-auto px-12 py-0">
          <div>
          <StepsSection/>
          </div>
            <CalltoAction
                className="mt-5"/>
            <div><Footer/></div>
        </div>
    </main>
  )
};

export default HowItWorks;
