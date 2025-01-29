import {
	MoveRightIcon,
	NotebookTextIcon,
	SearchIcon,
	SunIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-card";
import { NavMain } from "@/components/nav-main";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getUserNotesCount(user?: string) {
	if (!user) {
		return 0;
	}

	return prisma.note.count({ where: { userId: user } });
}

export default async function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
  const notes = await getUserNotesCount(session?.user?.id);

	return (
		<main className="w-full min-h-dvh">
			<header className="sticky top-0 bg-background z-20 lg:h-20">
				<div className="container grid grid-rows-2 md:grid-rows-1 py-4 gap-2 md:grid-cols-[1fr_232px]">
					<h1 className="text-sm font-medium row-start-1">
						<Link href="/" className="flex items-center gap-2">
							<NotebookTextIcon className="size-4" />
							overnote
						</Link>
					</h1>

					<div className="flex items-center p-1 bg-background rounded-md border focus-within:ring-foreground focus-within:ring-offset-2 col-span-2 md:row-start-1">
						<input
							className="w-full flex-1 h-6 px-2 bg-transparent focus:outline-none text-sm"
							placeholder="Digite para pesquisar..."
						/>
						<Button size="icon" className="size-6 p-0" variant="ghost">
							<SearchIcon className="size-4" />
						</Button>
					</div>

					<Button
						className="size-8 p-0 row-start-1 ml-auto"
						size="icon"
						variant="outline"
					>
						<SunIcon className="size-4" />
						<span className="sr-only">Alternar Tema</span>
					</Button>
				</div>
			</header>

			<section className="container grid gap-10 h-[calc(100dvh-160px)] py-10 lg:grid-cols-[260px_1fr] lg:h-[calc(100dvh-140px)]">
				<aside className="gap-2 sticky top-0">
					{!session ? (
						<div className="fixed lg:static bottom-0 left-0 bg-background lg:bg-muted-foreground/5 border-t lg:border-0 text-center lg:text-left rounded-t-md lg:rounded-md p-4 space-y-3 w-full">
							<p className="text-sm font-medium text-foreground/80">
								Faça login ou crie sua conta para criar suas notas.
							</p>

							<Button size="sm" className="group" asChild>
								<Link href="/login">
									Login{" "}
									<MoveRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</Button>
						</div>
					) : null}

					{session?.user ? (
						<>
							<UserButton user={session.user} notes={notes} />
							<NavMain />
						</>
					) : null}
				</aside>

				{children}
			</section>
		</main>
	);
}
