"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function BirthRequestList() {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchRequests = async () => {
			const { data, error } = await supabase
				.from("birth_requests")
				.select("*")
				.order("created_at", { ascending: false });

			if (error) {
				console.error("Error fetching birth requests:", error.message);
			} else {
				setRequests(data);
			}
			setLoading(false);
		};

		fetchRequests();
	}, []);

	if (loading)
		return (
			<div className="flex justify-center lg:mt-72 min-h-screen">
				<h1 className="text-blue-700 text-2xl">Loading...</h1>
			</div>
		);

	return (
		<>
			<h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
				Certificate of Live Birth Requests
			</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
					<thead className="bg-[#3790d7] text-white">
						<tr>
							<th className="py-3 px-4 text-left">Informant</th>
							<th className="py-3 px-4 text-left">Child Full Name</th>
							<th className="py-3 px-4 text-left">Birthdate</th>
							<th className="py-3 px-4 text-left">Submitted</th>
							<th className="py-3 px-4 text-left">Status</th>
							<th className="py-3 px-4 text-left">Action</th>
						</tr>
					</thead>
					<tbody>
						{requests.map((request) => (
							<tr key={request.id} className="border-t hover:bg-gray-100">
								<td className="py-3 px-4">{request.informant_name}</td>
								<td className="py-3 px-4">
									{request.child_firstname} {request.child_middlename}{" "}
									{request.child_lastname}
								</td>
								<td className="py-3 px-4">
									{request.child_birthdate
										? new Date(request.child_birthdate).toLocaleDateString(
												"en-US",
												{
													year: "numeric",
													month: "long",
													day: "numeric",
												},
											)
										: "N/A"}
								</td>
								<td className="py-3 px-4">
									{new Date(request.created_at).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</td>
								<td className="py-3 px-4 capitalize">{request.status}</td>
								<td className="py-3 px-4">
									<button
										onClick={() =>
											router.push(`/admin/birth-requests-view/${request.id}`)
										}
										className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
									>
										View
									</button>
								</td>
							</tr>
						))}
						{requests.length === 0 && (
							<tr>
								<td colSpan="6" className="text-center py-4 text-gray-500">
									No birth requests found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
}
