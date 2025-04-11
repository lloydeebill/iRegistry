"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
	const router = useRouter();

	useEffect(() => {
		const getSessionAndRedirect = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session) {
				router.push("/regcolb"); // change this to where you want to redirect after login
			}
		};

		getSessionAndRedirect();
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<p className="text-gray-600 text-lg">Signing you in...</p>
		</div>
	);
}
