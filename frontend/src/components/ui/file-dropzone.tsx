"use client";
import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Card } from "./card";
import { Button } from "./button";
import { Label } from "./label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemoveFile: () => void;
  disabled?: boolean;
  className?: string;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ACCEPTED_FILE_TYPES = {
  'audio/mpeg': ['.mp3'],
  'audio/mp3': ['.mp3'],
  'video/mp4': ['.mp4'],
};

export function FileDropzone({
  onFileSelect,
  selectedFile,
  onRemoveFile,
  disabled = false,
  className
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setIsDragOver(false);

    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      if (error.code === 'file-too-large') {
        toast.error("File too large. Maximum size is 100MB.");
      } else if (error.code === 'file-invalid-type') {
        toast.error("Invalid file type. Only .mp3 and .mp4 files are allowed.");
      } else {
        toast.error("File upload failed. Please try again.");
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileSelect(file);
      toast.success(`File "${file.name}" selected successfully!`);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    disabled,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Label className="text-white">Upload Sample File</Label>

      {!selectedFile ? (
        <Card
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200",
            "bg-zinc-900/50 border-zinc-700 backdrop-blur-sm",
            isDragActive || isDragOver
              ? "border-tertiary bg-tertiary/5 transform scale-[1.02]"
              : "hover:border-zinc-600 hover:bg-zinc-800/50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="flex justify-center">
              <svg
                className={cn(
                  "w-12 h-12 transition-colors duration-200",
                  isDragActive || isDragOver ? "text-tertiary" : "text-zinc-400"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-white mb-2">
                {isDragActive || isDragOver
                  ? "Drop your file here"
                  : "Drag & drop your sample file here"
                }
              </p>
              <p className="text-sm text-zinc-400">
                or <span className="text-tertiary underline">click to browse</span>
              </p>
            </div>
            <div className="text-xs text-zinc-500">
              <p>Supported formats: MP3, MP4</p>
              <p>Maximum file size: 100MB</p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {selectedFile.type.startsWith('audio/') ? (
                  <svg className="w-8 h-8 text-tertiary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-tertiary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-5.5l4 4v-11l-4 4z"/>
                  </svg>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-white font-medium truncate">{selectedFile.name}</p>
                <p className="text-sm text-zinc-400">{formatFileSize(selectedFile.size)}</p>
                <p className="text-xs text-zinc-500 capitalize">
                  {selectedFile.type.split('/')[0]} file
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onRemoveFile}
              disabled={disabled}
              className="flex-shrink-0"
            >
              Remove
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
