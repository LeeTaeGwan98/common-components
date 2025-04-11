import { useModalStore } from "@/store/modalStore";
import { useQuery } from "@tanstack/react-query";
import { testGet, testPost } from "@/api/example";

import Button from "@/components/common/Atoms/Button/Solid/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CardRow from "@/components/common/Molecules/CardRow/CardRow";
import Divider from "@/components/common/Atoms/Divider/Divider";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import { useState } from "react";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import Actions from "@/components/common/Molecules/Actions/Actions";

function WithdrawlModal() {
  // 모달에서 GET API요청이 필요한 경우
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["secondModalData"],
    queryFn: () => testGet(),
    enabled: false, // 자동 실행 비활성화, 이 속성을 없애면 모달이 열리자마자 GET요청이 실행됨
  });

  const [field, setField] = useState("");

  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading="탈퇴 사유"
        fixed={false}
        close={true}
        buttonElements={
          <Actions className="w-full h-[48px]  mx-0" priority={"single"}>
            <Button
              size="large"
              onClick={() => {
                useModalStore.getState().closeModal();
              }}
            >
              확인
            </Button>
          </Actions>
        }
      >
        <div className="px-[32px] pt-[32px]">
          <div className="flex flex-col  border border-line-normal-normal px-content-horizon-margin py-content-vertical-margin gap-[12px]">
            <CardRow
              className="w-[432px]"
              data={{
                title: "닉네임",
                content: "닉네임",
              }}
              slot={{
                contentClassName:
                  "text-body2-reading-regular text-label-normal",
                titleClassname: "text-label2-bold text-label-alternative",
              }}
            />
            <CardRow
              slot={{
                contentClassName:
                  "text-body2-reading-regular text-label-normal",
                titleClassname: "text-label2-bold text-label-alternative",
              }}
              data={{
                title: "탈퇴일",
                content: "탈퇴일",
              }}
            />
            <div className="flex flex-col justify-start w-full">
              <div className="w-full flex text-label2-bold text-label-alternative mb-[6px]">
                탈퇴 사유
              </div>
              <TextBox
                value="탈퇴사유 탈퇴사유 탈퇴사유"
                className="w-full flex text-body2-normal-regular text-label-alternative"
                disabled
              />
            </div>
          </div>
        </div>
        ;
      </DialogDetailContent>
    </DialogContent>
  );
}

export default WithdrawlModal;
