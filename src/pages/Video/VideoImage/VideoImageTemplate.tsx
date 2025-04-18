import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import FileInput, {
  numberToMb,
} from "@/components/common/BookaroongAdmin/FileInput";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { useState } from "react";

import FileUpload from "@/assets/svg/common/FileUploadIcon.svg";

interface VideoImageTemplateProps {
  type: "create" | "detail"; //등록/상세 여부
}

function VideoImageTemplate({ type }: VideoImageTemplateProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUpliadedFiles] = useState<File[]>([]);
  console.log(files);

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <div className="flex justify-center items-center">
          <>비디오북 관리 / 무료 이미지 관리</>
          <Divider vertical className="h-[20px] mx-[12px]" />
          <>{type === "detail" ? "상세" : "등록"}</>
        </div>
      }
      button={
        type === "detail" ? (
          <div>
            <Button className="w-[180px]" size="large">
              삭제
            </Button>
          </div>
        ) : (
          <></>
        )
      }
    >
      <ContentWrapper>
        {/* 구분 */}
        <SelectBox
          size="large"
          label="구분"
          placeholder="구분을 선택해주세요"
          value={""}
          onValueChange={(value) => {
            //setCategory(value);
          }}
        >
          <SelectContent>
            <SelectGroup>
              <SelectItem value={"구분"}>{"구분"}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectBox>

        {/* 제목 */}
        <TextField
          label="제목"
          value={""}
          placeholder="이미지를 대표하는 제목"
        />
        <div className="w-full">
          {type === "create" ? (
            <FileInput
              className="w-full"
              files={files}
              setFiles={setFiles}
              accept=".png,.jpg,.jpeg,.pdf"
              maxSize={numberToMb(5)} // 5MB
              validFn={(file, callback) => {
                // 예: 파일명에 공백 금지
                // if (file.name.includes(" ")) {
                //   alert("파일명에 공백이 있으면 안 됩니다.");
                //   callback(false);
                // } else {
                //   callback(true);
                // }
              }}
              onError={() => {}}
            >
              <div className="w-full flex flex-col items-center justify-center border border-line-normal-normal rounded-[4px] gap-space-default py-[54px]">
                <div className="text-body1-normal-bold flex items-center justify-center gap-[10px]">
                  <FileUpload className="fill-label-normal" />
                  이미지 업로드 ({files.length}/1)
                </div>
                <div className="text-label1-normal-bold text-label-assistive">
                  파일 형식: JPG(JPEG), PNG{" "}
                </div>
                <div className="text-label1-normal-bold text-label-alternative">
                  ※ 이미지를 등록하면 즉시 반영됩니다
                </div>
              </div>
            </FileInput>
          ) : (
            <FileInput
              className="w-full"
              files={uploadedFiles}
              setFiles={setUpliadedFiles}
              multiple
              accept=".png,.jpg,.jpeg,.pdf"
              maxSize={numberToMb(5)} // 5MB
              validFn={(file, callback) => {
                // 예: 파일명에 공백 금지
                if (file.name.includes(" ")) {
                  alert("파일명에 공백이 있으면 안 됩니다.");
                  callback(false);
                } else {
                  callback(true);
                }
              }}
              onError={() => {
                alert("파일 업로드 중 오류 발생!");
              }}
            >
              <div className="w-full flex flex-col items-center justify-center border border-line-normal-normal rounded-[4px] gap-space-default py-[54px]">
                <div className="text-body1-normal-bold text-primary-normal flex items-center justify-center gap-[10px]">
                  <FileUpload className="fill-primary-normal" />
                  이미지 업로드 (1/1)
                </div>
                <div className="text-label1-normal-bold text-label-assistive">
                  파일 형식: JPG(JPEG), PNG{" "}
                </div>
                <div className="text-label1-normal-bold text-label-alternative">
                  ※ 이미지를 등록하면 즉시 반영됩니다
                </div>
              </div>
            </FileInput>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-[12px]">
          <OutlinedButton
            className="max-w-[180px] w-full"
            size="large"
            type="assistive"
          >
            취소
          </OutlinedButton>
          <OutlinedButton
            className="max-w-[180px] w-full"
            type="secondary"
            size="large"
          >
            저장
          </OutlinedButton>
        </div>
      </ContentWrapper>
    </BreadcrumbContainer>
  );
}

export default VideoImageTemplate;
