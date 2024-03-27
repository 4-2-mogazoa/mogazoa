import React from "react";

import AuthContainer from "@/components/auth/AuthContainer";
import OAuthSignupForm from "@/components/auth/form/OAuthSignupForm";

export default function index() {
	return (
		<AuthContainer>
			<OAuthSignupForm />
		</AuthContainer>
	);
}
