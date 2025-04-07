import { getCoverPreview } from "@/api/cover/coverAPI";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import { DialogContent } from "@/components/ui/dialog";
import { useSuspenseQuery } from "@tanstack/react-query";

export const CoverPreviewModal = ({ id }: { id: number }) => {
  //표지 미리보기
  const { data } = useSuspenseQuery({
    queryKey: ["coverPreview", id],
    queryFn: () => getCoverPreview(Number(id)),
    select: (data) => data.data.data,
  });

  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading="표지 미리보기"
        close={true}
        buttonElements={
          <Button className="w-full" size="large" onClick={() => {}}>
            확인
          </Button>
        }
      >
        <div className="h-[32px]" />
      </DialogDetailContent>
    </DialogContent>
  );
};

export default CoverPreviewModal;
