import { deleteAccountList } from "@/api/account";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import Actions from "@/components/common/Molecules/Actions/Actions";
import { DialogContent } from "@/components/ui/dialog";
import { useModalStore } from "@/store/modalStore";
import { useMutation } from "@tanstack/react-query";

export const AdminDeleteModal = ({ id }: { id: number }) => {
  //관리자 삭제 api
  const { mutate: deleteInquiryFn } = useMutation({
    mutationFn: (id: number) => deleteAccountList(id),
    onSuccess() {
      useModalStore.getState().closeModal();
      history.back();
    },
    onError() {
      customToast({
        title: "관리자 계정 삭제중 에러가 발생했습니다.",
      });
    },
  });

  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading="이 관리자 계정을 삭제하시겠습니까?"
        description="이 관리자 계정에 대한 모든 정보가 삭제되고
더 이상 이 계정의 작업 이력을 확인할 수 없습니다."
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
                deleteInquiryFn(id);
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
