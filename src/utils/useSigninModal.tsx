import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/apis/user";
import MovingPageModal from "@/components/common/modal/MovingPageModal";
import { moveModalText } from "@/constants/modalText";
import { useModalActions } from "@/store/modal";
import getCookies from "@/utils/getCookies";

export default function OpenSigninModal() {
	const { openModal, closeModal } = useModalActions();

	const { isFetching, isError } = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe(),
		retry: 0,
	});

	const openSigninModal = () => {
		const modalId = openModal(
			<MovingPageModal
				description={moveModalText.signin}
				closeModal={() => closeModal(modalId)}
				url="/signin"
			/>,
		);
	};

	if (!isFetching && isError) {
		if (getCookies().accessToken) {
			document.cookie =
				"accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		}
		return openSigninModal;
	}
}
