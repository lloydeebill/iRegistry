import { supabase } from "./supabaseClient";

export const signInWithGoogle = async () => {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: "google",
	});
	if (error) console.error("Google sign-in error:", error.message);
};

export const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) console.error("Sign-out error:", error.message);
};
