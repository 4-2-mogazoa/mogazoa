import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteReview } from "@/apis/review";

type Props = {
	closeModal: () => void;
	reviewId: number;
	productId: number;
};

export default function ReviewDeleteModal({
	closeModal,
	reviewId,
	productId,
}: Props) {
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: () => deleteReview(reviewId),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["review", productId] }),
	});

	const handleOnClick = () => {
		mutate();
		closeModal();
	};
	return (
		<div className="flex h-[10rem] w-[25rem] items-center justify-center ">
			<div className="flex flex-col items-center gap-[3rem]">
				<span className="text-[2rem] text-[white]">
					정말 삭제 하시겠습니까?
				</span>
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
