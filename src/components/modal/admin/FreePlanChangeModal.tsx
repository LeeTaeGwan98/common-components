import { useModalStore } from "@/store/modalStore";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import { DialogContent } from "@/components/ui/dialog";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import Actions from "@/components/common/Molecules/Actions/Actions";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import { userActivate } from "@/api/user/userAPI";
import { getPlanList, getPlans } from "@/api/plan/planAPI";

interface FreePlanChangeModaleModalProps {
  // 모달에서는 상세페이지 id를 props로 넘겨와야함
  onClickOkBtn: () => void;
}

const FreePlanChangeModal = ({
  onClickOkBtn,
}: FreePlanChangeModaleModalProps) => {
  //플랜 목록 조회
  const { data } = useSuspenseQuery({
    queryKey: ["plansApi"],
    queryFn: () => getPlans(),
    select: (data) => data.data.data,
  });

  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading={`이 고객의 플랜을 ${
          data.find((plan) => plan.isDefault)?.planName
        }로 변경하시겠습니까?`}
        description="사용자는 모든 AI 기능 사용이 불가합니다."
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
              변경
            </Button>
          </Actions>
        }
      >
        <div className="h-[32px]" />
      </DialogDetailContent>
    </DialogContent>
  );
};

export default FreePlanChangeModal;
