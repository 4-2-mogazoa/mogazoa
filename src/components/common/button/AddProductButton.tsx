import Image from "next/image";

import LoginModal from "@/components/common/modal/LoginModal";
import { useModalActions } from "@/store/modal";

type UserType = {
	id: number;
};

type AddProductButtonProps = {
  user?: UserType;
};

export default function AddProductButton({ user }:AddProductButtonProps) {
	const { openModal, closeModal } = useModalActions();

	const handleOpenAddProductModal = () => {
		// 모달 열기
		if (!user) {
			const modal = openModal(<LoginModal closeModal={() => closeModal(modal)} />);
		} else {
			console.log('non modal required');
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
		</>
	);
}
