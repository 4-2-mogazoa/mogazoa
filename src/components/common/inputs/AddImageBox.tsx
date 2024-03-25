import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { image } from "@/components/productdetail/ReviewModal";

export type ImageData = {
	id?: string;
	data?: File | undefined;
	preview?: string | null;
	ref: React.RefObject<HTMLInputElement>;
};

type Props = {
	editorData: ImageData[];
	setEditorData: Dispatch<SetStateAction<ImageData[]>>;
	setImage: Dispatch<SetStateAction<image[]>>;
};

export default function AddImageBox({
	editorData,
	setEditorData,
	setImage,
}: Props) {
	const fileRef = useRef<HTMLInputElement>(null);

	const addPhotoIconSrc = "/icons/add_photo.svg";
	const closeIconSrc = "/icons/close.svg";

	const handleUploadFile = () => {
		const fileImg = fileRef?.current?.files?.[0];
		if (fileImg) {
			if (!fileImg.type.startsWith("image/")) {
				alert("이미지 파일만 업로드 해주세요!");
				return;
			}
			const newImageData = { id: uuidv4(), data: fileImg };
			const reader = new FileReader();
			reader.readAsDataURL(fileImg);
			reader.onloadend = () => {
				setEditorData((prevState) => [
					...prevState,
					{
						...newImageData,
						preview: reader.result as string,
						ref: React.createRef(),
					},
				]);
				setImage((prevState) => [
					...prevState,
					{
						id: newImageData.id,
						image: "",
					},
				]);
			};
		}
	};

	const handleModifyFile = (
		id: string | undefined,
		ref: React.RefObject<HTMLInputElement>,
	) => {
		const fileImg = ref?.current?.files?.[0];
		if (fileImg) {
			if (!fileImg.type.startsWith("image/")) {
				alert("이미지 파일만 업로드 해주세요!");
				return;
			}
			const reader = new FileReader();
			reader.readAsDataURL(fileImg);
			reader.onloadend = () => {
				setEditorData((prevState) =>
					prevState.map((imgData) =>
						imgData.id === id
							? {
									...imgData,
									data: fileImg,
									preview: reader.result as string,
								}
							: imgData,
					),
				);
				setImage((prevState) => [
					...prevState,
					{
						id: id,
						image: "",
					},
				]);
			};
		}
	};

	const handleCloseButtonClick = (
		id: string | undefined,
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		e.preventDefault();
		setEditorData((prevState) => prevState.filter((data) => data.id !== id));
		setImage((prevState) => prevState.filter((data) => data.id !== id));
	};

	return (
		<div className="flex items-center gap-[1rem] overflow-x-scroll md:gap-[1.5rem] lg:gap-[2rem]">
			{editorData.length < 3 && (
				<label
					htmlFor="fileInput"
					className={
						"relative flex size-[13.5rem] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-[#353542] bg-[#252530] lg:size-[16rem]"
					}
				>
					<div className="flex items-center justify-center ">
						<div className="relative size-[2.5rem]">
							<Image src={addPhotoIconSrc} alt="add_photo_icon" layout="fill" />
						</div>
					</div>
					<input
						type="file"
						id="fileInput"
						className="hidden "
						ref={fileRef}
						onChange={handleUploadFile}
					/>
				</label>
			)}
			{editorData.map((data) => (
				<label
					className="relative flex size-[13.5rem] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-[#353542] bg-[#252530] lg:size-[16rem]"
					key={data.id}
					htmlFor={`fileModify-${data.id}`}
				>
					{data.preview && (
						<Image src={data.preview} alt="photo_preview" layout="fill" />
					)}
					<div className="absolute right-[0.5rem] top-[0.5rem] size-[2.6rem] rounded-xl bg-[#000000]/50 lg:size-[2.8rem]">
						<Image
							src={closeIconSrc}
							alt="close"
							layout="fill"
							className="size-[1.8rem] cursor-pointer p-[0.4rem] lg:size-[2rem]"
							onClick={(e) => handleCloseButtonClick(data.id, e)}
						/>
					</div>
					<input
						type="file"
						id={`fileModify-${data.id}`}
						className="hidden "
						ref={data.ref}
						onChange={() => handleModifyFile(data.id, data.ref)}
					/>
				</label>
			))}
		</div>
	);
}
