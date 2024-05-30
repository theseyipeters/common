import React, { useState } from "react";
import { Link } from "react-router-dom";
import GradientCard from "../home/GradientCard";

export default function SavedGradients({ gradients }) {
	const [selectedLayout, setSelectedLayout] = useState("square");

	const handleLayoutChange = (event) => {
		setSelectedLayout(event.target.value);
	};

	console.log(gradients);
	return (
		<div className="w-full flex">
			<div className="w-full flex flex-col">
				<div className="w-full flex flex-row gap-3 items-center justify-between py-1 font-outfit">
					<h2 className="w-full lg:w-fit font-semibold text-xl flex items-center justify-between gap-2">
						Saved gradients ({gradients.length})
					</h2>

					<div className="w-full lg:w-fit flex flex-row items-center justify-between gap-2">
						<div className="flex flex-row gap-3 items-center justify-end ml-auto">
							<div className="flex items-center gap-2">
								<input
									type="radio"
									id="circleLayout"
									name="layout"
									value="circle"
									checked={selectedLayout === "circle"}
									onChange={handleLayoutChange}
									className="cursor-pointer hidden"
								/>
								<label
									htmlFor="circleLayout"
									className={`w-[20px] h-[20px] rounded-full cursor-pointer ${
										selectedLayout === "circle" ? "bg-green-1" : "bg-gray-1"
									}`}></label>
							</div>
							<div className="flex items-center gap-2">
								<input
									type="radio"
									id="squareLayout"
									name="layout"
									value="square"
									checked={selectedLayout === "square"}
									onChange={handleLayoutChange}
									className="cursor-pointer hidden"
								/>
								<label
									htmlFor="squareLayout"
									className={`w-[20px] h-[20px] rounded-md cursor-pointer ${
										selectedLayout === "square" ? "bg-green-1" : "bg-gray-1"
									}`}></label>
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5 font-outfit">
					{gradients.map((gradient, index) => (
						<GradientCard
							selectedLayout={selectedLayout}
							key={index}
							gradient={gradient.gradient}
							colors={gradient.colors}
							angle={gradient.angle}
							name={gradient.name}
							opacity={gradient.opacity}
							id={gradient.id}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
