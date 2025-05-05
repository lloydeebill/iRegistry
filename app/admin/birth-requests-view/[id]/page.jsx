"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { generateCertificatePDF } from "@/utils/generateCertificatePDF";
import { StatusPopover } from "../../admin-components/StatusPopover";
import DashboardShell from "../../admin-components/DashboardShell"; // ✅ import your layout
import { Button } from "@/components/ui/button"; // Make sure this is imported

export default function BirthRequestDetailsWrapper() {
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

			setRequestData(request);

			const matchFields = {
				child_firstname: request.child_firstname,
				child_middlename: request.child_middlename,
				child_lastname: request.child_lastname,
				birthdate: request.child_birthdate,
			};

			const { data: match } = await supabase
				.from("birth_registration")
				.select("*")
				.match(matchFields)
				.single();

			setMatchingRecord(match || null);
		};

		if (id) fetchData();
	}, [id]);

	const handleDownloadPDF = async () => {
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
	};

	if (!requestData)
		return (
			<DashboardShell>
				<div className="flex justify-center min-h-screen lg:mt-72">
					<h1 className="text-blue-700 text-2xl">Loading...</h1>
				</div>{" "}
			</DashboardShell>
		);

	return (
		<DashboardShell>
			<div className="max-w-6xl mx-auto my-12 px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Left Column */}
				<div className="bg-white shadow-md p-6 rounded-lg border border-gray-200 flex flex-col gap-6">
					<h2 className="text-xl font-bold mb-4">Status:</h2>
					{matchingRecord ? (
						<div className="text-green-700 font-medium lg:text-3xl">
							Certificate found in registry.
						</div>
					) : (
						<div className="text-red-600 font-medium lg:text-3xl">
							No matching certificate found.
							<p className="mt-2 text-sm text-gray-600">
								Please inform the requestor to proceed with registration.
							</p>
						</div>
					)}

					<div className="mt-6 flex gap-3">
						<Button
							onClick={() => window.history.back()}
							className="w-full sm:w-48 bg-gray-500 hover:bg-gray-600 text-white"
						>
							← Back to Registry List
						</Button>

						<Button
							onClick={handleDownloadPDF}
							className="w-full sm:w-48 bg-green-600 hover:bg-green-700 text-white"
						>
							Download PDF
						</Button>

						<StatusPopover
							id={requestData.id}
							currentStatus={requestData.status}
							table="birth_requests"
							email={requestData.user_email}
							childName={requestData.child_firstname}
							emailContext="request"
						/>
					</div>
				</div>

				{/* Right Column */}
				<div className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
					<h2 className="text-xl font-bold mb-4">Request Information</h2>
					<div className="space-y-2 text-sm">
						<p>
							<b>Informant:</b>{" "}
							<span className="text-blue-700 px-3">
								{requestData.informant_name}{" "}
							</span>
						</p>
						<p>
							<b>Relationship:</b>{" "}
							<span className="text-blue-700 px-3">
								{requestData.relationship}{" "}
							</span>
						</p>
						<p>
							<b>Child Name:</b>{" "}
							<span className="text-blue-700 px-3">
								{requestData.child_firstname} {requestData.child_middlename}{" "}
								{requestData.child_lastname}{" "}
							</span>
						</p>
						<p>
							<b>Birthdate:</b>{" "}
							<span className="text-blue-700 px-3">
								{requestData.child_birthdate
									? new Date(requestData.child_birthdate).toLocaleDateString(
											"en-US",
											{
												year: "numeric",
												month: "long",
												day: "numeric",
											},
										)
									: "N/A"}
							</span>
						</p>
						<p>
							<b>Father:</b>{" "}
							<span className="text-blue-700 px-3">
								{requestData.father_firstname} {requestData.father_middlename}{" "}
								{requestData.father_lastname}
							</span>
						</p>
						<p>
							<b>Mother:</b>{" "}
							<span className="text-blue-700 px-3">
								{requestData.mother_firstname} {requestData.mother_middlename}{" "}
								{requestData.mother_lastname}
							</span>
						</p>
						<p>
							<b>User Email:</b>{" "}
							<span className="text-blue-700 px-3">
								{requestData.user_email}
							</span>
						</p>
					</div>
				</div>
			</div>
		</DashboardShell>
	);
}
