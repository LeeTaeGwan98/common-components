import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { useEffect, useState } from "react";

import AdminEdit, {
  parseHTML,
} from "@/components/common/Molecules/AdminEdit/AdminEdit";
import InquiryModal from "@/components/modal/forum/InquiryModal";
import { useModalStore } from "@/store/modalStore";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import {
  getInquiryDetail,
  inquiryResponse,
  InquiryResponseType,
  updateInquiryResponse,
} from "@/api/inquiry/inquiryAPI";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import { codeToGetGroupCode, codeToName } from "@/utils/uitls";

// formState 타입 정의
type FormState = {
  inquiryAt: string;
  name: string;
  serviceCode: string;
  type: string;
  content: string;
  isResponse: boolean;
  responseContent: string;
};

function InquiryDetail() {
  const queryClient = useQueryClient();
  const { id } = useParams(); // id 값 추출
  const { user } = useAuthStore(); //현재 로그인한 유저 정보
  const { openModal } = useModalStore();
  const navigate = useNavigate(); //네비게이션

  //공통 코드 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: [
      "chatbotCategoryGroupCodes",
      COMMON_GROUP_CODE_MAPPING.서비스코드,
      COMMON_GROUP_CODE_MAPPING.전자책서비스문의유형,
      COMMON_GROUP_CODE_MAPPING.비디오북서비스문의유형,
    ],
    queryFn: () =>
      getGroupCodes([
        COMMON_GROUP_CODE_MAPPING.서비스코드,
        COMMON_GROUP_CODE_MAPPING.전자책서비스문의유형,
        COMMON_GROUP_CODE_MAPPING.비디오북서비스문의유형,
      ]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const serviceCodes = codeInfo[keys[0]]; // 서비스 코드들
  const eBookInquiryCodes = codeInfo[keys[1]]; // 전자책 문의 유형 코드들
  const videoInquiryCodes = codeInfo[keys[2]]; // 비디오북 문의 유형 코드들

  //서비스가이드 상세 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["inquiryDetail", id],
    queryFn: () => getInquiryDetail(Number(id)),
    select: (data) => data.data.data,
  });

  useEffect(() => {}, [data]);

  // 폼 상태 관리
  const [formState, setFormState] = useState({
    inquiryAt: data.inquiryAt,
    name: data.name,
    serviceCode: data.serviceCode,
    type: data.type,
    content: data.content,
    isResponse: data.responseContent ? true : false,
    responseContent: data.responseContent,
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

  //문의사항 답변
  const { mutate: inquiryResponseFn } = useMutation({
    mutationFn: (payload: { id: number; data: InquiryResponseType }) =>
      formState.isResponse
        ? updateInquiryResponse(payload)
        : inquiryResponse(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["inquiryDetail", id] });
      navigate(-1);
    },
    onError() {
      customToast({
        title: "문의사항 답변중 에러가 발생했습니다.",
      });
    },
  });

  // 저장 버튼 활성화 여부
  const isFormValid =
    formState.responseContent &&
    parseHTML(formState.responseContent).length >= 10;

  // 저장 버튼 핸들러
  const handleSave = () => {
    if (!isFormValid) return;

    //문의 답변
    inquiryResponseFn({
      id: Number(id),
      data: {
        responseContent: formState.responseContent,
        responseAdminId: user!.id,
      },
    });
  };
  //문의사항 삭제 모달
  const deleteModal = () => {
    openModal(<InquiryModal id={Number(id)} />);
  };

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          게시판 관리 / 1:1문의
          <Divider vertical className="h-[20px] mx-[12px]" /> 상세
        </>
      }
      button={
        <>
          <Button
            className="rounded-radius-admin w-[180px] h-[48px]"
            onClick={deleteModal}
          >
            삭제
          </Button>
        </>
      }
    >
      <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
        <div className="w-[1004px] flex flex-col gap-gutter-vertical">
          {/* 첫번째 줄 */}
          <div className="flex gap-[20px] w-full">
            <div className="w-full">
              닉네임
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px]  text-body1-normal-regular "
                value={formState.name}
                isVisible={false}
                disabled
              />
            </div>
            <div className="w-full">
              문의일
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px]  text-body1-normal-regular "
                value={formState.inquiryAt}
                isVisible={false}
                disabled
              />
            </div>
          </div>
          {/* 두번째 줄  */}
          <div className="flex gap-[20px] w-full">
            <div className="w-full">
              서비스
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px]  text-body1-normal-regular "
                value={codeToName(serviceCodes, formState.serviceCode)}
                isVisible={false}
                disabled
              />
            </div>
            <div className="w-full">
              문의유형
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px]  text-body1-normal-regular "
                value={codeToName(
                  codeToGetGroupCode(formState.type) ===
                    COMMON_GROUP_CODE_MAPPING.전자책서비스문의유형
                    ? eBookInquiryCodes
                    : videoInquiryCodes,
                  formState.type
                )}
                isVisible={false}
                disabled
              />
            </div>
          </div>
          {/* 세번째 줄  */}
          <div className="flex gap-[20px] w-full">
            <div className="w-full">
              문의내용
              <TextBox
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] text-body1-normal-regular max-h-[156px]"
                value={formState.content}
                disabled
              />
            </div>
          </div>
          {/* 네번째 줄 */}
          <div className="w-full flex flex-col gap-[8px]">
            답변내용
            <AdminEdit
              value={formState.responseContent}
              onChange={(value) => updateFormState("responseContent", value)}
            />
          </div>
          {/* 버튼 */}
          <div className="mt-[32px] flex justify-end space-x-4">
            <OutlinedButton
              type="assistive"
              onClick={() => {
                navigate(-1);
              }}
              className="w-[180px] h-[48px]"
            >
              취소
            </OutlinedButton>
            <OutlinedButton
              type="secondary"
              disable={!isFormValid}
              onClick={handleSave}
              className="w-[180px] h-[48px]"
            >
              저장
            </OutlinedButton>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
}

export default InquiryDetail;
