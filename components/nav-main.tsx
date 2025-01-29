import Link from "next/link";
import { NewspaperIcon, NotebookPenIcon, UserIcon } from "lucide-react";
import { SignOutButton } from "./signout-button";

const items = [
	{ title: "Feed", url: "/", icon: <NewspaperIcon className="size-4" /> },
	{ title: "Perfil", url: "/me", icon: <UserIcon className="size-4" /> },
	{
		title: "Criar Nota",
		url: "/create",
		icon: <NotebookPenIcon className="size-4" />,
	},
];

export function NavMain() {
	return (
		<nav className="flex justify-between lg:flex-col gap-2 w-full fixed lg:static bottom-0 left-0 border-t lg:border-none bg-background z-20 lg:py-4">
			{items.map((item) => (
				<Link
					key={item.url}
					href={item.url}
					className="text-sm h-12 flex-1 inline-flex justify-center lg:justify-start items-center gap-3 font-medium hover:bg-muted-foreground/5 focus:bg-muted-foreground/5 px-3 py-2 rounded-md"
				>
					{item.icon} <span className="hidden lg:inline">{item.title}</span>
				</Link>
			))}

			<SignOutButton />
		</nav>
	);
}
