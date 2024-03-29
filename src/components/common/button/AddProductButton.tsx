import Image from "next/image";

import LoginModal from "@/components/common/modal/LoginModal";
import AddProductModal from "@/components/common/modal/product/AddProductModal";
import { useModalActions } from "@/store/modal";


type AddProductButtonProps = {
  user?: number;
};

export default function AddProductButton({ user }:AddProductButtonProps) {
	const { openModal, closeModal } = useModalActions();

	const handleOpenAddProductModal = () => {
		if (!user) {
			const modal = openModal(<LoginModal closeModal={() => closeModal(modal)} />);
		} else {
			const modal = openModal(<AddProductModal type="add" closeModal={() => closeModal(modal)} />)
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
