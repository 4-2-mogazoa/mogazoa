import React from "react";

import Input from "../../inputs/Input";
import AuthFormContainer from "./AuthFormContainer";

export default function SignInForm() {
	return (
		<AuthFormContainer>
			<Input inputType="email" />
			<Input inputType="password" />
		</AuthFormContainer>
	);
}
