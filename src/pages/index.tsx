import { useState } from "react";

import Header from "@/components/common/menu/Header";
import { SideBar } from "@/components/common/menu/SideBar";
import FloatingPlus from "@/components/home/FloatingPlus";
import PopularProduct from "@/components/home/PopularProduct";
import ReviewerRanking from "@/components/home/ReviewerRanking";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

	return (
    <>
    <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
    <div className="w-[100%] min-w-[56rem] bg-[#1c1c22]">
      <SideBar isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-row lg:mx-[18rem] lg:justify-between">
        <div className="hidden lg:flex lg:min-w-[62rem] lg:flex-col lg:gap-[8rem]">
          <PopularProduct type="rating" />
          <PopularProduct type="review" />
        </div>
        <div className="hidden lg:block">
          <ReviewerRanking />
        </div>
        <div className="mx-auto flex w-[38rem] flex-col gap-[6rem] md:w-[60rem] lg:hidden">
          <ReviewerRanking />
          <PopularProduct type="rating" />
          <PopularProduct type="review" />
        </div>
      </div>
      <FloatingPlus />
    </div>
    </>
  );
}
