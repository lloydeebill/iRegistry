import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { uploadFile } from "@/utils/uploadFile";

function Form() {
	const [values, setValues] = useState({
		fullname: "",
		relationship: "",
		address: "",
		contact: "",
		sex: "",
		image_url: imageUrl,
		child_firstname: "",
		child_middlename: "",
		child_lastname: "",
		attendant_name: "",
		attendant_address: "",
		attendant_position: "",
		birthdate: "",
		birthplace: "",
		type_of_birth: "",
		type_of_birth_other: "",
		multiple_birth_order: "",
		multiple_birth_order_other: "",
		birth_order: "",
		birth_order_other: "",
		birth_weight: "",
		attendant: "",
		parents_married: "",
		marriage_date: "",
		marriage_city: "",
		marriage_province: "",
		marriage_country: "",
		marriage_certificate: marriageCertUrl,
		father_firstname: "",
		father_middlename: "",
		father_lastname: "",
		father_nationality: "",
		father_religion: "",
		father_occupation: "",
		father_age_at_birth: "",
		father_dob: "",
		father_residence: "",
		father_valid_id: fatherIdUrl,
		mother_firstname: "",
		mother_middlename: "",
		mother_lastname: "",
		mother_nationality: "",
		mother_religion: "",
		mother_occupation: "",
		mother_age_at_birth: "",
		mother_dob: "",
		mother_residence: "",
		mother_valid_id: motherIdUrl,
		children_born_alive: "",
		children_still_living: "",
		children_deceased: "",
		consent: "",
	});

	const handleChanges = (e) => {
		const { name, type, files, value } = e.target;
		setValues({
			...values,
			[name]: type === "file" ? files[0] : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const imageUrl = await uploadFile(values.image, "images");
		const marriageCertUrl = await uploadFile(
			values.marriage_certificate,
			"certificates"
		);
		const fatherIdUrl = await uploadFile(values.father_valid_id, "ids/father");
		const motherIdUrl = await uploadFile(values.mother_valid_id, "ids/mother");
		const { error } = await supabase.from("birth_registration").insert([
			{
				fullname: values.fullname,
				relationship: values.relationship,
				address: values.address,
				contact: values.contact,
				sex: values.sex,
				image_url: imageUrl,
				child_firstname: values.child_firstname,
				child_middlename: values.child_middlename,
				child_lastname: values.child_lastname,
				attendant_name: values.attendant_name,
				attendant_address: values.attendant_address,
				attendant_position: values.attendant_position,
				birthdate: values.birthdate,
				birthplace: values.birthplace,
				type_of_birth: values.type_of_birth,
				type_of_birth_other: values.type_of_birth_other,
				multiple_birth_order: values.multiple_birth_order,
				multiple_birth_order_other: values.multiple_birth_order_other,
				birth_order: values.birth_order,
				birth_order_other: values.birth_order_other,
				birth_weight: values.birth_weight,
				attendant: values.attendant,
				parents_married: values.parents_married,
				marriage_date: values.marriage_date,
				marriage_city: values.marriage_city,
				marriage_province: values.marriage_province,
				marriage_country: values.marriage_country,
				marriage_certificate: marriageCertUrl,
				father_firstname: values.father_firstname,
				father_middlename: values.father_middlename,
				father_lastname: values.father_lastname,
				father_nationality: values.father_nationality,
				father_religion: values.father_religion,
				father_occupation: values.father_occupation,
				father_age_at_birth: values.father_age_at_birth,
				father_dob: values.father_dob,
				father_residence: values.father_residence,
				father_valid_id: fatherIdUrl,
				mother_firstname: values.mother_firstname,
				mother_middlename: values.mother_middlename,
				mother_lastname: values.mother_lastname,
				mother_nationality: values.mother_nationality,
				mother_religion: values.mother_religion,
				mother_occupation: values.mother_occupation,
				mother_age_at_birth: values.mother_age_at_birth,
				mother_dob: values.mother_dob,
				mother_residence: values.mother_residence,
				mother_valid_id: motherIdUrl,
				children_born_alive: values.children_born_alive,
				children_still_living: values.children_still_living,
				children_deceased: values.children_deceased,
				consent: values.consent,
			},
		]);

		if (error) {
			console.error("Insert error:", error.message);
		} else {
			alert("Form submitted to Supabase!");
			ResetFun(); // Optional: clear form after submission
		}
	};

	const ResetFun = () => {
		setValues({
			fullname: "",
			relationship: "",
			address: "",
			contact: "",
			sex: "",
			image: null,
			child_firstname: "",
			child_middlename: "",
			child_lastname: "",
			attendant_name: "",
			attendant_address: "",
			attendant_position: "",
			birthdate: "",
			birthplace: "",
			type_of_birth: "",
			type_of_birth_other: "",
			multiple_birth_order: "",
			multiple_birth_order_other: "",
			birth_order: "",
			birth_order_other: "",
			birth_weight: "",
			attendant: "",
			parents_married: "",
			marriage_date: "",
			marriage_city: "",
			marriage_province: "",
			marriage_country: "",
			marriage_certificate: null,
			father_firstname: "",
			father_middlename: "",
			father_lastname: "",
			father_nationality: "",
			father_religion: "",
			father_occupation: "",
			father_age_at_birth: "",
			father_dob: "",
			father_residence: "",
			father_valid_id: null,
			mother_firstname: "",
			mother_middlename: "",
			mother_lastname: "",
			mother_nationality: "",
			mother_religion: "",
			mother_occupation: "",
			mother_age_at_birth: "",
			mother_dob: "",
			mother_residence: "",
			mother_valid_id: null,
			children_born_alive: "",
			children_still_living: "",
			children_deceased: "",
			consent: "",
		});
	};

	return (
		<div className="max-w-2xl mx-auto bg-white shadow-md rounded p-8 sm:my-5 lg:my-10">
			<h1 className="text-xl text-center text-blue-600 mb-6">
				Registration of Live Birth
			</h1>
			<hr className="my-4 border-t-4 border-gray-700" />

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Full Name (Pangalan ng nagparehistro):
					</label>
					<input
						type="text"
						placeholder="Juan Dela Cruz Jr."
						name="fullname"
						onChange={handleChanges}
						required
						value={values.fullname}
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
								name="sex"
								value="Male"
								checked={values.sex === "Male"}
								onChange={handleChanges}
								className="w-4 h-4"
							/>
							<span>Male</span>
						</label>
						<label className="flex items-center space-x-1">
							<input
								type="radio"
								name="sex"
								value="Female"
								checked={values.sex === "Female"}
								onChange={handleChanges}
								className="w-4 h-4"
							/>
							<span>Female</span>
						</label>
					</div>
				</div>

				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Relationship with the child/person to be registered:
					</label>
					<input
						type="text"
						placeholder="Parent"
						name="relationship"
						onChange={handleChanges}
						required
						value={values.relationship}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Address:
					</label>
					<input
						type="text"
						placeholder="Enter Address"
						name="address"
						onChange={handleChanges}
						required
						value={values.address}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Contact:
					</label>
					<input
						type="text"
						placeholder="Enter Phone Number"
						name="contact"
						onChange={handleChanges}
						required
						value={values.contact}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Upload Valid ID:
					</label>
					<input
						type="file"
						name="image"
						onChange={handleChanges}
						className="block w-full text-sm"
					/>
				</div>

				{/* Additional Registration Details */}

				<div className="mt-6 space-y-4">
					{/* First Name */}
					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							First Name (Ngalan sa bata/tao nga iparehistro):
						</label>
						<input
							type="text"
							name="child_firstname"
							placeholder="e.g. Juan"
							onChange={handleChanges}
							value={values.child_firstname}
							className="block w-full p-2 rounded text-sm border border-gray-300"
						/>
					</div>

					{/* Middle Name */}
					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							Middle Name (Middle name sa bata/tao nga iparehistro):
						</label>
						<input
							type="text"
							name="child_middlename"
							placeholder="e.g. Santos"
							onChange={handleChanges}
							value={values.child_middlename}
							className="block w-full p-2 rounded text-sm border border-gray-300"
						/>
					</div>

					{/* Last Name */}
					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							Last Name (Last name sa bata/tao nga iparehistro):
						</label>
						<input
							type="text"
							name="child_lastname"
							placeholder="e.g. Dela Cruz"
							onChange={handleChanges}
							value={values.child_lastname}
							className="block w-full p-2 rounded text-sm border border-gray-300"
						/>
					</div>

					{/* Date of Birth */}
					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							Date of Birth (Adlaw sa pag-anak sa bata/tao nga iparehistro):
						</label>
						<input
							type="date"
							name="birthdate"
							onChange={handleChanges}
							className="block w-full p-2 rounded text-sm border border-gray-300"
							value={values.birthdate}
						/>
					</div>

					{/* Place of Birth */}
					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							Place of Birth (Asa gi-anak ang bata/tao nga iparehistro?):
						</label>
						<input
							type="text"
							name="birthplace"
							placeholder="e.g. Butuan City Hospital"
							value={values.birthplace}
							onChange={handleChanges}
							className="block w-full p-2 rounded text-sm border border-gray-300"
						/>
					</div>

					{/* Type of Birth */}
					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							Type of Birth (Ex. Single, Twin, Triplet, etc.):
						</label>
						<div className="space-y-1">
							<label className="flex items-center space-x-2">
								<input
									type="radio"
									name="type_of_birth"
									value="Single"
									onChange={handleChanges}
									checked={values.type_of_birth === "Single"}
									className="w-4 h-4"
								/>
								<span>Single</span>
							</label>
							<label className="flex items-center space-x-2">
								<input
									type="radio"
									name="type_of_birth"
									value="Twin"
									onChange={handleChanges}
									checked={values.type_of_birth === "Twin"}
									className="w-4 h-4"
								/>
								<span>Twin</span>
							</label>
							<label className="flex items-center space-x-2">
								<input
									type="radio"
									name="type_of_birth"
									value="Triplet"
									onChange={handleChanges}
									checked={values.type_of_birth === "Triplet"}
									className="w-4 h-4"
								/>
								<span>Triplet</span>
							</label>
							<label className="flex items-center space-x-2 w-full">
								<input
									type="radio"
									name="type_of_birth"
									value="Other"
									onChange={handleChanges}
									checked={values.type_of_birth === "Other"}
									className="w-4 h-4"
								/>
								<span>Other</span>
							</label>
							{values.type_of_birth === "Other" && (
								<input
									type="text"
									name="type_of_birth_other"
									placeholder="e.g. Quintuplet"
									onChange={handleChanges}
									value={values.type_of_birth_other}
									className="block w-full p-2 rounded text-sm border border-gray-300"
								/>
							)}
						</div>
					</div>

					{/* If multiple birth, child was */}
					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							If multiple birth, child was:
						</label>
						<div className="space-y-1">
							{["First", "Second", "Third", "Other"].map((label) => (
								<label key={label} className="flex items-center space-x-2">
									<input
										type="radio"
										name="multiple_birth_order"
										value={label}
										onChange={handleChanges}
										checked={values.multiple_birth_order === label}
										className="w-4 h-4"
									/>
									<span>{label}</span>
								</label>
							))}
							{values.multiple_birth_order === "Other" && (
								<input
									type="text"
									name="multiple_birth_order_other"
									placeholder="e.g. Fourth"
									onChange={handleChanges}
									value={values.multiple_birth_order_other}
									className="block w-full p-2 rounded text-sm border border-gray-300"
								/>
							)}
						</div>
					</div>

					{/* Birth Order */}
					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							Birth Order (Ikapila nga anak apil na ang namatay):
						</label>
						<div className="space-y-1">
							{["First", "Second", "Third", "Fourth", "Fifth", "Other"].map(
								(label) => (
									<label key={label} className="flex items-center space-x-2">
										<input
											type="radio"
											name="birth_order"
											value={label}
											onChange={handleChanges}
											checked={values.birth_order === label}
											className="w-4 h-4"
										/>
										<span>{label}</span>
									</label>
								)
							)}
							{values.birth_order === "Other" && (
								<input
									type="text"
									name="birth_order_other"
									placeholder="Please specify"
									onChange={handleChanges}
									value={values.birth_order_other}
									className="block w-full p-2 rounded text-sm border border-gray-300"
								/>
							)}
						</div>
					</div>

					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							Weight at Birth (optional):
						</label>
						<input
							type="text"
							name="birth_weight"
							placeholder="e.g. 7 pounds or 2,000 grams"
							onChange={handleChanges}
							value={values.birth_weight}
							className="block w-full p-2 rounded text-sm border border-gray-300"
						/>
					</div>

					{/* Attendant */}
					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							Attendant (Nanabang sa pag-anak):
						</label>
						<div className="space-y-1">
							{["Physician", "Nurse", "Midwife", "Hilot", "Other"].map(
								(label) => (
									<label key={label} className="flex items-center space-x-2">
										<input
											type="radio"
											name="attendant"
											value={label}
											onChange={handleChanges}
											className="w-4 h-4"
										/>
										<span>{label}</span>
									</label>
								)
							)}
						</div>
					</div>

					{/* Name of Attendant */}
					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							Name of Attendant:
						</label>
						<input
							type="text"
							name="attendant_name"
							placeholder="e.g. Dr. Jose Rizal"
							onChange={handleChanges}
							value={values.attendant_name}
							className="block w-full p-2 rounded text-sm border border-gray-300"
						/>
					</div>

					{/* Position of Attendant */}
					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							Position of Attendant:
						</label>
						<input
							type="text"
							name="attendant_position"
							placeholder="e.g. Midwife"
							onChange={handleChanges}
							value={values.attendant_position}
							className="block w-full p-2 rounded text-sm border border-gray-300"
						/>
					</div>

					{/* Address of the Attendant */}
					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							Address of the Attendant:
						</label>
						<input
							type="text"
							name="attendant_address"
							placeholder="e.g. Purok 1, Brgy. Mahay"
							onChange={handleChanges}
							value={values.attendant_address}
							className="block w-full p-2 rounded text-sm border border-gray-300"
						/>
					</div>

					{/* Are parents married */}
					<div>
						<label className="text-sm font-bold text-gray-600 block mb-1">
							Are the parents of the child/person to be registered married?
						</label>
						<div className="space-y-1">
							<label className="flex items-center space-x-2">
								<input
									type="radio"
									name="parents_married"
									value="Yes"
									onChange={handleChanges}
									checked={values.parents_married === "Yes"}
									className="w-4 h-4"
								/>
								<span>Yes</span>
							</label>
							<label className="flex items-center space-x-2">
								<input
									type="radio"
									name="parents_married"
									value="No"
									onChange={handleChanges}
									checked={values.parents_married === "No"}
									className="w-4 h-4"
								/>
								<span>No</span>
							</label>
						</div>
					</div>
				</div>

				{/* Date of Marriage */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Date of Marriage (Petsa sa kasal sa ginikanan):
					</label>
					<input
						type="date"
						name="marriage_date"
						onChange={handleChanges}
						required
						value={values.marriage_date}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* City/Municipality of Marriage */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						City/Municipality of Marriage (Aha nga syudad/munisipyo gikasal ang
						ginikanan):
					</label>
					<input
						type="text"
						name="marriage_city"
						placeholder="Enter City or Municipality"
						onChange={handleChanges}
						value={values.marriage_city}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Province of Marriage */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Province of Marriage (Probinsya kung aha gikasal ang ginikanan):
					</label>
					<input
						type="text"
						name="marriage_province"
						placeholder="Enter Province"
						onChange={handleChanges}
						required
						value={values.marriage_province}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Country of Marriage */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Country of Marriage (Nasud kung aha gikasal ang ginikanan):
					</label>
					<input
						type="text"
						name="marriage_country"
						placeholder="Enter Country"
						onChange={handleChanges}
						required
						value={values.marriage_country}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Marriage Certificate Upload */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Marriage Certificate (Sertipikasyon sa pagkasal sa ginikanan):
					</label>
					<input
						type="file"
						name="marriage_certificate"
						accept="image/*"
						onChange={handleChanges}
						required
						className="block w-full text-sm"
					/>
					<p className="text-xs text-gray-500 mt-1">
						Upload 1 supported file: image. Max 10 MB.
					</p>
				</div>

				<hr className="my-4 border-t-4 border-gray-700" />

				{/* Information of the Father (Impormasyon sa amahan sa bata/tao nga iparehistro) */}
				<div>
					<label className="text-lg font-bold text-gray-600 block mb-3">
						INFORMATION OF THE FATHER (Impormasyon sa amahan sa bata/tao nga
						iparehistro)
					</label>
				</div>

				{/* Father's First Name */}
				{/* Father's First Name */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						First Name of the Father (Ngalan sa amahan sa bata/tao nga
						iparehistro):
					</label>
					<input
						type="text"
						name="father_firstname"
						placeholder="Enter First Name"
						onChange={handleChanges}
						value={values.father_firstname}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Father's Middle Name */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Middle Name of the Father (Middle name sa amahan sa bata/tao nga
						iparehistro):
					</label>
					<input
						type="text"
						name="father_middlename"
						placeholder="Enter Middle Name"
						onChange={handleChanges}
						value={values.father_middlename}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Father's Last Name */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Last Name of the Father (Apelyido sa amahan sa bata/tao nga
						iparehistro):
					</label>
					<input
						type="text"
						name="father_lastname"
						placeholder="Enter Last Name"
						onChange={handleChanges}
						value={values.father_lastname}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Nationality/Citizenship */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Nationality/Citizenship (Ex. Filipino, Japanese, Chinese, American):
					</label>
					<input
						type="text"
						name="father_nationality"
						placeholder="Enter Nationality"
						onChange={handleChanges}
						value={values.father_nationality}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Religion */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Religion (Ex. Roman Catholic, Islam, Born Again, Jehovah’s
						Witnesses, Faith Baptist):
					</label>
					<input
						type="text"
						name="father_religion"
						placeholder="Enter Religion"
						onChange={handleChanges}
						value={values.father_religion}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Occupation */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Occupation (Trabaho sa amahan, Ex. Farmer, Government employee,
						Seaman, Driver, Doctor):
					</label>
					<input
						type="text"
						name="father_occupation"
						placeholder="Enter Occupation"
						onChange={handleChanges}
						value={values.father_occupation}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Father's Age at Birth */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Father's age at the time of birth of the child/person to be
						registered:
					</label>
					<input
						type="number"
						name="father_age_at_birth"
						placeholder="Enter Age"
						onChange={handleChanges}
						value={values.father_age_at_birth}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Father's Date of Birth */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Father's Date of Birth:
					</label>
					<input
						type="date"
						name="father_dob"
						onChange={handleChanges}
						value={values.father_dob}
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Father's Residence */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Residence (Ex. Barangay, City/Municipality, Province, Country):
					</label>
					<input
						type="text"
						name="father_residence"
						placeholder="Enter Full Address"
						onChange={handleChanges}
						value={values.father_residence}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Father's Valid ID */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Valid ID of the Father:
					</label>
					<input
						type="file"
						name="father_valid_id"
						accept="image/*"
						onChange={handleChanges}
						className="block w-full text-sm"
					/>
					<p className="text-xs text-gray-500 mt-1">
						Upload 1 supported file: image. Max 10 MB.
					</p>
				</div>

				<hr className="my-4 border-t-4 border-gray-700" />

				{/* Information of the Mother*/}
				<div>
					<label className="text-lg font-bold text-gray-600 block mb-3">
						INFORMATION OF THE MOTHER (Impormasyon sa inahan sa bata/tao nga
						iparehistro)
					</label>
				</div>

				{/* Mother's First Name */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						First Name of the Mother (Ngalan sa inahan sa bata/tao nga
						iparehistro):
					</label>
					<input
						type="text"
						name="mother_firstname"
						value={values.mother_firstname}
						placeholder="Enter First Name"
						onChange={handleChanges}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Mother's Middle Name */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Middle Name of the Mother (Middle name sa inahan sa bata/tao nga
						iparehistro):
					</label>
					<input
						type="text"
						name="mother_middlename"
						placeholder="Enter Middle Name"
						onChange={handleChanges}
						value={values.mother_middlename}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Mother's Last Name */}
				{/* Last Name of the Mother */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Last Name of the Mother (Apelyido sa inahan sa bata/tao nga
						iparehistro):
					</label>
					<input
						type="text"
						name="mother_lastname"
						placeholder="Enter Last Name"
						onChange={handleChanges}
						value={values.mother_lastname}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Nationality/Citizenship */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Nationality/Citizenship (Ex. Filipino, Japanese, Chinese, American):
					</label>
					<input
						type="text"
						name="mother_nationality"
						placeholder="Enter Nationality"
						onChange={handleChanges}
						value={values.mother_nationality}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Religion */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Religion (Ex. Roman Catholic, Islam, Born Again, Jehovah’s
						Witnesses, Faith Baptist):
					</label>
					<input
						type="text"
						name="mother_religion"
						placeholder="Enter Religion"
						onChange={handleChanges}
						value={values.mother_religion}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Occupation */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Occupation (Trabaho sa inahan, Ex. Teacher, Government employee,
						Doctor):
					</label>
					<input
						type="text"
						name="mother_occupation"
						placeholder="Enter Occupation"
						onChange={handleChanges}
						value={values.mother_occupation}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Mother's Age at Birth */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Mother's age at the time of birth of the child/person to be
						registered:
					</label>
					<input
						type="number"
						name="mother_age_at_birth"
						placeholder="Enter Age"
						onChange={handleChanges}
						value={values.mother_age_at_birth}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Mother's Date of Birth */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Mother's Date of Birth (Adlaw na natao ang inahan):
					</label>
					<input
						type="date"
						name="mother_dob"
						onChange={handleChanges}
						value={values.mother_dob}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Residence */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Residence (Ex. Barangay, City/Municipality, Province, Country – Aha
						nagpuyo ang inahan):
					</label>
					<input
						type="text"
						name="mother_residence"
						placeholder="Enter Full Address"
						onChange={handleChanges}
						value={values.mother_residence}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* Valid ID of the Mother */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Valid ID of the Mother:
					</label>
					<input
						type="file"
						name="mother_valid_id"
						accept="image/*"
						onChange={handleChanges}
						className="block w-full text-sm"
					/>
					<p className="text-xs text-gray-500 mt-1">
						Upload 1 supported file: image. Max 10 MB.
					</p>
				</div>

				{/* Total number of children born alive */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						Total number of children born alive (Pila tanan ang gipanganak nga
						buhi sa inahan apil ang tao nga iparehistro):
					</label>
					<input
						type="number"
						name="children_born_alive"
						placeholder="Enter total number"
						onChange={handleChanges}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* No. of children still living */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						No. of children still living including this birth (Pila tanan ang
						anak nga buhi pa hantod karon apil ang iparehistro):
					</label>
					<input
						type="number"
						name="children_still_living"
						placeholder="Enter number of living children"
						onChange={handleChanges}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				{/* No. of children previously born alive but are now dead */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-1">
						No. of children previously born alive but are now dead (Pila tanan
						ang gipanganak nga buhi pero patay na):
					</label>
					<input
						type="number"
						name="children_deceased"
						placeholder="Enter number of deceased children"
						onChange={handleChanges}
						required
						className="block w-full p-2 rounded text-sm border border-gray-300"
					/>
				</div>

				<hr className="my-4 border-t-4 border-gray-700" />

				{/* Consent, Terms and Conditions */}
				<div>
					<label className="text-sm font-bold text-gray-600 block mb-2">
						CONSENT, TERMS AND CONDITIONS (Last part of the form)
					</label>
					<p className="text-sm text-gray-700 mb-3">
						I, hereby consent to the following:
						<br />
						<br />
						- I authorize the Local Civil Registry Office of Buenavista, Agusan
						del Norte to collect and use my personal information for the purpose
						of applying for the certificate of live birth. <br />
						- I understand that I have the right to access my personal
						information and to request that it be corrected or deleted. <br />-
						I certify that the information I have provided is true and accurate.
					</p>

					<div className="space-y-1">
						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="consent"
								value="Yes"
								onChange={handleChanges}
								required
								className="w-4 h-4"
							/>
							<span>Yes</span>
						</label>
						<label className="flex items-center space-x-2">
							<input
								type="radio"
								name="consent"
								value="No"
								onChange={handleChanges}
								className="w-4 h-4"
							/>
							<span>No</span>
						</label>
					</div>
				</div>

				<hr className="my-4 border-t-4 border-gray-700" />

				<div className="flex justify-between mt-4">
					<button
						type="button"
						onClick={ResetFun}
						className="px-4 py-2 rounded-md text-white bg-[#4206a3] hover:bg-blue-400 w-2/5"
					>
						Reset
					</button>
					<button
						type="submit"
						className="px-4 py-2 rounded-md text-white bg-[#4206a3] hover:bg-blue-400 w-2/5"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default Form;
