import Image from "next/image";

export default function AddProductButton() {
	const handleOpenAddProductModal = () => {
		// TODO: 상품 추가 모달 열기
	};
	return (
		<button className="fixed bottom-[9rem] right-[3rem] rounded-full bg-main-gradient lg:right-[18rem]">
			<span>
				<Image
					src={"/icons/plus.svg"}
					width={40}
					height={40}
					alt="상품 추가 버튼 이미지"
				/>
			</span>
		</button>
	);
}
