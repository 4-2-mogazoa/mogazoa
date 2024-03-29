import {
	CompareProperty,
	ResultOfComparison,
	WinningProduct,
} from "@/types/compare";
import { ProductDetail } from "@/types/product";

/**
 * 파라미터로 전달받은 제품 2개를 정해진 속성들에 대해서 어떤 제품이 더 큰 값을 가지고 있는지 비교하는 함수
 * @param firstProduct 비교 상품 1
 * @param secondProduct 비교 상품 2
 * @returns 정해진 속성들을 key로 하고, 정해진 속성마다 더 큰 값을 가지고 있는 상품의 id를 value로 하는 객체를 반환
 */
export function getWinningProductIdForEachProperty(
	firstProduct: ProductDetail,
	secondProduct: ProductDetail,
) {
	const winningProductIdForEachProperty: ResultOfComparison = {
		rating: 0,
		reviewCount: 0,
		favoriteCount: 0,
	};

	const propertiesToCompare: CompareProperty[] = [
		"rating",
		"reviewCount",
		"favoriteCount",
	];

	propertiesToCompare.forEach((property) => {
		const id = winningIdForEachProperty(firstProduct, secondProduct, property);

		id && (winningProductIdForEachProperty[property] = id);
	});

	return winningProductIdForEachProperty;
}

function winningIdForEachProperty(
	firstProduct: ProductDetail,
	secondProduct: ProductDetail,
	property: "rating" | "reviewCount" | "favoriteCount",
) {
	if (firstProduct[property] === secondProduct[property]) {
		return;
	}

	if (firstProduct[property] > secondProduct[property]) {
		return firstProduct.id;
	} else {
		return secondProduct.id;
	}
}

/**
 * 최종적으로 이긴 제품이 무엇인지 구하는 함수
 * @param firstProduct 비교 상품 1
 * @param secondProduct 비교 상품 2
 * @returns 인자로 받은 제품 중, 최종적으로 이긴 제품의 이름과 몇 개의 분야에서 이겼는지, 이긴 상품이름을 어떤 색상으로 표시할 것인지를 객체로 리턴
 */
export function getWinningProduct(
	firstProduct: ProductDetail,
	secondProduct: ProductDetail,
) {
	const resultOfComparison = getWinningProductIdForEachProperty(
		firstProduct,
		secondProduct,
	);

	const numberOfWinningForEachProduct = {
		[firstProduct.id]: 0,
		[secondProduct.id]: 0,
	};

	for (let [property, winningId] of Object.entries(resultOfComparison)) {
		winningId && numberOfWinningForEachProduct[winningId]++;
	}

	const winningProduct: WinningProduct = {
		name: "무승부",
		numberOfWins: 0,
		tagColor: "white",
	};

	const winningCountOfFirstProduct =
		numberOfWinningForEachProduct[firstProduct.id];
	const winningCountOfSecondProduct =
		numberOfWinningForEachProduct[secondProduct.id];

	if (winningCountOfFirstProduct === winningCountOfSecondProduct) {
		return winningProduct;
	}

	if (winningCountOfFirstProduct > winningCountOfSecondProduct) {
		winningProduct.name = firstProduct.name;
		winningProduct.numberOfWins = winningCountOfFirstProduct;
		winningProduct.tagColor = "green";
	} else {
		winningProduct.name = secondProduct.name;
		winningProduct.numberOfWins = winningCountOfSecondProduct;
		winningProduct.tagColor = "pink";
	}

	return winningProduct;
}
