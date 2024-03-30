import MovingPageModal from "@/components/common/modal/MovingPageModal";
import { useModalActions } from "@/store/modal";

export default function useSigninModal() {
	const { openModal, closeModal } = useModalActions();

	const modalId = openModal(
		<MovingPageModal
			description="로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
			closeModal={() => closeModal(modalId)}
			url="/signin"
		/>,
	);
}
