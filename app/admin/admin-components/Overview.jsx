"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Overview() {
	const [birthCounts, setBirthCounts] = useState({
		pending: 0,
		verified: 0,
		completed: 0,
	});
	const [requestCounts, setRequestCounts] = useState({
		pending: 0,
		verified: 0,
		completed: 0,
	});

	useEffect(() => {
		async function fetchCounts() {
			const fetchStatusCount = async (table, status) => {
				const { count } = await supabase
					.from(table)
					.select("*", { count: "exact", head: true })
					.eq("status", status);
				return count || 0;
			};

			setBirthCounts({
				pending: await fetchStatusCount("birth_registration", "Pending"),
				verified: await fetchStatusCount("birth_registration", "Verified"),
				completed: await fetchStatusCount("birth_registration", "Completed"),
			});

			setRequestCounts({
				pending: await fetchStatusCount("birth_requests", "Pending"),
				verified: await fetchStatusCount("birth_requests", "Verified"),
				completed: await fetchStatusCount("birth_requests", "Completed"),
			});
		}

		fetchCounts();
	}, []);

	return (
		<>
			<h2 className="text-2xl font-bold mb-4 text-blue-700">
				Hi there, Civil Registry Officer!
			</h2>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Registrations Section */}
				<section className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-2xl font-bold mb-6">Birth Registrations</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="bg-yellow-100 p-4 rounded-lg">
							<h4 className="text-yellow-600 font-semibold">Pending</h4>
							<p className="text-3xl font-bold mt-2">{birthCounts.pending}</p>
						</div>
						<div className="bg-blue-100 p-4 rounded-lg">
							<h4 className="text-blue-600 font-semibold">Verified</h4>
							<p className="text-3xl font-bold mt-2">{birthCounts.verified}</p>
						</div>
						<div className="bg-green-100 p-4 rounded-lg">
							<h4 className="text-green-600 font-semibold">Completed</h4>
							<p className="text-3xl font-bold mt-2">{birthCounts.completed}</p>
						</div>
					</div>
				</section>

				{/* Requests Section */}
				<section className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-2xl font-bold mb-6">Birth Requests</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="bg-yellow-100 p-4 rounded-lg">
							<h4 className="text-yellow-600 font-semibold">Pending</h4>
							<p className="text-3xl font-bold mt-2">{requestCounts.pending}</p>
						</div>
						<div className="bg-blue-100 p-4 rounded-lg">
							<h4 className="text-blue-600 font-semibold">Verified</h4>
							<p className="text-3xl font-bold mt-2">
								{requestCounts.verified}
							</p>
						</div>
						<div className="bg-green-100 p-4 rounded-lg">
							<h4 className="text-green-600 font-semibold">Completed</h4>
							<p className="text-3xl font-bold mt-2">
								{requestCounts.completed}
							</p>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
