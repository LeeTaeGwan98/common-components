import { useModalStore } from "@/store/modalStore";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteInquiry } from "@/api/inquiry/inquiryAPI";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Actions from "@/components/common/Molecules/Actions/Actions";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import { DeleteFreeImg } from "@/api/freeImg/freeImgApi";

const VideoImageDeleteModal = ({ id }: { id: number }) => {
  //문의사항 삭제 api
  const { mutate: deleteFreeImgFn } = useMutation({
    mutationFn: (id: number) => DeleteFreeImg(id),
    onSuccess() {
      useModalStore.getState().closeModal();
      history.back();
    },
    onError() {
      customToast({
        title: "이미지 삭제중 에러가 발생했습니다.",
      });
    },
  });

  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading=" 이 이미지를 삭제하시겠어요?"
        description="무료 이미지 목록에서 삭제됩니다."
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
                deleteFreeImgFn(Number(id));
              }}
            >
              삭제하기
            </Button>
          </Actions>
        }
      >
        <div className="h-[32px]" />
      </DialogDetailContent>
    </DialogContent>
  );
};

export default VideoImageDeleteModal;
