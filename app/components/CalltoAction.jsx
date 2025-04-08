// CalltoAction.js

import React from "react";
import Link from "next/link";

const CalltoAction = () => {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-12">
			<div className="col-span-1 lg:col-span-12">
				<div className="w-full max-w-full px-4 sm:px-6 lg:px-10 bg-gradient-to-r from-[#3790d7] to-[#D1D4E9] rounded-2xl border border-gray-300 shadow-md py-6 lg:py-10 lg:rounded-3xl lg:flex lg:items-center lg:justify-around">
					<div className="text-center lg:text-left lg:col-span-8 lg:self-center">
						<p className="text-center font-semibold py-3"> ARE YOU READY?</p>
						<h1 className="text-center mb-4 lg:text-6xl text-4xl font-extrabold">
							Process Vital Events In Your Life
						</h1>
					</div>
					<div className="flex justify-center lg:col-span-4 lg:self-center">
						<Link href="/" passHref legacyBehavior>
							<a className="text-white place-items-center text-center px-10 py-4 rounded-full font-semibold text-lg lg:text-xl bg-black hover:bg-blue-400">
								GET STARTED
							</a>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CalltoAction;
