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
import ChatbotModal from "@/components/modal/forum/ChatbotModal";

const ChatbotDetail = () => {
  const [isNoRecommend, setIsNoRecommend] = useState<boolean>(false);
  const [contentsField, setContentsField] =
    useState("출판 단계는 어떻게 이루어지나요");

  const { openModal } = useModalStore();
  const deleteModal = () => {
    openModal(<ChatbotModal />);
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
              <SelectBox label="카테고리" placeholder="카테고리를 선택해주세요">
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>asdf</SelectLabel>
                    <SelectItem value="asdf">asdf</SelectItem>
                    <SelectItem value="asdf1">asdf1</SelectItem>
                    <SelectItem value="asdf2">asdf2</SelectItem>
                    <SelectItem value="asdf3">asdf3</SelectItem>
                    <SelectItem value="asdf4">asdf4</SelectItem>
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
                setSelected={setIsNoRecommend}
                selected={isNoRecommend}
                textList={["노출", "비노출"]}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-[8px]">
            내용
            <TextBox
              value={contentsField}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setContentsField(e.target.value);
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
            <Button className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-primary-normal text-body1-normal-medium ">
              저장
            </Button>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
};

export default ChatbotDetail;
