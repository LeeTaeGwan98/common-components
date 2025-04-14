import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import { DialogContent } from "@/components/ui/dialog";
import { useModalStore } from "@/store/modalStore";

const ExcelModal = ({
  excelAllDataOnClick,
  excelFilterDataOnClick,
}: {
  excelAllDataOnClick: (() => void) | undefined;
  excelFilterDataOnClick: (() => void) | undefined;
}) => {
  const { closeModal } = useModalStore();
  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading="내려받을 엑셀 조건을 선택해주세요"
        close={true}
      >
        <div className="flex gap-[12px] *:flex-1 pt-content-vertical-margin px-content-horizon-margin">
          <OutlinedButton
            className="min-h-0 min-w-0 h-[200px]"
            type="assistive"
            onClick={() => {
              excelFilterDataOnClick && excelFilterDataOnClick();
              closeModal();
            }}
          >
            <div className="text-body2-reading-bold text-label-neutral">
              현재 필터 및 검색된 <br />
              모든 페이지 다운로드
            </div>
          </OutlinedButton>
          <Button
            className="h-[200px]"
            onClick={() => {
              excelAllDataOnClick && excelAllDataOnClick();
              closeModal();
            }}
          >
            <div className="text-body2-reading-bold">
              조건 없이 <br />
              모든 페이지 다운로드
            </div>
          </Button>
        </div>
      </DialogDetailContent>
    </DialogContent>
  );
};

export default ExcelModal;
