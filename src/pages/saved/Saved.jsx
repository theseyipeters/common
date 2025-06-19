import React from "react";
import Navbar from "../../components/sections/Navbar";
import Footer from "../../components/sections/Footer";
import Body from "./Body";

export default function Saved() {
	return (
		<main className="relative">
			<div
				id="banner"
				className=" h-full w-full">
				<Navbar />

				<div className="flex-1 flex items-center justify-center w-full py-[0px] mb-[100px]">
					<Body />
				</div>

				<Footer />
			</div>
		</main>
	);
}
