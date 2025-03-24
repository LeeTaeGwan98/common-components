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

function WithdrawlModal() {
  // 모달에서 GET API요청이 필요한 경우
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["secondModalData"],
    queryFn: () => testGet(),
    enabled: false, // 자동 실행 비활성화, 이 속성을 없애면 모달이 열리자마자 GET요청이 실행됨
  });

  const [field, setField] = useState("");

  return (
    <DialogContent className="p-0 rounded-[12px] ">
      <DialogHeader className="w-full">
        <DialogTitle className="flex flex-col justify-start ">
          <div className="flex justify-start px-content-vertical-margin pt-content-vertical-margin text-heading5-bold">
            탈퇴사유
          </div>
        </DialogTitle>
        <DialogDescription className="px-content-vertical-margin pt-content-vertical-margin">
          <div className="flex flex-col  border border-line-normal-normal px-content-horizon-margin py-content-vertical-margin  gap-[12px]">
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
                title: "결제 이메일",
                content: "결제 이메일",
              }}
            />
            <div className="flex flex-col justify-start w-full">
              <div className="w-full flex text-label2-bold text-label-alternative mb-[6px]">
                탈퇴사유
              </div>
              <TextBox
                value="탈퇴사유 탈퇴사유 탈퇴사유"
                className="w-full flex text-body2-normal-regular text-label-alternative"
                disabled
              />
            </div>
          </div>
        </DialogDescription>
        <DialogDescription>
          {isLoading ? "로딩중임" : data?.data.title}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <div className="flex gap-[8px] pb-content-vertical-margin px-content-vertical-margin">
          <Button
            onClick={() => useModalStore.getState().closeModal()}
            className="w-full py-[12px]"
          >
            확인
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}

export default WithdrawlModal;
