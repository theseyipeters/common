import React from "react";
import gplay from "../../assets/g-play.svg";
import appstore from "../../assets/app-store.svg";

export default function CTA() {
	return (
		<section className="bg-green-3 h-fit py-[100px] text-white-1 px-[20px] md:px-[50px] lg:px-[150px] font-outfit">
			<div className="flex flex-col gap-5 lg:gap-10 items-center justify-center text-center">
				<p>Ready to bring your vision to life?</p>
				<h3 className="font-bold text-[40px] leading-[40px] md:text-[50px] lg:text-[50px]">
					Join over 50K creators now.
				</h3>
				<div className="flex flex-row gap-3">
					<img
						src={gplay}
						alt=""
					/>
					<img
						src={appstore}
						alt=""
					/>
				</div>
			</div>
		</section>
	);
}
