"use client";
import { useSearchParams } from "next/navigation";

const FormPreview = () => {
	const searchParams = useSearchParams();

	// Example fields you expect from the form submission
	const childFirstName = searchParams.get("child_firstname");
	const childLastName = searchParams.get("child_lastname");
	const birthDate = searchParams.get("birth_date");
	const placeOfBirth = searchParams.get("place_of_birth");
	const motherName = searchParams.get("mother_fullname");
	const fatherName = searchParams.get("father_fullname");

	return (
		<div className="min-h-screen bg-gray-100 py-10 px-4">
			<div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-md">
				<h1 className="text-2xl font-bold mb-6 text-center">
					Birth Certificate Preview
				</h1>

				<div className="grid grid-cols-1 gap-4">
					<p>
						<span className="font-semibold">Child Name:</span> {childFirstName}{" "}
						{childLastName}
					</p>
					<p>
						<span className="font-semibold">Date of Birth:</span> {birthDate}
					</p>
					<p>
						<span className="font-semibold">Place of Birth:</span>{" "}
						{placeOfBirth}
					</p>
					<p>
						<span className="font-semibold">Mother’s Name:</span> {motherName}
					</p>
					<p>
						<span className="font-semibold">Father’s Name:</span> {fatherName}
					</p>
				</div>

				<p className="mt-8 text-center text-sm text-gray-600">
					This is a preview of your form submission. Please upload proof of
					payment to finalize your request.
				</p>

				<div className="mt-6 flex justify-center">
					<label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
						Upload Receipt
						<input type="file" className="hidden" accept="image/*" />
					</label>
				</div>
			</div>
		</div>
	);
};

export default FormPreview;
