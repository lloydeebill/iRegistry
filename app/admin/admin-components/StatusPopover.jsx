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

		const { error } = await supabase
			.from(table)
			.update({ status: value })
			.eq("id", id);

		if (error) {
			alert("Error updating status: " + error.message);
			return;
		}

		setSelectedStatus(value);
		onChange && onChange(value);
		setOpen(false);

		// 📧 Send confirmation email if status is Verified
		if (value.toLowerCase() === "verified" && email && childName) {
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
				alert("📧 Verification email sent to the recipient!");
			} catch (err) {
				alert("Email failed: " + err.message);
			}
		}
	};

	return (
		<div className="">
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
