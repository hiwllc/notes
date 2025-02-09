import { SignupForm } from "@/components/signup-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();

	if (session?.user?.id) {
		return redirect("/");
	}

	return (
		<div className="flex min-h-svh w-full bg-background items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<SignupForm />
			</div>
		</div>
	);
}
