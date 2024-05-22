import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const Button = ({
	children,
	className,
	onClick,
	href,
	variant,
	size,
	state = "default",
	...rest
}) => {
	const buttonClass = clsx(
		"rounded-md",
		"font-light",
		"focus:outline-none",
		"transition",
		"tracking-[-0.72px]",
		"w-full",
		"duration-300",
		"ease-in-out",
		"text-center",
		{
			// Variant styles
			"bg-black-1 text-white-1": variant === "primary" && state === "default",
			"text-green-1": variant === "secondary" && state === "default",

			"border border-green-1 text-green-1":
				variant === "outlined" && state === "default",
			"text-green-1": variant === "text" && state === "default",

			// Size styles
			"py-1 px-2 text-sm": size === "sm",
			"py-2 px-4 text-base": size === "md",
			"py-3 px-6 text-lg": size === "lg",

			// State styles
			"cursor-pointer": state === "default" || state === "hover",
			"cursor-not-allowed btn-primary text-gray-1": state === "inactive",
		},
		className,
		rest.className // Merge additional classes
	);

	if (href) {
		return (
			<Link href={href}>
				<a
					className={buttonClass}
					onClick={state !== "default" ? (e) => e.preventDefault() : undefined}>
					{children}
				</a>
			</Link>
		);
	} else {
		return (
			<button
				className={buttonClass}
				onClick={onClick}
				disabled={state === "inactive"}
				{...rest}>
				{children}
			</button>
		);
	}
};

export default Button;
