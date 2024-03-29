import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="ko">
			<Head />
			<body>
				<Main />
				<div id="modal-root"></div>
				<NextScript />
			</body>
		</Html>
	);
}