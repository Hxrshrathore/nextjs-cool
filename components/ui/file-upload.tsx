import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import EXIF from "exif-js";
import { cn } from "../../lib/utils";
import { Histogram } from "./histogram"; // Ensure this is correctly implemented

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [imageDetails, setImageDetails] = useState<any>(null);
  const [histogramData, setHistogramData] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    const file = newFiles[0];
    setFiles(newFiles);
    onChange && onChange(newFiles);

    // Convert the file into a URL
    const fileURL = URL.createObjectURL(file);

    // Extract EXIF data and set image details
    EXIF.getData(fileURL, function () {
      const exifData = EXIF.getAllTags(this);
      setImageDetails({
        camera: exifData?.Make ? `${exifData.Make} ${exifData.Model}` : "N/A",
        megapixels: exifData?.PixelXDimension
          ? `${exifData.PixelXDimension} x ${exifData.PixelYDimension}`
          : "N/A",
        focalLength: exifData?.FocalLength ? `${exifData.FocalLength}mm` : "N/A",
        aperture: exifData?.FNumber ? `f/${exifData.FNumber}` : "N/A",
        exposureTime: exifData?.ExposureTime ? `${exifData.ExposureTime} sec` : "N/A",
        isoSpeed: exifData?.ISOSpeedRatings || "N/A",
        flash: exifData?.Flash ? "Yes" : "No",
        dateTaken: exifData?.DateTimeOriginal || "N/A",
      });

      // Revoke the object URL after use to avoid memory leaks
      URL.revokeObjectURL(fileURL);
    });

    // Simulate histogram data processing (replace with real processing logic)
    const data = processHistogram(file);
    setHistogramData(data);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden frosted-glass"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
          accept="image/*" // Ensure only image files can be uploaded
        />

        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 && imageDetails ? (
              <div className="flex flex-row items-start justify-between">
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  className="p-4 bg-black bg-opacity-50 rounded-lg mr-4"
                >
                  <p className="text-lg font-bold">Camera: {imageDetails.camera}</p>
                  <p>Megapixels: {imageDetails.megapixels}</p>
                  <p>Focal Length: {imageDetails.focalLength}</p>
                  <p>Aperture: {imageDetails.aperture}</p>
                  <p>Exposure Time: {imageDetails.exposureTime}</p>
                  <p>ISO Speed: {imageDetails.isoSpeed}</p>
                  <p>Flash: {imageDetails.flash}</p>
                  <p>Date Taken: {imageDetails.dateTaken}</p>
                </motion.div>

                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  className="p-4 bg-black bg-opacity-50 rounded-lg"
                >
                  <Histogram data={histogramData} />
                </motion.div>
              </div>
            ) : (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function processHistogram(file: File): number[] {
  // Replace with actual image processing logic
  return Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
}
