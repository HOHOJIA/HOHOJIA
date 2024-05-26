import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { BiImageAdd } from "react-icons/bi";

interface ICustomFile extends File {
  preview: string;
}

export default function DropZoneImg({
  smallSize,
  getImgUrl,
}: {
  smallSize: boolean;
  getImgUrl: (file: File) => void;
}) {
  const [files, setFiles] = React.useState<ICustomFile[]>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file) => {
          const customFile: ICustomFile = Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
          console.log(file);
          getImgUrl(file); // 呼叫 getImgUrl 函數並將文件傳遞給它
          return customFile;
        })
      );
    },
  });

  // Image preview thumbs
  const thumbs = files.map((file: ICustomFile) => (
    <div key={file.name} className="w-full h-full">
      <img
        src={file.preview}
        className="object-cover w-full h-full" // Cover the entire area of the drop zone
        onLoad={() => URL.revokeObjectURL(file.preview)}
        alt="Preview"
      />
    </div>
  ));

  return (
    <section className="col-span-full md:col-span-3">
      <div
        {...getRootProps({
          className: `dropzone flex flex-col items-center justify-center relative border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
            smallSize ? "h-28" : "h-64"
          } w-full overflow-hidden`,
        })}
      >
        <input {...getInputProps()} />
        {files.length === 0 && (
          <div className="flex flex-col items-center justify-center relative w-full py-5 mx-5">
            <BiImageAdd
              size={smallSize ? "2rem" : "4rem"}
              className="text-gray-500 mb-1 xl:mb-2 dark:text-gray-400"
            />
            <p className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 ">
              Click to upload
            </p>
            {!smallSize && (
              <p className="hidden text-xs text-gray-500 xl:block dark:text-gray-400">
                SVG, PNG, JPG or GIF (Recommendation is 2.63:1 horizontal image,
                1230x468px or above)
              </p>
            )}
          </div>
        )}
        <aside className={smallSize ? "w-full h-full" : ""}>{thumbs}</aside>
      </div>
    </section>
  );
}
