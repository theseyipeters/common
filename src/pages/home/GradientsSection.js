import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import RefreshIcon from "../../svgs/RefreshIcon";
import GradientCard from "./GradientCard";
import { v4 as uuidv4 } from "uuid";
import { FavoritesContext } from "../../context/FavoritesContext";
import GradientModal from "../../components/modals/GradientModal";

const coolWords = [
	"Radiant",
	"Ethereal",
	"Vivid",
	"Conceal",
	"Luminous",
	"Mystic",
	"Dynamic",
	"Sleek",
	"Chill",
	"Frost",
	"Breeze",
	"Glacier",
	"Icy",
	"Crystal",
	"Azure",
	"Sapphire",
	"Frosty",
	"Serenity",
	"Tranquil",
	"Crisp",
	"Fresh",
	"Frostbite",
	"Arctic",
	"Blizzard",
	"Gelid",
	"Nordic",
	"Polar",
	"Glacial",
	"Frosting",
	"Aurora",
	"Brisk",
	"Minty",
	"Pristine",
	"Gusty",
	"Alpine",
	"Boreal",
	"Freeze",
	"Frosting",
	"Glittering",
	"Slick",
	"Quicksilver",
	"Pebble",
	"Cascade",
	"Ripple",
	"Bubbling",
	"Sparkling",
	"Glimmering",
	"Shimmering",
	"Iridescent",
	"Crystalline",
	"Nebula",
	"Frosty",
	"Fizzy",
	"Glistening",
	"Soda",
	"Effervescent",
	"Frostbite",
	"Snowy",
	"Snowflake",
	"Chilly",
	"Iceberg",
	"Frostbite",
	"Popsicle",
	"Glitter",
	"Coolant",
	"Mint",
	"Glaze",
	"Shine",
	"Icicle",
	"Hail",
	"Frigid",
	"Polaris",
	"Galaxy",
	"Frozen",
	"Ice",
	"Frost",
	"Glittery",
	"Dew",
	"Glisten",
	"Quench",
	"Crystallize",
	"Glaze",
	"Gel",
	"Crispy",
	"Frosting",
	"Shiver",
	"Aurora",
	"Gleaming",
	"Shiny",
	"Glow",
	"Chill",
	"Frosty",
	"Glacial",
	"Polar",
	"Iceberg",
	"Breeze",
	"Minty",
	"Icy",
	"Frozen",
	"Shimmer",
	"Chill",
	"Glaze",
	"Sleek",
	"Glittering",
	"Luminous",
	"Crystal",
	"Sapphire",
	"Frosty",
	"Pebble",
	"Ripple",
	"Cascade",
];

const mixWords = [
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"Sepia",
	"Blend",
	"Mix",
	"Fusion",
	"Combo",
	"Combine",
	"Merge",
	"Knead",
	"Whisk",
	"Shuffle",
	"Intermix",
	"Meld",
	"Fuse",
	"Synthesize",
	"Sync",
	"Stir",
	"Mengen",
	"Beat",
	"Blanda",
	"Blandning",
	"Kombinera",
	"Mezclar",
	"Mezcla",
	"Mescolare",
	"Blande",
	"Bland",
	"Blande",
	"Bland",
	"Mikse",
	"Blande",
	"Flette",
	"Samle",
	"Forene",
	"Mischiare",
	"Mescolare",
	"Miscelare",
	"Mash",
	"Mesh",
	"Muddle",
	"Alloy",
	"Segada",
	"Jaukt",
	"Lahq",
	"Sekoita",
	"Swirl",
	"Mélanger",
];

const encodeGradient = (gradient) => {
	const jsonString = JSON.stringify(gradient);
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
const generateRandomAngle = () => {
	return Math.floor(Math.random() * 360); // Random angle between 0 and 359
};

const generateRandomOpacity = () => {
	return Math.random().toFixed(2); // Random opacity between 0 and 1 with two decimal places
};

const generateGradient = () => {
	const id = uuidv4();
	const color1 = generateRandomColor();
	const color2 = generateRandomColor();
	const angle = generateRandomAngle();
	const opacity = generateRandomOpacity();
	const randomCoolWord =
		coolWords[Math.floor(Math.random() * coolWords.length)];
	const randomMixWord = mixWords[Math.floor(Math.random() * mixWords.length)];
	return {
		gradient: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
		colors: [color1, color2],
		name: `${randomCoolWord} ${randomMixWord}`,
		angle: angle,
		opacity: opacity,
		id: id,
	};
};

export default function GradientsSection() {
	const [gradients, setGradients] = useState([]);
	const { addFavoriteGradient } = useContext(FavoritesContext);
	const [selectedLayout, setSelectedLayout] = useState("square");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedGradient, setSelectedGradient] = useState(null);

	const handleLayoutChange = (event) => {
		setSelectedLayout(event.target.value);
	};

	const handleCardClick = (gradient) => {
		setSelectedGradient(gradient);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedGradient(null);
	};

	const refreshGradients = () => {
		const newGradients = [];
		for (let i = 0; i < 6; i++) {
			newGradients.push(generateGradient());
		}
		setGradients(newGradients);
	};

	useEffect(() => {
		refreshGradients();
	}, []);

	return (
		<section className="h-fit px-[20px] md:px-[50px] lg:px-[150px] font-outfit">
			<div>
				<div className="flex flex-col lg:flex-row gap-3 items-center justify-between py-1">
					<h2 className="w-full lg:w-fit font-semibold text-xl flex items-center justify-between gap-2">
						Explore gradients.{" "}
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
								onClick={refreshGradients}
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
					{gradients.map((gradientObj, index) => {
						const encodedGradient = encodeGradient(gradientObj);
						return (
							<GradientCard
								selectedLayout={selectedLayout}
								key={index}
								id={gradientObj.id}
								gradient={gradientObj.gradient}
								colors={gradientObj.colors}
								name={gradientObj.name}
								angle={gradientObj.angle}
								opacity={gradientObj.opacity}
								link={`localhost:3000/gradient/${encodedGradient}`}
								onFavorite={() => addFavoriteGradient(gradientObj)}
								onClick={() => handleCardClick(gradientObj)}
							/>
						);
					})}
				</div>

				<div className="mt-16 flex flex-col gap-3 items-center justify-center">
					<p>Need more gradients?</p>

					<Button
						className={`max-w-56`}
						variant={`primary`}
						size={`md`}
						state={"default"}>
						See all gradients
					</Button>
				</div>
			</div>

			<GradientModal
				isOpen={isModalOpen}
				onClose={closeModal}
				gradient={selectedGradient}
			/>
		</section>
	);
}
