import Header from "@/components/common/menu/Header";
import { SideBar } from "@/components/common/menu/SideBar";
import ReviewerRanking from "@/components/home/ReviewerRanking";

export default function Home() {
	return (
		<div className="bg-[#1c1c22]">
			<Header />
			<div className="flex flex-row justify-between lg:pl-[18rem]">
				<SideBar />
				<ReviewerRanking />
			</div>
		</div>
	);
}
