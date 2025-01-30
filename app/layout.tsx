import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getTheme } from "@/actions/theme";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
	title: "Overnote",
	description: "Crie e compartilhe suas notas",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const theme = await getTheme();

	return (
		<html
			lang="pt-BR"
			className={theme}
			style={{ colorScheme: theme }}
			suppressHydrationWarning
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
