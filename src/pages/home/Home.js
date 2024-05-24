import React from "react";
import Hero from "./Hero";
import Navbar from "../../components/sections/Navbar";
import GradientsSection from "./GradientsSection";
import Illuminate from "./Illuminate";
import PaletteSection from "./PaletteSection";
import CTA from "./CTA";
import Footer from "../../components/sections/Footer";

export default function Home() {
	return (
		<main className="relative heroBg">
			<div
				id="banner"
				className=" h-full w-full">
				<Navbar />

				<div className="flex-1 flex items-center justify-center w-full py-[220px]">
					<Hero />
				</div>
				<div className="flex flex-col gap-y-[100px]">
					<GradientsSection />

					<Illuminate />

					<PaletteSection />

					<CTA />
				</div>

				<Footer />
			</div>
		</main>
	);
}
