import React, { useState, useEffect } from "react";
import CommonLogo from "../../svgs/CommonLogo";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Dropdown from "../../svgs/Dropdown";

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 150;
			setScrolled(isScrolled);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	const navLinks = [
		{
			name: "Generate",
			hasDropdown: true,
			submenu: [
				{ name: "Generate Palettes", link: "/generate/palettes" },
				{ name: "Generate Gradients", link: "/generate/gradients" },
			],
		},
		{
			name: "Gradients",
			link: "/gradients",
			hasDropdown: false,
		},
		{
			name: "Palettes",
			link: "/palettes",
			hasDropdown: false,
		},
	];
	return (
		<>
			<nav
				className={`fixed w-full  z-20 flex ${
					scrolled ? "bg-white-1" : "bg-transparent"
				} flex-row items-center justify-between py-2 px-[20px] md:px-[50px] lg:px-[150px] font-outfit`}>
				<div>
					<CommonLogo />
				</div>

				<ul className="flex flex-row gap-6 items-center font-light">
					<div className="flex flex-row gap-4 items-center">
						{navLinks.map((navLink, index) => (
							<li
								key={index}
								className="flex flex-row gap-1 items-center tracking-[-0.32px]">
								{navLink.name}
								{navLink.hasDropdown && (
									<span>
										<Dropdown />
									</span>
								)}
							</li>
						))}
					</div>

					<div>
						<Button
							variant={"primary"}
							state="default"
							size={"md"}>
							Explore
						</Button>
					</div>
				</ul>
			</nav>
		</>
	);
}
