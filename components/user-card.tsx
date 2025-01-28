import { NotebookTextIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserButton() {
	return (
		<div className="w-full flex items-start gap-2">
			<Avatar>
				<AvatarImage src="https://github.com/hiwllc" />
				<AvatarFallback>WO</AvatarFallback>
			</Avatar>

			<div className="space-y-1">
				<p className="text-sm font-medium">wallacebatistaoliveira</p>

				<div>
					<p className="text-xs inline-flex items-center gap-1">
						<NotebookTextIcon className="size-4" /> 25 Notas
					</p>
				</div>
			</div>
		</div>
	);
}
