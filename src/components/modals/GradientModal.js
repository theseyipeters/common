import React from "react";
import CloseIcon from "../../svgs/CloseIcon";
import CloseIconLg from "../../svgs/CloseIconLg";
import Code from "../../svgs/Code";
import Download from "../../svgs/Download";
import Options from "../../svgs/Options";
import Button from "../ui/Button";

const GradientModal = ({ isOpen, onClose, gradient }) => {
	if (!isOpen) return null;

	console.log(gradient);

	return (
		<div className="modal w-full ">
			<div
				onClick={onClose}
				className="modal-overlay"></div>
			<div className="modal-container relative bg-white-2 px-[150px] w-full h-full overflow-scroll">
				<div className="flex flex-col items-center justify-center mx-auto w-3/4 py-[90px]">
					<button
						className="flex self-end"
						onClick={onClose}>
						<CloseIconLg />
					</button>

					<div className="w-full">
						<p className="text-left text-xl">About this gradient.</p>
						<div
							className="h-[400px] w-full rounded-xl mt-4 overflow-hidden flex"
							style={{ background: gradient.gradient }}>
							<div className="bg-black-1/30 text-white-1 h-[100px] w-full flex items-center justify-between mt-auto  py-3 px-5">
								<div>
									<h4 className="text-xl font-medium">{gradient.name}</h4>
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
						<div className="w-full mt-5 flex flex-row items-start justify-between">
							<div className="w-full">
								<div className="w-full">
									<div className="w-full flex items-start justify-between">
										<h1 className="text-[40px] tracking-[-2.5px]">
											{gradient.name}
										</h1>

										<div className="flex flex-row gap-3 items-center">
											<div
												className="w-[50px] h-[50px] rounded-full"
												style={{ background: gradient.colors[0] }}></div>

											<div
												className="w-[50px] h-[50px] rounded-full"
												style={{ background: gradient.colors[1] }}></div>
										</div>
									</div>

									<div className="flex flex-row items-end justify-between w-full mt-10">
										<div className=" text-black-2/80 flex flex-col gap-10 text-base">
											<p className="font-light">
												{gradient.colors[0]} &rarr; {gradient.colors[1]}{" "}
											</p>
											<p className="font-light">
												Angle &rarr; {gradient.angle}°
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GradientModal;
