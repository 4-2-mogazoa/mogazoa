import React from "react";

import AuthContainer from "@/components/auth/AuthContainer";
import SignInForm from "@/components/auth/form/SignInForm";

export default function index() {
	return (
		<AuthContainer>
			<SignInForm />
		</AuthContainer>
	);
}
