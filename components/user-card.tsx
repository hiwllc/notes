import { NotebookTextIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { User } from "next-auth";

type Props = {
	user: User;
};

const getInitialFromName = (name: string) =>
	name
		.split(" ")
		.slice(0, 2)
		.map((word) => word.charAt(0))
		.join("");

export function UserButton({ user }: Props) {
	return (
		<div className="w-full flex items-start gap-2">
			<Avatar>
				<AvatarImage src={user.image || ""} />
				<AvatarFallback>
					{getInitialFromName(user.name as string)}
				</AvatarFallback>
			</Avatar>

			<div className="space-y-1">
				<p className="text-sm font-medium">{user.name}</p>

				<div>
					<p className="text-xs inline-flex items-center gap-1">
						{/* @todo implementar contador de notas deste usuário */}
						<NotebookTextIcon className="size-4" /> 25 Notas
					</p>
				</div>
			</div>
		</div>
	);
}
