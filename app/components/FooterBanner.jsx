import React from "react";
import Link from "next/link";

const FooterBanner = () => {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-12">
			<div className="col-span-1 lg:col-span-12">
				<div className="bg-gradient-to-r from-[#3790d7] to-[#D1D4E9] rounded-2xl border border-gray-300 shadow-md py-6 px-4 lg:py-10 lg:px-10 lg:rounded-3xk lg:border lg:border-gray-300 lg:shadow-md lg:z-10 lg:flex lg:items-center lg:justify-around">
					<div className="text-center lg:text-left lg:col-span-8 lg:self-center">
						<p className="text-center font-semibold text-xl py-3">
							Hassle-free,Seamless & Fast
						</p>
						<h1 className="text-center mb-4 text-2xl lg:text-6xl  font-extrabold">
							Get your vital documents in life now!
						</h1>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FooterBanner;
