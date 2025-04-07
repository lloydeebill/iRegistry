"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Form from "../../components/Form"; // your actual form component

export default function BirthFormPage() {
	return (
		<main>
			<Navbar />
			<div className="mt-24 container mx-auto px-6">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Birth Registration Form
				</h1>
				<Form />
			</div>
			<Footer />
		</main>
	);
}
