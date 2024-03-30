import { useRouter } from "next/router";

import BasicButton from "../common/button/BasicButton";

type Props = {
	description: string;
	closeModal: () => void;
	url: string;
};

export default function MovingPageModal({
	description,
	closeModal,
	url,
}: Props) {
	const router = useRouter();

	const handleButtonClick = () => {
		closeModal();
		router.push(url);
	};

	// Q: 1줄짜리 , 2줄짜리 설명을 모두 받고 싶어서 이렇게 했는데, 너무 억지스러운가?..yes..어떻게 할까?
	const descriptionText = description.split(". ");

	return (
		<form className="_flex-col-center w-[29.5rem] gap-12 md:w-[50rem] md:gap-[4.5rem] lg:gap-16">
			<div className="_flex-col-center text-[2rem] font-semibold leading-[2.8rem] text-white lg:text-[2.4rem] lg:leading-normal">
				{descriptionText.length > 1 ? (
					<>
						<p>{`${descriptionText[0]}.`}</p>
						<p>{`${descriptionText[1]}`}</p>
					</>
				) : (
					<>{description}</>
				)}
			</div>
			<BasicButton
				variant="primary"
				label="확인"
				onClick={handleButtonClick}
				className="w-full"
			/>
		</form>
	);
}
