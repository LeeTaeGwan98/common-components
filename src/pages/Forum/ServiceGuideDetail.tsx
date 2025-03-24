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
import NoticeDetailModal from "@/components/modal/forum/NoticeDetailModal";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import ServiceGuideModal from "@/components/modal/forum/ServiceGuideModal";

const ServiceGuideDetail = () => {
  const [titleContents, setTitleContents] =
    useState("[공지] 전자책 진행 일정 관련");
  const [isNoExposure, setIsNoExposure] = useState<boolean>(false);
  const [isNoRecommend, setIsNoRecommend] = useState<boolean>(false);
  const [answerContents, setAnswerContents] = useState(
    "안녕하세요 북카롱입니다 현재 작업량이 많아"
  );

  const { openModal } = useModalStore();
  const deleteModal = () => {
    openModal(<ServiceGuideModal />);
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
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px]  text-body1-normal-regular text-label-normal"
                value={titleContents}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitleContents(e.target.value);
                }}
                placeholder="서비스 가이드 제목을 입력해주세요"
                isVisible={false}
              />
            </div>
          </div>
          <div className="flex  w-full">
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
          </div>
          {/* 두번째 줄  */}
          <div className="flex *:flex-1 gap-gutter-horizontal">
            <div>
              <Title label={"서비스"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={setIsNoRecommend}
                selected={isNoRecommend}
                textList={["전자책 만들기", "비디오북 만들기"]}
              />
            </div>
            <div>
              <Title label={"노출 상태"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={setIsNoExposure}
                selected={isNoExposure}
                textList={["노출", "비노출"]}
              />
            </div>
          </div>

          {/* 세번째 줄 */}
          <div className="w-full flex flex-col gap-[8px]">
            내용
            <AdminEdit value={answerContents} onChange={setAnswerContents} />
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

export default ServiceGuideDetail;
