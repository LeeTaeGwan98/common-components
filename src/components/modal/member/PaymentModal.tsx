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

const dummydata = [
  { label: "닉네임", value: "닉네임" },
  { label: "결제 이메일", value: "결제 이메일" },
  { label: "결제 내역", value: "결제 내역" },
  { label: "결제 상세 내역", value: "결제 상세 내역" },
  { label: "결제일", value: "결제일" },
  { label: "결제 금액", value: "결제 금액" },
  { label: "카드 종류", value: "카드 종류" },
  { label: "카드 번호", value: "카드 번호" },
];

const PaymentModal = () => {
  // 모달에서 GET API요청이 필요한 경우
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["paymentModalData"],
    queryFn: () => testGet(),
    enabled: false, // 자동 실행 비활성화, 이 속성을 없애면 모달이 열리자마자 GET요청이 실행됨
  });

  return (
    <DialogContent className="p-0 h-[720px] rounded-[12px] [&>button]:hidden">
      <div className="flex justify-between py-content-vertical-margin px-content-horizon-margin">
        <div className="justify-start text-heading5-bold">결제 상세</div>

        <div className="flex items-center w=[28px] h-[28px] p-0 ">
          <IconButton
            onClick={() => useModalStore.getState().closeModal()}
            icon={<X className="w-[20px] h-[20px] text-label-neutral" />}
          />
        </div>
      </div>

      <Divider className="m-0" />

      <div className="mt-content-vertical-margin mx-content-horizon-margin py-content-vertical-margin px-content-horizon-margin border border-line-normal-normal overflow-y-scroll flex flex-col gap-[12px] rounded-[4px]">
        {dummydata.map((data) => {
          const { label, value } = data;
          return (
            <CardRow
              data={{
                title: label,
                content: value,
              }}
              slot={{
                titleClassname: "text-label-alternative text-label2-bold",
                contentClassName: "text-body2-reading-regular",
                shortcutClassName: "size-[24px]",
              }}
            />
          );
        })}
      </div>

      <Actions
        priority="neutral"
        isGradient
        className="flex gap-[8px] pb-content-vertical-margin px-content-vertical-margin"
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
    </DialogContent>
  );
};

export default PaymentModal;
