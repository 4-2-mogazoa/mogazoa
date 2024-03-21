import { cva, VariantProps } from "class-variance-authority";

import { WinningProduct } from "@/types/compare";

type Props = {
	winningProduct: WinningProduct;
};

export default function FinalResultDescription({ winningProduct }: Props) {
	const { name, numberOfWins, tagColor } = winningProduct;

	const isTie = name === "무승부";

	const tagColorClassName = `text-${tagColor}`;

	return (
		<div className="_flex-col-center gap-[2rem]">
			<p className="text-center text-[2rem] font-semibold leading-[2.8rem] text-white lg:text-[2.4rem] lg:leading-normal">
				<span className={tagColorClassName}>{`${name} `}</span>
				{isTie ? (
					<span>입니다.</span>
				) : (
					<span>
						상품이 <br className="lg:hidden" />
						승리하였습니다!
					</span>
				)}
			</p>
			{!isTie && (
				<p className="text-[1.2rem] text-gray-100 lg:text-[1.6rem]">
					3가지 항목 중 <span>{numberOfWins}</span>가지 항목에서 우세합니다.
				</p>
			)}
		</div>
	);
}
