import { cn } from "@/lib/utils";
import React, {
  useState,
  useRef,
  ChangeEvent,
  DragEvent,
  ReactNode,
} from "react";

interface FileInputProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  className?: string;
  containerClassName?: string;
  dragActiveText?: string;
  dragInactiveText?: string;
  children: ReactNode;
  isDisable?: boolean;
  validFn?: (file: File, callback: (isValid: boolean) => void) => void;
  onError?: () => void;
}

//숫자를 메가바이트
export const numberToMb = (number: number) => {
  return number * 1024 * 1024;
};
//킬로바이트
export const fileSizeToKb = (size: number) => {
  return size / 1024;
};
//메가바이트
export const fileSizeToMb = (size: number) => {
  return size / (1024 * 1024);
};

const FileInput: React.FC<FileInputProps> = ({
  files, // 외부에서 주입받는 상태값
  setFiles, // 외부에서 주입받는 상태값을 바꾸는 setState함수
  multiple = false, // 여러 파일을 받을 수 있는지 여부
  accept = "*", // 첨부를 혀용할 파일확장자
  maxSize, // 첨부파일 최대 크기
  className = "",
  children,
  isDisable = false,
  validFn, //파일 추가 유효성 검사 함수
  onError,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //추가적인 파일 검증
  const validateFile = async (file: File): Promise<boolean> => {
    if (validFn) {
      const isValid = await new Promise<boolean>((resolve) => {
        validFn(file, resolve);
      });

      if (!isValid) {
        onError && onError();
        return false;
      }
    }

    return validateFileTypeSize(file);
  };

  // 파일 검증
  const validateFileTypeSize = (file: File): boolean => {
    // 파일 타입 체크
    if (accept !== "*") {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const fileType = file.type;
      const fileExtension = `.${file.name.split(".").pop()}`;

      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return fileExtension.toLowerCase() === type.toLowerCase();
        }
        if (type.endsWith("/*")) {
          const mainType = type.split("/")[0];
          return fileType.startsWith(`${mainType}/`);
        }
        return fileType === type;
      });

      if (!isAccepted) {
        setError(`지원하지 않는 파일 형식입니다: ${file.name}`);
        onError && onError();
        return false;
      }
    }

    // 파일 크기 체크
    if (maxSize && file.size > maxSize) {
      const sizeMB = maxSize / (1024 * 1024);
      setError(`파일 크기가 너무 큽니다. 최대 ${sizeMB}MB까지 허용됩니다.`);
      onError && onError();
      return false;
    }

    return true;
  };

  // 드래그 이벤트 처리
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // 파일 처리
  const handleFiles = async (fileList: FileList) => {
    const validFiles: File[] = [];

    for (const file of Array.from(fileList)) {
      if (await validateFile(file)) {
        validFiles.push(file);
      }
    }

    if (validFiles.length) {
      if (multiple) {
        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      } else {
        setFiles(validFiles.slice(0, 1));
      }
    }
  };

  // 파일 선택 처리
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    //같은 파일 넣었을 때 다시 체크할 수 있도록
    e.target.value = "";
  };

  // 파일 제거
  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // 클릭으로 파일 선택 다이얼로그 열기
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={cn("w-fit", className)}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept={accept}
        multiple={multiple}
        disabled={isDisable}
      />
      {children}
    </div>
  );
};

export default FileInput;

/*
 * const [files, setFiles] = useState<File[]>([]);
 * 사용 예시
  <FileInput files={files} setFiles={setFiles}>
    <div>asdf</div>
    {files[0]?.name}
  </FileInput>
 */
