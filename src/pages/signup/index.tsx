import React from "react";

import AuthContainer from "@/components/auth/AuthContainer";
import SignupForm from "@/components/auth/form/SignupForm";

export default function index() {
	return (
		<AuthContainer>
			<SignupForm />
		</AuthContainer>
	);
}
