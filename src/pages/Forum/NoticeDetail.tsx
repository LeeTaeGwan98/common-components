import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { useState } from "react";

import AdminEdit from "@/components/common/Molecules/AdminEdit/AdminEdit";
import { useModalStore } from "@/store/modalStore";
import Segement from "@/components/common/Atoms/Segement/Segement";
import Title from "@/components/common/BookaroongAdmin/Title";
import NoticeDelModal from "@/components/modal/forum/NoticeDelModal";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getNoticeDetail } from "@/api/notice/noticeAPI";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import { useAuthStore } from "@/store/authStore";
import { updateNotice, type UpdateNoticePayload } from "@/api/notice/noticeAPI";
import { customToast } from "@/components/common/Atoms/Toast/Toast";

// formState 타입 정의
type FormState = {
  title: string;
  content: string;
  isPinned: boolean;
  isVisible: boolean;
};

const NoticeDetail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthStore();
  const { openModal } = useModalStore();

  // 데이터 조회
  const { data } = useSuspenseQuery({
    queryKey: ["noticeDetail", id],
    queryFn: () => getNoticeDetail(Number(id)),
    select: (data) => data.data.data,
  });

  // 폼 상태 관리
  const [formState, setFormState] = useState({
    title: data.title,
    content: data.content,
    isPinned: data.isPinned,
    isVisible: data.isVisible,
  });

  // 개별 상태 업데이트 핸들러
  const updateFormState = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 버튼 활성화 여부
  const isFormValid = formState.title && formState.content;

  // 수정 API 호출
  const { mutate: updateNoticeFn } = useMutation({
    mutationFn: (payloadWithId: { id: number; payload: UpdateNoticePayload }) =>
      updateNotice(payloadWithId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["noticeDetail", id] });
      navigate(-1);
    },
    onError() {
      customToast({
        title: "공지사항을 수정중 에러가 발생했습니다.",
      });
    },
  });

  // 저장 버튼 핸들러
  const handleSave = () => {
    if (!isFormValid) return;

    updateNoticeFn({
      id: Number(id),
      payload: {
        title: formState.title,
        content: formState.content,
        isPinned: formState.isPinned,
        isVisible: formState.isVisible,
        updatedBy: user!.id,
      },
    });
  };

  // 삭제 모달 오픈
  const openDeleteModal = () => {
    openModal(<NoticeDelModal id={Number(id)} />);
  };

  return (
    <>
      <title>북카롱 | 공지사항 상세</title>
      <BreadcrumbContainer
        breadcrumbNode={<>게시판 관리 / 공지사항 상세</>}
        button={
          <Button
            className="rounded-radius-admin w-[180px] h-[48px]"
            onClick={openDeleteModal}
          >
            삭제
          </Button>
        }
      >
        <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
          <div className="w-[1004px] flex flex-col gap-gutter-vertical">
            {/* 첫번째 줄 */}
            <div className="flex w-full">
              <div className="w-full">
                <TextField
                  label="제목"
                  value={formState.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateFormState("title", e.target.value);
                  }}
                  maxLength={100}
                  placeholder="공지사항 제목을 입력해주세요"
                  isVisible={false}
                />
              </div>
            </div>

            {/* 두번째 줄 */}
            <div className="flex *:flex-1 gap-gutter-horizontal">
              <div>
                <Title label={"고정 여부"} />
                <Segement
                  className="w-full"
                  itemClassName="text-body1-normal-medium"
                  size="large"
                  setSelected={(value: boolean) =>
                    updateFormState("isPinned", value)
                  }
                  selected={formState.isPinned}
                  textList={["고정", "미고정"]}
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
                className="h-[608px]"
                placeholder="공지사항 내용을 입력해주세요"
                isVideo={false}
                value={formState.content}
                onChange={(value) => updateFormState("content", value)}
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-4">
              <OutlinedButton
                onClick={() => navigate(-1)}
                className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-label-normal text-body1-normal-medium"
              >
                취소
              </OutlinedButton>
              <OutlinedButton
                onClick={handleSave}
                className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-primary-normal text-body1-normal-medium"
                disable={!isFormValid}
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

export default NoticeDetail;
