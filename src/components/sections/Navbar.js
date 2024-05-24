import React, { useState, useEffect, useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import CommonLogo from "../../svgs/CommonLogo";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Dropdown from "../../svgs/Dropdown";
import UserFavorite from "../../svgs/UserFavorite";

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const { favorites } = useContext(FavoritesContext);

	const totalSaved = favorites.gradients.length + favorites.palettes.length;

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

	console.log(totalSaved);
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

					<div className="relative bg-black-1 rounded-full h-[40px] w-[40px] flex items-center justify-center">
						<UserFavorite />

						<span className="bg-red-500 text-white-1 text-xs absolute top-[-12px] right-[-10px] h-[30px] w-[30px] rounded-full flex items-center justify-center">
							{totalSaved > 99 ? "99+" : totalSaved}
						</span>
					</div>
				</ul>
			</nav>
		</>
	);
}
