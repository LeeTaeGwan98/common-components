import { getCoverPreview } from "@/api/cover/coverAPI";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import { DialogContent } from "@/components/ui/dialog";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const CoverPreviewModal = ({ id }: { id: number }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  //표지 미리보기
  const { data } = useSuspenseQuery({
    queryKey: ["coverPreview", id],
    queryFn: () => getCoverPreview(Number(id)),
    select: (data) => data,
  });

  useEffect(() => {
    fetch(`/admin/cover/${id}/preview`)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const blob = new Blob([buffer], { type: "image/jpeg" }); // 또는 'image/png'
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      });
  }, []);

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
        <img src={imageSrc ?? ""} alt="이미지" />
        <div className="h-[32px]" />
      </DialogDetailContent>
    </DialogContent>
  );
};

export default CoverPreviewModal;
