import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(email, childName, type) {
	if (!type)
		throw new Error("Email type must be provided: 'request' or 'registry'");

	try {
		let subject, html;

		if (type === "request") {
			subject = "Your Birth Certificate Request Update";
			html = `<p>Hello! The request for <strong>${childName}</strong> has been verified. You may now claim the certificate at the registry office.</p>`;
		} else if (type === "registry") {
			subject = "Your Birth Registration Has Been Approved";
			html = `<p>Hi! The birth certificate for <strong>${childName}</strong> has been successfully registered. You can get your certified true copy within the next business day. In the future you may now request an official copy if needed.</p>`;
		} else {
			throw new Error("Invalid email type. Must be 'request' or 'registry'.");
		}

		const response = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: email,
			subject,
			html,
		});

		console.log("✅ Email sent:", response);
		return response;
	} catch (error) {
		console.error("❌ Resend email failed:", error);
		throw error;
	}
}
