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

export function StatusPopover({ id, currentStatus, onChange }) {
	const [open, setOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState(currentStatus);
	const statuses = ["Pending", "Verified", "Completed"];

	useEffect(() => {
		setSelectedStatus(currentStatus);
	}, [currentStatus]);

	const handleSelect = async (value) => {
		if (!id) {
			alert("❌ Error: No ID provided.");
			return;
		}

		const { error } = await supabase
			.from("birth_registration")
			.update({ status: value })
			.eq("id", id);

		if (!error) {
			setSelectedStatus(value);
			onChange && onChange(value);
			setOpen(false);
			console.log("✅ Status updated to:", value);
		} else {
			alert("Error updating status: " + error.message);
			console.error("Supabase error:", error);
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
