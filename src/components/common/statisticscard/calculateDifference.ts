type decriptionType = {
	higher: string;
	lower: string;
	same: string;
};

export default function calculateDifference(
	productData: number | undefined,
	avgData: number | undefined,
	bottomDecription: decriptionType,
) {
	const isHigher = (productData || 0) > (avgData || 0);
	const isLower = (avgData || 0) > (productData || 0);
	const isSame = productData === avgData;
	const rateDiff = (
		isHigher
			? (productData || 0) - (avgData || 0)
			: (avgData || 0) - (productData || 0)
	).toFixed(1);
	const likeReviewDiff = Math.ceil(
		isHigher
			? (productData || 0) - (avgData || 0)
			: (avgData || 0) - (productData || 0),
	);
	const topDescription = isSame
		? "같은 카테고리의 제품들과"
		: "같은 카테고리의 제품들보다";

	const bottomDescriptionResult = isHigher
		? bottomDecription.higher
		: isLower
			? bottomDecription.lower
			: bottomDecription.same;
	return {
		isSame,
		rateDiff,
		likeReviewDiff,
		topDescription,
		bottomDescriptionResult,
	};
}
