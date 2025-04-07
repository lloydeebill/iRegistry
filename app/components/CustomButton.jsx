import React from "react";

const CustomButton = ({ buttonText }) => {
	return (
		<div className="inline-block text-white place-items-center px-12 py-4 sm:w-fit rounded-full font-semibold text-lg lg:text-xl bg-[#3790d7] hover:bg-blue-400 my-10 text-center cursor-pointer">
			{buttonText}
		</div>
	);
};

export default CustomButton;
