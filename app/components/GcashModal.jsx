"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GcashModal = ({ show, onClose, submittedData }) => {
	if (!show) return null;

	const router = useRouter();

	const handleDone = () => {
		// Pass form data as query string (you can adjust this part if using Supabase ID instead)
		const query = new URLSearchParams(submittedData).toString();
		router.push(`/regcolb/form-preview?${query}`);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg p-6 w-[90%] max-w-md text-center shadow-xl">
				<h2 className="text-xl font-semibold mb-4">Scan to Pay via GCash</h2>
				<Image
					src="/gcash-scan-qr.jpg"
					alt="GCash QR Code"
					width={300}
					height={200}
					className="mx-auto"
				/>
				<p className="text-sm text-gray-600 mt-4">
					After payment, you may close this window.
				</p>
				<button
					onClick={handleDone}
					className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
				>
					Done
				</button>
			</div>
		</div>
	);
};

export default GcashModal;
