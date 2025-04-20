import { Suspense } from "react";
import FormPreview from "@/app/components/FormPreview"; // adjust path if different

export default function Page() {
	return (
		<main>
			<Suspense fallback={<div>Loading preview...</div>}>
				<FormPreview />
			</Suspense>
		</main>
	);
}
