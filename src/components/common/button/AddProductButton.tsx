import Image from "next/image";
import { useState } from "react";

import LoginModal from "@/components/common/modal/LoginModal";
import AddProductModal from "@/components/common/modal/product/AddProductModal";

type UserType = {
	id: number;
};

type AddProductButtonProps = {
	user?: UserType;
	selectedCategoryName?: string | null;
}

export default function AddProductButton({ user, selectedCategoryName }: AddProductButtonProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenAddProductModal = () => {
		setIsModalOpen(true);
  };
	return (
		<>
			<button
				className="fixed bottom-[9rem] right-[3rem] rounded-full bg-main-gradient p-[0.5rem] lg:right-[18rem]"
				onClick={handleOpenAddProductModal}
			>
				<span>
					<Image
						src={"/icons/plus.svg"}
						width={40}
						height={40}
						alt="상품 추가 버튼 이미지"
					/>
				</span>
			</button>
			{(isModalOpen && !user) && <LoginModal onClose={() => setIsModalOpen(false)} />}
			{(isModalOpen && user) && <AddProductModal onClose={() => setIsModalOpen(false)} category="음악" />}
		</>
	);
}
