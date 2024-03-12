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
    <div className="mx-[2rem] mt-[3rem] flex flex-col gap-[2rem] overflow-x-scroll whitespace-nowrap scrollbar-hide md:ml-[2.5rem] md:mt-[4rem] lg:ml-0 lg:mr-[18rem] lg:w-[25rem] lg:gap-[3rem] lg:border-l lg:border-black-bg lg:px-[3rem]">
      <div className="h-[1.7rem] w-[6.5rem] text-[1.4rem] text-white md:w-[6.9rem] lg:h-[1.9rem] lg:w-[7.4rem] lg:text-[1.6rem] lg:font-normal">리뷰어 랭킹</div>
      <div className="flex flex-row gap-[1.5rem] md:gap-[2rem] lg:flex-col lg:gap-[3rem]">
        {tempRankingData.map((data, index) => (
          <ReviewerProfile key={index} reviewerData={data} />
        ))}
      </div>
    </div>
  );
}
