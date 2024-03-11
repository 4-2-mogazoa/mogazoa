import React from "react";

import AuthContainer from "@/components/common/auth/AuthContainer";
import SignInForm from "@/components/common/auth/form/SignInForm";

export default function index() {
	return (
		<AuthContainer>
			<SignInForm />
		</AuthContainer>
	);
}
