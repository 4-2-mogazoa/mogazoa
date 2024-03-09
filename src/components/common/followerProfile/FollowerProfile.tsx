import Nickname from "../nickname/Nickname";
import ProfileImage from "../profileImage/ProfileImage";

type Props = {
	image: string;
	nickname: string;
};

export default function FollowerProfile({ image, nickname }: Props) {
	return (
		<div className="_flex-center w-fit gap-8">
			<ProfileImage size="medium" src={image} />
			<Nickname size="large" nickname={nickname} />
		</div>
	);
}
