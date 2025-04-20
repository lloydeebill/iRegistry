"use client";
export const dynamic = "force-dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import { generateCertificatePDF } from "@/utils/generateCertificatePDF";
import { supabase } from "@/lib/supabaseClient";

const FormPreview = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const get = (key) => searchParams.get(key) || "";

	const formData = {
		fullname: get("fullname"),
		relationship: get("relationship"),
		address: get("address"),
		contact: get("contact"),
		child_firstname: get("child_firstname"),
		child_middlename: get("child_middlename"),
		child_lastname: get("child_lastname"),
		sex: get("sex"),
		birthdate: get("birthdate"),
		birthplace: get("birthplace"),
		type_of_birth: get("type_of_birth"),
		type_of_birth_other: get("type_of_birth_other"),
		multiple_birth_order: get("multiple_birth_order"),
		multiple_birth_order_other: get("multiple_birth_order_other"),
		birth_order: get("birth_order"),
		birth_order_other: get("birth_order_other"),
		birth_weight: get("birth_weight"),
		attendant: get("attendant"),
		attendant_name: get("attendant_name"),
		attendant_address: get("attendant_address"),
		attendant_position: get("attendant_position"),
		parents_married: get("parents_married"),
		marriage_date: get("marriage_date"),
		marriage_city: get("marriage_city"),
		marriage_province: get("marriage_province"),
		marriage_country: get("marriage_country"),
		father_firstname: get("father_firstname"),
		father_middlename: get("father_middlename"),
		father_lastname: get("father_lastname"),
		father_nationality: get("father_nationality"),
		father_religion: get("father_religion"),
		father_occupation: get("father_occupation"),
		father_age_at_birth: get("father_age_at_birth"),
		father_dob: get("father_dob"),
		father_residence: get("father_residence"),
		mother_firstname: get("mother_firstname"),
		mother_middlename: get("mother_middlename"),
		mother_lastname: get("mother_lastname"),
		mother_nationality: get("mother_nationality"),
		mother_religion: get("mother_religion"),
		mother_occupation: get("mother_occupation"),
		mother_age_at_birth: get("mother_age_at_birth"),
		mother_dob: get("mother_dob"),
		mother_residence: get("mother_residence"),
		children_born_alive: get("children_born_alive"),
		children_still_living: get("children_still_living"),
		children_deceased: get("children_deceased"),
		consent: get("consent"),
	};

	const handleDownload = async () => {
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

	const handleEdit = () => {
		const queryParams = new URLSearchParams(formData).toString();
		router.push(`/regcolb/form?${queryParams}`);
	};

	const handleFinalSubmit = async () => {
		const cleanData = { ...formData };

		// Convert expected integer fields
		[
			"father_age_at_birth",
			"mother_age_at_birth",
			"children_born_alive",
			"children_still_living",
			"children_deceased",
		].forEach((key) => {
			const value = cleanData[key];
			cleanData[key] = value === "" ? null : parseInt(value, 10);
		});

		try {
			const { error } = await supabase
				.from("birth_registration")
				.insert([cleanData]);
			if (error) {
				alert("Error submitting form: " + error.message);
			} else {
				alert("Form submitted successfully!");
			}
		} catch (err) {
			console.error("Submit failed:", err);
			alert("An error occurred during submission.");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 py-10 px-4">
			<div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-md">
				<h1 className="text-2xl font-bold mb-6 text-center">
					Birth Certificate Preview
				</h1>
				<div className="grid grid-cols-1 gap-4 text-sm">
					{Object.entries(formData).map(([key, value]) => (
						<p key={key}>
							<span className="font-semibold capitalize">
								{key.replaceAll("_", " ")}:
							</span>{" "}
							{value || "-"}
						</p>
					))}
				</div>
				<p className="mt-8 text-center text-sm text-gray-600">
					This is a preview of your form submission. You can still make changes
					before final submission.
				</p>
				<div className="mt-6 flex flex-wrap justify-center gap-4">
					<label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
						Upload Receipt
						<input type="file" className="hidden" accept="image/*" />
					</label>
					<button
						onClick={handleDownload}
						className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
					>
						Download PDF
					</button>
					<button
						onClick={handleEdit}
						className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
					>
						Edit Information
					</button>
					<button
						onClick={handleFinalSubmit}
						className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
					>
						Submit to Civil Registry
					</button>
				</div>
			</div>
		</div>
	);
};

export default FormPreview;
