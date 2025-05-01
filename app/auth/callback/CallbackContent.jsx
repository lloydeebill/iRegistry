// app/auth/callback/CallbackContent.jsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CallbackContent() {
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const getSessionAndRedirect = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session) {
				const next = searchParams.get("next") || "/";
				router.push(next);
			}
		};

		getSessionAndRedirect();
	}, [router, searchParams]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<p className="text-blue-600 text-lg">Signing you in...</p>
		</div>
	);
}
