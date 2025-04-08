import { useState } from "react";

function Form() {
	const [values, setValues] = useState({
		firstname: "",
		lastname: "",
		email: "",
		contact: "",
		address: "",
		gender: "",
		forms: "birth",
		image: null,
	});

	const handleChanges = (e) => {
		setValues({ ...values, [e.target.name]: [e.target.value] });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(values);
	};

	const ResetFun = () => {
		setValues({ firstname: "", lastname: "", email: "" });
	};

	return (
		<div className="max-w-2xl mx-auto bg-white shadow-md rounded p-8 sm:my-5 lg:my-10">
			<h1 className="text-xl text-center text-blue-600 mb-6">
				Registration of Live Birth
			</h1>

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
						value={values.firstname}
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
						value={values.lastname}
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
