"use client";

import { useState } from "react";
import Overview from "../admin-components/Overview"; // 🧠 import Overview
import BirthRegistryList from "../admin-components/BirthRegistryList"; // 🧠 import BirthRegistryList

export default function AdminDashboardPage() {
	const [activePage, setActivePage] = useState("overview");

	return (
		<div className="min-h-screen flex bg-gray-100">
			{/* Sidebar */}
			<aside className="w-64 bg-[#3790d7] text-white flex flex-col p-6">
				<h1 className="text-3xl font-bold mb-10">Dashboard</h1>
				<nav className="flex flex-col gap-6">
					<button
						onClick={() => setActivePage("overview")}
						className="flex items-center space-x-2 hover:underline text-left"
					>
						<span>🏠</span>
						<span>Home</span>
					</button>

					<button
						onClick={() => setActivePage("registry")}
						className="flex items-center space-x-2 hover:underline text-left"
					>
						<span>📋</span>
						<span>Birth Registry List</span>
					</button>
				</nav>
			</aside>

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				{/* Topbar */}
				<header className="flex items-center justify-between p-6 bg-white shadow-md">
					<div className="flex items-center bg-gray-100 p-2 rounded-lg w-1/2">
						<span className="mr-2">🔍</span>
						<input
							type="text"
							placeholder="What are you looking?"
							className="bg-transparent focus:outline-none w-full"
						/>
					</div>

					<div className="flex items-center space-x-4">
						<span>🔔</span>
						<img
							src="https://i.pravatar.cc/40"
							alt="Profile"
							className="w-10 h-10 rounded-full"
						/>
						<div className="font-semibold">Loidee Bee</div>
					</div>
				</header>

				{/* Dynamic Main Content */}
				<main className="p-8">
					{activePage === "overview" && <Overview />}
					{activePage === "registry" && <BirthRegistryList />}
				</main>
			</div>
		</div>
	);
}
