import React, { useState, useEffect, useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import CommonLogo from "../../svgs/CommonLogo";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Dropdown from "../../svgs/Dropdown";
import UserFavorite from "../../svgs/UserFavorite";
import MenuIcon from "../../svgs/MenuIcon";
import CommonLogoSm from "../../svgs/CommonLogoSm";

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const { favorites } = useContext(FavoritesContext);

	const totalSaved = favorites.gradients.length + favorites.palettes.length;

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 100);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (showMenu) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}

		return () => document.body.classList.remove("no-scroll");
	}, [showMenu]);

	const handleToggleMenu = () => {
		setShowMenu((prevShowMenu) => !prevShowMenu);
	};

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
		<nav
			className={`fixed w-full z-20 flex flex-row items-center justify-between py-3 lg:py-6 px-[20px] md:px-[50px] lg:px-[150px] font-outfit transition-colors duration-300 ${
				scrolled ? "bg-white-1" : "bg-transparent"
			}`}>
			<div className="w-full flex items-center justify-between">
				<Link
					to={"/"}
					className="hidden md:block">
					<CommonLogo />
				</Link>
				<Link
					to={"/"}
					className="block md:hidden lg:hidden">
					<CommonLogoSm />
				</Link>
				<div>
					<div className="hidden lg:flex flex-row gap-6 items-center font-light w-fit">
						{navLinks.map((navLink, index) => (
							<li
								key={index}
								className="flex flex-row gap-1 items-center tracking-[-0.32px]">
								{navLink.name}
								{navLink.hasDropdown && <Dropdown />}
							</li>
						))}
						<Button
							variant={"primary"}
							state="default"
							size={"md"}>
							Explore
						</Button>
						<div className="w-full">
							<Link
								to={"/saved"}
								className="relative bg-black-1 rounded-full h-[40px] w-[40px] flex items-center justify-center">
								<UserFavorite />

								<span className="bg-red-500 text-white-1 text-xs absolute top-[-12px] right-[-10px] h-[30px] w-[30px] rounded-full flex items-center justify-center">
									{totalSaved > 99 ? "99+" : totalSaved}
								</span>
							</Link>
						</div>
					</div>
					<div className="lg:hidden flex items-center ml-auto">
						<div
							className="p-3 text-black-1"
							onClick={handleToggleMenu}>
							<MenuIcon />
						</div>
						<Link
							to={"/saved"}
							className="relative bg-black-1 rounded-full h-[40px] w-[40px] flex items-center justify-center">
							<UserFavorite />

							{totalSaved > 0 && (
								<span className="bg-red-500 text-white-1 text-xs absolute top-[-12px] right-[-10px] h-[30px] w-[30px] rounded-full flex items-center justify-center">
									{totalSaved > 99 ? "99+" : totalSaved}
								</span>
							)}
						</Link>
					</div>
				</div>
			</div>
			{showMenu && (
				<ul className="flex flex-col lg:hidden absolute top-full left-0 w-full bg-white-1 text-black-1 p-4">
					{navLinks.map((navLink, index) => (
						<li
							key={index}
							className="py-2 border-b border-gray-200 flex flex-row gap-1 items-center tracking-[-0.32px]">
							{navLink.name}
							{navLink.hasDropdown && <Dropdown />}
						</li>
					))}
					<Button
						variant={"primary"}
						state="default"
						size={"md"}
						className="mt-4">
						Explore
					</Button>
				</ul>
			)}
		</nav>
	);
}
