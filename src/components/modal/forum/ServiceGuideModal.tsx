import { useModalStore } from "@/store/modalStore";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteGuide } from "@/api/serviceGuied/serviceGuiedAPI";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import Actions from "@/components/common/Molecules/Actions/Actions";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";

const ServiceGuideModal = ({ id }: { id: number }) => {
  //챗봇 삭제 api
  const { mutate: deleteGuideFn } = useMutation({
    mutationFn: (id: number) => deleteGuide(id),
    onSuccess() {
      useModalStore.getState().closeModal();
      history.back();
    },
    onError() {
      customToast({
        title: "서비스가이드 삭제중 에러가 발생했습니다.",
      });
    },
  });

  const obj = { title: "foo", body: "bar", userId: 1 };

  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading="이 서비스 가이드를 삭제하시겠어요?"
        description="삭제 된 서비스 가이드는 복구 할 수 없습니다."
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
                deleteGuideFn(id);
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

export default ServiceGuideModal;
