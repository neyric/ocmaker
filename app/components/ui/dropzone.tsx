import { Ring2 } from "ldrs/react";
import { AlertTriangle, FileImage, Image, Upload, X } from "lucide-react";
import { forwardRef, useCallback, useState } from "react";

import { cn } from "~/lib/utils";

export interface FileItem {
  file: File;
  url?: string;
  state: "loading" | "success" | "failed";
}

export interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onFileDrop?: (files: File[]) => void;
  onFileRemove?: (index: number) => void;
  acceptedFileTypes?: string[];
  maxFiles?: number;
  maxFileSize?: number; // bytes
  disabled?: boolean;
  fileList?: FileItem[];
}

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(
  (
    {
      onFileDrop,
      onFileRemove,
      acceptedFileTypes = ["image/jpeg", "image/png", "image/webp"],
      maxFiles = 1,
      maxFileSize = 10 * 1024 * 1024, // 10MB
      disabled = false,
      fileList = [],
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState<string>("");

    const validateFile = (file: File): boolean => {
      if (!acceptedFileTypes.includes(file.type)) {
        setError(`Tipo de arquivo não suportado`);
        return false;
      }

      if (file.size > maxFileSize) {
        const maxSizeMB = Math.round(maxFileSize / (1024 * 1024));
        setError(`Tamanho do arquivo não pode exceder ${maxSizeMB}MB`);
        return false;
      }

      setError("");
      return true;
    };

    const handleFiles = useCallback(
      (files: FileList | null) => {
        if (!files || disabled) return;

        const validFiles: File[] = [];
        const fileArray = Array.from(files);

        // 检查文件数量限制
        if (fileArray.length > maxFiles) {
          setError(`Você pode fazer upload de até ${maxFiles} arquivos`);
          return;
        }

        // 验证每个文件
        for (const file of fileArray) {
          if (validateFile(file)) validFiles.push(file);
          else break;
        }

        if (!!validFiles.length) onFileDrop?.(validFiles);
      },
      [fileList.length, maxFiles, disabled, onFileDrop, maxFileSize],
    );

    const handleDragEnter = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragOver(true);
        }
      },
      [disabled],
    );

    const handleDragLeave = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragOver(false);
        }
      },
      [disabled],
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragOver(false);
          handleFiles(e.dataTransfer.files);
        }
      },
      [disabled, handleFiles],
    );

    const handleFileInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        // 重置 input value，这样同一个文件可以再次选择
        e.target.value = "";
      },
      [handleFiles],
    );

    const removeFile = (index: number) => {
      onFileRemove?.(index);
      setError(""); // 清除错误
    };

    // 获取文件 URL，优先使用参数中的 url，否则使用 createObjectURL
    const getFileUrl = (fileItem: FileItem): string => {
      return fileItem.url || URL.createObjectURL(fileItem.file);
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {/* Dropzone 区域 */}
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg transition-colors duration-200",
            "flex flex-col items-center justify-center h-36 p-2",
            "cursor-pointer hover:bg-base-200/50",
            isDragOver && !disabled
              ? "border-primary bg-primary/5"
              : "border-base-300",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => {
            if (!disabled) {
              document.getElementById("file-input")?.click();
            }
          }}
        >
          <input
            id="file-input"
            type="file"
            multiple={maxFiles > 1}
            accept={acceptedFileTypes.join(",")}
            className="hidden"
            onChange={handleFileInput}
            disabled={disabled}
          />

          {fileList.length > 0 ? (
            <>
              {fileList.length > 1 ? (
                // 已上传文件的预览
                <div className="flex flex-wrap gap-2 justify-center">
                  {fileList.map((fileItem, index) => (
                    <div
                      key={`${fileItem.file.name}-${index}`}
                      className="relative group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-base-300">
                        {fileItem.file.type.startsWith("image/") ? (
                          <img
                            src={getFileUrl(fileItem)}
                            alt={fileItem.file.name}
                            className="w-full h-full object-cover"
                            onLoad={(e) => {
                              // 只有使用 createObjectURL 的情况下才释放 URL
                              if (!fileItem.url) {
                                URL.revokeObjectURL(e.currentTarget.src);
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-base-200">
                            <FileImage className="w-8 h-8 text-base-content/50" />
                          </div>
                        )}

                        {/* 状态蒙版层 */}
                        {fileItem.state === "loading" && (
                          <div className="absolute inset-0 bg-base-100/50 flex items-center justify-center rounded-lg">
                            <Ring2 size="20" speed={2} color="#1976d2" />
                          </div>
                        )}
                        {fileItem.state === "failed" && (
                          <div className="absolute inset-0 bg-neutral/50 flex items-center justify-center rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                      {!disabled && (
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className={cn(
                            "absolute -top-1 -right-1 w-5 h-5 rounded-full",
                            "bg-error text-white flex items-center justify-center",
                            "md:opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                            "hover:bg-error/80",
                          )}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  key={`${fileList[0].file.name}`}
                  className="relative group h-full w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden border border-base-300">
                    <img
                      src={getFileUrl(fileList[0])}
                      className="w-full h-full object-contain"
                    />

                    {/* 状态蒙版层 */}
                    {fileList[0].state === "loading" && (
                      <div className="absolute inset-0 bg-base-100/50 flex items-center justify-center rounded-lg">
                        <Ring2 size="24" speed={2} color="#1976d2" />
                      </div>
                    )}
                    {fileList[0].state === "failed" && (
                      <div className="absolute inset-0 bg-neutral/50 flex items-center justify-center rounded-lg">
                        <AlertTriangle className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  {!disabled && (
                    <button
                      type="button"
                      onClick={() => removeFile(0)}
                      className={cn(
                        "absolute -top-1 -right-1 w-5 h-5 rounded-full",
                        "bg-error text-white flex items-center justify-center",
                        "md:opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                        "hover:bg-error/80",
                      )}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            // 空状态
            <div className="text-center">
              <div
                className={cn(
                  "mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2",
                  "bg-base-200 text-primary",
                )}
              >
                {isDragOver ? (
                  <Image className="w-6 h-6" />
                ) : (
                  <Upload className="w-6 h-6" />
                )}
              </div>

              {children ? (
                children
              ) : (
                <p className="text-sm font-medium text-base-content mb-2">
                  {isDragOver
                    ? "Solte para fazer upload dos arquivos"
                    : "Clique para fazer upload ou arraste arquivos aqui"}
                </p>
              )}
              {error && (
                <div className="absolute bottom-2 inset-x-0 text-center text-error text-xs">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

Dropzone.displayName = "Dropzone";
