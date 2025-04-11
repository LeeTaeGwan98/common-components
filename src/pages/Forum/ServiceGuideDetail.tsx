import React, { useEffect } from "react";

import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { useState } from "react";

import AdminEdit from "@/components/common/Molecules/AdminEdit/AdminEdit";
import { useModalStore } from "@/store/modalStore";
import Segement from "@/components/common/Atoms/Segement/Segement";
import Title from "@/components/common/BookaroongAdmin/Title";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import ServiceGuideModal from "@/components/modal/forum/ServiceGuideModal";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getGuideDetail,
  updateGuide,
  UpdateGuiedData,
} from "@/api/serviceGuied/serviceGuiedAPI";
import { useNavigate, useParams } from "react-router-dom";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import { useAuthStore } from "@/store/authStore";

// formState 타입 정의
type FormState = {
  title: string;
  categoryCode: string;
  isEbook: boolean;
  isVisible: boolean;
  content: string;
};

const ServiceGuideDetail = () => {
  const queryClient = useQueryClient();
  const { id } = useParams(); // id 값 추출
  const { user } = useAuthStore(); //현재 로그인한 유저 정보
  const navigate = useNavigate(); //네비게이션

  //공통 코드 목록 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: [
      "serviceGuideGroupCodes",
      COMMON_GROUP_CODE_MAPPING.서비스코드,
      COMMON_GROUP_CODE_MAPPING.전자책만들기서비스가이드카테고리,
      COMMON_GROUP_CODE_MAPPING.비디오북만들기서비스가이드카테고리,
    ],
    queryFn: () =>
      getGroupCodes([
        COMMON_GROUP_CODE_MAPPING.서비스코드,
        COMMON_GROUP_CODE_MAPPING.전자책만들기서비스가이드카테고리,
        COMMON_GROUP_CODE_MAPPING.비디오북만들기서비스가이드카테고리,
      ]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const serviceCodes = codeInfo[keys[0]]; // 서비스 코드들

  //서비스가이드 상세 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["serviceGuideDetail", id],
    queryFn: () => getGuideDetail(Number(id)),
    select: (data) => data.data.data,
  });

  // 폼 상태 관리
  const [formState, setFormState] = useState({
    title: data.title,
    categoryCode: data.categoryCode,
    isEbook: data.serviceCode === serviceCodes[0].commDetailCode ? true : false,
    isVisible: data.isVisible,
    content: data.content,
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

  //카테고리 코드들
  const categoryItems = codeInfo[keys[formState.isEbook ? 1 : 2]];

  //서비스가이드 수정 api
  const { mutate: updateGuideFn } = useMutation({
    mutationFn: (payload: { id: number; data: UpdateGuiedData }) =>
      updateGuide(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["serviceGuideDetail", id] });
      navigate(-1);
    },
    onError() {
      customToast({
        title: "서비스가이드 수정중 에러가 발생했습니다.",
      });
    },
  });

  // 저장 버튼 활성화 여부
  const isFormValid =
    formState.title && formState.categoryCode && formState.content.length >= 10;

  // 저장 버튼 핸들러
  const handleSave = () => {
    if (!isFormValid) return;

    //서비스 가이드 수정
    updateGuideFn({
      id: Number(id),
      data: {
        serviceCode: serviceCodes[formState.isEbook ? 0 : 1].commDetailCode,
        categoryCode: formState.categoryCode,
        title: formState.title,
        isVisible: formState.isVisible,
        content: formState.content,
        updatedBy: user!.id,
      },
    });
  };

  //서비스 가이드 삭제 모달
  const { openModal } = useModalStore();
  const deleteModal = () => {
    openModal(<ServiceGuideModal id={Number(id)} />);
  };

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          게시판 관리 / 서비스 가이드
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
          <div className="flex  w-full">
            <div className="w-full">
              서비스 가이드 제목
              <TextField
                className="w-full h-[48px] mt-[8px] border border-label-assistive rounded-radius-admin p-[12px]  text-body1-normal-regular text-label-normal"
                value={formState.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  updateFormState("title", e.target.value);
                }}
                maxLength={30}
                placeholder="서비스 가이드 제목을 입력해주세요"
                isVisible={false}
              />
            </div>
          </div>
          <div className="flex  w-full">
            <div className="w-full">
              <SelectBox
                size="large"
                label="카테고리"
                placeholder="카테고리를 선택해주세요"
                value={formState.categoryCode}
                onValueChange={(value) =>
                  updateFormState("categoryCode", value)
                }
              >
                <SelectContent>
                  <SelectGroup>
                    {categoryItems.map((item, idx) => {
                      const { commDetailCode, detailCodeName } = item;
                      return (
                        <SelectItem key={idx} value={commDetailCode}>
                          {detailCodeName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </SelectBox>
            </div>
          </div>
          {/* 두번째 줄  */}
          <div className="flex *:flex-1 gap-gutter-horizontal">
            <div>
              <Title label={"서비스"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={(value: boolean) => {
                  updateFormState("isEbook", value);
                  updateFormState("categoryCode", "");
                }}
                selected={formState.isEbook}
                textList={["전자책 만들기", "비디오북 만들기"]}
              />
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

          {/* 세번째 줄 */}
          <div className="w-full flex flex-col gap-[8px]">
            내용
            <AdminEdit
              value={formState.content}
              onChange={(value) => updateFormState("content", value)}
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
};

export default ServiceGuideDetail;
