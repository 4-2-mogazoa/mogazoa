import React from "react";

import AuthContainer from "@/components/auth/AuthContainer";
import SignInForm from "@/components/auth/form/SignInForm";
import withLogin from "@/components/auth/withLogin";

export default withLogin(function index() {
	return (
		<AuthContainer>
			<SignInForm />
		</AuthContainer>
	);
});
