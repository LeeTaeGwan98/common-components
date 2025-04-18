import React, { useState } from "react";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Divider from "@/components/common/Atoms/Divider/Divider";
import TextField from "@/components/common/Molecules/TextField/TextField";

import AdminEdit from "@/components/common/Molecules/AdminEdit/AdminEdit";
import Segement from "@/components/common/Atoms/Segement/Segement";
import Title from "@/components/common/BookaroongAdmin/Title";
import { useMutation } from "@tanstack/react-query";
import { addNotice, type NoticeRes } from "@/api/notice/noticeAPI";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import { useNavigate } from "react-router-dom";

const NoticeRegistration = () => {
  const naviate = useNavigate();
  const [title, setTitle] = useState("");
  const [isPinned, setIsPinned] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [content, setContent] = useState("");

  const isActiveButton = title && content;

  const { mutate: addNoticeFn } = useMutation({
    mutationFn: (obj: NoticeRes) => addNotice(obj),
    onSuccess() {
      naviate(-1);
    },
    onError() {
      customToast({
        title: "공지사항을 등록중에 에러가 발생했습니다.",
      });
    },
  });

  const handleSave = () => {
    if (!isActiveButton) return;
    addNoticeFn({
      title,
      isPinned,
      isVisible,
      content,
      createdBy: 1,
      updatedBy: 1,
    });
  };

  return (
    <>
      <title>북카롱 | 공지사항 등록</title>
      <BreadcrumbContainer
        breadcrumbNode={
          <>
            관리자 / 공지사항{" "}
            <Divider vertical className="h-[20px] mx-[12px]" />
            등록
          </>
        }
      >
        <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
          <div className="w-[1004px] flex flex-col gap-gutter-vertical">
            {/* 첫번째 줄 */}
            <div className="flex  w-full">
              <div className="w-full">
                <TextField
                  label="제목"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTitle(e.target.value);
                  }}
                  maxLength={100}
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
                  setSelected={setIsPinned}
                  selected={isPinned}
                  textList={["고정", "미고정"]}
                />
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

            {/* 세번째 줄 */}
            <div className="w-full flex flex-col gap-[8px]">
              내용
              <AdminEdit
                placeholder="공지사항 내용을 입력해주세요"
                isVideo={false}
                value={content}
                onChange={setContent}
              />
            </div>
            {/* 버튼 */}
            <div className="flex justify-end space-x-4">
              <OutlinedButton
                onClick={() => {
                  console.log("취소 버튼 클릭");
                }}
                className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-label-normal text-body1-normal-medium "
              >
                취소
              </OutlinedButton>
              <OutlinedButton
                onClick={handleSave}
                className="border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-primary-normal text-body1-normal-medium "
                disable={!isActiveButton}
              >
                저장
              </OutlinedButton>
            </div>
          </div>
        </div>
      </BreadcrumbContainer>
    </>
  );
};

export default NoticeRegistration;
