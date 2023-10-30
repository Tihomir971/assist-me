import type { HTMLAttributes } from "svelte/elements";

export type HTMLDivAttributes = HTMLAttributes<HTMLDivElement>;

export type OmitValue<T> = Omit<T, "value" | "defaultValue" | "onValueChange">;
export type OnChangeFn<T> = (value: T) => void;
export type AsChild = Expand<{
	asChild?: boolean;
}>;