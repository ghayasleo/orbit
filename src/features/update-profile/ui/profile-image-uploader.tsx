import { useState, useRef, useCallback, useEffect } from "react";
import { Camera } from "lucide-react";
import { cn } from "@/shared/lib";

interface ProfileImageUploaderProps {
  currentImageUrl?: string | null;
  displayName?: string;
  onImageSelected: (file: File) => void;
  onClearImage: () => void;
  className?: string;
}

const MAX_SIZE = 500;

function resizeImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      let { width, height } = img;

      // Preserve aspect ratio — scale down only if needed
      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width > height) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        } else {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context unavailable"));
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Blob conversion failed"));
          resolve(
            new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
              type: "image/webp",
            }),
          );
        },
        "image/webp",
        0.9,
      );
    };
    img.onerror = () => reject(new Error("Image load failed"));
  });
}

export function ProfileImageUploader({
  currentImageUrl,
  displayName = "U",
  onImageSelected,
  onClearImage,
  className,
}: ProfileImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasLocalFile = useRef(false);

  // Sync when the stored image URL loads asynchronously (profile data arrives after mount)
  useEffect(() => {
    if (!hasLocalFile.current) {
      setPreviewUrl(currentImageUrl || null);
    }
  }, [currentImageUrl]);


  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    try {
      const resized = await resizeImage(file);
      setPreviewUrl(URL.createObjectURL(resized));
      onImageSelected(resized);
    } catch (e) {
      console.error("Image processing error:", e);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) processFile(file);
  };

  const initials = displayName.charAt(0).toUpperCase();

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* Avatar drop zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative w-28 h-28 rounded-full cursor-pointer overflow-hidden group",
          "border-2 border-dashed transition-all duration-200",
          isDragging
            ? "border-brand scale-105 bg-brand-subtle"
            : "border-border-medium hover:border-brand",
        )}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-subtle text-brand text-3xl font-bold select-none">
            {initials}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
          <Camera className="w-6 h-6 text-white" />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {/* Action text */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-sm font-medium text-brand hover:text-brand-hover transition-colors"
        >
          Change Profile Photo
        </button>
        <p className="text-xs text-text-muted mt-0.5">
          Drag and drop or click to upload
        </p>
        {previewUrl && currentImageUrl !== previewUrl && (
          <button
            type="button"
            onClick={() => {
              setPreviewUrl(currentImageUrl || null);
              if (fileInputRef.current) fileInputRef.current.value = "";
              onClearImage();
            }}
            className="text-xs text-rose-500 hover:text-rose-600 mt-1 block mx-auto transition-colors"
          >
            Remove photo
          </button>
        )}
      </div>
    </div>
  );
}
