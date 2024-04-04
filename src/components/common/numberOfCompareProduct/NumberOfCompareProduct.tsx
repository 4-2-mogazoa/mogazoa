import useCompareStore from "@/store/compare";

export default function NumberOfCompareProduct() {
	const { numberOfProducts } = useCompareStore((state) => state);

	return (
		<>
			{numberOfProducts ? (
				<span className="_flex-center absolute -top-3 left-20 size-7 rounded-full bg-main_indigo/70 p-2 text-[1rem] text-white lg:left-[5.8rem] lg:size-8 lg:text-[1.2rem]">
					{numberOfProducts}
				</span>
			) : (
				<></>
			)}
		</>
	);
}
