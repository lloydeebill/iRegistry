"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Form from "../../components/Form"; // your actual form component
import FooterBanner from "@/app/components/FooterBanner";

export default function BirthFormPage() {
	return (
		<main className="flex min-h-screen flex-col bg-[#F1F1F1] container mx-auto px-12 py-4">
			<Navbar />
			<div className="mt-28 container mx-auto px-12 py-0">
				<Form />
				<FooterBanner />
				<Footer />
			</div>
		</main>
	);
}
