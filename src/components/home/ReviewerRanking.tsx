import Link from "next/link";

import ReviewerProfile from "@/components/common/reviewerProfile/ReviewerProfile";

const tempRankingData = [
  {
    image: "/images/tempProfileImage1.svg",
    rank: 1,
    nickname: "리뷰왕",
    followersCount: 500,
    reviewCount: 250,
  },
  {
    image: "/images/tempProfileImage2.svg",
    rank: 2,
    nickname: "호박너구리",
    followersCount: 400,
    reviewCount: 200,
  },
  {
    image: "/images/tempProfileImage3.svg",
    rank: 3,
    nickname: "surisuri마수리",
    followersCount: 300,
    reviewCount: 150,
  },
  {
    image: "/images/tempProfileImage4.svg",
    rank: 4,
    nickname: "아바타나비",
    followersCount: 200,
    reviewCount: 100,
  },
  {
    image: "/images/tempProfileImage5.svg",
    rank: 5,
    nickname: "삼다수",
    followersCount: 100,
    reviewCount: 50,
  },
];

export default function ReviewerRanking() {
  return (
    <div className="mt-[3rem] flex w-[100%] max-w-[35rem] shrink-0 flex-col gap-[2rem] overflow-x-scroll whitespace-nowrap px-[2rem] scrollbar-hide md:ml-[2.5rem] md:mt-[4rem] md:max-w-[53rem] lg:m-0 lg:mt-[4.5rem] lg:w-[25rem] lg:gap-[3rem] lg:border-l lg:border-black-bg lg:px-[3rem]">
      <div className="h-[1.7rem] w-[6.3rem] text-[1.4rem] text-white md:w-[6.9rem] lg:h-[1.9rem] lg:w-[7.4rem] lg:text-[1.6rem] lg:font-normal">리뷰어 랭킹</div>
      <div className="flex flex-row gap-[1.5rem] md:gap-[2rem] lg:flex-col lg:gap-[3rem]">
        {tempRankingData.map((data, index) => (
          <Link key={index} href='#'>
            <ReviewerProfile key={index} reviewerData={data} />
          </Link>
        ))}
      </div>
    </div>
  );
}
