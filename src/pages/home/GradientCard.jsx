import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Heart from "../../svgs/Heart";
import Code from "../../svgs/Code";
import Download from "../../svgs/Download";
import Options from "../../svgs/Options";
import CloseIcon from "../../svgs/CloseIcon";
import CopyIcon from "../../svgs/CopyIcon";
import ViewIcon from "../../svgs/ViewIcon";
import XIcon from "../../svgs/XIcon";
import Favorite from "../../svgs/Favorite";
import Facebook from "../../svgs/Facebook";
import LinkedIn from "../../svgs/LinkedIn";
import Whatsapp from "../../svgs/Whatsapp";
import { FavoritesContext } from "../../context/FavoritesContext";

const downloadImage = (gradient, width = 1200, height = 800, quality = 1) => {
	const canvas = document.createElement("canvas");
	const dpi = window.devicePixelRatio || 4;
	canvas.width = width * dpi;
	canvas.height = height * dpi;
	const context = canvas.getContext("2d");

	const gradientFill = context.createLinearGradient(
		0,
		0,
		width * dpi,
		height * dpi
	);
	const colorStops = gradient.match(/#[0-9A-F]{6}/gi);
	gradientFill.addColorStop(0, colorStops[0]);
	gradientFill.addColorStop(1, colorStops[1]);

	context.fillStyle = gradientFill;
	context.fillRect(0, 0, width * dpi, height * dpi);

	const link = document.createElement("a");
	link.download = "gradient.png";
	link.href = canvas.toDataURL("image/png", quality);
	link.click();
};

export default function GradientCard({
	gradient,
	colors,
	name,
	angle,
	opacity,
	id,
	link,
	selectedLayout,
	onClick,
}) {
	const [hoverIndex, setHoverIndex] = useState(null);
	const [showCss, setShowCss] = useState(false);
	const [showOptions, setShowOptions] = useState(false);
	const { favorites, addFavoriteGradient, removeFavoriteGradient } =
		useContext(FavoritesContext);

	const isFavorite = favorites.gradients.some((fav) => fav.id === id);

	const handleToggleFavorite = () => {
		if (isFavorite) {
			removeFavoriteGradient(id);
		} else {
			addFavoriteGradient({ id, gradient, colors, name, angle, opacity });
		}
	};

	const encodeGradient = (gradient) => {
		const jsonString = JSON.stringify(gradient);
		const base64String = btoa(jsonString); // Convert JSON string to Base64
		return encodeURIComponent(base64String); // Make the Base64 string URL-safe
	};

	const encodedGradient = encodeGradient({
		id,
		colors,
		angle,
		opacity,
		name,
		gradient,
	});

	const handleMouseEnter = (index) => {
		setHoverIndex(index);
	};

	const handleMouseLeave = () => {
		setHoverIndex(null);
	};

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

	const handleCopyToClipboard = () => {
		const cssCodeElement = document.getElementById("css_code");
		const cssCode = cssCodeElement.innerText;
		navigator.clipboard.writeText(cssCode).then(() => {
			alert("CSS code copied to clipboard!");
		});
	};

	const handleCopyGradientLink = () => {
		navigator.clipboard.writeText(link).then(() => {
			alert("Gradient link copied to clipboard!");
		});
	};

	const cssCode1 = `background: ${colors[0]};`;
	const cssCode2 = `background: -webkit-linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]});`;
	const cssCode3 = `background: linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]});`;

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
			onClick={onClick}
			style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.09)" }}
			className={`relative shadow-md rounded-lg w-full px-[15px]  ${
				selectedLayout === "square"
					? "pt-[15px] pb-[30px] h-[338px]"
					: "py-[30px] h-[354px]"
			}`}>
			{selectedLayout === "square" ? (
				<>
					<div
						id="gradient"
						className="rounded-lg w-full h-[194px] transition-height ease-in-out duration-500"
						style={{ background: gradient }}></div>

					<div>
						<div className="w-full flex mt-2">
							<div className="w-full">
								<Link
									className="font-medium"
									to={`/gradient/${encodedGradient}`}>
									{name}
								</Link>
								<div className="font-light">
									<small
										style={{ color: hoverIndex === 0 ? colors[0] : undefined }}
										onMouseEnter={() => handleMouseEnter(0)}
										onMouseLeave={handleMouseLeave}
										className="text-gray-2 cursor-pointer transition-color">
										{colors[0]}
									</small>
									<small className="text-gray-2 transition-color">
										&rarr;{" "}
									</small>
									<small
										style={{ color: hoverIndex === 1 ? colors[1] : undefined }}
										onMouseEnter={() => handleMouseEnter(1)}
										onMouseLeave={handleMouseLeave}
										className="text-gray-2 cursor-pointer transition-color">
										{colors[1]}
									</small>
									<small className="text-gray-2 transition-color"> at </small>
									<small className="text-gray-2 cursor-pointer">{angle}°</small>
								</div>
							</div>
							<div
								onClick={(e) => {
									e.stopPropagation();
									handleToggleFavorite();
								}}
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

						<div className="flex flex-row mt-4 items-center justify-between">
							<div className="flex flex-row gap-1">
								<div
									className="w-[20px] h-[20px] rounded-md"
									style={{ background: colors[0] }}></div>
								<div
									className="w-[20px] h-[20px] rounded-md"
									style={{ background: colors[1] }}></div>
							</div>

							<div className="text-gray-2 h-auto flex flex-row px-2 py-1 gap-2 border border-gray-3 rounded-full">
								<div
									className="hover:text-black-2 cursor-pointer"
									onClick={handleShowCss}>
									<Code />
								</div>
								<div
									className="hover:text-black-2 cursor-pointer"
									onClick={() => downloadImage(gradient)}>
									<Download />
								</div>
								<div
									onClick={handleShowOptions}
									className="hover:text-black-2 cursor-pointer">
									<Options />
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div
						id="gradient"
						className="rounded-full w-[194px] h-[194px] transition-width ease-in-out duration-500 mx-auto flex items-center justify-center"
						style={{ background: gradient }}></div>

					<div>
						<div className="w-full flex mt-2">
							<div className="w-full flex flex-col items-center">
								<Link
									className="font-medium"
									to={`/gradient/${encodedGradient}`}>
									{name}
								</Link>
								<div className="font-light">
									<small
										style={{ color: hoverIndex === 0 ? colors[0] : undefined }}
										onMouseEnter={() => handleMouseEnter(0)}
										onMouseLeave={handleMouseLeave}
										className="text-gray-2 cursor-pointer transition-color">
										{colors[0]}
									</small>
									<small className="text-gray-2 transition-color">
										&rarr;{" "}
									</small>
									<small
										style={{ color: hoverIndex === 1 ? colors[1] : undefined }}
										onMouseEnter={() => handleMouseEnter(1)}
										onMouseLeave={handleMouseLeave}
										className="text-gray-2 cursor-pointer transition-color">
										{colors[1]}
									</small>
									<small className="text-gray-2 transition-color"> at </small>
									<small className="text-gray-2 cursor-pointer">{angle}°</small>
								</div>
							</div>
						</div>
						<div
							onClick={handleToggleFavorite}
							id="heart"
							className={`absolute top-5 right-5 cursor-pointer h-fit ${
								isFavorite
									? "text-red-600 transition-colors duration-500"
									: "text-gray-3 transition-colors duration-500"
							}`}>
							<Heart />
						</div>

						<div className="flex flex-row mt-4 items-center justify-between">
							<div className="flex flex-row gap-1">
								<div
									className="w-[20px] h-[20px] rounded-md"
									style={{ background: colors[0] }}></div>
								<div
									className="w-[20px] h-[20px] rounded-md"
									style={{ background: colors[1] }}></div>
							</div>

							<div className="text-gray-2 h-auto flex flex-row px-2 py-1 gap-2 border border-gray-3 rounded-full">
								<div
									className="hover:text-black-2 cursor-pointer"
									onClick={handleShowCss}>
									<Code />
								</div>
								<div
									className="hover:text-black-2 cursor-pointer"
									onClick={() => downloadImage(gradient)}>
									<Download />
								</div>
								<div
									onClick={handleShowOptions}
									className="hover:text-black-2 cursor-pointer">
									<Options />
								</div>
							</div>
						</div>
					</div>
				</>
			)}

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
									<pre className="flex text-[12px]">{cssCode2}</pre>
									<pre className="flex text-[12px] text-gray-2/70">
										/* Chrome 10-25, Safari 5.1-6 */
									</pre>
								</div>
								<pre className="flex text-[12px]">{cssCode3}</pre>
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
						className="absolute border inset-0 top-0 h-[338px] bg-white-1 bg-opacity-[95.5%] rounded-lg"
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
											onClick={handleCopyGradientLink}
											variant={`text`}
											state="default"
											size={"lg"}>
											<CopyIcon />
											Copy gradient link
										</button>
									</li>
									<li>
										<button
											onClick={() =>
												window.open(`/gradient/${encodedGradient}`, "_blank")
											}
											className="flex gap-[12px] items-center tracking-[-0.5px] hover:text-green-1 transition ease-in-out duration-300 py-1"
											variant={`text`}
											state="default"
											size={"lg"}>
											<ViewIcon />
											View/Edit gradient
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
