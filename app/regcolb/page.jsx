"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import CertifyAndConsent from "../components/CertifyAndConsent";
import Navbar from "../components/Navbar";
import PoweredBy from "../components/PoweredBy";
import Footer from "../components/Footer";
import DisclosureButton from "../components/DisclosureButton";

const RegColB = () => {
	const title = "Registration of Live Birth";
	const link = "/regcolb/form";

	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setUser(session?.user || null);
		};

		getUser();

		// 🔄 Listen for auth state changes (login/logout)
		const { data: listener } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user || null);
			}
		);

		// 🧹 Clean up the listener on unmount
		return () => {
			listener?.subscription?.unsubscribe();
		};
	}, []);

	return (
		<main>
			<Navbar />

			{/* Add top margin using a spacer */}
			<div className="h-12" />

			<div className="container mx-auto px-12 py-0">
				{/* Auth message */}
				<div className="mt-24 text-xl">
					<div className="mt-7 text-blue-500 text-center text-sm lg:text-start lg:text-xl mb-4">
						{user ? (
							<p className="text-black">
								User:{" "}
								<span className="font-medium text-blue-600">{user.email}</span>
							</p>
						) : (
							<p className="text-black">
								User:{" "}
								<span className="font-medium text-blue-600">Not signed in</span>
							</p>
						)}
					</div>
				</div>

				{/* Form preview block */}
				<div className="col-span-4 place-self-center place-items-center grid lg:place-items-start">
					<CertifyAndConsent title={title} link={link} />
				</div>

				<div className="bg-white p-2 rounded-2xl mt-6">
					<DisclosureButton
						question="Payment & Fees: Registration of Live Birth"
						answer="If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked."
					/>
					<DisclosureButton
						question="Requirements: Registration of Live Birth"
						answer="No."
					/>
				</div>

				<div className="mt-10">
					<Footer />
				</div>
			</div>
		</main>
	);
};

export default RegColB;
