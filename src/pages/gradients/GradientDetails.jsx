import React from "react";
import { useParams } from "react-router-dom";

export default function GradientDetails() {
	const { encodedGradient } = useParams();

	const decodeGradient = (encodedString) => {
		const base64String = decodeURIComponent(encodedString);
		const jsonString = atob(base64String); // Convert Base64 back to JSON string
		return JSON.parse(jsonString); // Parse JSON string to an object
	};

	const gradient = decodeGradient(encodedGradient);
	console.log(gradient);

	return (
		<div
			className="gradient-detail"
			style={{ background: gradient.gradient }}>
			<h2>{gradient.name}</h2>
			<p>Angle: {gradient.angle}°</p>
			<p>Colors: {gradient.colors.join(", ")}</p>
			<p>Opacity: {gradient.opacity}</p>
		</div>
	);
}
