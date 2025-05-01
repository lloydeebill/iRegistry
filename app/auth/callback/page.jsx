// app/auth/callback/page.jsx
"use client";

import { Suspense } from "react";
import CallbackContent from "./CallbackContent";

export default function CallbackPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center">
					<p className="text-blue-600 text-lg lg:text-4xl ">
						Signing you in...
					</p>
				</div>
			}
		>
			<CallbackContent />
		</Suspense>
	);
}
