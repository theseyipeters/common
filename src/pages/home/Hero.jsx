import React, { useState, useEffect, useRef } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Button from "../../components/ui/Button";

export default function Hero() {
	const textVariations = ["palettes", "gradients"];
	const [roles] = useTypewriter({
		words: textVariations,

		loop: {},
		typeSpeed: 100,
		deleteSpeed: 30,
		delaySpeed: 2000,
	});

	return (
		<section className="flex w-full items-center justify-center px-[20px] md:px-[50px] lg:px-[150px] font-outfit">
			<div className="w-3/5 text-center flex flex-col gap-4">
				<h1>
					Create color <span className="textGradient px-1 w-5">{roles}</span>{" "}
					<br />
					with one click.
				</h1>

				<div className="text-black-2 flex flex-col items-center gap-3">
					<p className="font-light">
						Craft Your Perfect Palette with{" "}
						<span className="textGradient">Common</span>. <br />
						Explore, Design, and Create Your Next Masterpiece.
					</p>

					<div className="w-4/5 flex flex-row items-center justify-center border  gap-4">
						<Button
							variant={"outlined"}
							state="default"
							className={`max-w-56`}
							size={"lg"}>
							Explore
						</Button>

						<Button
							variant={"primary"}
							state="default"
							size={"lg"}>
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
