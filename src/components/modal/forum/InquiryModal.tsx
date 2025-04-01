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

const InquiryModal = ({ id }: { id: number }) => {
  //문의사항 삭제 api
  const { mutate: deleteInquiryFn } = useMutation({
    mutationFn: (id: number) => deleteInquiry(id),
    onSuccess() {
      useModalStore.getState().closeModal();
      history.back();
    },
    onError() {
      customToast({
        title: "문의사항 삭제중 에러가 발생했습니다.",
      });
    },
  });

  return (
    <DialogContent>
      <DialogHeader>
        <div className="flex justify-start text-heading5-bold text-label-normal ">
          이 문의를 삭제하시겠어요?
        </div>
      </DialogHeader>
      <DialogDescription>
        <div className="flex flex-col justify-start text-body1-reading-regular text-label-normal">
          <div className="flex justify-start">
            삭제된 문의는 복구할 수 없습니다.
          </div>
        </div>
      </DialogDescription>
      <DialogFooter>
        <div className="flex items-center gap-[8px]">
          <Button
            onClick={() => useModalStore.getState().closeModal()}
            className="border border-line-normal-normal bg-static-white px-[28px] py-[12px] rounded-[4px] text-body1-normal-medium text-label-normal"
          >
            취소
          </Button>
          <Button
            className="w-full py-[12px] rounded-[4px] text-body1-normal-medium"
            onClick={() => {
              deleteInquiryFn(Number(id));
            }}
          >
            삭제
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default InquiryModal;
