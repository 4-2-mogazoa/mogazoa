import clsx from "clsx";
import { useState } from "react";

import ProductCard from "@/components/common/productcard/ProductCard";
import SortDropdown from "@/components/home/SortDropdown";
import { BREAK_POINT } from "@/constants/breakPoint";
import useWindowWidth from "@/hooks/common/useWindowWidth";

const tempProductData = [
  {
    id: 1,
    categoryId: 7,
    name: "다이슨 슈퍼소닉 블루",
    image: "/images/supersonic.svg",
    reviewCount: 129,
    favoriteCount: 34,
    rating: 4.7,
    createdAt: "2024-03-19T02:24:31.233Z",
  },
  {
    id: 2,
    categoryId: 7,
    name: "Apple Watch 7",
    image: "/images/appleWatch.svg",
    reviewCount: 4961,
    favoriteCount: 162,
    rating: 3.5,
    createdAt: "2024-03-17T02:24:31.233Z",
  },
  {
    id: 3,
    categoryId: 8,
    name: "헤라 블랙쿠션",
    image: "/images/heraBlack.svg",
    reviewCount: 432,
    favoriteCount: 57,
    rating: 3.9,
    createdAt: "2024-03-18T02:24:31.233Z",
  },
  {
    id: 4,
    categoryId: 9,
    name: "우스티드 울 폴로 셔츠",
    image: "/images/poloShirt.svg",
    reviewCount: 318,
    favoriteCount: 44,
    rating: 4.7,
    createdAt: "2024-03-09T02:24:31.233Z",
  },
  {
    id: 5,
    categoryId: 5,
    name: "돌화분",
    image: "/images/flowerpot.svg",
    reviewCount: 274,
    favoriteCount: 35,
    rating: 4.8,
    createdAt: "2024-03-05T02:24:31.233Z",
  },
  {
    id: 6,
    categoryId: 9,
    name: "아디다스 퍼피렛 코어 블랙",
    image: "/images/adidas.svg",
    reviewCount: 738,
    favoriteCount: 94,
    rating: 2.9,
    createdAt: "2024-03-15T02:24:31.233Z",
  },
  {
    id: 7,
    categoryId: 7,
    name: "Huawei-AI 스피커2",
    image: "/images/speaker.svg",
    reviewCount: 432,
    favoriteCount: 57,
    rating: 5.0,
    createdAt: "2024-02-19T02:24:31.233Z",
  },
  {
    id: 8,
    categoryId: 7,
    name: "Apple TV1",
    image: "/images/appleTv.svg",
    reviewCount: 274,
    favoriteCount: 35,
    rating: 1.9,
    createdAt: "2024-03-01T02:24:31.233Z",
  },
  {
    id: 9,
    categoryId: 7,
    name: "Canon 디지털 카메라",
    image: "/images/camera.svg",
    reviewCount: 5438,
    favoriteCount: 94,
    rating: 2.5,
    createdAt: "2024-03-13T02:24:31.233Z",
  },
]

type ProductListType = {
  type: 'rating' | 'review' | 'category';
  selectedCategoryId?: number | null;
  selectedCategoryName?: string | null;
}

export default function ProductList({ type, selectedCategoryId, selectedCategoryName }: ProductListType) {
  const currentWidth = useWindowWidth();
  const isWrapPoint = BREAK_POINT.md < currentWidth && currentWidth < 1787;

  const [sortOption, setSortOption] = useState(() => {
    switch (type) {
      case 'rating':
        return 'rating';
      case 'review':
        return 'review';
      case 'category':
        return 'category';
    }
  });

  const sortProducts = (products: any[]) => {
    switch (type) {
      case "rating":
        return products.sort((a, b) => b.rating - a.rating);
      case "review":
        return products.sort((a, b) => b.reviewCount - a.reviewCount);
      case "category":
        switch (sortOption) {
          case "최신순":
            return products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          case "별점 높은순":
            return products.sort((a, b) => b.rating - a.rating);
          case "좋아요순":
            return products.sort((a, b) => b.favoriteCount - a.favoriteCount);
          default:
            return products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
      default:
        return products;
    }
  };

  let filteredProducts = selectedCategoryId ? tempProductData.filter(product => product.categoryId === selectedCategoryId) : tempProductData;

  if (!selectedCategoryId) {
    filteredProducts = sortProducts(tempProductData).slice(0, 6);
  }

  return (
    <div className="flex flex-col gap-[3rem] text-[2rem] font-semibold text-white md:max-w-[63rem] lg:mt-[6rem] lg:max-w-[95rem] lg:text-[2.4rem]">
      <div className={clsx('ml-[2rem] w-[100%] md:ml-[4rem] lg:m-0', type === 'category' ? 'flex flex-row justify-between' : '')}>
        {type === 'review' ? '지금 핫한 상품' : type === 'rating' ? '별점이 높은 상품' : `${selectedCategoryName}의 모든 상품`} 
        {type === 'review' ?
        <span className="ml-[1rem] bg-gradient-to-r from-main_blue to-main_indigo bg-clip-text text-transparent">TOP 6</span>
        : ''}
        {type === 'category' ?
        <SortDropdown onSelect={(option) => setSortOption(option)} />
      : ''}
      </div>
      <div className={clsx('ml-[2rem] grid max-w-[34rem] grid-cols-2 gap-[1.5rem] md:ml-[4rem] md:max-w-[52rem]', isWrapPoint ? 'lg:m-0 lg:min-w-[53rem]' : 'lg:m-0 lg:min-w-[95rem] lg:grid-cols-3 lg:gap-[2rem]')}>
        {sortProducts(filteredProducts).map((product) => (
          <div key={product.id} className={clsx(isWrapPoint ? 'w-[25rem] lg:h-[29rem]' :'w-[30rem] lg:h-[29rem]')}>
            <ProductCard
              productName={product.name}
              imageData={product.image}
              reviewCount={product.reviewCount}
              likeCount={product.favoriteCount}
              rate={product.rating}
            />
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="mt-[20rem] text-center text-5xl text-gray-400">
          상품 준비 중<p className="mt-[5rem] text-3xl">더 나은 구성을 위해 상품 준비 중입니다.<br/>조금만 기다려주세요!</p>
        </div>
      )}
    </div>
  );
}
