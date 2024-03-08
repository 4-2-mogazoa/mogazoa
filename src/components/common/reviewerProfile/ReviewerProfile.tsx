import Counts from "../counts/Counts";
import Nickname from "../nickname/Nickname";
import ProfileImage from "../profileImage/ProfileImage";
import Ranking from "../ranking/Ranking";

type ReviewerData = {
	image: string;
	rank: number;
	nickname: string;
	followersCount: number;
	reviewCount: number;
};

type Props = {
	reviewerData: ReviewerData;
};

export default function ReviewerProfile({ reviewerData }: Props) {
	const { image, rank, nickname, followersCount, reviewCount } = reviewerData;

	return (
		<div className="_flex-center w-fit gap-4">
			<ProfileImage size="small" src={image} />
			<div className="flex flex-col gap-2 lg:gap-4">
				<div className="flex gap-2">
					<Ranking rank={rank} />
					<Nickname size="small" nickname={nickname} />
				</div>
				<Counts>
					<Counts.Count size="small" text="팔로워" count={followersCount} />
					<Counts.Count size="small" text="리뷰" count={reviewCount} />
				</Counts>
			</div>
		</div>
	);
}
