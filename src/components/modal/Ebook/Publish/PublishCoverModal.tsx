import { getEbookCoverPreview } from "@/api/ebook";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import { DialogContent } from "@/components/ui/dialog";
import { useModalStore } from "@/store/modalStore";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const PublishCoverModal = ({ id }: { id: number }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  //표지 미리보기
  const { data } = useSuspenseQuery({
    queryKey: ["ebookCoverPreview", id],
    queryFn: () => getEbookCoverPreview(Number(id)),
    select: (data) => data.data,
    retry: false,
  });

  // 🔁 2. Blob을 이미지 URL로 변환
  useEffect(() => {
    if (data) {
      const imageURL = URL.createObjectURL(data); // blob -> object URL
      setImageSrc(imageURL);

      return () => {
        URL.revokeObjectURL(imageURL); // 정리해줘야 메모리 누수 없음
      };
    }
  }, [data]);

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
        <div className="flex items-center justify-center min-h-[400px]">
          <img src={imageSrc ?? ""} alt="표지 미리보기" />
        </div>
      </DialogDetailContent>
    </DialogContent>
  );
};
