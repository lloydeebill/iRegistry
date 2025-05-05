"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";
import { Menu } from "@headlessui/react";

const navLinks = [
	{ title: "Home", path: "/" },
	{ title: "How It Works", path: "/howitworks" },
	{ title: "Contact Us", path: "#footer" },
];

const Navbar = () => {
	const [navbarOpen, setNavbarOpen] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setUser(session?.user || null);
		};

		getUser();

		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user || null);
			},
		);

		return () => {
			listener?.subscription?.unsubscribe();
		};
	}, []);

	const [hasShadow, setHasShadow] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setHasShadow(true);
			} else {
				setHasShadow(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleSignIn = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		});
		if (error) console.error("Sign-in error:", error.message);
	};

	const handleSignOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error("Sign-out error:", error.message);
		else setUser(null);
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-10 bg-[#F1F1F1] bg-opacity-90 transition-shadow duration-300 ${
				hasShadow ? "shadow-lg shadow-blue-200" : "shadow-none"
			}`}
		>
			<div className="max-w-8xl mx-auto px-4 lg:px-44 py-2 flex items-center justify-between">
				<Image
					src="/iregistry.png"
					alt="iRegistry Logo"
					width={150}
					height={0}
					sizes="100vw"
					className="h-auto sm:w-[200px] lg:w-[300px] object-contain"
				/>

				{/* Desktop Nav */}
				<div className="hidden md:flex text-xl items-center space-x-8 font-medium">
					{navLinks.map((link, index) => (
						<NavLink key={index} href={link.path} title={link.title} />
					))}

					{!user ? (
						<button
							onClick={handleSignIn}
							className="text-blue-700 hover:text-blue-400 transition"
						>
							Sign In
						</button>
					) : (
						<Menu as="div" className="relative inline-block text-left">
							<div>
								<Menu.Button className="inline-flex justify-center items-center gap-2 px-2 text-blue-700 hover:text-blue-400 transition">
									<span className="font-medium">
										{user.user_metadata?.name || user.email}
									</span>
								</Menu.Button>
							</div>

							<Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-20">
								<div className="px-4 py-2 text-xs text-gray-600">
									{user.email}
								</div>
								<div className="px-4 py-2">
									<button
										onClick={handleSignOut}
										className="text-red-600 hover:underline text-sm"
									>
										Sign Out
									</button>
								</div>
							</Menu.Items>
						</Menu>
					)}
				</div>

				{/* Mobile Toggle Button */}
				<div className="block md:hidden">
					{!navbarOpen ? (
						<button
							onClick={() => setNavbarOpen(true)}
							className="flex items-center px-3 py-2 text-black"
						>
							<Bars3Icon className="h-7 w-7" />
						</button>
					) : (
						<button
							onClick={() => setNavbarOpen(false)}
							className="flex items-center px-3 py-2 border rounded border-slate-900 text-black"
						>
							<XMarkIcon className="h-5 w-5" />
						</button>
					)}
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			{navbarOpen && (
				<MenuOverlay
					links={navLinks}
					user={user}
					handleSignIn={handleSignIn}
					handleSignOut={handleSignOut}
				/>
			)}
		</nav>
	);
};

export default Navbar;
