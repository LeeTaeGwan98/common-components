import { getEbookDetail, postEbookHold } from "@/api/ebook";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Actions from "@/components/common/Molecules/Actions/Actions";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import Dialog from "@/components/common/Organisms/Dialog/Dialog";
import { useAuthStore } from "@/store/authStore";
import { useModalStore } from "@/store/modalStore";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

interface PublishPostHoldModalProps {
  ebookId: number;
  onHoldSuccess: () => void; //보류 성공시 이벤트
}

export const PublishPostHoldModal = ({
  ebookId,
  onHoldSuccess,
}: PublishPostHoldModalProps) => {
  const [reason, setReason] = useState<string>(""); //보류 사유

  const { user } = useAuthStore();

  //전자책 상세 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["ebookDetailApi"], // filterInfo가 변경될 때마다 API 호출
    queryFn: () => getEbookDetail(ebookId),
    select: (data) => data.data.data,
  });

  //전자책 보류 api
  const CreateEbookHold = useMutation({
    mutationFn: () =>
      postEbookHold(ebookId, {
        holdReason: reason,
        adminId: user?.id as number,
      }),
    onSuccess(res, data) {
      onHoldSuccess && onHoldSuccess();
      useModalStore.getState().closeModal();
    },
  });

  interface RowProps {
    label: string;
    description: string;
  }
  function Row({ label, description }: RowProps) {
    return (
      <div>
        <div className="text-label2-bold text-label-alternative pb-[6px]">
          {label}
        </div>
        <div className="text-body2-reading-regular text-label-normal">
          {description}
        </div>
      </div>
    );
  }
  return (
    <Dialog
      className="w-[560px] max-w-none [&>button]:hidden"
      fixed={false}
      heading="출판 보류 사유"
      close={true}
      buttonElements={
        <Actions className="w-full h-[48px]" priority={"neutral"}>
          <OutlinedButton
            className="!flex-none"
            size="large"
            type="assistive"
            onClick={() => useModalStore.getState().closeModal()}
          >
            취소
          </OutlinedButton>
          <Button
            onClick={() => CreateEbookHold.mutate()}
            disable={reason.length < 2}
            size="large"
          >
            전송
          </Button>
        </Actions>
      }
    >
      <div className="py-content-vertical-margin px-content-horizon-margin">
        <div className="grid gap-[12px] py-[calc(var(--content-vertical-margin)-1px)] px-content-horizon-margin border-[1px] border-solid border-line-normal-normal rounded-radius-admin !box-border">
          <Row label={"닉네임"} description={data.name} />
          <Row label={"도서명"} description={data.title} />
          <Row label={"저자/역자"} description={data.author} />
          <Row label={"제출일"} description={data.submittedAt} />
          <div>
            <div className="text-label2-bold text-label-alternative mb-[6px]">
              보류 사유
            </div>
            <TextBox
              className="gap-[6px] h-[166px]"
              label=""
              placeholder="보류 사유를 입력해주세요"
              value={reason}
              maxLength={1000}
              onChange={(e) => {
                setReason(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};
