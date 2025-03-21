import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Segement from "@/components/common/Atoms/Segement/Segement";
import Title from "@/components/common/BookaroongAdmin/Title";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import { useState } from "react";

function TemplateDetail() {
  const [templName, setTemplName] = useState<string>(""); //템플릿명
  const [category, setCategory] = useState<string>(""); //카테고리
  const [isNoExposure, setIsNoExposure] = useState<boolean>(false); //비노출 여부
  const [isNoRecommend, setIsNoRecommend] = useState<boolean>(false); //관리자 비추천 여부
  const [ratio, setRatio] = useState<string>(""); //비율
  const [length, setLength] = useState<string>(""); //길이

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <div className="flex justify-center items-center">
          <>비디오북 관리 / 템플릿 관리</>
          <Divider vertical className="h-[20px] mx-[12px]" />
          <>상세</>
        </div>
      }
      button={
        <div>
          <Button className="w-[180px]" size="large">
            삭제
          </Button>
        </div>
      }
    >
      <ContentWrapper>
        <div className="flex *:flex-1 gap-gutter-horizontal">
          {/* 템플릿명 */}
          <TextField
            label="템플릿명"
            value={templName}
            onChange={(e) => {
              setTemplName(e.target.value);
            }}
          />
          {/* 카테고리 */}
          <SelectBox
            size="large"
            label="카테고리"
            placeholder="카테고리를 선택해주세요"
            value={category}
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
          {/* 관리자 추천 */}
          <div>
            <Title label={"관리자 추천"} />
            <Segement
              className="w-full"
              itemClassName="text-body1-normal-medium"
              size="large"
              setSelected={setIsNoRecommend}
              selected={isNoRecommend}
              textList={["추천", "비추천"]}
            />
          </div>
        </div>

        <div className="flex *:flex-1 gap-gutter-horizontal">
          {/* 비율 */}
          <TextField label="비율" readOnly value={ratio} />
          {/* 길이 */}
          <TextField label="길이" readOnly value={length} />
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
            onClick={() => {}}
          >
            저장
          </OutlinedButton>
        </div>
      </ContentWrapper>
    </BreadcrumbContainer>
  );
}

export default TemplateDetail;
