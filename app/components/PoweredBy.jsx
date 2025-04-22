import React from "react";
import Image from "next/image";

const PoweredBy = () => {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-12">
			<div className="col-span-1 lg:col-span-12">
				<h2 className="text-center lg:text-left text-xl font-bold lg:text-2xl mb-4">
					POWERED BY:
				</h2>
				<div className="bg-[#ABD9D9] rounded-3xl border border-gray-300 shadow-md py-6 px-4 lg:py-10 lg:px-10 lg:rounded-3xl lg:border lg:border-gray-300 lg:shadow-md lg:z-10 lg:flex lg:items-center lg:justify-around">
					<div className="lg:flex lg:items-center lg:justify-evenly lg:w-full">
						<Image
							src="/"
							alt="/"
							width={500}
							height={500}
							className="object-contain"
						/>
						<Image
							src="/"
							alt="/"
							width={500}
							height={500}
							className="object-contain"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PoweredBy;
