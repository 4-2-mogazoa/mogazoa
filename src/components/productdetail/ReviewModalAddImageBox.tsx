import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { useModalActions } from "@/store/modal";

import ReviewAlertModal from "./ReviewAlertModal";

export type ImageData = {
	id?: string;
	data?: File | undefined;
	preview?: string | null;
	ref: React.RefObject<HTMLInputElement>;
};

export type ImageType = {
	id: string | undefined;
	image: string;
	ref?: React.RefObject<HTMLInputElement>;
};

type Props = {
	type: "create" | "modify";
	editorData: ImageData[];
	setEditorData: Dispatch<SetStateAction<ImageData[]>>;
	previousImage: ImageType[];
	setPreviousImage: Dispatch<SetStateAction<ImageType[]>>;
	setImage: Dispatch<SetStateAction<ImageType[]>>;
	setTrigger: Dispatch<SetStateAction<number>>;
	setEditImageId: Dispatch<SetStateAction<string | undefined>>;
};

export default function ReviewModalAddImageBox({
	type,
	editorData,
	setEditorData,
	previousImage,
	setPreviousImage,
	setImage,
	setTrigger,
	setEditImageId,
}: Props) {
	const fileRef = useRef<HTMLInputElement>(null);

	const addPhotoIconSrc = "/icons/add_photo.svg";
	const closeIconSrc = "/icons/close.svg";
	const { openModal, closeModal } = useModalActions();

	const handleUploadFile = () => {
		const fileImg = fileRef?.current?.files?.[0];

		if (fileImg) {
			if (!fileImg.type.startsWith("image/")) {
				const fileTypealert = openModal(
					<ReviewAlertModal
						closeModal={() => closeModal(fileTypealert)}
						type="fileType"
					/>,
					{
						isCloseClickOutside: true,
						isCloseESC: true,
					},
				);
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

			if (fileRef.current) {
				fileRef.current.value = "";
			}
		}
	};

	const handlePreviousUploadFile = (
		id: string | undefined,
		ref: React.RefObject<HTMLInputElement>,
	) => {
		const fileImg = ref?.current?.files?.[0];
		if (fileImg) {
			if (!fileImg.type.startsWith("image/")) {
				const fileTypealert = openModal(
					<ReviewAlertModal
						closeModal={() => closeModal(fileTypealert)}
						type="fileType"
					/>,
					{
						isCloseClickOutside: true,
						isCloseESC: true,
					},
				);
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
				setPreviousImage((prevState) =>
					prevState.filter((data) => data.id !== id),
				);
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
				const fileTypealert = openModal(
					<ReviewAlertModal
						closeModal={() => closeModal(fileTypealert)}
						type="fileType"
					/>,
					{
						isCloseClickOutside: true,
						isCloseESC: true,
					},
				);
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
				setEditImageId(id);
				setTrigger((prev) => prev + 1);
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
		setPreviousImage((prevState) => prevState.filter((data) => data.id !== id));
		fileRef === null;
	};

	return (
		<div className="flex items-center gap-[1rem] md:gap-[1.5rem] lg:gap-[2rem]">
			{editorData.length + previousImage.length < 3 && (
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
			{type === "modify" &&
				previousImage.map((data) => (
					<label
						key={data.id}
						className="relative flex size-[13.5rem] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-[#353542] bg-[#252530] lg:size-[16rem]"
						htmlFor={`previousfileModify-${data.id}`}
					>
						<Image src={data.image} alt="photo_preview" layout="fill" />
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
							id={`previousfileModify-${data.id}`}
							className="hidden "
							ref={data.ref}
							onChange={() =>
								data.ref && handlePreviousUploadFile(data.id, data.ref)
							}
						/>
					</label>
				))}
		</div>
	);
}
