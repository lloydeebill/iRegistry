// utils/generateCertificatePDF.js
import { PDFDocument, rgb } from "pdf-lib";

const generateCertificatePDF = async (formData = {}) => {
	try {
		const pdfDoc = await PDFDocument.create();
		const page = pdfDoc.addPage([595, 842]); // A4 size

		const imageUrl = "/certificate-template.png";
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
		const get = (field) => formData[field] || "";

		// Province and City/Municipality
		page.drawText(get("province"), {
			x: 120,
			y: 755,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("city_municipality"), {
			x: 120,
			y: 740,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Child Full Name
		page.drawText(get("child_firstname"), {
			x: 120,
			y: 710,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("child_middlename"), {
			x: 280,
			y: 710,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("child_lastname"), {
			x: 430,
			y: 710,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Sex
		page.drawText(get("sex"), {
			x: 120,
			y: 690,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Birthday
		page.drawText(get("birth_day"), {
			x: 310,
			y: 685,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("birth_month"), {
			x: 420,
			y: 685,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("birth_year"), {
			x: 500,
			y: 685,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Place of Birth
		page.drawText(get("birth_city"), {
			x: 310,
			y: 660,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("birth_province"), {
			x: 430,
			y: 660,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Type of Birth & Weight
		page.drawText(get("type_of_birth"), {
			x: 120,
			y: 630,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("weight"), {
			x: 520,
			y: 630,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Mother Info
		page.drawText(get("mother_firstname"), {
			x: 120,
			y: 600,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("mother_middlename"), {
			x: 290,
			y: 600,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("mother_lastname"), {
			x: 430,
			y: 600,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("mother_citizenship"), {
			x: 120,
			y: 580,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("mother_religion"), {
			x: 430,
			y: 580,
			size: 12,
			color: rgb(0, 0, 0),
		});

		page.drawText(get("children_alive"), {
			x: 80,
			y: 550,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("children_living"), {
			x: 170,
			y: 550,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("children_deceased"), {
			x: 270,
			y: 550,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("mother_occupation"), {
			x: 400,
			y: 550,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("mother_residence"), {
			x: 170,
			y: 520,
			size: 12,
			color: rgb(0, 0, 0),
		});

		// Father Info
		page.drawText(get("father_firstname"), {
			x: 120,
			y: 490,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("father_middlename"), {
			x: 290,
			y: 490,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("father_lastname"), {
			x: 430,
			y: 490,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("father_citizenship"), {
			x: 120,
			y: 460,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("father_religion"), {
			x: 250,
			y: 460,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("father_occupation"), {
			x: 420,
			y: 460,
			size: 12,
			color: rgb(0, 0, 0),
		});
		page.drawText(get("father_residence"), {
			x: 170,
			y: 435,
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
