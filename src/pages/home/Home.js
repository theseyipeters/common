import React from "react";
import Hero from "./Hero";
import Navbar from "../../components/sections/Navbar";
import GradientsSection from "./GradientsSection";
import Illuminate from "./Illuminate";
import PaletteSection from "./PaletteSection";

export default function Home() {
	return (
		<main className="relative heroBg">
			<div
				id="banner"
				className=" h-full w-full">
				<Navbar />

				<div className="flex-1 flex m-auto items-center justify-center w-full py-[220px]">
					<Hero />
				</div>

				<GradientsSection />

				<Illuminate />

				<PaletteSection />
			</div>
		</main>
	);
}
