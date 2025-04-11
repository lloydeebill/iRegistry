// app/auth/callback/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const handleRedirect = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session) {
				const next = searchParams.get("next") || "/";
				router.push(next);
			} else {
				console.error("No session found.");
			}
		};

		handleRedirect();
	}, [router, searchParams]);

	return <p>Redirecting...</p>;
}
