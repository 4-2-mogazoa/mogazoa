import Image from "next/image";
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";

type Props = {
	previewImage: string | null;
	setPreviewImage: Dispatch<SetStateAction<string | null>>;
	setNextImage: Dispatch<SetStateAction<File | null>>;
};

export default function AddImageBox({
	previewImage,
	setPreviewImage,
	setNextImage,
}: Props) {
	const addPhotoIconSrc = "/icons/add_photo.svg";
	const closeIconSrc = "/icons/close.svg";

	const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) {
			return;
		}

		const fileImg = e.target.files[0];
		setNextImage(fileImg);

		const reader = new FileReader();
		reader.readAsDataURL(fileImg);
		reader.onloadend = () => {
			setPreviewImage(reader.result as string);
		};
	};

	const handleCloseButtonClick = (e: MouseEvent<HTMLImageElement>) => {
		e.preventDefault();
		setNextImage(null);
		setPreviewImage(null);
	};

	return (
		<label
			htmlFor="fileInput"
			className={`relative flex size-[13.5rem] lg:size-[16rem] ${previewImage ? "cursor-default" : "cursor-pointer"} items-center justify-center overflow-hidden rounded-lg border border-[#353542] bg-[#252530]`}
		>
			<div className="flex items-center justify-center">
				{previewImage && (
					<>
						<Image src={previewImage} alt="photo_preview" fill />
						<div className="absolute right-[0.5rem] top-[0.5rem] size-[2.6rem] rounded-xl bg-[#000000]/50 lg:size-[2.8rem]">
							<Image
								src={closeIconSrc}
								alt="close"
								fill
								className="size-[1.8rem] cursor-pointer p-[0.4rem] lg:size-[2rem]"
								onClick={handleCloseButtonClick}
							/>
						</div>
					</>
				)}
				{!previewImage && (
					<div className="relative size-[2.5rem]">
						<Image src={addPhotoIconSrc} alt="add_photo_icon" fill />
					</div>
				)}
			</div>
			{previewImage ? null : (
				<input
					type="file"
					id="fileInput"
					className="hidden "
					onChange={handleUploadFile}
					accept="image/jpeg, image/png, image/jpg"
				/>
			)}
		</label>
	);
}
