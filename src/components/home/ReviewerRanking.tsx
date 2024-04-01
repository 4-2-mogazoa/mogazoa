import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getUsersRanking } from "@/apis/user";
import ReviewerProfile from "@/components/common/reviewerProfile/ReviewerProfile";
import { UsersRanking } from "@/types/user";

export default function ReviewerRanking() {
  const [rankingData, setRankingData] = useState<UsersRanking[]>([]);

  useEffect(() => {
    const fetchRankingData = async() => {
      try {
        const data = await getUsersRanking();
        setRankingData(data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          alert(`유저 정보를 불러오는 데 실패하였습니다: ${error.response}`);
        }
      }
    };
    fetchRankingData();
  }, []);

  return (
    <div className="mt-[3rem] flex w-[100%] max-w-[35rem] shrink-0 flex-col gap-[2rem] overflow-x-scroll whitespace-nowrap px-[2rem] scrollbar-hide md:ml-[2.5rem] md:mt-[4rem] md:max-w-[53rem] lg:m-0 lg:mt-[4.5rem] lg:w-[25rem] lg:gap-[3rem] lg:border-l lg:border-black-bg lg:px-[3rem]">
      <div className="h-[1.7rem] w-[6.3rem] text-[1.4rem] text-white md:w-[6.9rem] lg:h-[1.9rem] lg:w-[7.4rem] lg:text-[1.6rem] lg:font-normal">리뷰어 랭킹</div>
      <div className="flex flex-row gap-[1.5rem] md:gap-[2rem] lg:flex-col lg:gap-[3rem]">
        {rankingData.map((data, index) => (
          <Link key={index} href={`/user/${data.id}`}>
            <ReviewerProfile key={index} reviewerData={data} />
          </Link>
        ))}
      </div>
    </div>
  );
}
