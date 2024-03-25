import { useRouter } from "next/router";
import React, { ComponentType, useEffect } from "react";

import getCookies from "@/utils/getCookies";

const withLogin = (WrappedComponent: ComponentType) => {
	const RedirectComponent = ({ props }: { props: any }) => {
		const router = useRouter();

		useEffect(() => {
			if (getCookies().accessToken) {
				router.push("/");
			}
		}, [router]);

		return <WrappedComponent {...props} />;
	};

	return RedirectComponent;
};

export default withLogin;
