import { ImageData } from "@/components/common/inputs/AddImageBox";

import instance from "./axiosInstance";

type image = {
	url: string;
};

export async function getImageURL(file: File | undefined) {
	const res = await instance.post<image>(
		"images/upload",
		{
			image: file,
		},
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		},
	);

	return res.data;
}
