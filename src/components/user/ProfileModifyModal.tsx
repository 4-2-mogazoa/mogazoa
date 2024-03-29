import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import { patchUpdateMe } from "@/apis/user";
import BasicButton from "@/components/common/button/BasicButton";
import AddImageBox from "@/components/common/inputs/AddImageBox";
import TextBox from "@/components/common/inputs/TextBox";
import { UserDetail } from "@/types/user";

type Props = {
	user: UserDetail;
	closeModal: () => void;
};

export default function ProfileModifyModal({ user, closeModal }: Props) {
	const queryClient = useQueryClient();
	const textBoxRef = useRef<HTMLTextAreaElement>(null);
	const {
		register,
		formState: { errors: formError },
		handleSubmit,
	} = useForm({
		mode: "onBlur",
		defaultValues: {
			nickname: user.nickname,
		},
	});

	const userInfoMutation = useMutation({
		mutationFn: ({
			nickname,
			description,
			// image,
		}: {
			nickname: string;
			description: string;
			// image?: string;
		}) => patchUpdateMe({ nickname, description }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["me"] });
		},
	});

	const onSubmit = (data: { nickname: string }) => {
		const description = textBoxRef.current?.value || "";
		const formData = {
			nickname: data.nickname,
			description,
		};

		userInfoMutation.mutate(formData);
		closeModal();
	};

	return (
		<div className="flex flex-col gap-[2rem] md:gap-[4rem]">
			<h3 className="text-[2rem] font-semibold text-white">프로필 편집</h3>
			<form
				className="flex min-w-[25.5rem] flex-col gap-[1rem] md:min-w-[51rem] md:gap-[2rem]"
				onSubmit={handleSubmit(onSubmit)}
			>
				<AddImageBox />
				<div className="flex flex-col gap-[0.5rem] md:gap-[1rem]">
					<input
						className="rounded-[0.8rem] bg-black-bg px-[2rem] py-[1.7rem] text-[1.4rem] text-white outline outline-black-border placeholder:text-[1.4rem] placeholder:text-gray-200 focus:outline-[#5097FA] md:py-[1.95rem] lg:py-[2.3rem] lg:text-[1.6rem] placeholder:lg:text-[1.6rem]"
						placeholder="닉네임을 입력해 주세요"
						{...register("nickname", {
							required: "닉네임은 필수 입력입니다.",
							maxLength: {
								value: 10,
								message: "닉네임은 최대 10자까지 가능합니다.",
							},
						})}
					/>
					{formError["nickname"] && (
						<p className={`text-[1.2rem] text-red lg:text-[1.4rem]`}>
							{formError["nickname"].message}
						</p>
					)}
				</div>
				<TextBox
					ref={textBoxRef}
					placeholder="설명을 입력해 주세요"
					maxLength={300}
					defaultValue={user.description}
				/>
				<BasicButton
					label="저장하기"
					variant={"primary"}
					type="submit"
					className="mt-[2rem]"
					disabled={!!formError["nickname"]}
				/>
			</form>
		</div>
	);
}
