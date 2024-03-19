import Image from "next/image";

import ReviewModalMain from "./ReviewModalMain";

type Props = {
	type: "create" | "modify";
};

export default function ReviewModalLayout({ type }: Props) {
	const closeIconSrc = "/icons/close.svg";
	return (
		<div className="relative flex h-[53.8rem] w-[33.5rem] flex-col rounded-[1.6rem] border bg-[#1C1C22] md:h-[63.2rem] md:w-[59rem] lg:h-[69.8rem] lg:w-[62rem]">
			<button className="absolute right-[2rem] top-[2rem]">
				<div className="relative size-[2.4rem] md:size-[3.6rem] lg:size-[4rem]">
					<Image src={closeIconSrc} alt="close" fill className="object-cover" />
				</div>
			</button>
			<ReviewModalMain type={type} />
		</div>
	);
}
