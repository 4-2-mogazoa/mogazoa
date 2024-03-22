import clsx from "clsx";
import { useEffect,useState } from "react";

import AddProductButton from "@/components/common/button/AddProductButton";
import Header from "@/components/common/menu/Header";
import { SideBar } from "@/components/common/menu/SideBar";
import ProductList from "@/components/home/ProductList";
import ReviewerRanking from "@/components/home/ReviewerRanking";
import { BREAK_POINT } from "@/constants/breakPoint";
import useWindowWidth from "@/hooks/common/useWindowWidth";

export default function HomeLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const currentWidth = useWindowWidth();
  const [isWrapPoint, setIsWrapPoint] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleCategorySelect = (categoryId: number | null, categoryName: string | null) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
  };

  useEffect(() => {
    setIsWrapPoint(BREAK_POINT.md < currentWidth && currentWidth < 1787);
    setIsOverflow(currentWidth < 360);
  }, [currentWidth]);

  return (
    <div className="h-screen bg-[#1c1c22]">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="w-[100%] overflow-auto bg-[#1c1c22] pb-[10rem]">
        <div className={clsx('flex flex-row', isWrapPoint ? 'lg:mx-[5rem]' : 'lg:mx-[18rem]')}>
          <SideBar isSidebarOpen={isSidebarOpen} onCategorySelect={handleCategorySelect} />
          <div className="hidden lg:mx-auto lg:flex lg:flex-col">
            {!selectedCategoryId && (
              <>
                <ProductList type="review" />
                <ProductList type="rating" />
              </>
            )}
            {selectedCategoryId && (
              <ProductList type="category" selectedCategoryId={selectedCategoryId} selectedCategoryName={selectedCategoryName} />
            )}
          </div>
          <div className="hidden lg:block">
            <ReviewerRanking />
          </div>
          <div className={clsx('flex flex-col gap-[6rem] md:w-[60rem] lg:hidden', isOverflow ? 'w-[100%]' : 'mx-auto')}>
            <ReviewerRanking />
            {!selectedCategoryId && (
              <>
                <ProductList type="review" />
                <ProductList type="rating" />
              </>
            )}
            {selectedCategoryId && (
              <ProductList type="category" selectedCategoryId={selectedCategoryId} selectedCategoryName={selectedCategoryName} />
            )}
          </div>
        </div>
        <AddProductButton />
      </div>
    </div>
  );
}
