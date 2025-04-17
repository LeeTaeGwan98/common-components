import { getPlanDetail, PlanUpdateReq, updatePlan } from "@/api/plan/planAPI";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Segement from "@/components/common/Atoms/Segement/Segement";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import Title from "@/components/common/BookaroongAdmin/Title";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// formState 타입 정의
type FormState = {
  annualFeeYear: number;
  annualFeeMonth: number;
  monthlyFeeYear: number;
  monthlyFeeMonth: number;
  point: number;
  ebookPublishCount: number;
  ebookPublishDeductedPoint: number;
  aiWritingCount: number;
  aiWritingDeductedPoint: number;
  scriptCreationCount: number;
  scriptCreationDeductedPoint: number;
  sceneImageCreationCount: number;
  sceneImageCreationDeductedPoint: number;
  avatarBackgroundCreationCount: number;
  avatarBackgroundCreationDeductedPoint: number;
  sceneLipsyncCount: number;
  sceneLipsyncDeductedPoint: number;
  aiVoiceCreationCount: number;
  aiVoiceCreationDeductedPoint: number;
  imageCreationCount: number;
  imageCreationDeductedPoint: number;
  backgroundSoundCreationCount: number;
  backgroundSoundCreationDeductedPoint: number;
  soundEffectCreationCount: number;
  soundEffectCreationDeductedPoint: number;
  sceneVideoExtensionCount: number;
  sceneVideoExtensionDeductedPoint: number;
  isWaterMark: boolean;
  isChatbot: boolean;
};

function PlanDetail() {
  const { id } = useParams(); // id 값 추출
  const queryClient = useQueryClient();
  const navigate = useNavigate(); //네비게이션

  //플랜 상세 조회
  const { data } = useSuspenseQuery({
    queryKey: ["planDetailApi"],
    queryFn: () => getPlanDetail(Number(id)),
    select: (data) => data.data.data,
  });

  // 폼 상태 관리
  const [formState, setFormState] = useState({
    annualFeeYear: data.annualFeeYear ?? 0, //연간 요금(연)
    annualFeeMonth: data.annualFeeMonth ?? 0, //연간 요금(월)
    monthlyFeeYear: data.monthlyFeeYear ?? 0, //월간 요금(연)
    monthlyFeeMonth: data.monthlyFeeMonth ?? 0, //월간 요금(월)
    point: data.point ?? 0, //포인트
    ebookPublishCount: data.ebookPublishCount ?? 0, //전자책 출판 등록 횟수
    ebookPublishDeductedPoint: data.ebookPublishDeductedPoint ?? 0, //전자책 출판 등록 차감 포인트
    aiWritingCount: data.aiWritingCount ?? 0, //ai 글쓰기 횟수
    aiWritingDeductedPoint: data.aiWritingDeductedPoint ?? 0, //ai 글쓰기 차감 포인트
    scriptCreationCount: data.scriptCreationCount ?? 0, //대본생성 획수
    scriptCreationDeductedPoint: data.scriptCreationDeductedPoint ?? 0, //대본생성 차감 포인트
    sceneImageCreationCount: data.sceneImageCreationCount ?? 0, //장면 이미지 생성 횟수
    sceneImageCreationDeductedPoint: data.sceneImageCreationDeductedPoint ?? 0, //장면 이미지 차감 포인트
    avatarBackgroundCreationCount: data.avatarBackgroundCreationCount ?? 0, //아바타 배경 생성 횟수
    //아바타 배경 생성 횟수 차감 포인트
    avatarBackgroundCreationDeductedPoint:
      data.avatarBackgroundCreationDeductedPoint ?? 0,
    sceneLipsyncCount: data.sceneLipsyncCount ?? 0, //씬별 립싱크 횟수
    sceneLipsyncDeductedPoint: data.sceneLipsyncDeductedPoint ?? 0, //씬별 립싱크 차감 포인트
    aiVoiceCreationCount: data.aiVoiceCreationCount ?? 0, //ai 목소리 생성 횟수
    aiVoiceCreationDeductedPoint: data.aiVoiceCreationDeductedPoint ?? 0, //ai 목소리 생성 차감 포인트
    imageCreationCount: data.imageCreationCount ?? 0, //이미지 생성 횟수
    imageCreationDeductedPoint: data.imageCreationDeductedPoint ?? 0, //이미지 생성 차감 포인트
    backgroundSoundCreationCount: data.backgroundSoundCreationCount ?? 0, //배경음 생성 횟수
    //배경음 생성 차감 포인트
    backgroundSoundCreationDeductedPoint:
      data.backgroundSoundCreationDeductedPoint ?? 0,
    soundEffectCreationCount: data.soundEffectCreationCount ?? 0, //효과음 생성 횟수
    soundEffectCreationDeductedPoint:
      data.soundEffectCreationDeductedPoint ?? 0, //효과음 생성 차감 포인트
    sceneVideoExtensionCount: data.sceneVideoExtensionCount ?? 0, //씬별 오디오 연장 횟수
    sceneVideoExtensionDeductedPoint:
      data.sceneVideoExtensionDeductedPoint ?? 0, //씬별 오디오 연장 차감
    isWaterMark: data.isWatermark, //워터마크 x 여부
    isChatbot: data.isChatbot, //챗봇 x 여부
  });
  // 폼 개별 상태 업데이트 핸들러
  const updateFormState = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //플랜 수정 api
  const { mutate: updatePlanFn } = useMutation({
    mutationFn: (payload: { id: number; data: PlanUpdateReq }) =>
      updatePlan(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["planDetailApi"] });
      navigate(-1);
    },
    onError() {
      customToast({
        title: "플랜 수정중 에러가 발생했습니다.",
      });
    },
  });

  return (
    <>
      <title>북카롱 | 픞랜 상세</title>
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
          <TextField label="플랜" readOnly={true} value={data.planName} />
          {/* 연/월간 요금 */}
          <div className="flex gap-gutter-horizontal">
            <TextField
              label="연간 요금(월)"
              placeholder="Placeholder"
              value={formState.annualFeeYear?.toLocaleString("kr")}
              maxLength={12}
              onChange={(e) => {
                // 숫자만 필터링
                const numericValue = e.target.value.replace(/\D/g, "");

                updateFormState("annualFeeYear", Number(numericValue));
              }}
            />
            <TextField
              label="연간 요금(연)"
              placeholder="Placeholder"
              value={formState.annualFeeMonth?.toLocaleString("kr")}
              maxLength={12}
              onChange={(e) => {
                // 숫자만 필터링
                const numericValue = e.target.value.replace(/\D/g, "");

                updateFormState("annualFeeMonth", Number(numericValue));
              }}
            />
            <TextField
              label="월간 요금(월)"
              placeholder="Placeholder"
              value={formState.monthlyFeeMonth?.toLocaleString("kr")}
              maxLength={12}
              onChange={(e) => {
                // 숫자만 필터링
                const numericValue = e.target.value.replace(/\D/g, "");

                updateFormState("monthlyFeeMonth", Number(numericValue));
              }}
            />
            <TextField
              label="월간 요금(연)"
              placeholder="Placeholder"
              value={formState.monthlyFeeYear?.toLocaleString("kr")}
              maxLength={12}
              onChange={(e) => {
                // 숫자만 필터링
                const numericValue = e.target.value.replace(/\D/g, "");

                updateFormState("monthlyFeeYear", Number(numericValue));
              }}
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
                value={formState.ebookPublishCount?.toLocaleString("kr")}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("ebookPublishCount", Number(numericValue));
                }}
              />
              <TextField
                label="&nbsp;"
                placeholder="차감포인트"
                subText="차감"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.ebookPublishDeductedPoint?.toLocaleString(
                  "kr"
                )}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "ebookPublishDeductedPoint",
                    Number(numericValue)
                  );
                }}
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
                setSelected={(value: boolean) => {
                  updateFormState("isWaterMark", value);
                }}
                selected={formState.isWaterMark}
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
                setSelected={(value: boolean) => {
                  updateFormState("isChatbot", value);
                }}
                selected={formState.isChatbot}
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
                value={formState.aiWritingCount?.toLocaleString("kr")}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("aiWritingCount", Number(numericValue));
                }}
              />
              <TextField
                label="&nbsp;"
                subText="차감"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.aiWritingDeductedPoint?.toLocaleString("kr")}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "aiWritingDeductedPoint",
                    Number(numericValue)
                  );
                }}
              />
            </div>
            <div className="flex w-full gap-gutter-horizontal">
              {/* 대본생성 */}
              <TextField
                label="대본생성"
                subText="회"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.scriptCreationCount?.toLocaleString("kr")}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("scriptCreationCount", Number(numericValue));
                }}
              />
              <TextField
                label="&nbsp;"
                subText="차감"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.scriptCreationDeductedPoint?.toLocaleString(
                  "kr"
                )}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "scriptCreationDeductedPoint",
                    Number(numericValue)
                  );
                }}
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
                value={formState.sceneImageCreationCount?.toLocaleString("kr")}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "sceneImageCreationCount",
                    Number(numericValue)
                  );
                }}
              />
              <TextField
                label="&nbsp;"
                subText="차감"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.sceneImageCreationDeductedPoint?.toLocaleString(
                  "kr"
                )}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "sceneImageCreationDeductedPoint",
                    Number(numericValue)
                  );
                }}
              />
            </div>
            <div className="flex w-full gap-gutter-horizontal">
              {/* 아바타 배경 생성 */}
              <TextField
                label="아바타 배경 생성"
                subText="회"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.avatarBackgroundCreationCount?.toLocaleString(
                  "kr"
                )}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "avatarBackgroundCreationCount",
                    Number(numericValue)
                  );
                }}
              />
              <TextField
                label="&nbsp;"
                subText="차감"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.avatarBackgroundCreationDeductedPoint?.toLocaleString(
                  "kr"
                )}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "avatarBackgroundCreationDeductedPoint",
                    Number(numericValue)
                  );
                }}
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
                value={formState.sceneLipsyncCount?.toLocaleString("kr")}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("sceneLipsyncCount", Number(numericValue));
                }}
              />
              <TextField
                label="&nbsp;"
                subText="차감"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.sceneLipsyncDeductedPoint?.toLocaleString(
                  "kr"
                )}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "sceneLipsyncDeductedPoint",
                    Number(numericValue)
                  );
                }}
              />
            </div>
            <div className="flex w-full gap-gutter-horizontal">
              {/* AI 목소리 생성 */}
              <TextField
                label="AI 목소리 생성"
                subText="회"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.aiVoiceCreationCount?.toLocaleString("kr")}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("aiVoiceCreationCount", Number(numericValue));
                }}
              />
              <TextField
                label="&nbsp;"
                subText="차감"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.aiVoiceCreationDeductedPoint?.toLocaleString(
                  "kr"
                )}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "aiVoiceCreationDeductedPoint",
                    Number(numericValue)
                  );
                }}
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
                value={formState.imageCreationCount?.toLocaleString("kr")}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("imageCreationCount", Number(numericValue));
                }}
              />
              <TextField
                label="&nbsp;"
                subText="차감"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.imageCreationDeductedPoint?.toLocaleString(
                  "kr"
                )}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "imageCreationDeductedPoint",
                    Number(numericValue)
                  );
                }}
              />
            </div>
            <div className="flex w-full gap-gutter-horizontal">
              {/* 배경음 생성 */}
              <TextField
                label="배경음 생성"
                subText="회"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.backgroundSoundCreationCount?.toLocaleString(
                  "kr"
                )}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "backgroundSoundCreationCount",
                    Number(numericValue)
                  );
                }}
              />
              <TextField
                label="&nbsp;"
                subText="차감"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.backgroundSoundCreationDeductedPoint?.toLocaleString(
                  "kr"
                )}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "backgroundSoundCreationDeductedPoint",
                    Number(numericValue)
                  );
                }}
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
                value={formState.soundEffectCreationCount?.toLocaleString("kr")}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "soundEffectCreationCount",
                    Number(numericValue)
                  );
                }}
              />
              <TextField
                label="&nbsp;"
                subText="차감"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.soundEffectCreationDeductedPoint?.toLocaleString(
                  "kr"
                )}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "soundEffectCreationDeductedPoint",
                    Number(numericValue)
                  );
                }}
              />
            </div>
            <div className="flex w-full gap-gutter-horizontal">
              {/* 씬별 오디오 연장 */}
              <TextField
                label="씬별 오디오 연장"
                subText="회"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.sceneVideoExtensionCount?.toLocaleString("kr")}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "sceneVideoExtensionCount",
                    Number(numericValue)
                  );
                }}
              />
              <TextField
                label="&nbsp;"
                subText="차감"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={formState.sceneVideoExtensionDeductedPoint?.toLocaleString(
                  "kr"
                )}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "sceneVideoExtensionDeductedPoint",
                    Number(numericValue)
                  );
                }}
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
              onClick={() =>
                updatePlanFn({
                  id: Number(id),
                  data: {
                    annualFeeYear: formState.annualFeeYear,
                    annualFeeMonth: formState.annualFeeMonth,
                    monthlyFeeYear: formState.monthlyFeeYear,
                    monthlyFeeMonth: formState.monthlyFeeMonth,
                    point: formState.point,
                    ebookPublishCount: formState.ebookPublishCount,
                    ebookPublishDeductedPoint:
                      formState.ebookPublishDeductedPoint,
                    isWatermark: formState.isWaterMark,
                    isChatbot: formState.isChatbot,
                    aiWritingCount: formState.aiWritingCount,
                    aiWritingDeductedPoint: formState.aiWritingDeductedPoint,
                    scriptCreationCount: formState.scriptCreationCount,
                    scriptCreationDeductedPoint:
                      formState.scriptCreationDeductedPoint,
                    sceneImageCreationCount: formState.sceneImageCreationCount,
                    sceneImageCreationDeductedPoint:
                      formState.sceneImageCreationDeductedPoint,
                    avatarBackgroundCreationCount:
                      formState.avatarBackgroundCreationCount,
                    avatarBackgroundCreationDeductedPoint:
                      formState.avatarBackgroundCreationDeductedPoint,
                    sceneLipsyncCount: formState.sceneLipsyncCount,
                    sceneLipsyncDeductedPoint:
                      formState.sceneLipsyncDeductedPoint,
                    aiVoiceCreationCount: formState.aiVoiceCreationCount,
                    aiVoiceCreationDeductedPoint:
                      formState.aiVoiceCreationDeductedPoint,
                    imageCreationCount: formState.imageCreationCount,
                    imageCreationDeductedPoint:
                      formState.imageCreationDeductedPoint,
                    backgroundSoundCreationCount:
                      formState.backgroundSoundCreationCount,
                    backgroundSoundCreationDeductedPoint:
                      formState.backgroundSoundCreationDeductedPoint,
                    soundEffectCreationCount:
                      formState.soundEffectCreationCount,
                    soundEffectCreationDeductedPoint:
                      formState.soundEffectCreationDeductedPoint,
                    sceneVideoExtensionCount:
                      formState.sceneVideoExtensionCount,
                    sceneVideoExtensionDeductedPoint:
                      formState.sceneVideoExtensionDeductedPoint,
                  },
                })
              }
            >
              저장
            </OutlinedButton>
          </div>
        </ContentWrapper>
      </BreadcrumbContainer>
    </>
  );
}

export default PlanDetail;
