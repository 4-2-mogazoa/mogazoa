import ProfileImage from "../profileImage/ProfileImage";

type Props = {
	image: string;
	nickname: string;
};

export default function FollowerProfile({ image, nickname }: Props) {
	return (
		<div className="_flex-center w-fit gap-8">
			<ProfileImage size="medium" src={image} />
			{/* todo: 닉네임 컴포넌트 머지 후 반영 예정 */}
			<p>{nickname}</p>
		</div>
	);
}
