import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function OfficerEditor({ data, onSave }) {
	const [officerName, setOfficerName] = useState(data.officer_name || "");
	const [officerPosition, setOfficerPosition] = useState(
		data.officer_position || ""
	);
	const [preparedDate, setPreparedDate] = useState(data.prepared_date || "");
	const [open, setOpen] = useState(false);

	const handleSave = async () => {
		await onSave({
			officer_name: officerName,
			officer_position: officerPosition,
			prepared_date: preparedDate,
		});
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline">Edit Prepared By</Button>
			</PopoverTrigger>
			<PopoverContent className="space-y-4 p-4 w-80">
				<div className="space-y-2">
					<Input
						placeholder="Officer Name"
						value={officerName}
						onChange={(e) => setOfficerName(e.target.value)}
					/>
					<Input
						placeholder="Position"
						value={officerPosition}
						onChange={(e) => setOfficerPosition(e.target.value)}
					/>
					<Input
						placeholder="Prepared Date"
						value={preparedDate}
						onChange={(e) => setPreparedDate(e.target.value)}
					/>
				</div>
				<Button onClick={handleSave} className="w-full">
					Save
				</Button>
			</PopoverContent>
		</Popover>
	);
}
