import { useEffect, useState } from "react";

import DetailCard from "./DetailCard";
import { productDetailData } from "./MockData";

export default function ProductDetail() {
	const [cookieid, setCookieId] = useState<number>(0);

	useEffect(() => {
		const cookies = Object.fromEntries(
			document.cookie.split(";").map((cookie) => cookie.trim().split("=")),
		);
		setCookieId(Number(cookies["id"]));
	}, []);
	//TODO: 쿠키는 아마도 기능구현때 store에서 관리

	return (
		<div className="w-full lg:w-[94rem]">
			<DetailCard
				productData={productDetailData}
				isMyProduct={productDetailData.writerId === cookieid}
			/>
		</div>
	);
}
