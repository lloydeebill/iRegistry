"use client";

import { Menu } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { signInWithGoogle } from "@/lib/auth";

const MenuButton = ({ buttonText, options, hrefs, isRegisterButton }) => {
	const router = useRouter();

	const handleClick = async (href) => {
		try {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session) {
				router.push(href);
			} else {
				await signInWithGoogle();

				if (error) {
					console.error("OAuth sign-in error:", error.message);
				}
			}
		} catch (err) {
			console.error("Unexpected auth error:", err);
		}
	};

	return (
		<Menu as="div" className="relative lg:w-48 mt-2">
			<Menu.Button
				className={`px-12 py-4 w-full sm:w-fit rounded-full font-semibold text-lg lg:text-xl ${
					isRegisterButton
						? "border-2 sm:w-fit border-gray-700 bg-white hover:border-blue-400"
						: "bg-[#3790d7] hover:bg-blue-400 text-white"
				}`}
			>
				{buttonText}
			</Menu.Button>
			<Menu.Items className="absolute top-10 mt-8 bg-white py-2 px-6 w-auto rounded-lg border border-gray-300 shadow-md max-w-md z-10 left-1/2 transform -translate-x-1/2">
				{options.map((option, index) => (
					<Menu.Item key={index}>
						{({ active }) => (
							<button
								onClick={() => handleClick(hrefs[index])}
								className={`block py-3 px-2 text-left text-lg leading-relaxed whitespace-nowrap w-full ${
									active ? "text-blue-500" : "text-gray-900"
								}`}
							>
								{option}
							</button>
						)}
					</Menu.Item>
				))}
			</Menu.Items>
		</Menu>
	);
};

export default MenuButton;
