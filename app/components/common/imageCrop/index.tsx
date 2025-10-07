import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import type { Area, Point } from "react-easy-crop";
import Cropper from "react-easy-crop";
import { useBreakpoint } from "~/hooks/dom/use-breakpoint";
import { cn } from "~/lib/utils";

import { Dialog, DialogContent } from "../../ui/dialog";
import { Drawer, DrawerContent } from "../../ui/drawer";

import {
  calculateDefaultAspectRatio,
  getAspectRatioValue,
  getCroppedImg,
} from "./utils";

interface ImageCropProps {
  onCrop: (result: { file: File; aspect: string }) => void;
}

export interface ImageCropHandle {
  open: (options: {
    file: File;
    defaultAspect?: string;
    aspectRatios: string[];
  }) => void;
  close: () => void;
}

const DEFAULT_ASPECT_RATIOS = ["16:9", "4:3", "1:1", "3:4", "9:16"];

export const ImageCrop = forwardRef<ImageCropHandle, ImageCropProps>(
  ({ onCrop }, ref) => {
    const [_, { isMobile }] = useBreakpoint();
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [aspectRatios, setAspectRatios] = useState<string[]>(
      DEFAULT_ASPECT_RATIOS,
    );
    const [selectedAspectRatio, setSelectedAspectRatio] =
      useState<string>("1:1");
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
      null,
    );

    useImperativeHandle(ref, () => ({
      open: async (options: {
        file: File;
        defaultAspect?: string;
        aspectRatios: string[];
      }) => {
        const {
          file: inputFile,
          defaultAspect,
          aspectRatios: inputAspectRatios,
        } = options;

        if (!inputFile.type.startsWith("image/")) {
          throw new Error("File must be an image");
        }

        const selectedAspect = await calculateDefaultAspectRatio(
          inputFile,
          inputAspectRatios,
          defaultAspect,
          DEFAULT_ASPECT_RATIOS,
        );

        setFile(inputFile);
        setImageUrl(URL.createObjectURL(inputFile));
        setAspectRatios(inputAspectRatios || DEFAULT_ASPECT_RATIOS);
        setSelectedAspectRatio(selectedAspect);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedAreaPixels(null);
        setIsOpen(true);
      },
      close: () => {
        handleClose();
      },
    }));

    const handleClose = useCallback(() => {
      setIsOpen(false);
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      setFile(null);
      setImageUrl("");
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }, [imageUrl]);

    const onCropComplete = useCallback(
      (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
      },
      [],
    );

    const handleCrop = async () => {
      if (!croppedAreaPixels || !file || !imageUrl) return;

      try {
        const fileName = file.name.split(".").slice(0, -1).join(".") + ".webp";
        const croppedFile = await getCroppedImg(
          imageUrl,
          croppedAreaPixels,
          fileName,
          "image/webp",
        );
        onCrop({ file: croppedFile, aspect: selectedAspectRatio });
        handleClose();
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    };

    if (isMobile) {
      return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && handleClose()}>
          <DrawerContent
            className="border-none bg-transparent"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <CropContent
              imageUrl={imageUrl}
              crop={crop}
              zoom={zoom}
              selectedAspectRatio={selectedAspectRatio}
              aspectRatios={aspectRatios}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onAspectRatioChange={setSelectedAspectRatio}
              onClose={handleClose}
              onCrop={handleCrop}
            />
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent
          className="max-w-4xl border-none p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <CropContent
            imageUrl={imageUrl}
            crop={crop}
            zoom={zoom}
            selectedAspectRatio={selectedAspectRatio}
            aspectRatios={aspectRatios}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onAspectRatioChange={setSelectedAspectRatio}
            onClose={handleClose}
            onCrop={handleCrop}
          />
        </DialogContent>
      </Dialog>
    );
  },
);

ImageCrop.displayName = "ImageCrop";

interface CropContentProps {
  imageUrl: string;
  crop: Point;
  zoom: number;
  selectedAspectRatio: string;
  aspectRatios: string[];
  onCropChange: (crop: Point) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  onZoomChange: (zoom: number) => void;
  onAspectRatioChange: (ratio: string) => void;
  onClose: () => void;
  onCrop: () => void;
}

function CropContent({
  imageUrl,
  crop,
  zoom,
  selectedAspectRatio,
  aspectRatios,
  onCropChange,
  onCropComplete,
  onZoomChange,
  onAspectRatioChange,
  onClose,
  onCrop,
}: CropContentProps) {
  return (
    <div className="bg-base-100 rounded-t-xl md:rounded-xl overflow-hidden max-h-[90vh] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-base-300">
        <h2 className="text-xl font-semibold text-base-content">Crop Image</h2>
      </div>

      {/* Crop Area */}
      <div className="p-4 space-y-4 flex-1 min-h-0 overflow-y-auto">
        <div className="relative w-full aspect-square bg-neutral rounded-lg overflow-hidden">
          {imageUrl && (
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={getAspectRatioValue(selectedAspectRatio)}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
              showGrid={true}
              cropShape="rect"
              objectFit="contain"
            />
          )}
        </div>

        {/* Aspect Ratio Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Aspect Ratio</label>
          <div className="flex gap-2 flex-wrap">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio}
                className={cn(
                  "btn btn-sm",
                  selectedAspectRatio === ratio ? "btn-primary" : "btn-outline",
                )}
                onClick={() => onAspectRatioChange(ratio)}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* Zoom Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Zoom</label>
          <div className="flex items-center gap-4">
            <span className="text-sm text-base-content/60 w-12">100%</span>
            <input
              type="range"
              className="range range-primary flex-1"
              value={zoom}
              onChange={(e) => onZoomChange(Number(e.target.value))}
              min={1}
              max={3}
              step={0.1}
            />
            <span className="text-sm text-base-content/60 w-12">300%</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-base-300 flex gap-2 justify-end">
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={onCrop}>
          Crop Image
        </button>
      </div>
    </div>
  );
}
