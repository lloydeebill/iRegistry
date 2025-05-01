"use client";

import React, { useEffect, useState } from "react";
import CertifyAndConsent from "../components/CertifyAndConsent";
import Navbar from "../components/Navbar";
import PoweredBy from "../components/PoweredBy";
import Footer from "../components/Footer";
import DisclosureButton from "../components/DisclosureButton";
import { supabase } from "@/lib/supabaseClient";

const ReqstColb = () => {
	const title = "Request Certificate of Live Birth";
	const link = "https://forms.gle/kwX8jmdxijXNcv4v5";

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
				<div className="mt-24 text-xl"></div>

				<div className="col-span-4 place-self-center place-items-center grid lg:place-items-start">
					<CertifyAndConsent title={title} link={link} />
				</div>
				<div className="bg-white p-2 rounded-2xl">
					<DisclosureButton
						question="Payment & Fees: Request of Certificate of Live Birth"
						answer="If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked."
					/>
					<DisclosureButton
						question="Requirements: Request of Certificate of Live Birth"
						answer="No."
					/>
				</div>
				<div>
					<Footer />
				</div>
			</div>
		</main>
	);
};

export default ReqstColb;
