import React from "react";
import Button from "../../components/ui/Button";
import designer from "../../assets/designer.svg";

export default function Illuminate() {
	return (
		<section className="h-fit py-[50px] bg-white-2 px-[20px] md:px-[50px] lg:px-[150px] font-outfit">
			<div className="flex flex-row w-full gap-5 items-center justify-between ">
				<aside className="w-1/2 flex flex-col gap-3">
					<h3 className="font-alata text-5xl tracking-[-3px]">
						Illuminate your imagination with{" "}
						<span className="textGradient">Common.</span>{" "}
					</h3>

					<p className="text-black-2 font-light">
						Explore and Create awesome gradients and palettes.
					</p>

					<div className="w-4/5 flex flex-row items-center justify-center  gap-4">
						<Button
							variant={"outlined"}
							state="default"
							className={`max-w-48`}
							size={"lg"}>
							Explore
						</Button>

						<Button
							variant={"primary"}
							state="default"
							size={"lg"}>
							Generate color palettes
						</Button>
					</div>
				</aside>
				<aside>
					<img
						src={designer}
						alt=""
					/>
				</aside>
			</div>
		</section>
	);
}
