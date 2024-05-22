import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import RefreshIcon from "../../svgs/RefreshIcon";
import GradientCard from "./GradientCard";

const coolWords = [
	"Radiant",
	"Ethereal",
	"Vivid",
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
	"",
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
	"Laħq",
	"Sekoita",
	"Swirl",
	"Mélanger",
];

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
	};
};

export default function GradientsSection() {
	const [gradients, setGradients] = useState([]);

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
		<section className="h-screen px-[20px] md:px-[50px] lg:px-[150px] font-outfit">
			<div>
				<div className="flex flex-row items-center justify-between py-1">
					<h2 className="font-semibold text-xl flex items-center gap-2">
						Explore gradients.{" "}
						<Link
							to={"/"}
							className="font-normal text-base text-green-1">
							See all
						</Link>
					</h2>

					<div className="flex flex-row items-center gap-2">
						<button className="cursor-pointer w-[20px] h-[20px] rounded-md bg-green-1 border border-green-1">
							{""}
						</button>
						<button className="cursor-pointer w-[20px] h-[20px] rounded-full bg-green-1 border border-green-1">
							{""}
						</button>
						<div className="border-b-2 border-green-1">
							<Button
								onClick={refreshGradients}
								className={`flex flex-row gap-2 items-center `}
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
					{gradients.map((gradientObj, index) => (
						<GradientCard
							key={index}
							gradient={gradientObj.gradient}
							colors={gradientObj.colors}
							name={gradientObj.name}
							angle={gradientObj.angle}
							opacity={gradientObj.opacity}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
