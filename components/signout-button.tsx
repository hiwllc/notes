import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth";

async function signOutAction() {
	"use server";
	await signOut({ redirectTo: "/" });
}

export function SignOutButton() {
	return (
		<form
			action={signOutAction}
			className="flex w-full flex-1 lg:w-fit h-12 justify-center items-center lg:flex-auto"
		>
			<Button size="sm" type="submit" variant="ghost">
				<LogOutIcon className="size-4" />{" "}
				<span className="hidden lg:inline">Sair</span>
			</Button>
		</form>
	);
}
