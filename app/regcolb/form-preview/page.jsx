"use client";
import { supabase } from "@/lib/supabaseClient";
import { Suspense } from "react";
import FormPreview from "@/app/components/FormPreview"; // adjust path if different
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FooterBanner from "@/app/components/FooterBanner";
import React, { useEffect, useState } from "react";

export default function Page() {
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
		<main>
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
					<Suspense fallback={<div>Loading form...</div>}>
						<FormPreview />
					</Suspense>
					<FooterBanner />
					<Footer />
				</div>
			</main>
		</main>
	);
}
