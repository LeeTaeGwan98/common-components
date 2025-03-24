import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Actions from "@/components/common/Molecules/Actions/Actions";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import Dialog from "@/components/common/Organisms/Dialog/Dialog";
import { useState } from "react";

//출판 보류 사유 모달
export const PublishRejectReasonModal = () => {
  const [reason, setReason] = useState<string>(""); //보류 사유

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
          <OutlinedButton className="!flex-none" size="large" type="assistive">
            취소
          </OutlinedButton>
          <Button size="large">전송</Button>
        </Actions>
      }
    >
      <div className="py-content-vertical-margin px-content-horizon-margin">
        <div className="grid gap-[12px] py-[calc(var(--content-vertical-margin)-1px)] px-content-horizon-margin border-[1px] border-solid border-line-normal-normal rounded-radius-admin !box-border">
          <Row label={"닉네임"} description={"닉네임"} />
          <Row label={"도서명"} description={"도서명"} />
          <Row label={"저자/역자"} description={"저자/역자"} />
          <Row label={"제출일"} description={"제출일"} />
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
