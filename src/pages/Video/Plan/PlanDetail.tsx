import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Segement from "@/components/common/Atoms/Segement/Segement";
import Title from "@/components/common/BookaroongAdmin/Title";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import { useState } from "react";

function PlanDetail() {
  const [isNoWaterMark, setIsNoWaterMark] = useState<boolean>(false); //워터마크 x 여부
  const [isNoChatbot, setIsNoChatBot] = useState<boolean>(false); //챗봇 x 여부
  const [isNoSceneExtend, setIsNoSceneExtend] = useState<boolean>(false); //연장 x 여부
  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <div className="flex justify-center items-center">
          <>비디오북 관리 / 플랜 관리</>
          <Divider vertical className="h-[20px] mx-[12px]" />
          <>상세</>
        </div>
      }
    >
      <ContentWrapper>
        {/* 플랜 */}
        <TextField label="플랜" readOnly={true} value={"Advanced"} />
        {/* 연/월간 요금 */}
        <div className="flex gap-gutter-horizontal">
          <TextField
            label="연간 요금(월)"
            placeholder="Placeholder"
            value={""}
          />
          <TextField
            label="연간 요금(연)"
            placeholder="Placeholder"
            value={""}
          />
          <TextField
            label="월간 요금(월)"
            placeholder="Placeholder"
            value={""}
          />
          <TextField
            label="월간 요금(연)"
            placeholder="Placeholder"
            value={""}
          />
        </div>

        <div className="flex gap-gutter-horizontal">
          {/* 포인트 */}
          <div className="w-full">
            <TextField label="포인트" value={"10,000"} />
          </div>
          {/* 전자책 출판 등록 */}
          <div className="flex w-full gap-gutter-horizontal">
            <TextField
              label="전자책 출판 등록"
              placeholder="횟수"
              subText="회"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
            <TextField
              label="&nbsp;"
              placeholder="차감포인트"
              subText="차감"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
          </div>
        </div>

        <div className="flex gap-gutter-horizontal">
          {/* 워터마크 */}
          <div className="w-full">
            <Title label={"워터마크"} />
            <Segement
              className="w-full"
              itemClassName="text-body1-normal-medium"
              size="large"
              setSelected={setIsNoWaterMark}
              selected={isNoWaterMark}
              textList={["O", "X"]}
            />
          </div>
          {/* 챗봇 */}
          <div className="w-full">
            <Title label={"챗봇"} />
            <Segement
              className="w-full"
              itemClassName="text-body1-normal-medium"
              size="large"
              setSelected={setIsNoChatBot}
              selected={isNoChatbot}
              textList={["O", "X"]}
            />
          </div>
        </div>

        <div className="flex gap-gutter-horizontal">
          <div className="flex w-full gap-gutter-horizontal">
            {/* AI 글쓰기 */}
            <TextField
              label="AI 글쓰기"
              subText="회"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
            <TextField
              label="&nbsp;"
              subText="차감"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
          </div>
          <div className="flex w-full gap-gutter-horizontal">
            {/* 대본생성 */}
            <TextField
              label="대본생성"
              subText="회"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
            <TextField
              label="&nbsp;"
              subText="차감"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
          </div>
        </div>

        <div className="flex gap-gutter-horizontal">
          <div className="flex w-full gap-gutter-horizontal">
            {/* 장면 이미지 생성 */}
            <TextField
              label="장면 이미지 생성"
              subText="회"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
            <TextField
              label="&nbsp;"
              subText="차감"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
          </div>
          <div className="flex w-full gap-gutter-horizontal">
            {/* 아바타 배경 생성 */}
            <TextField
              label="아바타 배경 생성"
              subText="회"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
            <TextField
              label="&nbsp;"
              subText="차감"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
          </div>
        </div>

        <div className="flex gap-gutter-horizontal">
          <div className="flex w-full gap-gutter-horizontal">
            {/* 씬별 립싱크 */}
            <TextField
              label="씬별 립싱크"
              subText="회"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
            <TextField
              label="&nbsp;"
              subText="차감"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
          </div>
          <div className="flex w-full gap-gutter-horizontal">
            {/* AI 목소리 생성 */}
            <TextField
              label="AI 목소리 생성"
              subText="회"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
            <TextField
              label="&nbsp;"
              subText="차감"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
          </div>
        </div>

        <div className="flex gap-gutter-horizontal">
          <div className="flex w-full gap-gutter-horizontal">
            {/* 이미지 생성 */}
            <TextField
              label="이미지 생성"
              subText="회"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
            <TextField
              label="&nbsp;"
              subText="차감"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
          </div>
          <div className="flex w-full gap-gutter-horizontal">
            {/* 배경음 생성 */}
            <TextField
              label="배경음 생성"
              subText="회"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
            <TextField
              label="&nbsp;"
              subText="차감"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
          </div>
        </div>

        <div className="flex gap-gutter-horizontal">
          <div className="flex w-full gap-gutter-horizontal">
            {/* 효과음 생성 */}
            <TextField
              label="효과음 생성"
              subText="회"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
            <TextField
              label="&nbsp;"
              subText="차감"
              slot={{ subTextClassName: "text-label-alternative" }}
              value={""}
            />
          </div>
          {/* 씬별 비디오 연장 */}
          <div className="w-full">
            <Title label={"씬별 비디오 연장"} />
            <Segement
              className="w-full"
              itemClassName="text-body1-normal-medium"
              size="large"
              setSelected={setIsNoSceneExtend}
              selected={isNoSceneExtend}
              textList={["O", "X"]}
            />
          </div>
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
            type="secondary"
            className="max-w-[180px] w-full"
            size="large"
          >
            저장
          </OutlinedButton>
        </div>
      </ContentWrapper>
    </BreadcrumbContainer>
  );
}

export default PlanDetail;
