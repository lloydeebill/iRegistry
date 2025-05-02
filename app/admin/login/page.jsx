"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const hardcodedAdmin = {
		email: "civilworker@i-registry.com",
		password: "admin123",
	};

	const handleLogin = (e) => {
		e.preventDefault();

		if (email === hardcodedAdmin.email && password === hardcodedAdmin.password) {
			router.push("/admin/dashboard");
		} else {
			setError("Invalid credentials. Please try again.");
		}
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
			{/* Image Section */}
			<div className="hidden md:flex flex-col justify-center items-center w-1/2 p-8">
				<Image
					src="/admin-design.png" // Make sure it's a transparent PNG in your /public folder
					alt="Admin Illustration"
					width={320}
					height={320}
					className="opacity-80 object-contain mix-blend-multiply"
				/>
				<h2 className="mt-6 text-2xl font-semibold text-blue-800 text-center">
					Welcome Back, Officer
				</h2>
				<p className="text-blue-600 text-center mt-2">
					Secure access to the iRegistry Admin Panel.
				</p>
			</div>

			{/* Login Form Section */}
			<div className="w-full md:w-1/2 max-w-md bg-white p-8 rounded-2xl shadow-2xl">
				{/* iRegistry Logo */}
				<div className="flex justify-center mb-6">
					<Image
						src="/iregistry.png" // Ensure this file exists in /public
						alt="iRegistry Logo"
						width={160}
						height={60}
						className="object-contain"
					/>
				</div>

				{/* Error Message */}
				{error && <div className="text-red-500 mb-4 text-center">{error}</div>}

				{/* Login Form */}
				<form onSubmit={handleLogin} className="space-y-5">
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>

					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							id="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-1 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>

					<button
						type="submit"
						className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition"
					>
						Sign In
					</button>
				</form>
			</div>
		</div>
	);
}
