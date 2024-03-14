import ActivityCard from "@/components/common/activitycard/ActivityCard";

export default function ActivityDetails() {
	return (
		<section className="flex flex-col gap-[3rem]">
			<h2 className="text-[1.8rem] font-semibold text-white lg:text-[2rem]">
				활동 내역
			</h2>
			<div className="flex gap-[1rem] lg:gap-[2rem]">
				<ActivityCard myRateAvg={4.1} type="rate" />
				<ActivityCard myReivewCount={125} type="review" />
				<ActivityCard category={"전자기기"} type="category" />
			</div>
		</section>
	);
}
