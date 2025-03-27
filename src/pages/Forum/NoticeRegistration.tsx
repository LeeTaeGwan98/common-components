import React from "react";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { useState } from "react";

import AdminEdit from "@/components/common/Molecules/AdminEdit/AdminEdit";
import Segement from "@/components/common/Atoms/Segement/Segement";
import Title from "@/components/common/BookaroongAdmin/Title";
import { useMutation } from "@tanstack/react-query";
import { addNotice, type AddNoticePayload } from "@/api/notice/notice";

const NoticeRegistration = () => {
  const [title, setTitle] = useState("");
  const [isPinned, setIsPinned] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [content, setContent] = useState("");

  const { mutate: addNoticeFn } = useMutation({
    mutationFn: (obj: AddNoticePayload) => addNotice(obj),
    onSuccess(res, obj) {
      console.log("post 요청 성공");
      console.log(res);
      console.log(obj);
    },
  });

  console.log(title, isPinned, isVisible, content);

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          관리자 / 공지사항 <Divider vertical className="h-[20px] mx-[12px]" />
          등록
        </>
      }
    >
      <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
        <div className="w-[1004px] flex flex-col gap-gutter-vertical">
          {/* 첫번째 줄 */}
          <div className="flex  w-full">
            <div className="w-full">
              제목
              <TextField
                className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px]  text-body1-normal-regular text-label-normal"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
                placeholder="공지사항 제목을 입력해주세요"
                isVisible={false}
              />
            </div>
          </div>
          {/* 두번째 줄  */}
          <div className="flex *:flex-1 gap-gutter-horizontal">
            <div>
              <Title label={"고정 여부"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={setIsVisible}
                selected={isVisible}
                textList={["고정", "미고정"]}
              />
            </div>
            <div>
              <Title label={"노출 상태"} />
              <Segement
                className="w-full"
                itemClassName="text-body1-normal-medium"
                size="large"
                setSelected={setIsPinned}
                selected={isPinned}
                textList={["노출", "비노출"]}
              />
            </div>
          </div>

          {/* 세번째 줄 */}
          <div className="w-full flex flex-col gap-[8px]">
            답변내용
            <AdminEdit value={content} onChange={setContent} />
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
              onClick={() =>
                addNoticeFn({
                  title,
                  isPinned,
                  isVisible,
                  content,
                  createdBy: 1,
                  updatedBy: 1,
                })
              }
              className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-primary-normal text-body1-normal-medium "
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
};

export default NoticeRegistration;
