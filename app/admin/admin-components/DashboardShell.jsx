"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardShell({ children }) {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<div className="min-h-screen flex bg-gray-100">
			{/* Sidebar (optional, if needed later) */}

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				{/* Topbar */}
				<header className="flex items-center justify-between px-6 py-4 bg-white shadow-lg shadow-blue-200">
					{/* Logo */}
					<div className="flex items-center">
						<Image
							src="/iregistry.png"
							alt="iRegistry Logo"
							width={180}
							height={40}
							className="object-contain"
							priority
						/>
					</div>

					{/* Right side */}
					<div className="flex items-center gap-4">
						<span className="text-xl">🔔</span>
						<img
							src="/officer-pic.png"
							alt="Profile"
							className="w-10 h-10 rounded-full"
						/>
						<div className="font-semibold text-sm">Registry Officer 1</div>
					</div>
				</header>

				<main className="p-8">{children}</main>
			</div>
		</div>
	);
}
