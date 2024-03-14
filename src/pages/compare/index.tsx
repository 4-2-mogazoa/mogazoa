import { useQuery } from "@tanstack/react-query";

import getProducts from "@/apis/products/getProducts";
import useCompareStore from "@/store/compare";

export default function ComparePage() {
	const { products, addProducts, deleteProducts, changeProducts } =
		useCompareStore((state) => state);

	// todo: 쿼리 키 어떤 형태로 작성할지 성원님과 의논
	const { data: firstProducts } = useQuery({
		queryKey: ["products", products[0]["id"]],
		queryFn: () => getProducts(products[0]["id"]),
	});

	const { data: secondProducts } = useQuery({
		queryKey: ["products", products[1]["id"]],
		queryFn: () => getProducts(products[1]["id"]),
	});

	return <div></div>;
}
