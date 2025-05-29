import { getPlanDetail, PlanUpdateReq, updatePlan } from "@/api/plan/planAPI";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Segement from "@/components/common/Atoms/Segement/Segement";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import Title from "@/components/common/BookaroongAdmin/Title";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import { PLAN } from "@/Constants/ServiceUrl";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// formState 타입 정의
type FormState = {
  annualFeeYear: number;
  annualFeeMonth: number;
  monthlyFeeYear: number;
  monthlyFeeMonth: number;
  isEbookPublish: boolean;
  isExcludeWatermark: boolean;
  aiWritingCount: number;
  aiWritingDeductedPoint: number;
  aiScriptCreationCount: number;
  aiScriptCreationDeductedPoint: number;
  chatbotUseCount: number;
  chatbotUseDeductedPoint: number;
  sceneImageCreationCount: number;
  sceneImageCreationDeductedPoint: number;
  sceneVideoCreationCount: number;
  sceneVideoCreationDeductedPoint: number;
  avatarBackgroundCreationCount: number;
  avatarBackgroundCreationDeductedPoint: number;
  avatarVoiceCreationCount: number;
  avatarVoiceCreationDeductedPoint: number;
  avatarLipsyncCount: number;
  avatarLipsyncDeductedPoint: number;
  aiVoiceCreationCount: number;
  aiVoiceCreationDeductedPoint: number;
  aiImageCreationCount: number;
  aiImageCreationDeductedPoint: number;
  backgroundSoundCreationCount: number;
  backgroundSoundCreationDeductedPoint: number;
  soundEffectCreationCount: number;
  soundEffectCreationDeductedPoint: number;
  soundExtensionCount: number;
  soundExtensionDeductedPoint: number;
  freeAvatarCount: number;
  isImageDb: boolean;
};

function PlanDetail() {
  const { id } = useParams(); // id 값 추출
  const queryClient = useQueryClient();
  const navigate = useNavigate(); //네비게이션

  //플랜 상세 조회
  const { data } = useSuspenseQuery({
    queryKey: ["planDetailApi", id],
    queryFn: () => getPlanDetail(Number(id)),
    select: (data) => data.data.data,
  });

  // 폼 상태 관리
  const [formState, setFormState] = useState({
    isUnlimitPlan: data.isUnlimitPlan, //무제한 플랜 여부
    isDefault: data.isDefault, //free 플랜 여부
    annualFeeYear: data.annualFeeYear ?? 0, //연간 요금(연)
    annualFeeMonth: data.annualFeeMonth ?? 0, //연간 요금(월)
    monthlyFeeYear: data.monthlyFeeYear ?? 0, //월간 요금(연)
    monthlyFeeMonth: data.monthlyFeeMonth ?? 0, //월간 요금(월)
    isEbookPublish: data.isEbookPublish, //전자책 출판 등록
    isExcludeWatermark: data.isExcludeWatermark, //워터마크 제외
    aiWritingCount: data.aiWritingCount ?? 0, //ai 글쓰기 횟수
    aiWritingDeductedPoint: data.aiWritingDeductedPoint ?? 0, //ai 글쓰기 차감 포인트
    aiScriptCreationCount: data.aiScriptCreationCount ?? 0, //대본생성 횟수
    aiScriptCreationDeductedPoint: data.aiScriptCreationDeductedPoint ?? 0, //대본생성 차감 포인트
    chatbotUseCount: data.chatbotUseCount ?? 0, //커스텀 챗봇 횟수
    chatbotUseDeductedPoint: data.chatbotUseDeductedPoint ?? 0, //커스텀 챗봇 차감 포인트
    sceneImageCreationCount: data.sceneImageCreationCount ?? 0, //씬별 이미지 생성 횟수
    sceneImageCreationDeductedPoint: data.sceneImageCreationDeductedPoint ?? 0, //씬별 이미지 차감 포인트
    sceneVideoCreationCount: data.sceneVideoCreationCount ?? 0, //씬별 영상 생성 횟수
    sceneVideoCreationDeductedPoint: data.sceneVideoCreationDeductedPoint ?? 0, //씬별 영상 차감 포인트
    avatarBackgroundCreationCount: data.avatarBackgroundCreationCount ?? 0, //아바타 배경 생성 횟수
    //아바타 배경 생성 횟수 차감 포인트
    avatarBackgroundCreationDeductedPoint:
      data.avatarBackgroundCreationDeductedPoint ?? 0,
    avatarVoiceCreationCount: data.avatarVoiceCreationCount ?? 0, //아바타 음성 생성 횟수
    avatarVoiceCreationDeductedPoint:
      data.avatarVoiceCreationDeductedPoint ?? 0, //아바타 음성 생성 차감 포인트
    avatarLipsyncCount: data.avatarLipsyncCount ?? 0, //아바타 립싱크 횟수
    avatarLipsyncDeductedPoint: data.avatarLipsyncDeductedPoint ?? 0, //아바타 립싱크 차감 포인트
    aiVoiceCreationCount: data.aiVoiceCreationCount ?? 0, //ai 목소리 생성 횟수
    aiVoiceCreationDeductedPoint: data.aiVoiceCreationDeductedPoint ?? 0, //ai 목소리 생성 차감 포인트
    aiImageCreationCount: data.aiImageCreationCount ?? 0, //ai 이미지 생성 횟수
    aiImageCreationDeductedPoint: data.aiImageCreationDeductedPoint ?? 0, //ai 이미지 생성 차감 포인트
    backgroundSoundCreationCount: data.backgroundSoundCreationCount ?? 0, //AI배경음 생성 횟수
    //AI배경음 생성 차감 포인트
    backgroundSoundCreationDeductedPoint:
      data.backgroundSoundCreationDeductedPoint ?? 0,
    soundEffectCreationCount: data.soundEffectCreationCount ?? 0, //AI효과음 생성 횟수
    soundEffectCreationDeductedPoint:
      data.soundEffectCreationDeductedPoint ?? 0, //AI효과음 생성 차감 포인트
    soundExtensionCount: data.soundExtensionCount ?? 0, //AI 배경음 연장 횟수
    soundExtensionDeductedPoint: data.soundExtensionDeductedPoint ?? 0, //AI 배경음 연장 차감
    freeAvatarCount: data.freeAvatarCount, //무료 아바타
    isImageDb: data.isImageDb, //이미지 DB
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
      <title>북카롱 | 플랜 상세</title>
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
          {/* 주의사항 */}
          <div className="flex flex-col gap-[12px] px-[16px] py-space-default bg-fill-alternative rounded-[10px]">
            <div className="flex flex-col gap-[4px]">
              <div className="text-caption1-bold text-primary-normal">
                플랜 할인율
              </div>
              <div className="flex text-label2-regular text-label-neutral">
                <div>&nbsp;•&nbsp;</div>
                <div>
                  플랜 별 요금을 입력하실 경우 할인율에 맞춰 입력해주세요
                  <br />
                  ex) starter 할인율이 20%일 경우 다른 플랜들도 20%로 맞춰주세요
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <div className="text-caption1-bold text-primary-normal">
                제공 횟수
              </div>
              <div className="flex text-label2-regular text-label-neutral">
                <div>&nbsp;•&nbsp;</div>
                <div>제공 항목이 무제한일 경우 숫자 ‘99999’를 입력해주세요</div>
              </div>
            </div>
          </div>
          {/* 연/월간 요금 */}
          <div className="flex gap-gutter-horizontal">
            <TextField
              label="연간 요금(연)"
              placeholder="Placeholder"
              value={
                formState.isDefault || formState.isUnlimitPlan
                  ? "-"
                  : formState.annualFeeYear?.toLocaleString("kr")
              }
              readOnly={formState.isDefault || formState.isUnlimitPlan}
              maxLength={12}
              onChange={(e) => {
                // 숫자만 필터링
                const numericValue = e.target.value.replace(/\D/g, "");

                updateFormState("annualFeeYear", Number(numericValue));
              }}
            />
            <TextField
              label="연간 요금(월)"
              placeholder="Placeholder"
              value={
                formState.isDefault || formState.isUnlimitPlan
                  ? "-"
                  : formState.annualFeeMonth?.toLocaleString("kr")
              }
              readOnly={formState.isDefault || formState.isUnlimitPlan}
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
              value={
                formState.isDefault || formState.isUnlimitPlan
                  ? "-"
                  : formState.monthlyFeeMonth?.toLocaleString("kr")
              }
              readOnly={formState.isDefault || formState.isUnlimitPlan}
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
              value={
                formState.isDefault || formState.isUnlimitPlan
                  ? "-"
                  : formState.monthlyFeeYear?.toLocaleString("kr")
              }
              readOnly={formState.isDefault || formState.isUnlimitPlan}
              maxLength={12}
              onChange={(e) => {
                // 숫자만 필터링
                const numericValue = e.target.value.replace(/\D/g, "");

                updateFormState("monthlyFeeYear", Number(numericValue));
              }}
            />
          </div>

          <div className="flex gap-gutter-horizontal">
            {/* 전자책 출판 등록 */}
            <div className="w-full">
              <Title label={"전자책 출판 등록"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={(value: boolean) => {
                  updateFormState("isEbookPublish", value);
                }}
                selected={formState.isEbookPublish}
                textList={["O", "X"]}
              />
            </div>
            {/* 워터마크 제외*/}
            <div className="w-full">
              <Title label={"워터마크 제외"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={(value: boolean) => {
                  updateFormState("isExcludeWatermark", value);
                }}
                selected={formState.isExcludeWatermark}
                textList={["O", "X"]}
              />
            </div>
          </div>

          <div className="flex gap-gutter-horizontal">
            <div className="flex w-full gap-gutter-horizontal">
              {/* AI 글쓰기 */}
              <TextField
                label="AI 글쓰기"
                subText={
                  formState.isDefault || formState.isUnlimitPlan ? "" : "회"
                }
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isDefault
                    ? "-"
                    : formState.isUnlimitPlan
                    ? "무제한"
                    : formState.aiWritingCount?.toLocaleString("kr")
                }
                readOnly={formState.isDefault || formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("aiWritingCount", Number(numericValue));
                }}
              />
              <TextField
                label="&nbsp;"
                subText={formState.isUnlimitPlan ? "" : "차감"}
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "-"
                    : formState.aiWritingDeductedPoint?.toLocaleString("kr")
                }
                maxLength={12}
                readOnly={formState.isUnlimitPlan}
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
                label="AI 대본생성"
                subText={
                  formState.isDefault || formState.isUnlimitPlan ? "" : "회"
                }
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isDefault
                    ? "-"
                    : formState.isUnlimitPlan
                    ? "무제한"
                    : formState.aiScriptCreationCount?.toLocaleString("kr")
                }
                readOnly={formState.isDefault || formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "aiScriptCreationCount",
                    Number(numericValue)
                  );
                }}
              />
              <TextField
                label="&nbsp;"
                subText={formState.isUnlimitPlan ? "" : "차감"}
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "-"
                    : formState.aiScriptCreationDeductedPoint?.toLocaleString(
                        "kr"
                      )
                }
                readOnly={formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "aiScriptCreationDeductedPoint",
                    Number(numericValue)
                  );
                }}
              />
            </div>
          </div>

          <div className="flex gap-gutter-horizontal">
            <div className="flex w-full gap-gutter-horizontal">
              {/* 커스텀 챗봇 */}
              <TextField
                label="커스텀 챗봇"
                subText={
                  formState.isDefault || formState.isUnlimitPlan ? "" : "회"
                }
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isDefault
                    ? "-"
                    : formState.isUnlimitPlan
                    ? "무제한"
                    : formState.chatbotUseCount?.toLocaleString("kr")
                }
                readOnly={formState.isDefault || formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("chatbotUseCount", Number(numericValue));
                }}
              />
              <TextField
                label="&nbsp;"
                subText={formState.isUnlimitPlan ? "" : "차감"}
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "-"
                    : formState.chatbotUseDeductedPoint?.toLocaleString("kr")
                }
                readOnly={formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "chatbotUseDeductedPoint",
                    Number(numericValue)
                  );
                }}
              />
            </div>
            <div className="flex w-full gap-gutter-horizontal">
              {/* 씬별 이미지 생성 */}
              <TextField
                label="씬별 이미지 생성"
                subText={
                  formState.isDefault || formState.isUnlimitPlan ? "" : "회"
                }
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isDefault
                    ? "-"
                    : formState.isUnlimitPlan
                    ? "무제한"
                    : formState.sceneImageCreationCount?.toLocaleString("kr")
                }
                readOnly={formState.isDefault || formState.isUnlimitPlan}
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
                subText={formState.isUnlimitPlan ? "" : "차감"}
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "-"
                    : formState.sceneImageCreationDeductedPoint?.toLocaleString(
                        "kr"
                      )
                }
                readOnly={formState.isUnlimitPlan}
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
          </div>

          <div className="flex gap-gutter-horizontal">
            <div className="flex w-full gap-gutter-horizontal">
              {/* 씬별 이미지 생성 */}
              <TextField
                label="씬별 영상 생성"
                subText={
                  formState.isDefault || formState.isUnlimitPlan ? "" : "회"
                }
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isDefault
                    ? "-"
                    : formState.isUnlimitPlan
                    ? "무제한"
                    : formState.sceneVideoCreationCount?.toLocaleString("kr")
                }
                readOnly={formState.isDefault || formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "sceneVideoCreationCount",
                    Number(numericValue)
                  );
                }}
              />
              <TextField
                label="&nbsp;"
                subText={formState.isUnlimitPlan ? "" : "차감"}
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "-"
                    : formState.sceneVideoCreationDeductedPoint?.toLocaleString(
                        "kr"
                      )
                }
                readOnly={formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "sceneVideoCreationDeductedPoint",
                    Number(numericValue)
                  );
                }}
              />
            </div>
            <div className="flex w-full gap-gutter-horizontal">
              {/* 아바타 배경 생성 */}
              <TextField
                label="아바타 배경 생성"
                subText={
                  formState.isDefault || formState.isUnlimitPlan ? "" : "회"
                }
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isDefault
                    ? "-"
                    : formState.isUnlimitPlan
                    ? "무제한"
                    : formState.avatarBackgroundCreationCount?.toLocaleString(
                        "kr"
                      )
                }
                readOnly={formState.isDefault || formState.isUnlimitPlan}
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
                subText={formState.isUnlimitPlan ? "" : "차감"}
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "-"
                    : formState.avatarBackgroundCreationDeductedPoint?.toLocaleString(
                        "kr"
                      )
                }
                readOnly={formState.isUnlimitPlan}
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
              {/* 아바타 음성 생성 */}
              <TextField
                label="아바타 음성 생성"
                subText={
                  formState.isDefault || formState.isUnlimitPlan ? "" : "회"
                }
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isDefault
                    ? "-"
                    : formState.isUnlimitPlan
                    ? "무제한"
                    : formState.avatarVoiceCreationCount?.toLocaleString("kr")
                }
                readOnly={formState.isDefault || formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "avatarVoiceCreationCount",
                    Number(numericValue)
                  );
                }}
              />
              <TextField
                label="&nbsp;"
                subText={formState.isUnlimitPlan ? "" : "차감"}
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "-"
                    : formState.avatarVoiceCreationDeductedPoint?.toLocaleString(
                        "kr"
                      )
                }
                readOnly={formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "avatarVoiceCreationDeductedPoint",
                    Number(numericValue)
                  );
                }}
              />
            </div>
            <div className="flex w-full gap-gutter-horizontal">
              {/* 아바타 립싱크 */}
              <TextField
                label="아바타 립싱크"
                subText={
                  formState.isDefault || formState.isUnlimitPlan ? "" : "회"
                }
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isDefault
                    ? "-"
                    : formState.isUnlimitPlan
                    ? "무제한"
                    : formState.avatarLipsyncCount?.toLocaleString("kr")
                }
                readOnly={formState.isDefault || formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("avatarLipsyncCount", Number(numericValue));
                }}
              />
              <TextField
                label="&nbsp;"
                subText={formState.isUnlimitPlan ? "" : "차감"}
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "-"
                    : formState.avatarLipsyncDeductedPoint?.toLocaleString("kr")
                }
                readOnly={formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "avatarLipsyncDeductedPoint",
                    Number(numericValue)
                  );
                }}
              />
            </div>
          </div>

          <div className="flex gap-gutter-horizontal">
            <div className="flex w-full gap-gutter-horizontal">
              {/* AI 목소리 생성 */}
              <TextField
                label="AI 목소리 생성"
                subText={
                  formState.isDefault || formState.isUnlimitPlan ? "" : "회"
                }
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isDefault
                    ? "-"
                    : formState.isUnlimitPlan
                    ? "무제한"
                    : formState.aiVoiceCreationCount?.toLocaleString("kr")
                }
                readOnly={formState.isDefault || formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("aiVoiceCreationCount", Number(numericValue));
                }}
              />
              <TextField
                label="&nbsp;"
                subText={formState.isUnlimitPlan ? "" : "차감"}
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "-"
                    : formState.aiVoiceCreationDeductedPoint?.toLocaleString(
                        "kr"
                      )
                }
                readOnly={formState.isUnlimitPlan}
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
            <div className="flex w-full gap-gutter-horizontal">
              {/* AI 이미지 생성 */}
              <TextField
                label="AI 이미지 생성"
                subText={
                  formState.isDefault || formState.isUnlimitPlan ? "" : "회"
                }
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isDefault
                    ? "-"
                    : formState.isUnlimitPlan
                    ? "무제한"
                    : formState.aiImageCreationCount?.toLocaleString("kr")
                }
                readOnly={formState.isDefault || formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("aiImageCreationCount", Number(numericValue));
                }}
              />
              <TextField
                label="&nbsp;"
                subText={formState.isUnlimitPlan ? "" : "차감"}
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "-"
                    : formState.aiImageCreationDeductedPoint?.toLocaleString(
                        "kr"
                      )
                }
                readOnly={formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "aiImageCreationDeductedPoint",
                    Number(numericValue)
                  );
                }}
              />
            </div>
          </div>

          <div className="flex gap-gutter-horizontal">
            <div className="flex w-full gap-gutter-horizontal">
              {/* AI 배경음 생성 */}
              <TextField
                label="AI 배경음 생성"
                subText={
                  formState.isDefault || formState.isUnlimitPlan ? "" : "회"
                }
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isDefault
                    ? "-"
                    : formState.isUnlimitPlan
                    ? "무제한"
                    : formState.backgroundSoundCreationCount?.toLocaleString(
                        "kr"
                      )
                }
                readOnly={formState.isDefault || formState.isUnlimitPlan}
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
                subText={formState.isUnlimitPlan ? "" : "차감"}
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "-"
                    : formState.backgroundSoundCreationDeductedPoint?.toLocaleString(
                        "kr"
                      )
                }
                readOnly={formState.isUnlimitPlan}
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
            <div className="flex w-full gap-gutter-horizontal">
              {/* AI 효과음 생성 */}
              <TextField
                label="AI 효과음 생성"
                subText={
                  formState.isDefault || formState.isUnlimitPlan ? "" : "회"
                }
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isDefault
                    ? "-"
                    : formState.isUnlimitPlan
                    ? "무제한"
                    : formState.soundEffectCreationCount?.toLocaleString("kr")
                }
                readOnly={formState.isDefault || formState.isUnlimitPlan}
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
                subText={formState.isUnlimitPlan ? "" : "차감"}
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "-"
                    : formState.soundEffectCreationDeductedPoint?.toLocaleString(
                        "kr"
                      )
                }
                readOnly={formState.isUnlimitPlan}
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
          </div>

          <div className="flex gap-gutter-horizontal">
            <div className="flex w-full gap-gutter-horizontal">
              {/* AI 배경음 연장 */}
              <TextField
                label="AI 배경음 연장"
                subText={
                  formState.isDefault || formState.isUnlimitPlan ? "" : "회"
                }
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isDefault
                    ? "-"
                    : formState.isUnlimitPlan
                    ? "무제한"
                    : formState.soundExtensionCount?.toLocaleString("kr")
                }
                readOnly={formState.isDefault || formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("soundExtensionCount", Number(numericValue));
                }}
              />
              <TextField
                label="&nbsp;"
                subText={formState.isUnlimitPlan ? "" : "차감"}
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "-"
                    : formState.soundExtensionDeductedPoint?.toLocaleString(
                        "kr"
                      )
                }
                readOnly={formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState(
                    "soundExtensionDeductedPoint",
                    Number(numericValue)
                  );
                }}
              />
            </div>
            <div className="w-full">
              <TextField
                label="무료 아바타"
                subText={formState.isUnlimitPlan ? "" : "종"}
                placeholder="사용 가능 개수"
                slot={{ subTextClassName: "text-label-alternative" }}
                value={
                  formState.isUnlimitPlan
                    ? "무제한"
                    : formState.freeAvatarCount?.toLocaleString("kr")
                }
                readOnly={formState.isUnlimitPlan}
                maxLength={12}
                onChange={(e) => {
                  // 숫자만 필터링
                  const numericValue = e.target.value.replace(/\D/g, "");

                  updateFormState("freeAvatarCount", Number(numericValue));
                }}
              />
            </div>
          </div>

          <div className="flex gap-gutter-horizontal">
            {/* 이미지 DB*/}
            <div className="w-full">
              <Title label={"이미지 DB"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={(value: boolean) => {
                  updateFormState("isImageDb", value);
                }}
                selected={formState.isImageDb}
                textList={["O", "X"]}
              />
            </div>
            <div className="w-full"></div>
          </div>

          <div className="flex justify-end gap-[12px]">
            <Link className="max-w-[180px] w-full" to={PLAN}>
              <OutlinedButton className="w-full" size="large" type="assistive">
                취소
              </OutlinedButton>
            </Link>

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
                    isEbookPublish: formState.isEbookPublish,
                    isExcludeWatermark: formState.isExcludeWatermark,
                    aiWritingCount: formState.aiWritingCount,
                    aiWritingDeductedPoint: formState.aiWritingDeductedPoint,
                    aiScriptCreationCount: formState.aiScriptCreationCount,
                    aiScriptCreationDeductedPoint:
                      formState.aiScriptCreationDeductedPoint,
                    chatbotUseCount: formState.chatbotUseCount,
                    chatbotUseDeductedPoint: formState.chatbotUseDeductedPoint,
                    sceneImageCreationCount: formState.sceneImageCreationCount,
                    sceneImageCreationDeductedPoint:
                      formState.sceneImageCreationDeductedPoint,
                    sceneVideoCreationCount: formState.sceneVideoCreationCount,
                    sceneVideoCreationDeductedPoint:
                      formState.sceneVideoCreationDeductedPoint,
                    avatarBackgroundCreationCount:
                      formState.avatarBackgroundCreationCount,
                    avatarBackgroundCreationDeductedPoint:
                      formState.avatarBackgroundCreationDeductedPoint,
                    avatarVoiceCreationCount:
                      formState.avatarVoiceCreationCount,
                    avatarVoiceCreationDeductedPoint:
                      formState.avatarVoiceCreationDeductedPoint,
                    avatarLipsyncCount: formState.avatarLipsyncCount,
                    avatarLipsyncDeductedPoint:
                      formState.avatarLipsyncDeductedPoint,
                    aiVoiceCreationCount: formState.aiVoiceCreationCount,
                    aiVoiceCreationDeductedPoint:
                      formState.aiVoiceCreationDeductedPoint,
                    aiImageCreationCount: formState.aiImageCreationCount,
                    aiImageCreationDeductedPoint:
                      formState.aiImageCreationDeductedPoint,
                    backgroundSoundCreationCount:
                      formState.backgroundSoundCreationCount,
                    backgroundSoundCreationDeductedPoint:
                      formState.backgroundSoundCreationDeductedPoint,
                    soundEffectCreationCount:
                      formState.soundEffectCreationCount,
                    soundEffectCreationDeductedPoint:
                      formState.soundEffectCreationDeductedPoint,
                    soundExtensionCount: formState.soundExtensionCount,
                    soundExtensionDeductedPoint:
                      formState.soundExtensionDeductedPoint,
                    freeAvatarCount: formState.freeAvatarCount,
                    isImageDb: formState.isImageDb,
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
