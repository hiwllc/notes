import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function requireAuthenticatedUser() {
	const session = await auth();

	if (!session?.user?.id) {
		return redirect("/login");
	}
}
