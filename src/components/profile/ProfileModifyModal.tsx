import BasicButton from "@/components/common/button/BasicButton";
import AddImageBox from "@/components/common/inputs/AddImageBox";
import TextBox from "@/components/common/inputs/TextBox";
import { UserDetail } from "@/types/user";

type Props = {
	user: UserDetail;
	closeModal: () => void;
};

export default function ProfileModifyModal({ user, closeModal }: Props) {
	const handleSubmit = () => {
		// TODO: 변경 내용 서버에 보내기
		closeModal();
	};

	return (
		<div className="flex flex-col gap-[2rem] md:gap-[4rem]">
			<h3 className="text-[2rem] font-semibold text-white">프로필 편집</h3>
			<form className="flex min-w-[25.5rem] flex-col gap-[1rem] md:min-w-[51rem] md:gap-[2rem]">
				<AddImageBox />
				<input
					className="rounded-[0.8rem] bg-black-bg px-[2rem] py-[1.7rem] text-[1.4rem] text-white outline outline-black-border placeholder:text-[1.4rem] placeholder:text-gray-200 focus:outline-[#5097FA] md:py-[1.95rem] lg:py-[2.3rem] lg:text-[1.6rem] placeholder:lg:text-[1.6rem]"
					placeholder="닉네임을 입력해 주세요"
					defaultValue={user.nickname}
				/>
				<TextBox placeholder="설명을 입력해 주세요" maxLength={500} />
			</form>
			<BasicButton
				label="저장하기"
				variant={"primary"}
				onClick={handleSubmit}
			/>
		</div>
	);
}
