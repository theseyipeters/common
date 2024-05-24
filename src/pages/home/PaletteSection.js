import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import RefreshIcon from "../../svgs/RefreshIcon";
import PaletteCard from "./PaletteCard";
import { v4 as uuidv4 } from "uuid";

const coolWords = [
	"Scovian",
	"Vextrian",
	"Quotian",
	"Spherian",
	"Trilian",
	"Zentrian",
	"Rovian",
	"Hylian",
	"Flarian",
	"Gravian",
	"Xolian",
	"Trovian",
	"Juvian",
	"Yarian",
	"Plorian",
	"Vorian",
	"Mornian",
	"Darnian",
	"Selvian",
	"Xantian",
	"Blavian",
	"Crinian",
	"Fandian",
	"Garian",
	"Luvian",
	"Tarnian",
	"Wovian",
	"Pindian",
	"Brilian",
	"Slovian",
	"Qorian",
	"Zalian",
	"Klavian",
	"Dovian",
	"Merlian",
	"Tharian",
	"Braxian",
	"Cylian",
	"Zyrian",
	"Xavian",
	"Frovian",
	"Rivian",
	"Jolian",
	"Nuvian",
	"Warian",
	"Borian",
	"Tixian",
	"Loxian",
	"Havian",
	"Stavian",
	"Praxian",
	"Vidian",
	"Trian",
	"Glovian",
	"Suvian",
	"Kuvian",
	"Dravian",
	"Norian",
	"Muvian",
	"Zovian",
	"Lorian",
	"Pavian",
	"Trexian",
	"Glarian",
	"Fovian",
	"Quinian",
	"Lixian",
	"Raxian",
	"Xarvian",
	"Sylvian",
	"Vulian",
	"Huvian",
	"Narian",
	"Braxian",
	"Phovian",
	"Zyxian",
	"Karian",
	"Jovian",
	"Tevian",
	"Grulian",
	"Sarnian",
	"Dylian",
	"Morvian",
	"Lorvian",
	"Cevian",
	"Noxian",
	"Vrelian",
	"Zirian",
	"Harvian",
	"Xenian",
	"Tovian",
	"Wraxian",
	"Zanian",
	"Qidian",
	"Luxian",
	"Jyxian",
	"Frian",
	"Duvian",
	"Pryvian",
	"Saxian",
	"Meldian",
	"Fraxian",
	"Glyrian",
	"Norvian",
	"Pyrian",
];

const mixWords = ["Palette"];
const generateRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const isValidHex = (hex) => {
	return /^#[0-9A-F]{6}$/i.test(hex) && !hex.startsWith("#FFF");
};

const hexToHSL = (H) => {
	let r = 0,
		g = 0,
		b = 0;
	if (H.length === 4) {
		r = parseInt(H[1] + H[1], 16);
		g = parseInt(H[2] + H[2], 16);
		b = parseInt(H[3] + H[3], 16);
	} else if (H.length === 7) {
		r = parseInt(H[1] + H[2], 16);
		g = parseInt(H[3] + H[4], 16);
		b = parseInt(H[5] + H[6], 16);
	}
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h = 0,
		s = 0,
		l = (max + min) / 2;
	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return [h, s, l];
};

const HSLToHex = (h, s, l) => {
	let r, g, b;
	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = (p, q, t) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 3) return q;
			if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	const toHex = (x) => {
		const hex = Math.round(x * 255).toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	};
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const generateShade = (color, factor) => {
	const [h, s, l] = hexToHSL(color);
	const newL = Math.min(Math.max(l * factor, 0), 1);
	return HSLToHex(h, s, newL);
};

const ensureValidHex = (hex) => {
	while (!isValidHex(hex)) {
		hex = generateRandomColor();
	}
	return hex;
};

const generatePalette = () => {
	let mainColor = generateRandomColor();
	mainColor = ensureValidHex(mainColor);

	const shadesOfMainColor = [
		mainColor,
		generateShade(mainColor, 0.1),
		// generateShade(mainColor, 0.8),
		generateShade(mainColor, 0.4),
		generateShade(mainColor, 0.6),
		generateShade(mainColor, 0.2),
	].map(ensureValidHex);

	return {
		colors: shadesOfMainColor,
		name: `${coolWords[Math.floor(Math.random() * coolWords.length)]} ${
			mixWords[Math.floor(Math.random() * mixWords.length)]
		}`,
		id: uuidv4(),
	};
};

export default function PalettesSection() {
	const [palettes, setPalettes] = useState([]);
	const [selectedLayout, setSelectedLayout] = useState("square"); // Default layout

	const handleLayoutChange = (event) => {
		setSelectedLayout(event.target.value);
	};

	const refreshPalettes = () => {
		const newPalettes = [];
		for (let i = 0; i < 6; i++) {
			newPalettes.push(generatePalette());
		}
		setPalettes(newPalettes);
	};

	useEffect(() => {
		refreshPalettes();
	}, []);

	return (
		<section className="h-fit px-[20px] md:px-[50px] lg:px-[150px] font-outfit">
			<div>
				<div className="flex flex-row items-center justify-between py-1">
					<h2 className="font-semibold text-xl flex items-center gap-2">
						Explore palettes.{" "}
						<Link
							to={"/"}
							className="font-normal text-base text-green-1">
							See all
						</Link>
					</h2>

					<div className="flex flex-row items-center gap-2">
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
						<div className="border-b-2 border-green-1">
							<Button
								onClick={refreshPalettes}
								className={`flex flex-row gap-2 items-center`}
								variant={"text"}
								state="default"
								size={"md"}>
								<RefreshIcon />
								Refresh
							</Button>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
					{palettes.map((palette, index) => (
						<PaletteCard
							selectedLayout={selectedLayout}
							key={index}
							id={palette.id}
							colors={palette.colors}
							name={palette.name}
						/>
					))}
				</div>

				<div className="mt-16 flex flex-col gap-3 items-center justify-center">
					<p>Need more palettes?</p>

					<Button
						className={`max-w-56`}
						variant={`primary`}
						size={`md`}
						state={"default"}>
						See all palettes
					</Button>
				</div>
			</div>
		</section>
	);
}
