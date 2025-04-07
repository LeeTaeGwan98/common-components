import { coverDesignUpload, coverSamplelUpload } from "@/api/cover/coverAPI";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Segement from "@/components/common/Atoms/Segement/Segement";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import FileInput from "@/components/common/BookaroongAdmin/FileInput";
import Title from "@/components/common/BookaroongAdmin/Title";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import CoverPreviewModal from "@/components/modal/Ebook/Cover/CoverPreviewModal";
import { useModalStore } from "@/store/modalStore";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";

interface CoverDataStyleProps {
  //등록/상세 여부
  type: "create" | "detail";
  //표지명
  coverName: string;
  setCoverName: Dispatch<SetStateAction<string>>;
  //표지 번호
  coverNumber: string;
  //제작자
  creater: string;
  setCreater: Dispatch<SetStateAction<string>>;
  //가격
  price: number | undefined;
  setPrice: Dispatch<SetStateAction<number | undefined>>;
  //표지 샘플 이미지
  sampleImgId: number | string;
  setSampleImgId: Dispatch<SetStateAction<number | undefined>>;
  sampleImgName: string;
  setSampleImgName: Dispatch<SetStateAction<string>>;
  //표지 디자인 파일
  designFileId: number | string;
  setDesignFileId: Dispatch<SetStateAction<number | undefined>>;
  designFileName: string;
  setDesignFileName: Dispatch<SetStateAction<string>>;
  //표지 비노출 여부
  isCoverExposure: boolean;
  setIsCoverExposure: Dispatch<SetStateAction<boolean>>;
  //소개
  intro: string;
  setIntro: Dispatch<SetStateAction<string>>;
  onClickSave: () => void;
}

function CoverDataStyle({
  type,
  coverName,
  setCoverName,
  coverNumber,
  creater,
  setCreater,
  price,
  setPrice,
  sampleImgName,
  setSampleImgName,
  sampleImgId,
  setSampleImgId,
  designFileName,
  setDesignFileName,
  designFileId,
  setDesignFileId,
  isCoverExposure,
  setIsCoverExposure,
  intro,
  setIntro,
  onClickSave,
}: CoverDataStyleProps) {
  const { id } = useParams(); // id 값 추출
  const { openModal } = useModalStore();
  const [sampleImgFile, setSampleImgFile] = useState<File | null>(null); //표지 샘플 이미지 파일
  const [designFile, setDesignFile] = useState<File | null>(null); //표지 디자인 파일

  //표지 샘플 업로드
  const { mutate: coverSampleUploadFn } = useMutation({
    mutationFn: (file: File) => coverSamplelUpload(file),
    onSuccess(data) {
      setSampleImgId(data.data.data.fileId);
    },
    onError() {
      customToast({
        title: "표지 샘플 업로드중 에러가 발생했습니다.",
      });
    },
  });

  //표지 디자인 업로드
  const { mutate: coverDesignUploadFn } = useMutation({
    mutationFn: (file: File) => coverDesignUpload(file),
    onSuccess(data) {
      setDesignFileId(data.data.data.fileId);
    },
    onError() {
      customToast({
        title: "표지 디자인 업로드중 에러가 발생했습니다.",
      });
    },
  });

  //저장 버튼 disable 여부
  const isFormValid =
    coverName.length > 0 &&
    creater.length > 0 &&
    price !== undefined &&
    sampleImgId &&
    designFileId;

  //표지 미리보기 모달
  const handlePreviewModal = () => {
    openModal(<CoverPreviewModal id={Number(id)} />);
  };
  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <div className="flex justify-center items-center">
          <>전자책 관리 / 표지 관리</>
          <Divider vertical className="h-[20px] mx-[12px]" />
          <>{type === "detail" ? "상세" : "등록"}</>
        </div>
      }
      button={
        <div className="flex gap-[8px]">
          <OutlinedButton
            className="w-[180px]"
            type="assistive"
            size="large"
            onClick={() => {
              if (!sampleImgId) return;
              handlePreviewModal();
            }}
            disable={!sampleImgId}
          >
            표지 미리보기
          </OutlinedButton>
          {type === "detail" && (
            <Button className="w-[180px]" size="large">
              삭제
            </Button>
          )}
        </div>
      }
    >
      <ContentWrapper>
        <div className="flex justify-center *:flex-1 gap-gutter-horizontal">
          <TextField
            label="표지명"
            placeholder="표지명을 입력해주세요"
            value={coverName}
            maxLength={30}
            onChange={(e) => {
              setCoverName(e.target.value);
            }}
          />
          <TextField
            label="표지 번호"
            readOnly
            placeholder="표지 등록 시 표지번호가 자동 배분됩니다"
            value={coverNumber}
          />
        </div>
        <div className="flex justify-center *:flex-1 gap-gutter-horizontal">
          <TextField
            label="제작자"
            value={creater}
            maxLength={100}
            onChange={(e) => {
              setCreater(e.target.value);
            }}
          />
          <TextField
            label="가격"
            placeholder="표지 가격을 입력해주세요"
            value={price !== undefined ? price.toLocaleString("kr") : ""}
            onChange={(e) => {
              // 숫자만 필터링
              const numericValue = e.target.value.replace(/\D/g, "");

              if (numericValue.length <= 6) {
                setPrice(
                  numericValue === "" ? undefined : Number(numericValue)
                );
              }
            }}
            buttonElement={<>포인트</>}
          />
        </div>
        <div className="flex justify-center *:flex-1 gap-gutter-horizontal">
          <FileInput
            accept="image/png,image/jpeg"
            files={sampleImgFile ? [sampleImgFile] : []}
            setFiles={(files) => {
              if (Array.isArray(files) && files.length > 0) {
                setSampleImgFile(files[0]);
                setSampleImgName(files[0].name);
                //샘플 이미지 파일 업로드
                coverSampleUploadFn(files[0]);
              }
            }}
          >
            <TextField
              slot={{ inputClassName: "cursor-pointer" }}
              label="표지 샘플 이미지"
              value={sampleImgName ? sampleImgName : "파일을 첨부해주세요"}
              readOnly
              buttonElement={
                <OutlinedButton size="small">파일 업로드</OutlinedButton>
              }
            />
          </FileInput>
          <FileInput
            accept=".ai,.eps,.indd"
            files={designFile ? [designFile] : []}
            setFiles={(files) => {
              if (Array.isArray(files) && files.length > 0) {
                setDesignFile(files[0]);
                setDesignFileName(files[0].name);
                //표디 디자인 파일 업로드
                coverDesignUploadFn(files[0]);
              }
            }}
          >
            <TextField
              slot={{ inputClassName: "cursor-pointer" }}
              label="표지 디자인 파일"
              value={designFileName ? designFileName : "파일을 첨부해주세요"}
              readOnly
              buttonElement={
                <OutlinedButton size="small">파일 업로드</OutlinedButton>
              }
            />
          </FileInput>
        </div>
        <div className="flex gap-gutter-horizontal">
          <div className="w-[50%]">
            <Title size="medium" label={"표지"} />
            <Segement
              className="w-full"
              size="large"
              setSelected={setIsCoverExposure}
              selected={isCoverExposure}
              textList={["노출", "비노출"]}
            />
          </div>

          <div className="w-[50%]"></div>
        </div>
        <div>
          <Title size="large" label={"소개"} />
          <TextBox
            value={intro}
            maxLength={1000}
            onChange={(e) => {
              setIntro(e.target.value);
            }}
          />
        </div>

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
            size="large"
            type="secondary"
            disable={!isFormValid}
            onClick={() => {
              if (!isFormValid) return;
              onClickSave();
            }}
          >
            저장
          </OutlinedButton>
        </div>
      </ContentWrapper>
    </BreadcrumbContainer>
  );
}

export default CoverDataStyle;
