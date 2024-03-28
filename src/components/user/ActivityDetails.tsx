import ActivityCard from "@/components/common/activitycard/ActivityCard";
import { CategoryList } from "@/types/common";
import { UserDetail } from "@/types/user";

type Props = {
	user: UserDetail;
};

export default function ActivityDetails({ user }: Props) {
	return (
		<section className="flex flex-col gap-[3rem]">
			<h2 className="text-[1.8rem] font-semibold text-white lg:text-[2rem]">
				활동 내역
			</h2>
			<div className="flex gap-[1rem] lg:gap-[2rem]">
				<ActivityCard
					myRateAvg={Math.round(user?.averageRating * 10) / 10}
					type="rate"
				/>
				<ActivityCard myReivewCount={user?.reviewCount} type="review" />
				<ActivityCard
					category={user?.mostFavoriteCategory?.name as CategoryList}
					type="category"
				/>
			</div>
		</section>
	);
}
