import React from "react";
import { useParams } from "react-router-dom";

export default function PaletteDetails() {
	const { encodedPalette } = useParams();

	const decodePalette = (encodedString) => {
		const base64String = decodeURIComponent(encodedString);
		const jsonString = atob(base64String); // Convert Base64 back to JSON string
		return JSON.parse(jsonString); // Parse JSON string to an object
	};

	const palette = decodePalette(encodedPalette);
	console.log(palette);

	return (
		<div
			className="gradient-detail"
			// style={{ background: gradient.gradient }}
		>
			<h2>{palette.name}</h2>
			<p>Angle: {palette.angle}°</p>
			<p>Colors: {palette.colors.join(", ")}</p>
			<p>Opacity: {palette.opacity}</p>
		</div>
	);
}
