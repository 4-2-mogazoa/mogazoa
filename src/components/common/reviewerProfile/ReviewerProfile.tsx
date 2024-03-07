import Counts from "../counts/Counts";
import ProfileImage from "../profileImage/ProfileImage";

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
					{/* todo: 랭킹 컴포넌트 머지 후 반영 */}
					<span>{rank}등</span>
					{/* todo: 닉네임 컴포넌트 머지 후 반영 */}
					<p>{nickname}</p>
				</div>
				<Counts>
					<Counts.Count size="small" text="팔로워" count={followersCount} />
					<Counts.Count size="small" text="리뷰" count={reviewCount} />
				</Counts>
			</div>
		</div>
	);
}
