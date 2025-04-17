import Button from "@/components/common/Atoms/Button/Solid/Button";
import { DialogContent } from "@/components/ui/dialog";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import { useModalStore } from "@/store/modalStore";

const LoginFailModal = () => {
  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading="아이디와 비밀번호를 다시 한 번 확인해주세요."
        close={true}
        buttonElements={
          <Button
            className="w-full"
            size="large"
            onClick={() => {
              useModalStore.getState().closeModal();
            }}
          >
            확인
          </Button>
        }
      >
        <div className="h-[32px]" />
      </DialogDetailContent>
    </DialogContent>
  );
};

export default LoginFailModal;
