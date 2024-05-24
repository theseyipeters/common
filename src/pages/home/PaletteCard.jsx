import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Heart from "../../svgs/Heart";
import Code from "../../svgs/Code";
import Download from "../../svgs/Download";
import Options from "../../svgs/Options";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "../../svgs/CloseIcon";
import { toPng } from "html-to-image";

export default function PaletteCard({
	colors,
	name,
	id,
	hoverIndex,
	selectedLayout,
}) {
	const [copiedColor, setCopiedColor] = useState(null);
	const [isFavorite, setIsFavorite] = useState(false);
	const [showCss, setShowCss] = useState(false);
	const paletteRef = useRef();

	const handleShowCss = () => {
		setShowCss(true);
	};

	const handleCloseCss = () => {
		setShowCss(false);
	};

	useEffect(() => {
		// Check if the gradient is already in favorites on mount
		const favorites =
			JSON.parse(localStorage.getItem("FAVORITE PALETTES")) || [];
		setIsFavorite(favorites.some((fav) => fav.id === id));
	}, [id]);

	const handleToggleFavorite = () => {
		const favorites =
			JSON.parse(localStorage.getItem("FAVORITE PALETTES")) || [];
		let updatedFavorites;

		if (isFavorite) {
			// Remove only the specific gradient
			updatedFavorites = favorites.filter((fav) => fav.id !== id);
		} else {
			// Add the gradient
			updatedFavorites = [...favorites, { id, colors, name }];
		}

		localStorage.setItem("FAVORITE PALETTES", JSON.stringify(updatedFavorites));
		setIsFavorite(!isFavorite);
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

	const handleDownloadImage = () => {
		if (paletteRef.current === null) {
			return;
		}

		toPng(paletteRef.current, { quality: 1, pixelRatio: 16 })
			.then((dataUrl) => {
				const link = document.createElement("a");
				link.download = `${name}-palette.png`;
				link.href = dataUrl;
				link.click();
			})
			.catch((err) => {
				console.error("Oops, something went wrong!", err);
			});
	};

	const cssCode1 = `background: ${colors[0]};`;

	const variants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 20 },
	};

	return (
		<div
			style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.09)" }}
			className={`relative px-[15px] pt-[15px] pb-[30px] rounded-lg h-[338px] shadow-md ${
				selectedLayout === "circle" ? "rounded-full" : ""
			}`}>
			<>
				<div
					id="palette"
					ref={paletteRef}
					className="rounded-lg flex flex-col w-full h-[194px] transition-height ease-in-out duration-500 overflow-hidden">
					<div className="rounded-lg flex flex-row w-full h-full">
						{colors.map((color, index) => (
							<div
								id="block"
								key={index}
								onClick={() => copyToClipboard(color)}
								className="cursor-pointer w-full h-full relative hover:w-[500px] transition-width duration-300"
								style={{ backgroundColor: color }}>
								<div className="text-sm flex items-center justify-center bg-black-1/30 w-full h-full text-white-1 opacity-0 hover:opacity-100 transition-all duration-300">
									{copiedColor === color ? "Copied!" : color}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="h-fit">
					<div className="w-full flex mt-2">
						<div className="w-full">
							<Link className="font-medium">{name}</Link>
							<div className="font-light">
								<small className="text-gray-2 cursor-pointer transition-color">
									by Common
								</small>
							</div>
						</div>
						<div
							onClick={handleToggleFavorite}
							id="heart"
							className={` h-fit cursor-pointer ${
								isFavorite
									? "text-red-600 transition-colors duration-500"
									: "text-gray-3 transition-colors duration-500"
							}
								}`}>
							<Heart />
						</div>
					</div>
				</div>

				<div className="flex flex-row mt-4 items-center justify-between">
					<div className="flex flex-row gap-1">
						<div
							className="w-[20px] h-[20px] rounded-md"
							style={{ background: colors[0] }}></div>
						<div
							className="w-[20px] h-[20px] rounded-md"
							style={{ background: colors[1] }}></div>
						<div
							className="w-[20px] h-[20px] rounded-md"
							style={{ background: colors[2] }}></div>
						<div
							className="w-[20px] h-[20px] rounded-md"
							style={{ background: colors[3] }}></div>
						<div
							className="w-[20px] h-[20px] rounded-md"
							style={{ background: colors[4] }}></div>
					</div>

					<div className="text-gray-2 h-auto flex flex-row px-2 py-1 gap-2 border border-gray-3 rounded-full">
						<div
							className="hover:text-black-2 cursor-pointer"
							onClick={handleShowCss}>
							<Code />
						</div>
						<div
							className="hover:text-black-2 cursor-pointer"
							onClick={handleDownloadImage}>
							<Download />
						</div>
						<div
							// onClick={handleShowOptions}
							className="hover:text-black-2 cursor-pointer">
							<Options />
						</div>
					</div>
				</div>
			</>
			<AnimatePresence>
				{showCss && (
					<motion.div
						className="absolute border inset-0 top-0 h-[338px] bg-white-1 bg-opacity-[95.5%] rounded-lg"
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={variants}
						transition={{ duration: 0.5, ease: "easeInOut" }}>
						<div className="relative w-full border h-full py-8 px-4 rounded-lg shadow-lg flex flex-col gap-4 justify-between">
							<h3 className="font-semibold">CSS Code</h3>
							<div
								id="css_code"
								className="w-full flex flex-col gap-2 flex-grow">
								<div>
									<pre className="flex text-[12px]">{cssCode1}</pre>
									<pre className="flex text-[12px] text-gray-2/70">
										/* fallback for old browsers */
									</pre>
								</div>
								<div>
									<pre className="flex text-[12px] text-gray-2/70">
										/* CSS Tokens */
									</pre>
									<pre className="flex text-[12px]">
										{" "}
										--color1: {colors[0]}; <br />
										--color2: {colors[1]}; <br />
										--color3: {colors[2]};<br />
										--color4: {colors[3]};<br />
										--color5: {colors[4]};{" "}
									</pre>
								</div>
							</div>
							<div className="mt-auto flex items-baseline">
								<button
									className="bg-black-1 text-white-1 px-4 py-2 rounded font-light text-sm"
									onClick={handleCopyToClipboard}>
									Copy to clipboard
								</button>
							</div>
							<div
								onClick={handleCloseCss}
								className="absolute top-7 right-5 cursor-pointer">
								<CloseIcon />
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
