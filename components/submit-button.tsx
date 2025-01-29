"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./ui/button";
import { LoaderIcon } from "lucide-react";

export function SubmitButton({ children, ...props }: ButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button size="sm" {...props}>
			{pending ? (
				<>
					<LoaderIcon className="size-4 animate-spin" />
				</>
			) : (
				children
			)}
		</Button>
	);
}
