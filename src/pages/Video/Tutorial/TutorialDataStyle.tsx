import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Segement from "@/components/common/Atoms/Segement/Segement";
import Title from "@/components/common/BookaroongAdmin/Title";
import AdminTitle from "@/components/common/Molecules/AdminTitle/AdminTitle";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import { Dispatch, SetStateAction } from "react";

interface TutorialDataStyleProps {
  type: "create" | "detail"; //등록/상세 여부
  //튜토리얼명
  tutorialName: string;
  setTutorialName: Dispatch<SetStateAction<string>>;
  //카테고리
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  //영상 파일
  videoFile: string;
  //튜토리얼 썸네일
  tutorialTumbnail: string;
  //비노출 여부
  isNoExposure: boolean;
  setIsNoExposure: Dispatch<SetStateAction<boolean>>;
  //저장 버튼 클릭
  onClickSave: () => void;
}

function TutorialDataStyle({
  type,
  tutorialName,
  setTutorialName,
  category,
  setCategory,
  videoFile,
  tutorialTumbnail,
  isNoExposure,
  setIsNoExposure,
  onClickSave,
}: TutorialDataStyleProps) {
  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <div className="flex justify-center items-center">
          <>비디오북 관리 / 튜토리얼 관리</>
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
        {/* 튜토리얼명 */}
        <TextField
          label="튜토리얼명"
          placeholder="튜토리얼 제목을 입력해주세요"
          value={tutorialName}
          onChange={(e) => {
            setTutorialName(e.target.value);
          }}
        />

        <div className="flex *:flex-1 gap-gutter-horizontal">
          {/* 카테고리 */}
          <SelectBox
            size="large"
            label="카테고리"
            placeholder="카테고리를 선택해주세요"
            value={category}
          />
          {/* 영상 파일 */}
          <TextField
            label="영상 파일"
            placeholder="파일을 첨부해주세요"
            readOnly={true}
            buttonElement={
              <OutlinedButton size="small">파일 업로드</OutlinedButton>
            }
            value={""}
          />
        </div>

        <div className="flex *:flex-1 gap-gutter-horizontal">
          {/* 노출 상태 */}
          <div>
            <Title label={"노출 상태"} />
            <Segement
              className="w-full"
              itemClassName="text-body1-normal-medium"
              size="large"
              setSelected={setIsNoExposure}
              selected={isNoExposure}
              textList={["노출", "비노출"]}
            />
          </div>

          {/* 튜토리얼 썸네일 */}
          <TextField
            label="튜토리얼 썸네일"
            placeholder="파일을 첨부해주세요"
            readOnly={true}
            buttonElement={
              <OutlinedButton size="small">파일 업로드</OutlinedButton>
            }
            value={""}
          />
        </div>
        {/* 비디오 */}
        <div className="w-full h-[565px] bg-black"></div>

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
            onClick={onClickSave}
          >
            저장
          </OutlinedButton>
        </div>
      </ContentWrapper>
    </BreadcrumbContainer>
  );
}

export default TutorialDataStyle;
