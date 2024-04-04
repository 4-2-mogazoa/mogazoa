import { IncomingMessage } from "http";

export default function getAccessTokenFromReq(req: IncomingMessage): string {
	const cookies = req.headers.cookie || "";
	return (
		cookies
			.split(";")
			.map((cookie) => cookie.trim().split("="))
			.filter(([name]) => name === "accessToken")
			.map(([_, value]) => value)[0] || ""
	);
}
