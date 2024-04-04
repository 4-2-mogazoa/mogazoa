import instance from "./axiosInstance";

export const postUploadImage = async (imageFile: File | null) => {
	if (!imageFile) {
		throw new Error("이미지 파일은 반드시 필요합니다.");
	}
	const formData = new FormData();
	formData.append("image", imageFile);

	const response = await instance.post<{ url: string }>(
		"images/upload",
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		},
	);
	return response.data;
};
