"use client"

import { getImagePath } from "@/utils";
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image";
import { useState, useEffect } from "react";
import { TbPhotoPlus } from "react-icons/tb"

const ImageUpload = ({image} : {image: string | undefined}) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (image) {
            setImageUrl(getImagePath(image));
        }
    }, [image]);

    return (
        <CldUploadWidget 
            uploadPreset="quiosco-next" 
            options={{maxFiles: 1}}
            onSuccess={(result, {widget}) => {
                if(result.event === "success") {
                    //@ts-expect-error The type of result.info is not defined in the types
                    // but it contains the secure_url property
                    setImageUrl(result.info.secure_url);
                    widget.close();
                }
            }}
        >
            {({open}) => (
                <>
                    <div className="space-y-2">
                        <label htmlFor="" className="text-slate-800">Imagen Producto</label>
                        <div 
                            className="relative cursor-pointer hover:opcaity-70 transition p-10 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600 bg-slate-100"
                            onClick={() => open()}
                        >
                            <TbPhotoPlus size={50} />
                            <p className="text-lg font-semibold">Agregar Imagen</p>
                            {imageUrl && (
                                <div>
                                    <Image
                                        src={imageUrl}
                                        alt="Product Image"
                                        fill
                                        className="w-full h-full absolute inset-0"
                                        style={{objectFit: "contain"}}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <input 
                        type="hidden"
                        name="image"
                        value={imageUrl} 
                    />
                </>
            )}
        </CldUploadWidget>
    )
}

export default ImageUpload