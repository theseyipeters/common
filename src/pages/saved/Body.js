import React, { useContext, useState } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import SavedIllustration from "../../svgs/SavedIllustration";
import SavedGradients from "./SavedGradients";
import SavedPalettes from "./SavedPalettes";

export default function Body() {
	const { favorites } = useContext(FavoritesContext);
	const [activeItem, setActiveItem] = useState("Gradients");

	const totalSaved = favorites.gradients.length + favorites.palettes.length;

	return (
		<main className="w-full pt-[100px]">
			<div className="h-fit bg-white-2 flex flex-col  lg:flex-row gap-5 items-center justify-between w-full py-10 px-[20px] md:px-[50px] lg:px-[150px] font-outfit">
				<div className="flex flex-col gap-2 items-center lg:items-start">
					<h1 className="text-[50px] tracking-[-3.5px]">
						Find your saved <span className="textGradient px-1">items</span>.
					</h1>

					<p className="text-xl font-light">
						You currently have{" "}
						<span className="textGradient font-medium">{totalSaved}</span> saved
						items.
					</p>
				</div>

				<div>
					<SavedIllustration />
				</div>
			</div>
			<div className="mt-3 w-full bg-white-1 flex justify-center px-[20px] md:px-[50px] lg:px-[150px] font-outfit">
				<div className="font-light w-full h-fit flex flex-row gap-3 items-center justify-center">
					<button
						className={`flex flex-row items-center gap-2 py-3 px-6 ${
							activeItem === "Gradients"
								? "border-b-[3px] border-green-1 text-green-1"
								: ""
						} transition-all ease-in-out duration-500`}
						onClick={() => setActiveItem("Gradients")}>
						Gradients{" "}
						<span
							className={`text-sm flex w-[30px] h-[30px] p-2 ${
								activeItem === "Gradients"
									? "bg-green-1 text-white-1"
									: "bg-gray-1"
							} items-center justify-center rounded-full`}>
							{favorites.gradients.length}
						</span>
					</button>
					<button
						className={`flex flex-row items-center gap-2 py-3 px-6 ${
							activeItem === "Palettes"
								? "border-b-[3px] border-green-1 text-green-1"
								: ""
						} transition-all ease-in-out duration-500`}
						onClick={() => setActiveItem("Palettes")}>
						Palettes{" "}
						<span
							className={`text-sm flex w-[30px] h-[30px] p-2 ${
								activeItem === "Palettes"
									? "bg-green-1 text-white-1"
									: "bg-gray-1"
							} items-center justify-center rounded-full`}>
							{favorites.palettes.length}
						</span>
					</button>
				</div>
			</div>

			<div className="mt-5 px-[20px] md:px-[50px] lg:px-[150px]">
				{activeItem === "Gradients" ? (
					<SavedGradients gradients={favorites.gradients} />
				) : (
					<SavedPalettes palettes={favorites.palettes} />
				)}
			</div>
		</main>
	);
}
