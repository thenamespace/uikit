export * from "./strings";
export * from "./coins";
export * from "./records";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};
