import { ProductDetail } from "@/types/product";
import {
	getWinningProduct,
	getWinningProductIdForEachProperty,
} from "@/utils/compare";

import EachResultLayout from "./EachResultLayout";
import FinalResultDescription from "./FinalResultDescription";

type Props = {
	firstProduct: ProductDetail;
	secondProduct: ProductDetail;
};

export default function Result({ firstProduct, secondProduct }: Props) {
	const winningProductIdForEachProperty = getWinningProductIdForEachProperty(
		firstProduct,
		secondProduct,
	);

	const winningProduct = getWinningProduct(firstProduct, secondProduct);

	return (
		<div className="_flex-col-center gap-16">
			<FinalResultDescription winningProduct={winningProduct} />
			<div>
				<EachResultLayout>
					<EachResultLayout.Image product={firstProduct} />
					<EachResultLayout.Image product={secondProduct} />
				</EachResultLayout>
				<div className="my-2 lg:my-4">
					<EachResultLayout>
						<EachResultLayout.Link product={firstProduct} />
						<EachResultLayout.Link product={secondProduct} />
					</EachResultLayout>
				</div>
				<div className="my-4 lg:my-8">
					<EachResultLayout title="제품 설명">
						<EachResultLayout.Title product={firstProduct} />
						<EachResultLayout.Title product={secondProduct} />
					</EachResultLayout>
				</div>
				<EachResultLayout title="별점">
					<EachResultLayout.Result
						property="rating"
						product={firstProduct}
						winningProductIdForEachProperty={winningProductIdForEachProperty}
						color="green"
					/>
					<EachResultLayout.Result
						property="rating"
						product={secondProduct}
						winningProductIdForEachProperty={winningProductIdForEachProperty}
						color="pink"
					/>
				</EachResultLayout>
				<EachResultLayout title="찜 개수">
					<EachResultLayout.Result
						property="favoriteCount"
						product={firstProduct}
						winningProductIdForEachProperty={winningProductIdForEachProperty}
						color="green"
					/>
					<EachResultLayout.Result
						property="favoriteCount"
						product={secondProduct}
						winningProductIdForEachProperty={winningProductIdForEachProperty}
						color="pink"
					/>
				</EachResultLayout>
				<EachResultLayout title="리뷰 개수">
					<EachResultLayout.Result
						property="reviewCount"
						product={firstProduct}
						winningProductIdForEachProperty={winningProductIdForEachProperty}
						color="green"
					/>
					<EachResultLayout.Result
						property="reviewCount"
						product={secondProduct}
						winningProductIdForEachProperty={winningProductIdForEachProperty}
						color="pink"
					/>
				</EachResultLayout>
			</div>
		</div>
	);
}
