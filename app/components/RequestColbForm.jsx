"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RequestColbForm() {
	const router = useRouter();
	const [values, setValues] = useState({
		informant_name: "",
		relationship: "",
		child_firstname: "",
		child_middlename: "",
		child_lastname: "",
		child_sex: "",
		child_birthdate: "",
		father_firstname: "",
		father_middlename: "",
		father_lastname: "",
		mother_firstname: "",
		mother_middlename: "",
		mother_lastname: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const queryParams = new URLSearchParams();
		Object.entries(values).forEach(([key, value]) => {
			if (typeof value === "string") {
				queryParams.append(key, value);
			}
		});

		router.push(`/reqstcolb/form-preview?${queryParams.toString()}`);
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

				<h2 className="text-lg font-bold text-blue-600">Child’s Information</h2>

				{/* Child's Full Name */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<input
						type="text"
						name="child_firstname"
						placeholder="First Name"
						onChange={handleChange}
						value={values.child_firstname}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
					<input
						type="text"
						name="child_middlename"
						placeholder="Middle Name"
						onChange={handleChange}
						value={values.child_middlename}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
					<input
						type="text"
						name="child_lastname"
						placeholder="Last Name"
						onChange={handleChange}
						value={values.child_lastname}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Sex:
					</label>
					<div className="flex items-center space-x-4">
						<label className="flex items-center space-x-1">
							<input
								type="radio"
								name="child_sex"
								value="Male"
								checked={values.child_sex === "Male"}
								onChange={handleChange}
								className="w-4 h-4"
							/>
							<span>Male</span>
						</label>
						<label className="flex items-center space-x-1">
							<input
								type="radio"
								name="child_sex"
								value="Female"
								checked={values.child_sex === "Female"}
								onChange={handleChange}
								className="w-4 h-4"
							/>
							<span>Female</span>
						</label>
					</div>
				</div>

				{/* Child's Birthdate */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Date of Birth:
					</label>
					<input
						type="date"
						name="child_birthdate"
						onChange={handleChange}
						value={values.child_birthdate}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				<hr className="border-t-2 border-gray-300 my-4" />

				<h2 className="text-lg font-bold text-blue-600">Father’s Name</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<input
						type="text"
						name="father_firstname"
						placeholder="First Name"
						onChange={handleChange}
						value={values.father_firstname}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
					<input
						type="text"
						name="father_middlename"
						placeholder="Middle Name"
						onChange={handleChange}
						value={values.father_middlename}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
					<input
						type="text"
						name="father_lastname"
						placeholder="Last Name"
						onChange={handleChange}
						value={values.father_lastname}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				<h2 className="text-lg font-bold text-blue-600 mt-6">Mother’s Name</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<input
						type="text"
						name="mother_firstname"
						placeholder="First Name"
						onChange={handleChange}
						value={values.mother_firstname}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
					<input
						type="text"
						name="mother_middlename"
						placeholder="Middle Name"
						onChange={handleChange}
						value={values.mother_middlename}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
					<input
						type="text"
						name="mother_lastname"
						placeholder="Last Name"
						onChange={handleChange}
						value={values.mother_lastname}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Submit */}
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
