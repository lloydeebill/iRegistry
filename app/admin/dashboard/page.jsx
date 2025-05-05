"use client";

import { useState } from "react";
import Overview from "../admin-components/Overview";
import BirthRegistryList from "../admin-components/BirthRegistryList";
import BirthRequestList from "../admin-components/BirthRequestsList";
import Image from "next/image";

export default function AdminDashboardPage() {
	const [activePage, setActivePage] = useState("overview");

	return (
		<div className="min-h-screen flex bg-neutral-50 font-sans">
			{/* Sidebar */}
			<aside className="w-64 bg-white flex flex-col items-center  z-0">
				{/* Logo Instead of "Dashboard" */}
				<Image
					src="/iregistry.png"
					alt="iRegistry Logo"
					width={300}
					height={60}
					className="object-contain mb-10"
				/>

				<nav className="flex flex-col w-full text-lg font-semibold">
					<button
						onClick={() => setActivePage("overview")}
						className={`flex items-center space-x-2 hover:bg-blue-50 text-left p-6 ${
							activePage === "overview" ? "font-semibold bg-blue-50" : ""
						}`}
					>
						<span>Home</span>
					</button>

					<button
						onClick={() => setActivePage("registry")}
						className={`flex items-center space-x-2 hover:bg-blue-50 text-left p-6 ${
							activePage === "registry" ? "font-semibold bg-blue-50" : ""
						}`}
					>
						<span>Live Birth Database</span>
					</button>

					<button
						onClick={() => setActivePage("request")}
						className={`flex items-center space-x-2 hover:bg-blue-50 text-left p-6 ${
							activePage === "request" ? "font-semibold bg-blue-50" : ""
						}`}
					>
						<span>Birth Request List</span>
					</button>
				</nav>
			</aside>

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				{/* Topbar */}
				<header className="flex items-center justify-between p-6 bg-white shadow-lg shadow-blue-200 px-9">
					<div className="">
						<h1 className="text-3xl font-bold x">Dashboard</h1>
					</div>
					<div className="flex items-center space-x-4">
						<span>🔔</span>
						<img
							src="/officer-pic.png"
							alt="Profile"
							className="w-10 h-10 rounded-full"
						/>
						<div className="font-semibold">Registry Officer 1 </div>
					</div>
				</header>

				<main className="p-8">
					{activePage === "overview" && <Overview />}
					{activePage === "registry" && <BirthRegistryList />}
					{activePage === "request" && <BirthRequestList />}
				</main>
			</div>
		</div>
	);
}
