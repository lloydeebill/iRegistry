"use client";

import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";

const AboutSection = () => {
	const requestOptions = ["How It Works", "Payment"];
	return (
		<>
			{/* Code for larger screens */}
			<div className="hidden lg:block">
				<div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
					<Image
						src="/computer.svg"
						alt="/any device img"
						width={500}
						height={500}
						className="object-contain"
					/>
					<div>
						<h2 className="text-center lg:text-left text-xl font-bold lg:text-2xl mb-4">
							Process Inquiries in Any Device!
						</h2>
						<p className="text-base lg:text-lg text-left">
							Use your phone, tablet, computer to process your civil registry
							needs online. Click "learn more" to know how it works; services,
							process, and payment.
						</p>
						<CustomButton buttonText="Learn More" href="/howitworks" />
					</div>
					<div>
						<h2 className="text-center lg:text-left text-xl font-bold lg:text-2xl mb-4">
							Protected Personal Data Management
						</h2>
						<p className="text-base lg:text-lg text-left">
							Ensures the security and integrity of personal data, providing a
							secure environment for sensitive information within the Local
							Civil Registrar Office of Nasipit.
						</p>
					</div>
					<Image
						src="/folder.svg"
						alt="/data management image"
						width={500}
						height={500}
						className="object-contain"
					/>
					<Image
						src="/message.svg"
						alt="/message img"
						width={500}
						height={500}
						className="object-contain"
					/>
					<div>
						<h2 className="text-center lg:text-left text-xl font-bold lg:text-2xl mb-4">
							Instant Notification Service
						</h2>
						<p className="text-base lg:text-lg text-left">
							Receive timely alerts when your request is processed and ready for
							pickup at our office, ensuring a seamless and efficient
							experience.
						</p>
					</div>
				</div>
			</div>

			{/* Code for smaller screens */}
			<div className="lg:hidden">
				<div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
					<Image
						src="/computer.svg"
						alt="/any device img"
						width={500}
						height={500}
						className="object-contain"
					/>
					<div>
						<h2 className="text-center lg:text-left text-xl font-bold lg:text-2xl mb-4">
							Process Inquiries in Any Device!
						</h2>
						<p className="text-base lg:text-lg text-left">
							Use your phone, tablet, computer to process your civil registry
							needs online. Click "learn more" to know how it works; services,
							process, and payment.
						</p>
						<CustomButton buttonText="Learn More" href="/howitworks" />
					</div>
					<Image
						src="/folder.svg"
						alt="/data management image"
						width={500}
						height={500}
						className="object-contain"
					/>
					<div>
						<h2 className="text-center lg:text-left text-xl font-bold lg:text-2xl mb-4">
							Protected Personal Data Management
						</h2>
						<p className="text-base lg:text-lg text-justify hidden sm:block">
							Ensures the security and integrity of personal data, providing a
							secure environment for sensitive information within the Local
							Civil Registrar Office of Buenavista.
						</p>
					</div>
					<Image
						src="/message.svg"
						alt="/message img"
						width={500}
						height={500}
						className="object-contain"
					/>
					<div>
						<h2 className="text-center lg:text-left text-xl font-bold lg:text-2xl mb-4">
							Instant Notification Service
						</h2>
						<p className="text-base lg:text-lg text-justify hidden sm:block">
							Receive timely alerts when your request is processed and ready for
							pickup at our office, ensuring a seamless and efficient
							experience.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutSection;
