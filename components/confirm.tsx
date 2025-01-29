import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "./ui/drawer";
import type { ReactNode } from "react";

export function ConfirmDialog({ children }: { children: Readonly<ReactNode> }) {
	const isMobile = useIsMobile();

	if (isMobile) {
		return <Drawer>{children}</Drawer>;
	}

	return <Dialog>{children}</Dialog>;
}

export function ConfirmDialogTrigger({
	children,
}: { children: Readonly<ReactNode> }) {
	const isMobile = useIsMobile();

	if (isMobile) {
		return <DrawerTrigger asChild>{children}</DrawerTrigger>;
	}

	return <DialogTrigger asChild>{children}</DialogTrigger>;
}

export function ConfirmDialogContent({
	children,
}: { children: Readonly<ReactNode> }) {
	const isMobile = useIsMobile();

	if (isMobile) {
		return <DrawerContent>{children}</DrawerContent>;
	}

	return <DialogContent>{children}</DialogContent>;
}

export function ConfirmDialogHeader({
	children,
}: { children: Readonly<ReactNode> }) {
	const isMobile = useIsMobile();

	if (isMobile) {
		return <DrawerHeader>{children}</DrawerHeader>;
	}

	return <DialogHeader>{children}</DialogHeader>;
}

export function ConfirmDialogTitle({
	children,
}: { children: Readonly<ReactNode> }) {
	const isMobile = useIsMobile();

	if (isMobile) {
		return <DrawerTitle>{children}</DrawerTitle>;
	}

	return <DialogTitle>{children}</DialogTitle>;
}

export function ConfirmDialogDescription({
	children,
}: { children: Readonly<ReactNode> }) {
	const isMobile = useIsMobile();

	if (isMobile) {
		return <DrawerDescription>{children}</DrawerDescription>;
	}

	return <DialogDescription>{children}</DialogDescription>;
}

export function ConfirmDialogFooter({
	children,
}: { children: Readonly<ReactNode> }) {
	const isMobile = useIsMobile();

	if (isMobile) {
		return <DrawerFooter className="[&>*]:w-full">{children}</DrawerFooter>;
	}

	return <DialogFooter>{children}</DialogFooter>;
}

export function ConfirmDialogClose({
	children,
}: { children: Readonly<ReactNode> }) {
	const isMobile = useIsMobile();

	if (isMobile) {
		return <DrawerClose asChild>{children}</DrawerClose>;
	}

	return <DialogClose asChild>{children}</DialogClose>;
}
