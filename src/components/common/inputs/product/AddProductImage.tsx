import Image from 'next/image';
import { Dispatch, MouseEvent,SetStateAction, useState } from 'react';

type AddProductImageProps = {
  setImageUrlProp: Dispatch<SetStateAction<string>>;
}

export default function AddProductImage({ setImageUrlProp }: AddProductImageProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const addPhotoIconSrc = "/icons/add_photo.svg";
	const closeIconSrc = "/icons/close.svg";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      setImageUrlProp(URL.createObjectURL(file || ""));
    }
  };

  const handleCloseButtonClick = (e: MouseEvent<HTMLImageElement>) => {
		e.preventDefault();
    setImageUrl("");
	};

  return (
    <label
			htmlFor="fileInput"
			className={`relative flex size-[13.5rem] lg:size-[16rem] ${imageUrl ? "cursor-default" : "cursor-pointer"} items-center justify-center overflow-hidden rounded-lg border border-[#353542] bg-[#252530]`}
		>
      <div className="flex items-center justify-center">
        {imageUrl && (
          <>
            <Image src={imageUrl} alt="Preview" fill />
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
        {!imageUrl && (
					<div className="relative size-[2.5rem]">
						<Image src={addPhotoIconSrc} alt="add_photo_icon" fill />
					</div>
				)}
      </div>
      {imageUrl ? null : (
        <input
          type="file"
          id="fileInput"
          onChange={handleImageChange}
          className="hidden"
          accept="image/jpeg, image/png, image/jpg"
        />
      )}
    </label>
  );
};
