import React from "react";
import Hero from "./Hero";
import Navbar from "../../components/sections/Navbar";
import GradientsSection from "./GradientsSection";

export default function Home() {
	return (
		<main className="">
			<div className="heroBg h-screen">
				<div>
					<Navbar />
					<div className="">
						<Hero />
					</div>
				</div>
			</div>
			<div className="mt-[-50px]">
				<GradientsSection />
			</div>
		</main>
	);
}
