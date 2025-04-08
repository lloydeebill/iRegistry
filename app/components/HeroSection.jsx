"use client";

import React from "react";
import Image from "next/image";
import MenuButton from "./MenuButton"; // Update the path to the actual location of your MenuButton file

const HeroSection = () => {
	const requestOptions = [
		"Request Certificate Live Birth",
		"Request Certificate of Marriage",
		"Request Certificate of Death",
		"Request Certificate of No Marriage",
		"Request Certificate of No Death",
	];
	const registerOptions = [
		"Registration of Birth",
		"Registration of Death",
		"Application of Marriage License",
	];

	return (
		<section className="grid grid-cols-1 lg:grid-cols-12 my-4">
			<div className="col-span-4 place-self-center place-items-center grid lg:place-items-start">
				<div className="mb-4 text-center lg:text-left">
					<h1 className="max-w-2xl mb-2 lg:text-6xl text-4xl font-extrabold ">
						Registration or Request PSA Copies
					</h1>
					<p className="text-base sm:text-lg lg:text-2xl">
						Your Online Civil Registry Destination!
					</p>
				</div>
				<div className="lg:flex lg:justify-start lg:space-x-2">
					<MenuButton
						buttonText="Request"
						options={requestOptions}
						hrefs={[
							"/reqstcolb",
							"/reqstcom",
							"/reqstcod",
							"/reqstcenomar",
							"/reqstcenodeath",
						]}
					/>
					<MenuButton
						buttonText="Register"
						options={registerOptions}
						hrefs={["/regcolb", "/regcod", "/aml"]}
						isRegisterButton
					/>
				</div>
			</div>

			<div className="col-span-8 place-self-center mt-4 lg:mt-0">
				<div className="w-[150px] h-[150px] lg:w-[500px] lg:h-[500px] relative">
					<Image
						src="/hero.svg"
						alt="hero image"
						className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
						width={700}
						height={0}
					/>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
