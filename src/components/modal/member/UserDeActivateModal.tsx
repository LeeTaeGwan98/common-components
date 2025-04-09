import { useModalStore } from "@/store/modalStore";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { DialogContent } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import Actions from "@/components/common/Molecules/Actions/Actions";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import { userActivate } from "@/api/user/userAPI";

interface UserActivateModalProps {
  // 모달에서는 상세페이지 id를 props로 넘겨와야함
  onClickOkBtn: () => void;
}

const UserDeActivateModal = ({ onClickOkBtn }: UserActivateModalProps) => {
  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading="이 고객을 활성 처리하시겠어요?"
        description="사용자는 다시 로그인을 할 수 있습니다."
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
            <Button size="large" onClick={onClickOkBtn}>
              활성
            </Button>
          </Actions>
        }
      >
        <div className="h-[32px]" />
      </DialogDetailContent>
    </DialogContent>
  );
};

export default UserDeActivateModal;
