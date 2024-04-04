import { motion } from "framer-motion";
import Image from "next/image";

import MovingPageModal from "@/components/common/modal/MovingPageModal";
import ProductModal from "@/components/common/modal/product/ProductModal";
import { useModalActions } from "@/store/modal";

type AddProductButtonProps = {
	isLoggedIn?: boolean;
};

export default function AddProductButton({
	isLoggedIn,
}: AddProductButtonProps) {
	const { openModal, closeModal } = useModalActions();

	const handleOpenAddProductModal = () => {
		if (!isLoggedIn) {
			const modal = openModal(
				<MovingPageModal
					description="로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
					closeModal={() => closeModal(modal)}
					url="/signin"
				/>,
			);
		} else {
			const modal = openModal(
				<ProductModal type="add" closeModal={() => closeModal(modal)} />,
			);
		}
	};
	return (
		<>
			<motion.button
				className="fixed bottom-[9rem] right-[3rem] rounded-full bg-main-gradient p-[0.5rem] lg:right-[18rem]"
				onClick={handleOpenAddProductModal}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<span>
					<Image
						src={"/icons/plus.svg"}
						width={40}
						height={40}
						alt="상품 추가 버튼 이미지"
					/>
				</span>
			</motion.button>
		</>
	);
}
