import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteReview } from "@/apis/review";

type Props = {
	type:
		| "delete"
		| "favorite"
		| "reviewLike"
		| "clipboard"
		| "compare"
		| "fileType";
	closeModal: () => void;
	reviewId?: number;
	productId?: number;
};

export default function ReviewAlertModal({
	type,
	closeModal,
	reviewId,
	productId,
}: Props) {
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: () => deleteReview(reviewId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["review", productId] }),
				queryClient.invalidateQueries({
					queryKey: ["productDetail", productId],
				});
		},
	});

	const mainText = () => {
		switch (type) {
			case "delete":
				return "리뷰를 삭제하시겠습니까 ?";

			case "favorite":
				return "내 상품은 찜 할 수 없어요 !";

			case "reviewLike":
				return "내 리뷰는 추천 할 수 없어요 !";

			case "clipboard":
				return "복사 완료 !";

			case "compare":
				return "상품으로 추가되었어요 !";

			case "fileType":
				return "이미지 파일만 업로드 해주세요 !";

			default:
				return "";
		}
	};

	const handleOnClick = () => {
		if (type === "delete") {
			mutate();
		}
		closeModal();
	};
	return (
		<div className="flex h-[10rem] w-[28rem] items-center justify-center ">
			<div className="flex flex-col items-center gap-[3rem]">
				<span className="text-[2rem] text-[white]">{mainText()}</span>
				<button
					className="w-fit text-[2rem] text-gray-100"
					onClick={handleOnClick}
				>
					확인
				</button>
			</div>
		</div>
	);
}
