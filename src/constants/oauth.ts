const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

const GOOGLE_CLIENT_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

export const GOOGLE_AUTH_URL =
	"https://accounts.google.com/o/oauth2/auth?" +
	`client_id=${GOOGLE_CLIENT_KEY}&` +
	`redirect_uri=${REDIRECT_URL}&` +
	"response_type=code&" +
	"scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
