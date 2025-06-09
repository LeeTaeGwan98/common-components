import { useModalStore } from "@/store/modalStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { testGet, testPost } from "@/api/example";

import Button from "@/components/common/Atoms/Button/Solid/Button";
import { DialogContent } from "@/components/ui/dialog";
import CardRow from "@/components/common/Molecules/CardRow/CardRow";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Actions from "@/components/common/Molecules/Actions/Actions";
import X from "@/assets/svg/common/X.svg";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import { getExchangeDetail } from "@/api/user/userAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_DETAIL } from "@/Constants/ServiceUrl";

const PaymentModal = ({ id }: { id: string }) => {
  const nav = useNavigate();
  const { closeModal } = useModalStore();
  const [detailData, setDetailData] = useState<
    { label: string; value: string; isUnderLine?: boolean }[]
  >([]);
  // 결제 상세
  const { data } = useQuery({
    queryKey: ["getExchangeDetail"],
    queryFn: () => getExchangeDetail(id),
    select: (data) => data.data.data,
  });

  useEffect(() => {
    const datas: { label: string; value: string; isUnderLine?: boolean }[] = [];
    datas.push({
      label: "닉네임",
      value: data?.name ?? "",
      isUnderLine: true,
    });
    datas.push({
      label: "결제 이메일",
      value: data?.email ?? "",
    });
    datas.push({
      label: "결제 내역",
      value: data?.orderType ?? "",
    });
    datas.push({
      label: "결제 상세 내역",
      value: data?.orderDesc ?? "",
    });
    datas.push({
      label: "결제일",
      value: data?.paidAt ?? "",
    });
    datas.push({
      label: "결제 금액",
      value:
        data?.orderType === "플랜"
          ? "$" + data?.paidAmount
          : "￦" + data?.paidAmount,
    });
    datas.push({
      label: "카드 종류",
      value: data?.cardName ?? "",
    });
    datas.push({
      label: "카드 번호",
      value: data?.cardNumber ? data?.cardNumber : "-",
    });
    datas.push({
      label: "결제 상태",
      value:
        (data?.status ?? "") === "결제취소" ? "취소완료" : data?.status ?? "",
    });

    setDetailData(datas);
  }, [data]);

  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] h-[720px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading="결제 상세"
        close={true}
        fixed={true}
        childrenClassName="h-auto"
        buttonElements={
          <Actions
            priority="neutral"
            isGradient
            className="flex w-full gap-[8px]"
          >
            <Button className="bg-static-white text-label-normal text-body1-normal-medium border border-line-normal-normal rounded-[4px] !flex-initial">
              환불
            </Button>
            <Button
              onClick={() => useModalStore.getState().closeModal()}
              className="w-full py-[12px]"
            >
              확인
            </Button>
          </Actions>
        }
      >
        <div className="px-content-horizon-margin py-content-vertical-margin">
          <div className="flex flex-col gap-[12px] px-content-horizon-margin py-content-vertical-margin border-[1px] border-line-normal-normal rounded-radius-admin">
            {detailData.map((data, index) => {
              const { label, value } = data;
              return (
                <CardRow
                  key={index}
                  data={{
                    title: label,
                    content: value,
                  }}
                  slot={{
                    titleClassname: "text-label-alternative text-label2-bold",
                    contentClassName:
                      "text-body2-reading-regular" +
                      (data.isUnderLine && " underline cursor-pointer"),
                    shortcutClassName: "size-[24px]",
                  }}
                  onContentClick={() => {
                    if (data.isUnderLine) {
                      closeModal();
                      nav(USER_DETAIL);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      </DialogDetailContent>
    </DialogContent>
  );
};

export default PaymentModal;
