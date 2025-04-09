import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import Actions from "@/components/common/Molecules/Actions/Actions";
import { DialogContent } from "@/components/ui/dialog";
import { useModalStore } from "@/store/modalStore";

export const AdminNonActiveModal = ({
  onOkClick,
}: {
  onOkClick: () => void;
}) => {
  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading="이 계정을 비활성화 하시겠습니까?"
        description="비활성화 시 다시 이 계정으로 로그인할 수 없습니다."
        close={true}
        buttonElements={
          <Actions className="w-full h-[48px]" priority={"neutral"}>
            <OutlinedButton
              className="!flex-none detail-mobile:text-body1-normal-medium detail-mobile:rounded-[10px]"
              size="large"
              type="assistive"
              onClick={() => useModalStore.getState().closeModal()}
            >
              취소
            </OutlinedButton>
            <Button
              size="large"
              onClick={() => {
                onOkClick();
                useModalStore.getState().closeModal();
              }}
            >
              확인
            </Button>
          </Actions>
        }
      >
        <div className="h-[32px]" />
      </DialogDetailContent>
    </DialogContent>
  );
};
