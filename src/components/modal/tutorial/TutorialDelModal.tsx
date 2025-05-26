import { useModalStore } from "@/store/modalStore";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { DialogContent } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import Actions from "@/components/common/Molecules/Actions/Actions";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import { tutorialDelete } from "@/api/tutorial/tutorialAPI";
import { useNavigate } from "react-router-dom";

interface TutorialDelModalProps {
  // 모달에서는 상세페이지 id를 props로 넘겨와야함
  id: number;
}

const TutorialDelModal = ({ id }: TutorialDelModalProps) => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  //튜토리얼 삭제 api
  const { mutate: delTutorial } = useMutation({
    mutationFn: (id: number) => tutorialDelete(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tutorialDetail", id] });
      nav(-1);
      useModalStore.getState().closeModal();
    },
    onError() {
      customToast({
        title: "튜토리얼 삭제중 에러가 발생했습니다.",
      });
    },
  });

  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading="이 튜토리얼을 삭제하시겠어요?"
        description="삭제 된 튜토리얼은 복구 할 수 없습니다."
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
                delTutorial(id);
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

export default TutorialDelModal;
