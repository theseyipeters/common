import React from "react";
import Navbar from "../../components/sections/Navbar";
import Footer from "../../components/sections/Footer";
import GradientsSection from "../home/GradientsSection";

import GradientHero from "./GradientHero";

const GradientPage = () => {
	return (
		<main className="relative ">
			<div
				id="banner"
				className=" h-full w-full">
				<Navbar />

				<div className="heroBg flex-1 h-[600px] flex items-center justify-center w-full py-[220px]">
					<GradientHero />
				</div>
				<div className="flex flex-col gap-y-[100px] mt-[340px] relative">
					<GradientsSection />
				</div>

				<Footer />
			</div>
		</main>
	);
};

export default GradientPage;
