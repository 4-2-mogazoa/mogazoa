import React from "react";

import AuthContainer from "@/components/auth/AuthContainer";
import SignupForm from "@/components/auth/form/SignupForm";
import withLogin from "@/components/auth/withLogin";

export default withLogin(function index() {
	return (
		<AuthContainer>
			<SignupForm />
		</AuthContainer>
	);
});
