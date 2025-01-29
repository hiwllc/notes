import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth";

async function signOutAction() {
	"use server";
	await signOut({ redirectTo: "/" });
}

export function SignOutButton() {
	return (
		<form action={signOutAction}>
			<Button
				size="sm"
				type="submit"
				variant="ghost"
				className="w-fit h-12 justify-center flex-1 lg:flex-auto"
			>
				<LogOutIcon className="size-4" />{" "}
				<span className="hidden lg:inline">Sair</span>
			</Button>
		</form>
	);
}
