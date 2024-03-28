import CompareForm from "@/components/compare/CompareForm";
import useCompareQueries from "@/hooks/compare/useCompareQueries";

export default function Index() {
	const {
		products: { firstProduct, secondProduct },
	} = useCompareQueries();

	return (
		<div className="h-screen bg-[#1c1c22]">
			<CompareForm />
			<div>
				{/* todo: 결과 테이블 UI 구현 */}
				<p>{firstProduct?.name}</p>
				<p>{secondProduct?.name}</p>
			</div>
		</div>
	);
}
