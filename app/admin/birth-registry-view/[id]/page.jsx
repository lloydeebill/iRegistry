"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { StatusPopover } from "../../admin-components/StatusPopover";
import { generateCertificatePDF } from "@/utils/generateCertificatePDF";
import { Button } from "@/components/ui/button"; // Make sure this is imported
import { OfficerEditor } from "../../admin-components/OfficerEditor";

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

	if (loading) return <p className="p-4">Loading...</p>;
	if (!formData) return <p className="p-4 text-red-600">No data found.</p>;

	return (
		<div className="min-h-screen bg-gray-100 py-10 px-4">
			<div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-md">
				<h1 className="text-2xl font-bold mb-6 text-center">
					View Birth Registration
				</h1>
				<div className="space-y-6 text-sm px-10">
					{/* 👤 Registrant Info */}
					<section className="flex flex-col gap-2">
						<h3 className="text-lg font-bold mb-2 text-center">
							Registrant Info
						</h3>
						<p>
							<strong>Full Name:</strong> {formData.fullname}
						</p>
						<p>
							<strong>Relationship:</strong> {formData.relationship}
						</p>
						<p>
							<strong>Address:</strong> {formData.address}
						</p>
						<p>
							<strong>Contact:</strong> {formData.contact}
						</p>
					</section>

					{/* 👶 Child Info */}
					<section className="flex flex-col gap-2">
						<h3 className="text-lg font-bold mb-2 text-center">Child Info</h3>
						<p>
							<strong>First Name:</strong> {formData.child_firstname}
						</p>
						<p>
							<strong>Middle Name:</strong> {formData.child_middlename}
						</p>
						<p>
							<strong>Last Name:</strong> {formData.child_lastname}
						</p>
						<p>
							<strong>Sex:</strong> {formData.sex}
						</p>
						<p>
							<strong>Birthdate:</strong> {formData.birthdate}
						</p>
						<p>
							<strong>Birthplace:</strong> {formData.birthplace}
						</p>
						<p>
							<strong>Birth City:</strong> {formData.birth_city}
						</p>
						<p>
							<strong>Birth Province:</strong> {formData.birth_province}
						</p>
					</section>

					{/* 📅 Birth Details */}
					<section className="flex flex-col gap-2">
						<h3 className="text-lg font-bold mb-2 text-center">
							Birth Details
						</h3>
						<p>
							<strong>Type of Birth:</strong> {formData.type_of_birth}
						</p>
						<p>
							<strong>Other Type:</strong> {formData.type_of_birth_other}
						</p>
						<p>
							<strong>Birth Order:</strong> {formData.birth_order}
						</p>
						<p>
							<strong>Other Birth Order:</strong> {formData.birth_order_other}
						</p>
						<p>
							<strong>Multiple Birth Order:</strong>{" "}
							{formData.multiple_birth_order}
						</p>
						<p>
							<strong>Other Multiple Order:</strong>{" "}
							{formData.multiple_birth_order_other}
						</p>
						<p>
							<strong>Birth Weight in grams:</strong> {formData.birth_weight}
						</p>
					</section>

					{/* 👩‍⚕️ Attendant Info */}
					<section className="flex flex-col gap-2">
						<h3 className="text-lg font-bold mb-2 text-center">
							Birth Attendant
						</h3>
						<p>
							<strong>Attendant:</strong> {formData.attendant}
						</p>
						<p>
							<strong>Attendant Name:</strong> {formData.attendant_name}
						</p>
						<p>
							<strong>Address:</strong> {formData.attendant_address}
						</p>
					</section>

					{/* 👪 Parents Info */}
					<section className="flex flex-col gap-2">
						<h3 className="text-lg font-bold mb-2 text-center">Father Info</h3>
						<p>
							<strong>First Name:</strong> {formData.father_firstname}
						</p>
						<p>
							<strong>Middle Name:</strong> {formData.father_middlename}
						</p>
						<p>
							<strong>Last Name:</strong> {formData.father_lastname}
						</p>
						<p>
							<strong>Nationality:</strong> {formData.father_nationality}
						</p>
						<p>
							<strong>Religion:</strong> {formData.father_religion}
						</p>
						<p>
							<strong>Occupation:</strong> {formData.father_occupation}
						</p>
						<p>
							<strong>Age at Birth:</strong> {formData.father_age_at_birth}
						</p>
						<p>
							<strong>Date of Birth:</strong> {formData.father_dob}
						</p>
						<p>
							<strong>Residence:</strong> {formData.father_residence}
						</p>
					</section>

					<section className="flex flex-col gap-2">
						<h3 className="text-lg font-bold mb-2 text-center">Mother Info</h3>
						<p>
							<strong>First Name:</strong> {formData.mother_firstname}
						</p>
						<p>
							<strong>Middle Name:</strong> {formData.mother_middlename}
						</p>
						<p>
							<strong>Last Name:</strong> {formData.mother_lastname}
						</p>
						<p>
							<strong>Nationality:</strong> {formData.mother_nationality}
						</p>
						<p>
							<strong>Religion:</strong> {formData.mother_religion}
						</p>
						<p>
							<strong>Occupation:</strong> {formData.mother_occupation}
						</p>
						<p>
							<strong>Age at Birth:</strong> {formData.mother_age_at_birth}
						</p>
						<p>
							<strong>Date of Birth:</strong> {formData.mother_dob}
						</p>
						<p>
							<strong>Residence:</strong> {formData.mother_residence}
						</p>
					</section>

					{/* 💍 Marriage Info */}
					<section className="flex flex-col gap-2">
						<h3 className="text-lg font-bold mb-2 text-center">
							Marriage Info
						</h3>
						<p>
							<strong>Parents Married:</strong> {formData.parents_married}
						</p>
						<p>
							<strong>Marriage Date:</strong> {formData.marriage_date}
						</p>
						<p>
							<strong>Marriage City:</strong> {formData.marriage_city}
						</p>
						<p>
							<strong>Marriage Province:</strong> {formData.marriage_province}
						</p>
						<p>
							<strong>Marriage Country:</strong> {formData.marriage_country}
						</p>
					</section>

					{/* 🧒 Siblings */}
					<section className="flex flex-col gap-2">
						<h3 className="text-lg font-bold mb-2 text-center">
							Siblings Summary
						</h3>
						<p>
							<strong>Children Born Alive:</strong>{" "}
							{formData.children_born_alive}
						</p>
						<p>
							<strong>Still Living:</strong> {formData.children_still_living}
						</p>
						<p>
							<strong>Deceased:</strong> {formData.children_deceased}
						</p>
					</section>

					<section className="flex flex-col gap-2">
						<h3 className="text-lg font-bold mb-2 text-center">Prepared By</h3>
						<p>
							<strong>Officer Name:</strong> {formData.officer_name || "N/A"}
						</p>
						<p>
							<strong>Position:</strong> {formData.officer_position || "N/A"}
						</p>
						<p>
							<strong>Date Prepared:</strong> {formData.prepared_date || "N/A"}
						</p>
					</section>

					<div className="flex flex-col justify-center items-center gap-4 mt-8">
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

						{/* Back to List */}
						<Button
							onClick={() => window.history.back()}
							className="w-full sm:w-48 bg-gray-500 hover:bg-gray-600 text-white"
						>
							← Back to Registry List
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
