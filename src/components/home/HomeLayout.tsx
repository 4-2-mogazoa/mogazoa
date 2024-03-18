import clsx from "clsx";
import { useState } from "react";

import Header from "@/components/common/menu/Header";
import { SideBar } from "@/components/common/menu/SideBar";
import FloatingPlus from "@/components/home/FloatingPlus";
import ProductList from "@/components/home/ProductList";
import ReviewerRanking from "@/components/home/ReviewerRanking";
import { BREAK_POINT } from "@/constants/breakPoint";
import useWindowWidth from "@/hooks/common/useWindowWidth";

export default function HomeLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const currentWidth = useWindowWidth();
  const isWrapPoint = BREAK_POINT.md < currentWidth && currentWidth < 1523;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

	return (
    <>
    <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
    <div className="w-[100%] min-w-[56rem] bg-[#1c1c22] pb-[10rem]">
      <div className={clsx('flex flex-row', isWrapPoint ? 'lg:mx-[10rem]' : 'lg:mx-[18rem]')}>
        <SideBar isSidebarOpen={isSidebarOpen} />
        <div className="hidden lg:mx-auto lg:flex lg:flex-col">
          <ProductList type="rating" />
          <ProductList type="review" />
        </div>
        <div className="hidden lg:block">
          <ReviewerRanking />
        </div>
        <div className="mx-auto flex w-[38rem] flex-col gap-[6rem] md:w-[60rem] lg:hidden">
          <ReviewerRanking />
          <ProductList type="rating" />
          <ProductList type="review" />
        </div>
      </div>
      <FloatingPlus />
    </div>
    </>
  );
}
