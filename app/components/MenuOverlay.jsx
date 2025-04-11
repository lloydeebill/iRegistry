"use client";

import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links, user, handleSignIn, handleSignOut }) => {
	return (
		<ul className="flex flex-col py-4 items-center space-y-4 text-xl font-medium bg-white border-t border-gray-200">
			{links.map((link, index) => (
				<li key={index}>
					<NavLink href={link.path} title={link.title} />
				</li>
			))}

			{/* Auth Buttons for Mobile */}
			{!user ? (
				<li>
					<button
						onClick={handleSignIn}
						className="text-blue-700 hover:text-blue-400 transition"
					>
						Sign In
					</button>
				</li>
			) : (
				<li>
					<button
						onClick={handleSignOut}
						className="text-red-700 hover:text-red-400 transition"
					>
						Sign Out
					</button>
				</li>
			)}
		</ul>
	);
};

export default MenuOverlay;
