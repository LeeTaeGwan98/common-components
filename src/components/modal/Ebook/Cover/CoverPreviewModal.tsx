import { getCoverPreview } from "@/api/cover/coverAPI";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import { DialogContent } from "@/components/ui/dialog";
import { useModalStore } from "@/store/modalStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const CoverPreviewModal = ({
  id,
  file,
}: {
  id: number;
  file: File | null;
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  //표지 미리보기
  const { data } = useQuery({
    queryKey: ["coverPreview", id],
    queryFn: () => getCoverPreview(Number(id)),
    select: (data) => data.data,
    enabled: !!id,
  });

  useEffect(() => {
    const imageData = file ? file : data;

    if (!imageData) return;

    const objectUrl = URL.createObjectURL(imageData);
    setImageSrc(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [id, data, file]);

  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] h-dialog-height min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        fixed={true}
        heading="표지 미리보기"
        close={true}
        childrenClassName="h-full py-detail-content-vertical-margin px-detail-content-vertical-margin"
        buttonElements={
          <Button
            className="w-full h-[48px]"
            size="large"
            onClick={() => {
              useModalStore.getState().closeModal();
            }}
          >
            확인
          </Button>
        }
      >
        <img src={imageSrc ?? ""} alt="표지 미리보기" />
      </DialogDetailContent>
    </DialogContent>
  );
};

export default CoverPreviewModal;
