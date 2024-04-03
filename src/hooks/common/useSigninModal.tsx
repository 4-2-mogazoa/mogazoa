import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";

import { getMe } from "@/apis/user";
import MovingPageModal from "@/components/common/modal/MovingPageModal";
import { useModalActions } from "@/store/modal";
import { moveModalText } from "@/utils/modalText";

export default function IsneededSigninModal(accessToken: string) {
	const { openModal, closeModal } = useModalActions();

	const { data: myData, isFetching } = useQuery({
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

	if (!isFetching && !myData && !accessToken) {
		return openSigninModal;
	}
}
