import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

declare global {
	interface Window {
		Kakao: any;
	}
}

export default function Document() {
	return (
		<Html lang="ko">
			<Head>
				<Script
					src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js"
					integrity="sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01"
					crossOrigin="anonymous"
					strategy="afterInteractive"
				></Script>
			</Head>
			<body>
				<Main />
				<div id="modal-root"></div>
				<NextScript />
			</body>
		</Html>
	);
}
