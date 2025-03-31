import { useModalStore } from "@/store/modalStore";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteNotice } from "@/api/notice/noticeAPI";
import { customToast } from "@/components/common/Atoms/Toast/Toast";

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
    <DialogContent>
      <DialogHeader>
        <div className="flex justify-start text-heading5-bold text-label-normal ">
          이 공지를 삭제하시겠어요?
        </div>
      </DialogHeader>
      <DialogDescription>
        <div className="flex flex-col justify-start text-body1-reading-regular text-label-normal">
          <div className="flex justify-start">
            삭제된 공지는 복구할 수 없습니다.
          </div>
        </div>
      </DialogDescription>
      <DialogFooter>
        <div className="flex items-center gap-[8px]">
          <Button
            onClick={() => closeModal()}
            className="border border-line-normal-normal bg-static-white px-[28px] py-[12px] rounded-[4px] text-body1-normal-medium text-label-normal"
          >
            취소
          </Button>
          <Button
            onClick={() => delNotice(id)}
            className="w-full py-[12px] rounded-[4px] text-body1-normal-medium"
          >
            삭제
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default NoticeDetailModal;
