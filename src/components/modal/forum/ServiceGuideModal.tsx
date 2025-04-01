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
    <DialogContent>
      <DialogHeader>
        <div className="flex justify-start text-heading5-bold text-label-normal ">
          이 서비스 가이드를 삭제하시겠어요?
        </div>
      </DialogHeader>
      <DialogDescription>
        <div className="flex flex-col justify-start text-body1-reading-regular text-label-normal">
          <div className="flex justify-start">
            삭제된 서비스 가이드는 복구할 수 없습니다.
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
              deleteGuideFn(id);
            }}
          >
            삭제
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default ServiceGuideModal;
