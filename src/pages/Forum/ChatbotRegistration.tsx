import React from "react";

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
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createChatBot } from "@/api/common/chatbot/chatbotAPI";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
const ChatbotRegistration = () => {
  const navigate = useNavigate(); //네비게이션
  const [categoryCode, setCategoryCode] = useState<string>(""); //카테고리
  const [isVisible, setIsVisible] = useState<boolean>(true); //노출 상태
  const [question, setQuestion] = useState<string>(""); //질문
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

  //챗봇 생성 api
  const CreateChatBot = useMutation({
    mutationFn: () =>
      createChatBot({
        categoryCode: categoryCode,
        question: question,
        isVisible: isVisible,
        createdBy: user!.id,
        updatedBy: user!.id,
      }),
    onSuccess(res, data) {
      navigate(-1);
    },
  });

  //저장 버튼 disable 여부
  const isDisableSave = () => {
    if (categoryCode === "" || question === "") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          게시판 관리 / 챗봇 관리
          <Divider vertical className="h-[20px] mx-[12px]" /> 등록
        </>
      }
    >
      <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
        <div className="w-[1004px] flex flex-col gap-gutter-vertical">
          <div className="flex *:flex-1 items-center gap-gutter-horizontal">
            <div className="w-full">
              <SelectBox
                label="카테고리"
                placeholder="카테고리를 선택해주세요"
                onValueChange={(value) => {
                  setCategoryCode(value);
                }}
              >
                <SelectContent>
                  <SelectGroup>
                    {categoryCodes.map((code) => {
                      return (
                        <SelectItem value={code.commDetailCode}>
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
                setSelected={setIsVisible}
                selected={isVisible}
                textList={["노출", "비노출"]}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-[8px]">
            질문
            <TextBox
              value={question}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setQuestion(e.target.value);
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
              disable={isDisableSave()}
              onClick={() => !isDisableSave() && CreateChatBot.mutate()}
            >
              저장
            </OutlinedButton>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
};

export default ChatbotRegistration;
