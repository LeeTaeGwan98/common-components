import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import { useState } from "react";
import { useModalStore } from "@/store/modalStore";
import Segement from "@/components/common/Atoms/Segement/Segement";
import Title from "@/components/common/BookaroongAdmin/Title";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import ChatbotModal from "@/components/modal/forum/ChatbotModal";
import {
  getChatBotDetail,
  updateChatBot,
  UpdateChatBotData,
} from "@/api/chatbot/chatbotAPI";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { useNavigate, useParams } from "react-router-dom";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import { useAuthStore } from "@/store/authStore";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";

// formState 타입 정의
type FormState = {
  categoryCode: string;
  isVisible: boolean;
  question: string;
};

const ChatbotDetail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); //네비게이션
  const { id } = useParams(); // id 값 추출
  const { user } = useAuthStore(); //현재 로그인한 유저 정보
  //챗봇 공통 카테고리 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: [
      "chatbotCategoryGroupCodes",
      COMMON_GROUP_CODE_MAPPING.챗봇공통카테고리,
    ],
    queryFn: () => getGroupCodes([COMMON_GROUP_CODE_MAPPING.챗봇공통카테고리]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const categoryCodes = codeInfo[keys[0]]; // 카테고리 코드들
  const { openModal } = useModalStore();

  //챗봇 상세 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["chatBotDetail", id],
    queryFn: () => getChatBotDetail(Number(id)),
    select: (data) => data.data.data,
  });

  // 폼 상태 관리
  const [formState, setFormState] = useState({
    categoryCode: data.categoryCode,
    isVisible: data.isVisible,
    question: data.question,
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

  //챗봇 수정 api
  const { mutate: updateChatbotFn } = useMutation({
    mutationFn: (payload: { id: number; data: UpdateChatBotData }) =>
      updateChatBot(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["chatBotDetail", id] });
      navigate(-1);
    },
    onError() {
      customToast({
        title: "챗봇을 수정중 에러가 발생했습니다.",
      });
    },
  });

  // 저장 버튼 활성화 여부
  const isFormValid = formState.categoryCode && formState.question;

  // 저장 버튼 핸들러
  const handleSave = () => {
    if (!isFormValid) return;

    updateChatbotFn({
      id: Number(id),
      data: {
        categoryCode: formState.categoryCode,
        question: formState.question,
        isVisible: formState.isVisible,
        updatedBy: user!.id,
      },
    });
  };

  // 챗봇 삭제 모달
  const deleteModal = () => {
    openModal(<ChatbotModal id={Number(id)} />);
  };

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          게시판 관리 / 챗봇 관리
          <Divider vertical className="h-[20px] mx-[12px]" /> 상세
        </>
      }
      button={
        <Button
          className="rounded-radius-admin w-[180px] h-[48px]"
          onClick={deleteModal}
        >
          삭제
        </Button>
      }
    >
      <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
        <div className="w-[1004px] flex flex-col gap-gutter-vertical">
          <div className="flex *:flex-1 items-center gap-gutter-horizontal">
            <div className="w-full">
              <SelectBox
                label="카테고리"
                placeholder="카테고리를 선택해주세요"
                value={formState.categoryCode}
                onValueChange={(value) => {
                  updateFormState("categoryCode", value);
                }}
              >
                <SelectContent>
                  <SelectGroup>
                    {categoryCodes.map((code, index) => {
                      return (
                        <SelectItem key={index} value={code.commDetailCode}>
                          {code.detailCodeName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </SelectBox>
            </div>
            <div>
              <Title label={"노출 상태"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={(value: boolean) =>
                  updateFormState("isVisible", value)
                }
                selected={formState.isVisible}
                textList={["노출", "비노출"]}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-[8px]">
            <TextBox
              value={formState.question}
              label="질문"
              onChange={(e) => {
                updateFormState("question", e.target.value);
              }}
              placeholder="질문을 입력하세요"
            />
          </div>
          {/* 버튼 */}
          <div className="mt-[32px] flex justify-end space-x-4">
            <OutlinedButton
              className="w-[180px] h-[48px]"
              type="assistive"
              size="large"
              onClick={() => navigate(-1)}
            >
              취소
            </OutlinedButton>
            <OutlinedButton
              className="w-[180px] h-[48px]"
              type="secondary"
              size="large"
              disable={!isFormValid}
              onClick={handleSave}
            >
              저장
            </OutlinedButton>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
};

export default ChatbotDetail;
