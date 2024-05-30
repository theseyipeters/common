import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Code from "../../svgs/Code";
import CloseIconLg from "../../svgs/CloseIconLg";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Download from "../../svgs/Download";
import Options from "../../svgs/Options";
import RefreshIcon from "../../svgs/RefreshIcon";
import { FavoritesContext } from "../../context/FavoritesContext";
import PaletteCard from "../../pages/home/PaletteCard";

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

const encodePalette = (palette) => {
	const jsonString = JSON.stringify(palette);
	const base64String = btoa(jsonString); // Convert JSON string to Base64
	return encodeURIComponent(base64String); // Make the Base64 string URL-safe
};

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
		// generateShade(mainColor, 0.1),
		generateShade(mainColor, 0.8),
		generateShade(mainColor, 0.6),
		generateShade(mainColor, 0.4),
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

export default function PaletteModal({ isOpen, onClose, palette }) {
	console.log(palette);
	const [copiedColor, setCopiedColor] = useState(null);
	const [palettes, setPalettes] = useState([]);
	const { addFavoritePalette } = useContext(FavoritesContext);
	const [selectedLayout, setSelectedLayout] = useState("square"); // Default layout

	const handleLayoutChange = (event) => {
		setSelectedLayout(event.target.value);
	};

	const copyToClipboard = (color) => {
		navigator.clipboard.writeText(color).then(() => {
			setCopiedColor(color);
			setTimeout(() => setCopiedColor(null), 2000); // Reset after 2 seconds
		});
	};

	const handleCopyToClipboard = () => {
		const cssCodeElement = document.getElementById("css_code");
		const cssCode = cssCodeElement.innerText;
		navigator.clipboard.writeText(cssCode).then(() => {
			alert("CSS code copied to clipboard!");
		});
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

	if (!isOpen) return null;
	return (
		<div className="modal w-full ">
			<div
				onClick={onClose}
				className="modal-overlay"></div>
			<div className="modal-container relative bg-white-2 px-[30px] lg:px-[100px] xl:px-[150px] w-full h-full overflow-scroll">
				<div className="flex flex-col items-center justify-center mx-auto w-full lg:w-3/4 py-[90px]">
					<button
						className="flex self-end"
						onClick={onClose}>
						<CloseIconLg />
					</button>

					<div className="w-full">
						<p className="text-left text-xl">About this palette.</p>
						<div
							className="h-[400px] w-full rounded-xl mt-4 overflow-hidden flex flex-col"
							// style={{ background: gradient?.gradient }}
						>
							<div
								id="palette"
								className="rounded-lg flex flex-col w-full h-full transition-height ease-in-out duration-500 overflow-hidden">
								<div className="rounded-lg flex flex-row w-full h-full">
									{palette.colors.map((color, index) => (
										<div
											id="block"
											key={index}
											onClick={() => copyToClipboard(color)}
											className="cursor-pointer w-full h-full relative hover:w-[1000px] transition-width duration-300"
											style={{ backgroundColor: color }}>
											<div className="text-sm flex items-center justify-center bg-black-1/30 w-full h-full text-white-1 opacity-0 hover:opacity-100 transition-all duration-300">
												{copiedColor === color ? "Copied!" : color}
											</div>
										</div>
									))}
								</div>
								<div className="bg-black-1/30 text-white-1 h-[100px] w-full flex items-center justify-between mt-auto  py-3 px-5">
									<div>
										<h4 className="text-xl font-medium">{palette?.name}</h4>
										<p className="text-xs font-light">by Common</p>
									</div>

									<div className="flex flex-row items-center justify-between">
										<div className="text-white-2 h-auto flex flex-row px-2 py-1 gap-2 border border-gray-3 rounded-full">
											<div
												className="hover:text-black-2 cursor-pointer"
												// onClick={handleShowCss}
											>
												<Code />
											</div>
											<div
												className="hover:text-black-2 cursor-pointer"
												// onClick={() => downloadImage(gradient)}
											>
												<Download />
											</div>
											<div
												// onClick={handleShowOptions}
												className="hover:text-black-2 cursor-pointer">
												<Options />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full mt-5 flex flex-row items-start justify-between">
							<div className="w-full">
								<div className="w-full flex items-start justify-between">
									<h1 className="text-[40px] tracking-[-2.5px]">
										{palette?.name}
									</h1>

									<div className="flex flex-row gap-3 items-center">
										<div
											className="w-[50px] h-[50px] rounded-full"
											style={{ background: palette?.colors[0] }}></div>

										<div
											className="w-[50px] h-[50px] rounded-full"
											style={{ background: palette?.colors[1] }}></div>
									</div>
								</div>

								<div className="flex flex-row items-end justify-between w-full mt-10">
									<div className=" text-black-2/80 flex flex-col gap-10 text-base">
										<p className="font-light">
											{palette?.colors[0]} &rarr; {palette?.colors[1]}{" "}
										</p>
									</div>
									<div>
										<Button
											variant={"primary"}
											size={"md"}
											state="default">
											Edit this palette
										</Button>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-10 flex flex-col lg:flex-row gap-3 items-center justify-between py-1">
							<h2 className="w-full lg:w-fit font-semibold text-xl flex items-center justify-between gap-2">
								More like this.{" "}
								<Link
									to={"/"}
									className="font-normal text-base text-green-1">
									See all
								</Link>
							</h2>

							<div className="w-full lg:w-fit flex flex-row items-center justify-between gap-2">
								<div className="flex flex-row gap-3">
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

						<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-col-3 gap-3 mt-5">
							{palettes.map((palette, index) => {
								const encodedPalette = encodePalette(palette);
								return (
									<PaletteCard
										selectedLayout={selectedLayout}
										key={index}
										id={palette.id}
										colors={palette.colors}
										name={palette.name}
										palette={palette}
										link={`localhost:3000/palette/${encodedPalette}`}
										onFavorite={() => addFavoritePalette(palette)}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
