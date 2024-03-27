import CompareForm from "@/components/compare/CompareForm";
import Loading from "@/components/compare/Loading";
import Result from "@/components/compare/Result";
import useCompareQueries from "@/hooks/compare/useCompareQueries";

export default function Index() {
	const {
		products: { firstProduct, secondProduct },
	} = useCompareQueries();

	return (
		<div className="h-full min-h-screen bg-[#1c1c22]">
			<div className="_flex-col-center mx-8 gap-24 pb-16 pt-12 md:mx-12 md:max-w-[94rem] md:pb-40 md:pt-16 lg:mx-auto lg:w-[94rem] lg:gap-32 lg:pt-24">
				<CompareForm />
				<div>
					{firstProduct && secondProduct ? (
						<Result firstProduct={firstProduct} secondProduct={secondProduct} />
					) : (
						<div className="mt-28 md:mt-72">
							<Loading />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
