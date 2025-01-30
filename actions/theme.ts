"use server";

import { cookies } from "next/headers";

type Theme = "light" | "dark";
const COOKIE_THEME_NAME = "overnote-theme";

export async function setTheme(formData: FormData) {
	const theme = formData.get("theme") as Theme;
	const store = cookies();

	store.set(COOKIE_THEME_NAME, theme);
}

export async function getTheme() {
	const store = cookies();
	const cookie = store.get(COOKIE_THEME_NAME);

	return (cookie?.value || "light") as Theme;
}
