/** 이메일 정규표현식 */
const emailPattern: RegExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

/** 비밀번호 정규표현식 */
const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/;

export { emailPattern, passwordPattern };
