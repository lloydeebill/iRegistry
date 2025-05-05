import { sendConfirmationEmail } from "@/lib/email";

export async function POST(req) {
	const body = await req.json();
	console.log("📨 API Request Body:", body);

	const { email, childName, type } = body;

	if (!["request", "registry"].includes(type)) {
		return new Response(
			JSON.stringify({
				error: "Email type must be provided: 'request' or 'registry'",
			}),
			{ status: 400 },
		);
	}

	try {
		const data = await sendConfirmationEmail(email, childName, type);
		console.log("📧 Email Sent Successfully:", data);
		return new Response(JSON.stringify({ success: true, data }), {
			status: 200,
		});
	} catch (error) {
		console.error("❌ Send email error:", error);
		return new Response(
			JSON.stringify({ success: false, error: error.message }),
			{ status: 500 },
		);
	}
}
