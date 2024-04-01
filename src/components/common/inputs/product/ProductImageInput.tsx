import Image from 'next/image';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';

type ProductImageInputProps = {
  type: 'add' | 'edit';
  setImageUrlProp: Dispatch<SetStateAction<string>>;
  imageUrl: string;
}

export default function ProductImageInput ({ type, setImageUrlProp, imageUrl }: ProductImageInputProps) {
  const [image, setImage] = useState<File | null>(null);
  const [localImageUrl, setLocalImageUrl] = useState<string>("");

  const addPhotoIconSrc = "/icons/add_photo.svg";
  const closeIconSrc = "/icons/close.svg";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrlProp(URL.createObjectURL(file));
      if(type === 'add') {
        setLocalImageUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleCloseButtonClick = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setImageUrlProp("");
    if (type === 'add') {
      setLocalImageUrl("");
    }
  };

  return (
    <label
      htmlFor="fileInput"
      className={`relative flex size-[13.5rem] lg:size-[16rem] ${image ? "cursor-default" : "cursor-pointer"} items-center justify-center overflow-hidden rounded-lg border border-[#353542] bg-[#252530]`}
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
        {localImageUrl && (
          <>
            <Image src={localImageUrl} alt="Preview" fill />
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
        {!(imageUrl || localImageUrl) && (
          <div className="relative size-[2.5rem]">
            <Image src={addPhotoIconSrc} alt="add_photo_icon" fill />
          </div>
        )}
      </div>
      {!(imageUrl || localImageUrl) && (
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
}
