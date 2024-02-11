import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import { footerLinks } from './FooterLinks'

const Footer = () => {
  return (
    <footer className="flex flex-col" id="footer">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-5 ">
        <div className="flex flex-col justify-start items-start gap-2">
            <Image 
            src="/elcrlogo.svg"
            alt="/eLCR Logo"
            width={60}
            height={10}
            className='object-contain'/>
            <p className="text-base">
              <span className="font-bold">Address</span>< br/>
              J.P. Rizal Avenue, Brgy 3, <br/>
              Buenavista, Agusan del Norte, PH
            </p>
            <p className="text-base">
              <span className="font-bold">Office Hours</span>< br/>
              Monday to Friday: < br/>
              8:00 am to 5:00 pm
            </p>
        </div>
        <div className="flex-1 w-full flex md:justify-end flex-wrap max-md:mt-10 gap-20 ">
          {footerLinks.map((link) => (
            <div key={link.title}
            className="flex flex-col gap-6 text-base min-w-[170px] ">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link
                  key={item.title} 
                  href={item.url}
                  className='hover:text-blue-400'
                >
                  {item.title}
                </Link> 
              ))}
            </div>
          ))}
        </div>
        </div>

        <div className="flex justify-between items-center flex-wrap 
        mt-10 border-t border-gray-300 sm:px-16 px-6 py-2 ">
          <p className="flex-1 flex max-sm:mt-4 gap-10">@2023 LCR OFFICE BTA. All Rights Reserved</p>
          <div
          className="flex-1 flex sm:justify-end justify-center max-sm:mt-4 gap-10">
            <Link href="/"
            className=" hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link href="/"
            className=" hover:text-blue-400">
              Terms of Use
            </Link>
          </div>        
        </div>
    </footer> 
  )
}

export default Footer 