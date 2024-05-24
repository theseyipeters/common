import React from "react";
import CommonLogo from "../../svgs/CommonLogo";
import { Link } from "react-router-dom";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-white-1 text-gray-2  h-fit py-[100px] px-[20px] md:px-[50px] lg:px-[150px] font-outfit">
			<div className="w-full flex flex-row items-start">
				<div className="w-2/3 flex flex-col gap-5">
					<CommonLogo />

					<div className="font-light w-4/5 flex flex-col gap-3">
						<p className="font-light leading-[32px]">
							Common helps you discover the beauty in simplicity. Create
							stunning color palettes effortlessly and bring your creative
							projects to life.
						</p>

						<p className="font-light mt-6">
							Common © {currentYear}. All Rights Reserved.
						</p>
					</div>
				</div>

				<div className="w-full ml-[40px] mt-[20px] flex flex-row gap-[65px]">
					<div className="flex flex-col gap-10">
						<h4 className="text-black-1 font-medium">Common</h4>

						<ul className="flex flex-col gap-5">
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link>Explore Gradients</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link>Explore Palettes</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link>Generate Gradients</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link>Generate Palettes</Link>
							</li>
						</ul>
					</div>
					<div className="flex flex-col gap-10">
						<h4 className="text-black-1 font-medium">About the Creator</h4>

						<ul className="flex flex-col gap-5">
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link>@sagethedev</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link>Sagethedev’s projects</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link>About Sagethedev</Link>
							</li>
						</ul>
					</div>
					<div className="flex flex-col gap-10">
						<h4 className="text-black-1 font-medium">Connect</h4>

						<ul className="flex flex-col gap-5">
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link>Twitter</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link>Github</Link>
							</li>
							<li className="font-light hover:text-green-1 transition-all duration-500">
								<Link>Instagram</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}
