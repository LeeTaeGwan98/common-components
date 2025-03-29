import React, { useEffect, useReducer } from "react";

import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import { useState } from "react";
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
import ChatbotModal from "@/components/modal/forum/ChatbotModal";
import {
  createChatBot,
  getChatBotDetail,
} from "@/api/common/chatbot/chatbotAPI";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import CACHE_TIME from "@/Constants/CacheTime";

const ChatbotDetail = () => {
  const [categoryCode, setCategoryCode] = useState<string>(""); //카테고리
  const [isVisible, setIsVisible] = useState<boolean>(true); //노출 상태
  const [question, setQuestion] = useState<string>(""); //질문
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

  //챗봇 목록 상세 조회 api
  const { data, refetch } = useSuspenseQuery({
    queryKey: ["chatBotDetail"], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getChatBotDetail(1),
    select: (data) => data.data,
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
  });

  useEffect(() => {
    refetch();
  }, []);

  //챗봇 생성 api
  const CreateChatBot = useMutation({
    mutationFn: () =>
      createChatBot({
        categoryCode: "",
        question: question,
        isVisible: isVisible,
        createdBy: 0,
        updatedBy: 0,
      }),
    onSuccess(res, data) {
      console.log("post 요청 성공");
      console.log(res);
      console.log(data);
    },
  });

  // 챗봇 삭제 모달
  const deleteModal = () => {
    openModal(<ChatbotModal />);
  };

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
            <Button
              onClick={() => {
                console.log("취소 버튼 클릭");
              }}
              className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-label-normal text-body1-normal-medium "
            >
              취소
            </Button>
            <Button
              className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-primary-normal text-body1-normal-medium "
              disable={isDisableSave()}
              onClick={() => !isDisableSave() && CreateChatBot.mutate()}
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
};

export default ChatbotDetail;
