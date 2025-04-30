// utils/generateCertificatePDF.js
import { PDFDocument, rgb } from "pdf-lib";

const generateCertificatePDF = async (formData = {}) => {
	try {
		const pdfDoc = await PDFDocument.create();
		const page = pdfDoc.addPage([595, 842]); // A4 size

		const imageUrl = "/certificate-template1.png";
		const response = await fetch(imageUrl);
		const imageBytes = await response.arrayBuffer();
		const pngImage = await pdfDoc.embedPng(imageBytes);

		page.drawImage(pngImage, {
			x: 0,
			y: 0,
			width: 595,
			height: 842,
		});

		// Utility function to safely pull values
		const get = (field) => {
			const val = formData?.[field];
			return val === null || val === undefined ? "" : String(val);
		};

		// Province and City/Municipality
		page.drawText(get("birth_province"), {
			x: 120,
			y: 775,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("birth_city"), {
			x: 120,
			y: 750,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Child Full Name
		page.drawText(get("child_firstname"), {
			x: 120,
			y: 720,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("child_middlename"), {
			x: 280,
			y: 720,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("child_lastname"), {
			x: 430,
			y: 720,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Sex
		page.drawText(get("sex"), {
			x: 120,
			y: 700,
			size: 12,
			color: rgb(0, 0, 0),
		});

		const birthdate = get("birthdate");
		let birth_day = "";
		let birth_month = "";
		let birth_year = "";

		if (birthdate) {
			const date = new Date(birthdate);
			birth_day = date.getDate().toString().padStart(2, "0");
			birth_month = date.toLocaleString("en-US", { month: "long" }); // e.g. "April"
			birth_year = date.getFullYear().toString();
		}

		// Birthday
		page.drawText(birth_day, {
			x: 310,
			y: 700,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(birth_month, {
			x: 420,
			y: 700,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(birth_year, {
			x: 500,
			y: 700,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Place of Birth
		page.drawText(get("birthplace"), {
			x: 310,
			y: 670,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Type of Birth & Weight
		page.drawText(get("type_of_birth"), {
			x: 120,
			y: 650,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("type_of_birth_other"), {
			x: 120,
			y: 650,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("multiple_birth_order"), {
			x: 150,
			y: 650,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("birth_order"), {
			x: 420,
			y: 640,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("birth_weight"), {
			x: 520,
			y: 640,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Mother Info
		page.drawText(get("mother_firstname"), {
			x: 120,
			y: 615,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("mother_middlename"), {
			x: 290,
			y: 615,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("mother_lastname"), {
			x: 430,
			y: 615,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("mother_nationality"), {
			x: 120,
			y: 590,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("mother_religion"), {
			x: 430,
			y: 590,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("children_born_alive"), {
			x: 80,
			y: 560,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("children_still_living"), {
			x: 170,
			y: 560,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("children_deceased"), {
			x: 270,
			y: 560,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("mother_occupation"), {
			x: 400,
			y: 550,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("mother_age_at_birth"), {
			x: 530,
			y: 550,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("mother_residence"), {
			x: 180,
			y: 530,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Father Info
		page.drawText(get("father_firstname"), {
			x: 120,
			y: 500,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("father_middlename"), {
			x: 290,
			y: 500,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("father_lastname"), {
			x: 430,
			y: 500,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("father_age_at_birth"), {
			x: 510,
			y: 470,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("father_nationality"), {
			x: 120,
			y: 470,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("father_religion"), {
			x: 220,
			y: 470,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("father_occupation"), {
			x: 420,
			y: 470,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("father_residence"), {
			x: 170,
			y: 440,
			size: 12,
			color: rgb(0, 0, 0),
		});

		const marriageDate = get("marriage_date");
		let marriage_day = "";
		let marriage_month = "";
		let marriage_year = "";

		if (marriageDate) {
			const date = new Date(marriageDate);
			marriage_day = date.getDate().toString().padStart(2, "0");
			marriage_month = date.toLocaleString("en-US", { month: "long" }); // e.g. "April"
			marriage_year = date.getFullYear().toString();
		}

		page.drawText(marriage_month, {
			x: 90,
			y: 400,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(marriage_day, {
			x: 150,
			y: 400,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(marriage_year, {
			x: 180,
			y: 400,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("marriage_city"), {
			x: 300,
			y: 400,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("marriage_province"), {
			x: 380,
			y: 400,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("marriage_country"), {
			x: 490,
			y: 400,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("attendant_name"), {
			x: 130,
			y: 150,
			size: 12,
			color: rgb(0, 0, 0),
		});

		const pdfBytes = await pdfDoc.save();
		return pdfBytes;
	} catch (error) {
		console.error("PDF generation failed:", error);
		throw error;
	}
};

export { generateCertificatePDF };
