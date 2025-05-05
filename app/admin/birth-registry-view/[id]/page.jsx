"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { StatusPopover } from "../../admin-components/StatusPopover";
import { generateCertificatePDF } from "@/utils/generateCertificatePDF";
import { Button } from "@/components/ui/button"; // Make sure this is imported
import { OfficerEditor } from "../../admin-components/OfficerEditor";
import DashboardShell from "../../admin-components/DashboardShell"; // ✅ import your layout

export default function ViewBirthRegistration() {
	const { id } = useParams();
	const [formData, setFormData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [updating, setUpdating] = useState(false);

	const handleStatusUpdate = async (newStatus) => {
		setUpdating(true);
		const { error } = await supabase
			.from("birth_registration")
			.update({ status: newStatus })
			.eq("id", id);

		setUpdating(false);

		if (error) {
			alert("Failed to update status: " + error.message);
		} else {
			alert("Status updated to " + newStatus);
			window.location.reload(); // optional: refresh to show updated status
		}
	};

	const handleOfficerSave = async (updates) => {
		const { error } = await supabase
			.from("birth_registration")
			.update(updates)
			.eq("id", id);

		if (!error) {
			alert("Officer info updated successfully");
			setFormData({ ...formData, ...updates });
		} else {
			console.error(error);
			alert("Failed to update officer info");
		}
	};

	const handleDownloadPDF = async () => {
		try {
			const pdfBytes = await generateCertificatePDF(formData);
			const blob = new Blob([pdfBytes], { type: "application/pdf" });
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = "birth_certificate_preview.pdf";
			link.click();
		} catch (error) {
			console.error("PDF generation failed:", error);
		}
	};

	useEffect(() => {
		async function fetchData() {
			const { data, error } = await supabase
				.from("birth_registration")
				.select("*")
				.eq("id", id)
				.single();

			if (error) {
				console.error("Error fetching record:", error.message);
			} else {
				setFormData(data);
			}
			setLoading(false);
		}

		fetchData();
	}, [id]);

	if (loading)
		return (
			<DashboardShell>
				<div className="flex justify-center min-h-screen lg:mt-72">
					<h1 className="text-blue-700 text-2xl">Loading...</h1>
				</div>{" "}
			</DashboardShell>
		);
	if (!formData) return <p className="p-4 text-red-600">No data found.</p>;

	return (
		<DashboardShell>
			<div className="min-h-screen bg-gray-100 py-10 px-4">
				<div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-md">
					<h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
						View Birth Registration
					</h1>
					<div className="space-y-6 text-lg px-10">
						{/* 👤 Registrant Info */}
						<section className="flex flex-col gap-2">
							<h3 className="text-lg font-bold mb-2 text-center">
								Registrant Info
							</h3>
							<p>
								<strong>Full Name:</strong>{" "}
								<span className="text-blue-700 px-3">{formData.fullname}</span>
							</p>
							<p>
								<strong>Relationship:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.relationship}
								</span>
							</p>
							<p>
								<strong>Address:</strong>{" "}
								<span className="text-blue-700 px-3">{formData.address}</span>
							</p>
							<p>
								<strong>Contact:</strong>{" "}
								<span className="text-blue-700 px-3">{formData.contact}</span>
							</p>
						</section>
						{/* 👶 Child Info */}
						<section className="flex flex-col gap-2">
							<h3 className="text-lg font-bold mb-2 text-center">Child Info</h3>
							<p>
								<strong>First Name:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.child_firstname}
								</span>
							</p>
							<p>
								<strong>Middle Name:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.child_middlename}
								</span>
							</p>
							<p>
								<strong>Last Name:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.child_lastname}
								</span>
							</p>
							<p>
								<strong>Sex:</strong>{" "}
								<span className="text-blue-700 px-3">{formData.sex}</span>
							</p>
							<p>
								<strong>Birthdate:</strong>{" "}
								<span className="text-blue-700 px-3">{formData.birthdate}</span>
							</p>
							<p>
								<strong>Birthplace:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.birthplace}
								</span>
							</p>
							<p>
								<strong>Birth City:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.birth_city}
								</span>
							</p>
							<p>
								<strong>Birth Province:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.birth_province}
								</span>
							</p>
						</section>
						{/* 📅 Birth Details */}
						<section className="flex flex-col gap-2">
							<h3 className="text-lg font-bold mb-2 text-center">
								Birth Details
							</h3>
							<p>
								<strong>Type of Birth:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.type_of_birth}
								</span>
							</p>
							<p>
								<strong>Other Type:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.type_of_birth_other || "N/A"}
								</span>
							</p>
							<p>
								<strong>Birth Order:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.birth_order}
								</span>
							</p>
							<p>
								<strong>Other Birth Order:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.birth_order_other || "N/A"}{" "}
								</span>
							</p>
							<p>
								<strong>Multiple Birth Order:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.multiple_birth_order || "N/A"}{" "}
								</span>
							</p>
							<p>
								<strong>Other Multiple Order:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.multiple_birth_order_other || "N/A"}{" "}
								</span>
							</p>
							<p>
								<strong>Birth Weight in grams:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.birth_weight}
								</span>
							</p>
						</section>
						{/* 👩‍⚕️ Attendant Info */}
						<section className="flex flex-col gap-2">
							<h3 className="text-lg font-bold mb-2 text-center">
								Birth Attendant
							</h3>
							<p>
								<strong>Attendant:</strong>{" "}
								<span className="text-blue-700 px-3">{formData.attendant}</span>
							</p>
							<p>
								<strong>Attendant Name:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.attendant_name}
								</span>
							</p>
							<p>
								<strong>Address:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.attendant_address}
								</span>
							</p>
						</section>
						{/* 👪 Parents Info */}
						<section className="flex flex-col gap-2">
							<h3 className="text-lg font-bold mb-2 text-center">
								Father Info
							</h3>
							<p>
								<strong>First Name:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.father_firstname}
								</span>
							</p>
							<p>
								<strong>Middle Name:</strong>
								<span className="text-blue-700 px-3">
									{formData.father_middlename}
								</span>
							</p>
							<p>
								<strong>Last Name:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.father_lastname}
								</span>
							</p>
							<p>
								<strong>Nationality:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.father_nationality}
								</span>
							</p>
							<p>
								<strong>Religion:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.father_religion}
								</span>
							</p>
							<p>
								<strong>Occupation:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.father_occupation}
								</span>
							</p>
							<p>
								<strong>Age at Birth:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.father_age_at_birth}
								</span>
							</p>
							<p>
								<strong>Date of Birth:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.father_dob}
								</span>
							</p>
							<p>
								<strong>Residence:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.father_residence}
								</span>
							</p>
						</section>
						<section className="flex flex-col gap-2">
							<h3 className="text-lg font-bold mb-2 text-center">
								Mother Info
							</h3>
							<p>
								<strong>First Name:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.mother_firstname}
								</span>
							</p>
							<p>
								<strong>Middle Name:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.mother_middlename}
								</span>
							</p>
							<p>
								<strong>Last Name:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.mother_lastname}
								</span>
							</p>
							<p>
								<strong>Nationality:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.mother_nationality}
								</span>
							</p>
							<p>
								<strong>Religion:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.mother_religion}
								</span>
							</p>
							<p>
								<strong>Occupation:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.mother_occupation}
								</span>
							</p>
							<p>
								<strong>Age at Birth:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.mother_age_at_birth}
								</span>
							</p>
							<p>
								<strong>Date of Birth:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.mother_dob}
								</span>
							</p>
							<p>
								<strong>Residence:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.mother_residence}
								</span>
							</p>
						</section>
						{/* 💍 Marriage Info */}
						<section className="flex flex-col gap-2">
							<h3 className="text-lg font-bold mb-2 text-center">
								Marriage Info
							</h3>
							<p>
								<strong>Parents Married:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.parents_married}
								</span>
							</p>
							<p>
								<strong>Marriage Date:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.marriage_date}
								</span>
							</p>
							<p>
								<strong>Marriage City:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.marriage_city}
								</span>
							</p>
							<p>
								<strong>Marriage Province:</strong>
								<span className="text-blue-700 px-3">
									{formData.marriage_province}
								</span>
							</p>
							<p>
								<strong>Marriage Country:</strong>
								<span className="text-blue-700 px-3">
									{formData.marriage_country}{" "}
								</span>
							</p>
						</section>
						{/* 🧒 Siblings */}
						<section className="flex flex-col gap-2">
							<h3 className="text-lg font-bold mb-2 text-center">
								Siblings Summary
							</h3>
							<p>
								<strong>Children Born Alive:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.children_born_alive}{" "}
								</span>
							</p>
							<p>
								<strong>Still Living:</strong>
								<span className="text-blue-700 px-3">
									{formData.children_still_living}{" "}
								</span>
							</p>
							<p>
								<strong>Deceased:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.children_deceased}{" "}
								</span>
							</p>
						</section>
						<section className="flex flex-col gap-2">
							<h3 className="text-lg font-bold mb-2 text-center">
								Prepared By
							</h3>
							<p>
								<strong>Officer Name:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.officer_name || "N/A"}{" "}
								</span>
							</p>
							<p>
								<strong>Position:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.officer_position || "N/A"}
								</span>
							</p>
							<p>
								<strong>Date Prepared:</strong>{" "}
								<span className="text-blue-700 px-3">
									{formData.prepared_date || "N/A"}{" "}
								</span>
							</p>
						</section>
						<div className="flex justify-center items-center gap-4 pt-16">
							{/* Back to List */}
							<Button
								onClick={() => window.history.back()}
								className="w-full sm:w-48 bg-gray-500 hover:bg-gray-600 text-white"
							>
								← Back to Registry List
							</Button>
							<OfficerEditor data={formData} onSave={handleOfficerSave} />
							{/* Update Status */}
							<StatusPopover
								id={formData.id}
								currentStatus={formData.status}
								table="birth_registration"
								email={formData.user_email} // or email field you collect
								childName={formData.child_firstname}
								emailContext="registry"
							/>
							{/* Download PDF */}
							<Button
								onClick={handleDownloadPDF}
								className="w-full sm:w-48 bg-green-600 hover:bg-green-700 text-white"
							>
								Download PDF
							</Button>
						</div>
					</div>
				</div>
			</div>
		</DashboardShell>
	);
}
