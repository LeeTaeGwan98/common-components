import API from "@/api/API";
import { ApiResType } from "@/api/common/commonType";

interface PlanListRes {
  id: number;
  planName: string;
  usePersonCnt: number;
  annualFeeYear: number;
  annualFeeMonth: number;
  monthlyFeeYear: number;
  monthlyFeeMonth: number;
}
// 플랜 목록 조회
export const getPlanList = () => {
  const data = API.get<{ data: PlanListRes[] }>(`/admin/video/plan`);
  return data;
};

interface PlanDetailRes {
  id: number;
  planName: string;
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
}

//플랜 상세 조회
export const getPlanDetail = (id: number) => {
  const data = API.get<{ data: PlanDetailRes }>(`/admin/video/plan/${id}`);
  return data;
};

//플랜 정보 수정 요청
export interface PlanUpdateReq {
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
}

//플랜 정보 수정
export const updatePlan = (payload: { id: number; data: PlanUpdateReq }) => {
  const data = API.patch<ApiResType<{}>>(
    `/admin/video/plan/${payload.id}`,
    payload.data
  );
  return data;
};
