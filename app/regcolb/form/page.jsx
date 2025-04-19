"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Form from "../../components/Form";
import FooterBanner from "@/app/components/FooterBanner";

export default function BirthFormPage() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setUser(session?.user || null);
		};

		getUser();
	}, []);

	return (
		<main className="flex min-h-screen flex-col bg-[#F1F1F1] container mx-auto lg:px-10 py-4">
			<Navbar />
			<div className="mt-16 lg:mt-28 container mx-auto px-6 lg:px-4 py-0">
				<div className="mt-7 text-blue-500 text-center text-sm lg:text-start lg:text-xl mb-4">
					{user ? (
						<p className="text-black">
							Signed in as:{" "}
							<span className="font-medium text-blue-600">{user.email}</span>
						</p>
					) : (
						<p className="text-gray-600">Not signed in</p>
					)}
				</div>
				<Form />
				<FooterBanner />
				<Footer />
			</div>
		</main>
	);
}
