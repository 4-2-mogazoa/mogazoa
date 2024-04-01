import { useRouter } from "next/router";

import BasicButton from "../button/BasicButton";

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

	const descriptionText = description.split(". ");

	return (
		<form className="_flex-col-center w-[29.5rem] gap-12 md:w-[50rem] md:gap-16">
			<div className="_flex-col-center gap-4 text-[2rem] font-semibold leading-[2.8rem] text-white lg:gap-6 lg:text-[2.4rem] lg:leading-normal">
				{descriptionText.length > 1 ? (
					<>
						<p>{`${descriptionText[0]}.`}</p>
						<p className="text-[1.6rem] font-medium lg:text-[2rem]">{`${descriptionText[1]}`}</p>
					</>
				) : (
					<>{description}</>
				)}
			</div>
			<BasicButton variant="primary" label="확인" onClick={handleButtonClick} />
		</form>
	);
}
