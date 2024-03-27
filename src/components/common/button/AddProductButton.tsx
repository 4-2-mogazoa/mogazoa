import Image from "next/image";
import { useState } from "react";

import LoginModal from "../modal/LoginModal";

type UserType = {
	id: number;
};

type AddProductButtonProps = {
  user?: UserType;
};

export default function AddProductButton({ user }:AddProductButtonProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달을 열도록 하는 함수입니다.
  const handleOpenAddProductModal = () => {
		if(!user) {
			setIsModalOpen(true);
		}
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
		{isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
		</>
	);
}
