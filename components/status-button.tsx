"use client";

import { Button, type ButtonProps } from "./ui/button";
import { LoaderIcon } from "lucide-react";
import { useFormState } from "react-hook-form";

/**
 * This component exists because to loading status work we need to desctruct de formState
 * from useForm hook, but since are using the Form component from shadcn.
 */
export function StatusButton({
	children,
	...props
}: ButtonProps & { loading?: boolean }) {
	const { isSubmitted } = useFormState();

	return (
		<Button size="sm" {...props}>
			{isSubmitted ? (
				<>
					<LoaderIcon className="size-4 animate-spin" />
				</>
			) : (
				children
			)}
		</Button>
	);
}
