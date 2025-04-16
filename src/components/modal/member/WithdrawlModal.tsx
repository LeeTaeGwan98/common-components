import { useModalStore } from "@/store/modalStore";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { DialogContent } from "@/components/ui/dialog";
import CardRow from "@/components/common/Molecules/CardRow/CardRow";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import Actions from "@/components/common/Molecules/Actions/Actions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWithdrawlDetail } from "@/api/user/userAPI";

function WithdrawlModal({ id }: { id: number }) {
  //탈퇴 상세 조회
  const { data } = useSuspenseQuery({
    queryKey: ["withdrawalDetail", id],
    queryFn: () => getWithdrawlDetail(Number(id)),
    select: (data) => data.data.data,
  });

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
          <Actions className="w-full h-[48px] !mx-0" priority={"single"}>
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
                content: data.name,
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
                content: data.createdAt,
              }}
            />
            <div className="flex flex-col justify-start w-full">
              <div className="w-full flex text-label2-bold text-label-alternative mb-[6px]">
                탈퇴 사유
              </div>
              <TextBox
                value={data.etc}
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
