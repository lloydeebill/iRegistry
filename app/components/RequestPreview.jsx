"use client";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

const RequestPreview = () => {
	const searchParams = useSearchParams();
	const [userEmail, setUserEmail] = useState("");
	const [status, setStatus] = useState("");

	// ✅ Get currently logged-in user's email
	useEffect(() => {
		const getUser = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setUserEmail(session?.user?.email || "");
		};
		getUser();
	}, []);

	// ✅ Helper to safely read values from query params
	const get = (key) => searchParams.get(key) || "";

	// ✅ Build request data including email from Supabase
	const requestData = {
		informant_name: get("informant_name"),
		relationship: get("relationship"),
		child_firstname: get("child_firstname"),
		child_middlename: get("child_middlename"),
		child_lastname: get("child_lastname"),
		child_birthdate: get("child_birthdate"),
		child_sex: get("child_sex"),
		father_firstname: get("father_firstname"),
		father_middlename: get("father_middlename"),
		father_lastname: get("father_lastname"),
		mother_firstname: get("mother_firstname"),
		mother_middlename: get("mother_middlename"),
		mother_lastname: get("mother_lastname"),
		user_email: userEmail, // ✅ pulled from Supabase session
		status: "Pending",
	};

	const handleSubmitRequest = async () => {
		try {
			const { error } = await supabase
				.from("birth_requests") // Replace with your actual table
				.insert([requestData]);

			if (error) {
				setStatus("Error submitting request: " + error.message);
			} else {
				setStatus(
					"Request submitted successfully. We'll notify you via email."
				);
			}
		} catch (err) {
			console.error("Request submission failed:", err);
			setStatus("An unexpected error occurred.");
		}
	};

	return (
		<div className="min-h-8 bg-gray-100 py-10 px-4">
			<div className="max-w-xl mx-auto bg-white p-8 shadow-md rounded-md">
				<h2 className="text-xl font-bold mb-4 lg:mb-8 text-center">
					Certificate Request Preview
				</h2>

				<div className="grid grid-cols-1 gap-2 lg:gap-4 text-sm">
					{Object.entries(requestData)
						.filter(([key]) => key !== "status")
						.map(([key, value]) => (
							<p key={key}>
								<span className="font-semibold capitalize">
									{key.replaceAll("_", " ")}:
								</span>{" "}
								<span className="text-blue-700 font-medium">
									{value || "N/A"}
								</span>
							</p>
						))}
				</div>

				<div className="mt-6 lg:mt-10 text-center">
					<button
						onClick={handleSubmitRequest}
						className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
					>
						Submit Request
					</button>
					{status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
				</div>
			</div>
		</div>
	);
};

export default RequestPreview;
