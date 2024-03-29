import Image from "next/image";
import React, { useRef, useState } from "react";

type EditorDataType = {
	file?: string | null;
};

type AddImageBoxProps = {
	onImageSelect?: (imageUrl: string) => void;
}

export default function AddImageBox({ onImageSelect }: AddImageBoxProps) {
	const [editorData, setEditorData] = useState<EditorDataType>({ file: null });
	const fileRef = useRef<HTMLInputElement>(null);
	const addPhotoIconSrc = "/icons/add_photo.svg";
	const closeIconSrc = "/icons/close.svg";

	const handleUploadFile = () => {
		const fileImg = fileRef?.current?.files?.[0];
		if (fileImg) {
			const reader = new FileReader();
			reader.readAsDataURL(fileImg);
			reader.onloadend = () => {
				setEditorData({ file: reader.result as string });
				onImageSelect && onImageSelect(reader.result as string);
			};
		}
	};

	const handleCloseButtonClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		e.preventDefault();
		setEditorData({ file: null });
	};

	console.log(editorData);

	return (
		<label
			htmlFor="fileInput"
			className={`relative flex size-[13.5rem] lg:size-[16rem] ${editorData.file ? "cursor-default" : "cursor-pointer"} items-center justify-center overflow-hidden rounded-lg border border-[#353542] bg-[#252530]`}
		>
			<div className="flex items-center justify-center ">
				{editorData.file && (
					<>
						<Image src={editorData.file} alt="photo_preview" layout="fill" />
						<div className="absolute right-[0.5rem] top-[0.5rem] size-[2.6rem] rounded-xl bg-[#000000]/50 lg:size-[2.8rem]">
							<Image
								src={closeIconSrc}
								alt="close"
								layout="fill"
								className="size-[1.8rem] cursor-pointer p-[0.4rem] lg:size-[2rem]"
								onClick={handleCloseButtonClick}
							/>
						</div>
					</>
				)}
				{!editorData.file && (
					<div className="relative size-[2.5rem]">
						<Image src={addPhotoIconSrc} alt="add_photo_icon" layout="fill" />
					</div>
				)}
			</div>
			{editorData.file ? (
				""
			) : (
				<input
					type="file"
					id="fileInput"
					className="hidden "
					ref={fileRef}
					onChange={handleUploadFile}
				/>
			)}
		</label>
	);
}
