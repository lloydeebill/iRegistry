import { useState } from "react";
import "./App.css";

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
		<div className="container">
			<h1>Registration of Live Birth</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="fullname">Full Name(Pangalan ng nagparehistro):</label>
				<input
					type="text"
					placeholder="Juan Dela Cruz Jr."
					name="fullname"
					onChange={(e) => handleChanges(e)}
					required
					value={values.firstname}
				/>
				<label htmlFor="sex">Sex:</label>
				<input type="radio" name="sex" onChange={(e) => handleChanges(e)} />
				Male
				<input type="radio" name="sex" onChange={(e) => handleChanges(e)} />
				Female
				<label htmlFor="relationship">
					Relationship with the child/person to be registered:
				</label>
				<input
					type="text"
					placeholder="Parent "
					name="relationship"
					onChange={(e) => handleChanges(e)}
					required
					value={values.lastname}
				/>
				<label htmlFor="address">Address:</label>
				<input
					type="text"
					placeholder="Enter Address "
					name="address"
					onChange={(e) => handleChanges(e)}
					required
					value={values.address}
				/>
				<label htmlFor="contact">Contact:</label>
				<input
					type="text"
					placeholder="Enter Phone Number "
					name="contact"
					onChange={(e) => handleChanges(e)}
					required
					value={values.contact}
				/>
				<label htmlFor="image">Upload Valid ID:</label>
				<input
					type="file"
					placeholder="Select Image"
					name="image"
					onChange={(e) => handleChanges(e)}
				/>
				<button type="button" onClick={ResetFun}>
					Reset
				</button>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default Form;
