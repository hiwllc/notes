import Link from "next/link";
import {
	LogOutIcon,
	NewspaperIcon,
	NotebookPenIcon,
	UserIcon,
} from "lucide-react";
import { Button } from "./ui/button";

const items = [
	{ title: "Feed", url: "/", icon: <NewspaperIcon className="size-4" /> },
	{ title: "Perfil", url: "/me", icon: <UserIcon className="size-4" /> },
	{
		title: "Criar Nota",
		url: "/me",
		icon: <NotebookPenIcon className="size-4" />,
	},
];

export function NavMain() {
	return (
		<nav className="py-4 flex flex-col gap-2">
			{items.map((item) => (
				<Link
					key={item.url}
					href={item.url}
					className="text-sm inline-flex items-center gap-3 font-medium hover:bg-muted-foreground/5 focus:bg-muted-foreground/5 px-3 py-2 rounded-md"
				>
					{item.icon} {item.title}
				</Link>
			))}

			<Button size="sm" variant="ghost" className="w-fit">
				<LogOutIcon className="size-4" /> Sair
			</Button>
		</nav>
	);
}
