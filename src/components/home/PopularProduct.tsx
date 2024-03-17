import ProductCard from "@/components/common/productcard/ProductCard";

const tempPopularData = [
  {
    id: 1,
    name: "다이슨 슈퍼소닉 블루",
    image: "/images/supersonic.svg",
    reviewCount: 129,
    favoriteCount: 34,
    rating: 4.7,
  },
  {
    id: 2,
    name: "Apple Watch 7",
    image: "/images/appleWatch.svg",
    reviewCount: 4961,
    favoriteCount: 162,
    rating: 4.9,
  },
  {
    id: 3,
    name: "헤라 블랙쿠션",
    image: "/images/heraBlack.svg",
    reviewCount: 432,
    favoriteCount: 57,
    rating: 4.9,
  },
  {
    id: 4,
    name: "우스티드 울 폴로 셔츠",
    image: "/images/poloShirt.svg",
    reviewCount: 318,
    favoriteCount: 44,
    rating: 4.7,
  },
  {
    id: 5,
    name: "돌화분",
    image: "/images/flowerpot.svg",
    reviewCount: 274,
    favoriteCount: 35,
    rating: 4.9,
  },
  {
    id: 6,
    name: "아디다스 퍼피렛 코어 블랙",
    image: "/images/adidas.svg",
    reviewCount: 738,
    favoriteCount: 94,
    rating: 4.9,
  },
]

type PopularProductType = {
  type: 'rating' | 'review'
}

export default function PopularProduct({type}: PopularProductType) {
  return (
    <div className="flex flex-col gap-[3rem] text-[2rem] font-semibold text-white md:max-w-[63rem] lg:mt-[6rem] lg:max-w-[95rem] lg:text-[2.4rem]">
      <div className="ml-[2rem] w-[100%] md:ml-[4rem] lg:m-0">
        {type === 'rating' ? '지금 핫한 상품' : '별점이 높은 상품'} 
        {type === 'rating' ?
        <span className="ml-[1rem] bg-gradient-to-r from-main_blue to-main_indigo bg-clip-text text-transparent">TOP 6</span>
        : ''}
      </div>
      <div className="flex flex-wrap justify-center gap-[2rem]">
      {tempPopularData.map((product) => (
        <div key={product.id}>
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
    </div>
  );
}
