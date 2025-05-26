import { useModalStore } from "@/store/modalStore";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteNotice } from "@/api/notice/noticeAPI";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import Actions from "@/components/common/Molecules/Actions/Actions";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import X from "@/assets/svg/common/X.svg";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";

interface NoticeDetailModalProps {
  // 모달에서는 상세페이지 id를 props로 넘겨와야함
  id: number;
}

const NoticeDetailModal = ({ id }: NoticeDetailModalProps) => {
  const { mutate: delNotice } = useMutation({
    mutationFn: (id: number) => deleteNotice(id),
    onSuccess() {
      history.back();
      closeModal();
    },
    onError(error) {
      customToast({
        title: error.message,
      });
      closeModal();
    },
  });

  const { closeModal } = useModalStore();

  return (
    <DialogContent className="[&>button]:hidden py-content-vertical-margin px-content-horizon-margin rounded-[12px]">
      <DialogTitle className="text-heading5-bold flex items-center gap-[12px] justify-between mb-[12px]">
        이 공지사항을 삭제하시겠어요?{" "}
        <IconButton
          onClick={() => useModalStore.getState().closeModal()}
          icon={<X className="w-[20px] h-[20px] text-label-neutral" />}
        />
      </DialogTitle>

      <DialogDescription className="text-body1-reading-regular text-label-normal mb-[32px]">
        삭제 된 공지는 복구 할 수 없습니다.
      </DialogDescription>

      <Actions priority="neutral">
        <OutlinedButton
          type="assistive"
          onClick={() => closeModal()}
          className="border-line-normal-normal min-w-[84px] !flex-initial"
        >
          취소
        </OutlinedButton>
        <Button
          onClick={() => delNotice(id)}
          className="w-full py-[12px] rounded-[4px] text-body1-normal-medium flex-1"
        >
          삭제
        </Button>
      </Actions>
    </DialogContent>
  );
};

export default NoticeDetailModal;
