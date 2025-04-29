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
import { getDetailGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { COMMON_GROUP_CODE_MAPPING } from "@/Constants/CommonGroupCode";
import { useNavigate } from "react-router-dom";
import { registFreeImg } from "@/api/freeImg/freeImgApi";

interface VideoImageTemplateProps {
  type: "create" | "detail"; //등록/상세 여부
}

function VideoImageTemplate({ type }: VideoImageTemplateProps) {
  const nav = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const { data: categories } = useSuspenseQuery({
    queryKey: ["freeImgCode"],
    queryFn: () =>
      getDetailGroupCodes(COMMON_GROUP_CODE_MAPPING.무료이미지구분),
    select: (data) => data.data.data,
  });

  const { mutate: registFreeImgFn } = useMutation({
    mutationKey: ["freeImgRegist"],
    mutationFn: () => {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("categoryCode", category);
      formData.append("title", title);
      formData.append("fileName", title);

      return registFreeImg(formData);
    },
  });

  const handleSave = () => {
    if (type === "create") {
      registFreeImgFn();
      return;
    } else {
    }
  };

  console.log(files);

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <div className="flex justify-center items-center">
          <>비디오북 관리 / 무료 이미지 관리</>
          <Divider vertical className="h-[20px] mx-[12px]" />
          <>{type === "detail" ? "상세" : "추가"}</>
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
          value={category}
          onValueChange={(value) => {
            setCategory(value);
          }}
        >
          <SelectContent>
            <SelectGroup>
              {categories.map((category) => (
                <SelectItem
                  value={category.commDetailCode}
                  key={category.commDetailCode}
                >
                  {category.detailCodeName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </SelectBox>

        {/* 제목 */}
        <TextField
          label="제목"
          value={title}
          placeholder="이미지를 대표하는 제목"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <div className="text-label1-normal-bold text-label-alternative mb-[8px]">
            이미지
          </div>
          <div className="w-full">
            <FileInput
              className="w-full cursor-pointer"
              files={files}
              setFiles={setFiles}
              accept=".png, .jpg, .jpeg"
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
            >
              <div className="w-full flex flex-col items-center justify-center border border-line-normal-normal rounded-[4px] gap-space-default py-[54px]">
                <div className="text-body1-normal-bold flex items-center justify-center gap-[10px]">
                  <FileUpload
                    className={`fill-label-normal ${
                      files.length && "fill-primary-normal"
                    }`}
                  />
                  <span className={`${files.length && "text-primary-normal"}`}>
                    이미지 업로드 ({files.length}/1)
                  </span>
                </div>
                <div className="text-label1-normal-bold text-label-assistive">
                  파일 형식: JPG(JPEG), PNG{" "}
                </div>
                <div className="text-label1-normal-bold text-label-alternative">
                  ※ 이미지를 등록하면 즉시 반영됩니다
                </div>
              </div>
            </FileInput>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-[12px]">
          <OutlinedButton
            className="max-w-[180px] w-full"
            size="large"
            type="assistive"
            onClick={() => nav(-1)}
          >
            취소
          </OutlinedButton>
          <OutlinedButton
            className="max-w-[180px] w-full"
            type="secondary"
            size="large"
            onClick={handleSave}
          >
            저장
          </OutlinedButton>
        </div>
      </ContentWrapper>
    </BreadcrumbContainer>
  );
}

export default VideoImageTemplate;
