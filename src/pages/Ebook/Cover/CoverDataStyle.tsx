import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Segement from "@/components/common/Atoms/Segement/Segement";
import Title from "@/components/common/BookaroongAdmin/Title";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import { Dispatch, SetStateAction, useState } from "react";

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
  sampleImg: string;
  //표지 디자인 파일
  designFile: string;
  //표지 비노출 여부
  isCoverNoExposure: boolean;
  setIsCoverNoExposure: Dispatch<SetStateAction<boolean>>;
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
  sampleImg,
  designFile,
  isCoverNoExposure,
  setIsCoverNoExposure,
  intro,
  setIntro,
  onClickSave,
}: CoverDataStyleProps) {
  const isDetail = true;

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
        <OutlinedButton type="assistive" size="large">
          표지 미리보기
        </OutlinedButton>
      }
    >
      <ContentWrapper>
        <div className="flex justify-center *:flex-1 gap-gutter-horizon">
          <TextField
            label="표지명"
            placeholder="표지명을 입력해주세요"
            value={coverName}
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
        <div className="flex justify-center *:flex-1 gap-gutter-horizon">
          <TextField
            label="제작자"
            value={creater === "" ? "북카롱" : creater}
            onChange={(e) => {
              setCreater(e.target.value);
            }}
          />
          <TextField
            label="가격"
            placeholder="표지 가격을 입력해주세요"
            value={price !== undefined ? price.toLocaleString("kr") : ""}
            slot={{ subTextClassName: "" }}
            onChange={(e) => {
              if (e.target.value === "") {
                setPrice(undefined);
              } else {
                setPrice(Number(e.target.value.replaceAll(",", "")));
              }
            }}
            buttonElement={<>포인트</>}
          />
        </div>
        <div className="flex justify-center *:flex-1 gap-gutter-horizon">
          <TextField
            label="표지 샘플 이미지"
            value={"파일을 첨부해주세요"}
            buttonElement={
              <OutlinedButton size="small">파일 업로드</OutlinedButton>
            }
          />
          <TextField
            label="표지 디자인 파일"
            value={"파일을 첨부해주세요"}
            buttonElement={
              <OutlinedButton size="small">파일 업로드</OutlinedButton>
            }
          />
        </div>
        <div className="flex gap-gutter-horizon">
          <div className="w-[50%]">
            <Title size="medium" label={"표지"} />
            <Segement
              className="w-full"
              size="large"
              setSelected={setIsCoverNoExposure}
              selected={isCoverNoExposure}
              textList={["노출", "비노출"]}
            />
          </div>

          <div className="w-[50%]"></div>
        </div>
        <div>
          <Title size="large" label={"소개"} />
          <TextBox
            value={intro}
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
            type="assistive"
            onClick={onClickSave}
          >
            저장
          </OutlinedButton>
        </div>
      </ContentWrapper>
    </BreadcrumbContainer>
  );
}

export default CoverDataStyle;
