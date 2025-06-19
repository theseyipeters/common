import React from "react";
import CommonLogo from "../../svgs/CommonLogo";
import CommonLogoSm from "../../svgs/CommonLogoSm";
import { Link } from "react-router-dom";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-white-1 text-gray-2 pt-[60px] px-[20px] md:px-[50px] lg:px-[150px] font-outfit">
			<div className="w-full flex flex-col md:flex-row items-start md:items-start">
				<div className="w-full md:w-[40%] flex flex-col gap-5">
					<div className="hidden md:block">
						<CommonLogo />
					</div>
					<div className="block md:hidden lg:hidden">
						<CommonLogoSm />
					</div>
					<div className="font-light flex flex-col gap-3">
						<p className="font-light leading-8 w-full md:w-4/5 lg:w-4/5">
							Common helps you discover the beauty in simplicity. Create
							stunning color palettes effortlessly and bring your creative
							projects to life.
						</p>
						<p className="font-light mt-6">
							Common © {currentYear}. All Rights Reserved.
						</p>
					</div>
				</div>
				<div className="w-full md:w-2/4 mt-10 md:mt-0 flex flex-col md:flex-row gap-10 md:gap-20">
					<div className="flex flex-col gap-4">
						<h4 className="text-black-1 font-medium">Common</h4>
						<ul className="flex flex-col gap-4">
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link to="/gradients">Explore Gradients</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link to="/palettes">Explore Palettes</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link to="/generate/gradients">Generate Gradients</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link to="/generate/palettes">Generate Palettes</Link>
							</li>
						</ul>
					</div>
					<div className="flex flex-col gap-4">
						<h4 className="text-black-1 font-medium">About the Creator</h4>
						<ul className="flex flex-col gap-4">
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link to="/creator">@sagethedev</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link to="/projects">Sagethedev’s projects</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link to="/about">About Sagethedev</Link>
							</li>
						</ul>
					</div>
					<div className="flex flex-col gap-4">
						<h4 className="text-black-1 font-medium">Connect</h4>
						<ul className="flex flex-col gap-4">
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link to="https://twitter.com">Twitter</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link to="https://github.com">Github</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link to="https://instagram.com">Instagram</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="border-t border-gray/50 mt-[50px] text-center py-[30px]">
				Built with <span className="text-red-500"> ♥ </span> by{" "}
				<span className="textGradient">Sagethedev</span>
			</div>
		</footer>
	);
}
