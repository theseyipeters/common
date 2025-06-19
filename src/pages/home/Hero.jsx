import React, { useState, useEffect, useRef } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Button from "../../components/ui/Button";

export default function Hero() {
	const textVariations = ["palettes", "gradients"];
	const [size, setSize] = useState("lg");
	const [roles] = useTypewriter({
		words: textVariations,

		loop: {},
		typeSpeed: 100,
		deleteSpeed: 30,
		delaySpeed: 2000,
	});

	const updateButtonSize = () => {
		const width = window.innerWidth;
		if (width < 768) {
			setSize("md"); // Small size for mobile
		} else if (width < 1024) {
			setSize("md"); // Medium size for tablet
		} else {
			setSize("lg"); // Large size for desktop
		}
	};

	// Set up event listener for window resize
	useEffect(() => {
		updateButtonSize(); // Set the initial size
		window.addEventListener("resize", updateButtonSize);
		return () => {
			window.removeEventListener("resize", updateButtonSize);
		};
	}, []);

	return (
		<section className="flex w-full items-center justify-center px-[20px] md:px-[50px] lg:px-[150px] font-outfit">
			<div className="w-full lg:w-[65%] text-center flex flex-col gap-4">
				<h1 className="flex flex-col text-[50px] md:text-[60px] lg:text-[90px] tracking-[-4.5px] lg:tracking-[-6.5px]">
					Create color{" "}
					<div className="h-[0px]">
						<span className="textGradient px-1 ">{roles}</span>
					</div>
					<br /> with one click.
				</h1>

				<div className="w-full text-black-2 flex flex-col items-center gap-3">
					<p className="font-light">
						Craft Your Perfect Palette with{" "}
						<span className="textGradient">Common</span>. <br />
						Explore, Design, and Create Your Next Masterpiece.
					</p>

					<div className="w-4/5 flex flex-col md:flex-row lg:flex-row  items-center justify-center gap-x-4 gap-y-2">
						<Button
							variant={"outlined"}
							state="default"
							className={`w-full md:max-w-56 `}
							size={size}>
							Explore
						</Button>

						<Button
							className={`min-w-56`}
							variant={"primary"}
							state="default"
							size={size}>
							Generate color palettes
						</Button>
					</div>

					<p className="font-light">
						You can be colorful too! Join over 
						<span className="textGradient">120K </span>active creators.
					</p>
				</div>
			</div>
		</section>
	);
}
