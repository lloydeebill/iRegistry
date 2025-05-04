"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { generateCertificatePDF } from "@/utils/generateCertificatePDF";

export default function BirthRequestDetailsPage() {
	const { id } = useParams();
	const [requestData, setRequestData] = useState(null);
	const [matchingRecord, setMatchingRecord] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const { data: request, error: requestError } = await supabase
				.from("birth_requests")
				.select("*")
				.eq("id", id)
				.single();

			if (requestError) {
				console.error("❌ Error fetching request:", requestError.message);
				return;
			}

			console.log("📥 Request Data:", request);
			setRequestData(request);

			const matchFields = {
				child_firstname: request.child_firstname,
				child_middlename: request.child_middlename,
				child_lastname: request.child_lastname,
				birthdate: request.child_birthdate, // ✅ fixed key
			};

			console.log("🔍 Trying to match with:", matchFields);

			const { data: match, error: matchError } = await supabase
				.from("birth_registration")
				.select("*")
				.match(matchFields)
				.single();

			if (matchError) {
				console.warn("⚠️ No exact match found in birth_registration.");
			} else {
				console.log("✅ Match found in registry:", match);
			}

			setMatchingRecord(match || null);
		};

		if (id) fetchData();
	}, [id]);

	if (!requestData) return <p className="text-center mt-10">Loading...</p>;

	// UI continues unchanged...

	return (
		<div className="max-w-6xl mx-auto my-12 px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
			{/* Left Column - Status */}
			<div className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
				<h2 className="text-xl font-bold mb-4">Status</h2>
				{matchingRecord ? (
					<div className="text-green-700 font-medium">
						Certificate found in registry.
					</div>
				) : (
					<div className="text-red-600 font-medium">
						No matching certificate found.
						<p className="mt-2 text-sm text-gray-600">
							Please inform the requestor to proceed with registration.
						</p>
					</div>
				)}
			</div>

			{/* Right Column - Request Preview */}
			<div className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
				<h2 className="text-xl font-bold mb-4">Request Information</h2>
				<div className="space-y-2 text-sm">
					<p>
						<b>Informant:</b> {requestData.informant_name}
					</p>
					<p>
						<b>Relationship:</b> {requestData.relationship}
					</p>
					<p>
						<b>Child Name:</b> {requestData.child_firstname}{" "}
						{requestData.child_middlename} {requestData.child_lastname}
					</p>
					<p>
						<b>Birthdate:</b> {requestData.child_birthdate}
					</p>
					<p>
						<b>Father:</b> {requestData.father_firstname}{" "}
						{requestData.father_middlename} {requestData.father_lastname}
					</p>
					<p>
						<b>Mother:</b> {requestData.mother_firstname}{" "}
						{requestData.mother_middlename} {requestData.mother_lastname}
					</p>
				</div>

				{matchingRecord && (
					<div className="mt-6 flex flex-col gap-3">
						<button
							onClick={async () => {
								try {
									const pdfBytes = await generateCertificatePDF(matchingRecord);
									const blob = new Blob([pdfBytes], {
										type: "application/pdf",
									});
									const link = document.createElement("a");
									link.href = URL.createObjectURL(blob);
									link.download = "birth_certificate.pdf";
									link.click();
								} catch (err) {
									console.error("Failed to generate PDF:", err);
								}
							}}
							className="w-full sm:w-48 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
						>
							Download PDF
						</button>

						<button
							onClick={() => window.history.back()}
							className="w-full sm:w-48 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
						>
							← Back to Requests List
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
