import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Heart from "../../svgs/Heart";
import Code from "../../svgs/Code";
import Download from "../../svgs/Download";
import Options from "../../svgs/Options";
import CopyIcon from "../../svgs/CopyIcon";
import ViewIcon from "../../svgs/ViewIcon";
import XIcon from "../../svgs/XIcon";
import Favorite from "../../svgs/Favorite";
import Facebook from "../../svgs/Facebook";
import LinkedIn from "../../svgs/LinkedIn";
import Whatsapp from "../../svgs/Whatsapp";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "../../svgs/CloseIcon";
import { toPng } from "html-to-image";
import { FavoritesContext } from "../../context/FavoritesContext";

export default function PaletteCard({
	colors,
	name,
	id,
	hoverIndex,
	selectedLayout,
	link,
	// palette,
}) {
	const [copiedColor, setCopiedColor] = useState(null);
	const [showOptions, setShowOptions] = useState(false);
	const [showCss, setShowCss] = useState(false);
	const { favorites, addFavoritePalette, removeFavoritePalette } =
		useContext(FavoritesContext);

	const isFavorite = favorites.palettes.some((fav) => fav.id === id);
	const paletteRef = useRef();

	// console.log(palette);

	const handleShowCss = () => {
		setShowCss(true);
	};

	const handleCloseCss = () => {
		setShowCss(false);
	};

	const handleShowOptions = () => {
		setShowOptions(true);
	};

	const handleCloseOptions = () => {
		setShowOptions(false);
	};

	const handleToggleFavorite = () => {
		if (isFavorite) {
			removeFavoritePalette(id);
		} else {
			addFavoritePalette({ id, colors, name });
		}
	};

	const encodePalette = (palette) => {
		const jsonString = JSON.stringify(palette);
		const base64String = btoa(jsonString); // Convert JSON string to Base64
		return encodeURIComponent(base64String); // Make the Base64 string URL-safe
	};

	const encodedPalette = encodePalette({
		id,
		colors,
		name,
	});

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

	const handleCopyPaletteLink = () => {
		navigator.clipboard.writeText(link).then(() => {
			alert("Palette link copied to clipboard!");
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

	const handleShare = (platform) => {
		const encodedUrl = encodeURIComponent(link);
		let shareUrl = "";
		switch (platform) {
			case "twitter":
				shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(
					`Check out this gradient: ${name}`
				)}`;
				break;
			case "linkedin":
				shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
				break;
			case "facebook":
				shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
				break;
			case "whatsapp":
				shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
					`Check out this gradient: ${name} ${link}`
				)}`;
				break;
			default:
				break;
		}
		window.open(shareUrl, "_blank");
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
							<Link
								to={`/palette/${encodedPalette}`}
								className="font-medium">
								{name}
							</Link>
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
							onClick={handleShowOptions}
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

			<AnimatePresence>
				{showOptions && (
					<motion.div
						className="absolute border inset-0 top-0 h-[338px] bg-white-1 bg-opacity-[98%] rounded-lg"
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={variants}
						transition={{ duration: 0.5, ease: "easeInOut" }}>
						<div className="relative w-full border h-full py-8 px-4 rounded-lg shadow-lg flex flex-col gap-4 justify-between">
							<div className="mt-4 text-black-3 font-light px-4">
								<ul className="flex flex-col gap-2 items-start ">
									<li>
										<button
											className="flex gap-[12px] items-center tracking-[-0.5px] hover:text-green-1 transition ease-in-out duration-300 py-1"
											onClick={handleCopyPaletteLink}
											variant={`text`}
											state="default"
											size={"lg"}>
											<CopyIcon />
											Copy palette link
										</button>
									</li>
									<li>
										<button
											onClick={() =>
												window.open(`/gradient/${encodedPalette}`, "_blank")
											}
											className="flex gap-[12px] items-center tracking-[-0.5px] hover:text-green-1 transition ease-in-out duration-300 py-1"
											variant={`text`}
											state="default"
											size={"lg"}>
											<ViewIcon />
											View/Edit palette
										</button>
									</li>
									<li onClick={handleToggleFavorite}>
										{isFavorite ? (
											<button
												className="flex gap-[12px] items-center tracking-[-0.5px] hover:text-green-1 transition ease-in-out duration-300 py-1"
												variant={`text`}
												state="default"
												size={"lg"}>
												<div className="text-red-600">
													<Heart />
												</div>
												Remove from Favorites
											</button>
										) : (
											<button
												className="flex gap-[12px] items-center tracking-[-0.5px] hover:text-green-1 transition ease-in-out duration-300 py-1"
												variant={`text`}
												state="default"
												size={"lg"}>
												<Favorite />
												Add to Favorites
											</button>
										)}
									</li>
								</ul>
								<ul className="mt-3 flex flex-col gap-1 pt-3 border-t w-full border-gray-3/30 items-start">
									<li>
										<Link
											onClick={() => handleShare("x")}
											className="flex gap-[12px] items-center tracking-[-0.5px] hover:text-green-1 transition ease-in-out duration-300 py-1"
											variant={`text`}
											state="default"
											size={"lg"}>
											<XIcon />
											Share on X
										</Link>
									</li>
									<li>
										<button
											onClick={() => handleShare("linkedin")}
											className="flex gap-[12px] items-center tracking-[-0.5px] hover:text-green-1 transition ease-in-out duration-300 py-1"
											variant={`text`}
											state="default"
											size={"lg"}>
											<LinkedIn />
											Share on LinkedIn
										</button>
									</li>
									<li>
										<button
											onClick={() => handleShare("whatsapp")}
											className="flex gap-[12px] items-center tracking-[-0.5px] hover:text-green-1 transition ease-in-out duration-300 py-1"
											variant={`text`}
											state="default"
											size={"lg"}>
											<Whatsapp />
											Share on Whatsapp
										</button>
									</li>
								</ul>
							</div>
							<div
								onClick={handleCloseOptions}
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
