"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // adjust if needed

export default function BirthRegistryList() {
	const [birthRegistrations, setBirthRegistrations] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchBirthRegistrations();
	}, []);

	async function fetchBirthRegistrations() {
		const { data, error } = await supabase
			.from("birth_registration")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching birth registrations:", error.message);
		} else {
			setBirthRegistrations(data);
		}
		setLoading(false);
	}

	return (
		<>
			<h2 className="text-2xl font-bold mb-6">Birth Registry List</h2>

			{loading ? (
				<p>Loading...</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
						<thead className="bg-[#3790d7] text-white">
							<tr>
								<th className="py-3 px-4 text-left">Child Full Name</th>
								<th className="py-3 px-4 text-left">Date of Birth</th>
								<th className="py-3 px-4 text-left">Status</th>
								<th className="py-3 px-4 text-left">Submitted At</th>
								<th className="py-3 px-4 text-left">Action</th>
							</tr>
						</thead>
						<tbody>
							{birthRegistrations.map((registration) => (
								<tr
									key={registration.id}
									className="border-t hover:bg-gray-100"
								>
									<td className="py-3 px-4">
										{registration.child_firstname}{" "}
										{registration.child_middlename}{" "}
										{registration.child_lastname}
									</td>
									<td className="py-3 px-4">{registration.birthdate}</td>
									<td className="py-3 px-4 capitalize">
										{registration.status || "Pending"}
									</td>
									<td className="py-3 px-4">
										{registration.created_at
											? new Date(registration.created_at).toLocaleDateString()
											: "N/A"}
									</td>
									<td className="py-3 px-4">
										<button
											onClick={() =>
												alert(`View details for ID: ${registration.id}`)
											}
											className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
										>
											View
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}
