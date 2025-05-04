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
		return <p className="p-4 text-center">Loading birth requests...</p>;

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
			<h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
				Birth Requests List
			</h1>

			<div className="overflow-x-auto bg-white rounded-md shadow">
				<table className="min-w-full table-auto">
					<thead className="bg-gray-100 text-sm text-left">
						<tr>
							<th className="px-4 py-3 font-semibold">Informant Name</th>
							<th className="px-4 py-3 font-semibold">Child Name</th>
							<th className="px-4 py-3 font-semibold">Birthdate</th>
							<th className="px-4 py-3 font-semibold">Submitted</th>
							<th className="py-3 px-4 text-left">Status</th>
							<th className="py-3 px-4 text-left">Action</th>
						</tr>
					</thead>
					<tbody className="text-sm divide-y divide-gray-200">
						{requests.map((request) => (
							<tr key={request.id}>
								<td className="px-4 py-2">{request.informant_name}</td>
								<td className="px-4 py-2">
									{request.child_firstname} {request.child_middlename}{" "}
									{request.child_lastname}
								</td>
								<td className="px-4 py-2">
									{request.child_birthdate
										? new Date(request.child_birthdate).toLocaleDateString(
												"en-US",
												{
													year: "numeric",
													month: "long",
													day: "numeric",
												}
										  )
										: "N/A"}
								</td>

								<td className="px-4 py-2">
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
								<td colSpan="4" className="text-center py-4 text-gray-500">
									No birth requests found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
