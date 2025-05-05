"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { supabase } from "@/lib/supabaseClient";

export function StatusPopover({
	id,
	currentStatus,
	table = "birth_registration",
	email,
	childName,
	emailContext, // "request" or "registration"
	onChange,
}) {
	const [open, setOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState(currentStatus);
	const statuses = ["Pending", "Verified", "Completed"];

	useEffect(() => {
		setSelectedStatus(currentStatus);
	}, [currentStatus]);

	const handleSelect = async (value) => {
		if (!id) return alert("❌ No ID provided");

		console.log("🔁 Attempting status update...");
		console.log("📄 Target Table:", table);
		console.log("🆔 Target ID:", id);
		console.log("📌 New Status:", value);

		const { error } = await supabase
			.from(table)
			.update({ status: value })
			.eq("id", id);

		if (error) {
			console.error("❌ Supabase update failed:", error);
			alert("Error updating status: " + error.message);
			return;
		}

		setSelectedStatus(value);
		onChange && onChange(value);
		setOpen(false);

		console.log("✅ Supabase status update successful!");

		// 📧 Send confirmation email if status is Verified
		if (value.toLowerCase() === "verified" && email && childName) {
			console.log("📬 Sending verification email to:", email);
			try {
				const response = await fetch("/api/send-email", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email,
						childName,
						type: emailContext || "request", // fallback to "request"
					}),
				});

				const result = await response.json();
				if (!response.ok) throw new Error(result?.error || "Unknown error");
				alert("📧 Email sent!");
				console.log("✅ Email sent successfully!");
			} catch (err) {
				console.error("❌ Email sending failed:", err);
				alert("Email failed: " + err.message);
			}
		}
	};

	return (
		<div className="mt-10">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="capitalize">
						{selectedStatus || "Update Status"} ⬇️
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandList>
							{statuses.map((status) => (
								<CommandItem
									key={status}
									onSelect={() => handleSelect(status)}
									className="capitalize"
								>
									{status}
								</CommandItem>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
