"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	// Hardcoded credentials for now
	const hardcodedAdmin = {
		email: "civilworker@i-registry.com",
		password: "admin123",
	};

	async function handleLogin(e) {
		e.preventDefault();

		if (
			email === hardcodedAdmin.email &&
			password === hardcodedAdmin.password
		) {
			router.push("/admin/dashboard"); // Redirect to dashboard if correct
		} else {
			setError("Invalid credentials. Please try again.");
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h1 className="text-2xl font-bold mb-6 text-center">
					Civil Registry Worker Login
				</h1>

				{error && <div className="text-red-500 mb-4 text-center">{error}</div>}

				<form onSubmit={handleLogin} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email Address
						</label>
						<input
							type="email"
							id="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>

					<button
						type="submit"
						className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
					>
						Sign In
					</button>
				</form>
			</div>
		</div>
	);
}
