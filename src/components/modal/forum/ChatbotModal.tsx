import { useModalStore } from "@/store/modalStore";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteChatBot } from "@/api/chatbot/chatbotAPI";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import Actions from "@/components/common/Molecules/Actions/Actions";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";

const ChatbotModal = ({ id }: { id: number }) => {
  //챗봇 삭제 api
  const { mutate: deleteChatbotFn } = useMutation({
    mutationFn: (id: number) => deleteChatBot(id),
    onSuccess() {
      useModalStore.getState().closeModal();
      history.back();
    },
    onError() {
      customToast({
        title: "챗봇을 삭제중 에러가 발생했습니다.",
      });
    },
  });

  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading="이 챗봇 질문을 삭제하시겠어요?"
        description="삭제 된 챗봇 질문은 복구 할 수 없습니다."
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
                deleteChatbotFn(Number(id));
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

export default ChatbotModal;
