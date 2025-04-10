import { supabase } from "@/lib/supabaseClient";

export const uploadFile = async (file, path) => {
	if (!file) return null;

	const fileExt = file.name.split(".").pop();
	const fileName = `${Date.now()}-${Math.random()
		.toString(36)
		.substring(2, 9)}.${fileExt}`;
	const filePath = `${path}/${fileName}`;

	const { error } = await supabase.storage
		.from("birth-files")
		.upload(filePath, file);

	if (error) {
		console.error("Upload error:", error.message);
		return null;
	}

	const { data: urlData } = supabase.storage
		.from("birth-files")
		.getPublicUrl(filePath);

	return urlData?.publicUrl || null;
};
