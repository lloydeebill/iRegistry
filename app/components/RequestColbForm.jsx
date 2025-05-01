"use client";

import { useState } from "react";

export default function RequestColbForm() {
	const [formData, setFormData] = useState({
		const [values, setValues] = useState({
      informant_name: "",
      relationship: "",
      child_firstname: "",
      child_middlename: "",
      child_lastname: "",
      birthdate: "",
      father_fullname: "",
      mother_fullname: "",
    });
    
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Submitted request:", formData);
		// TODO: send to Supabase or route to preview
	};

	return (
		<div className="max-w-2xl mx-auto bg-white shadow-md rounded p-8 sm:my-5 lg:my-10">
			<h1 className="text-xl text-center text-blue-600 mb-6 font-extrabold">
				Request Certificate of Live Birth
			</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Informant Name */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Informant's Full Name:
					</label>
					<input
						type="text"
						name="informant_name"
						onChange={handleChange}
						value={values.informant_name}
						className="block w-full p-2 rounded text-sm border border-gray-300"
						required
					/>
				</div>

				{/* Relationship */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Relationship to Child:
					</label>
					<input
						type="text"
						name="relationship"
						onChange={handleChange}
						value={values.relationship}
						className="block w-full p-2 rounded text-sm border border-gray-300"
						required
					/>
				</div>

				<hr className="border-t-2 border-gray-300 my-4" />

				{/* Child's Name */}
				<h2 className="text-lg font-bold text-blue-600">Child’s Information</h2>
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						First Name:
					</label>
					<input
						type="text"
						name="child_firstname"
						onChange={handleChange}
						value={values.child_firstname}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Middle Name:
					</label>
					<input
						type="text"
						name="child_middlename"
						onChange={handleChange}
						value={values.child_middlename}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Last Name:
					</label>
					<input
						type="text"
						name="child_lastname"
						onChange={handleChange}
						value={values.child_lastname}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Child's Birthday */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Date of Birth:
					</label>
					<input
						type="date"
						name="birthdate"
						onChange={handleChange}
						value={values.birthdate}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				<hr className="border-t-2 border-gray-300 my-4" />

				{/* Father's Name */}
				<h2 className="text-lg font-bold text-blue-600">Father’s Name</h2>
				<div>
					<input
						type="text"
						name="father_fullname"
						placeholder="Full Name"
						onChange={handleChange}
						value={values.father_fullname}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Mother's Name */}
				<h2 className="text-lg font-bold text-blue-600 mt-4">Mother’s Name</h2>
				<div>
					<input
						type="text"
						name="mother_fullname"
						placeholder="Full Name"
						onChange={handleChange}
						value={values.mother_fullname}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Submit Button */}
				<div className="text-center mt-6">
					<button
						type="submit"
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
					>
						Submit Request
					</button>
				</div>
			</form>
		</div>
	);
}
