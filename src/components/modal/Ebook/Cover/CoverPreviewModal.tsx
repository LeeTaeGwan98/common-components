import { getCoverPreview } from "@/api/cover/coverAPI";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import { DialogContent } from "@/components/ui/dialog";
import { useModalStore } from "@/store/modalStore";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const CoverPreviewModal = ({ id }: { id: number }) => {
  const [src, setSrc] = useState<string>("");
  //표지 미리보기
  const { data } = useSuspenseQuery({
    queryKey: ["coverPreview", id],
    queryFn: () => getCoverPreview(Number(id)),
    select: (data) => data,
  });

  function hexToBase64(hex: string): string {
    const cleanHex = hex.replace(/\s+/g, ""); // 공백 제거
    const binary = Uint8Array.from(
      cleanHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );
    return btoa(String.fromCharCode(...binary));
  }

  useEffect(() => {
    const base64 = hexToBase64(data.data);
    const dataUrl = `data:image/png;base64,${base64}`;
    setSrc(dataUrl);
  }, []);

  console.log("데이터", data.data);

  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        heading="표지 미리보기"
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
        {src ? <img src={data.data} alt="From hex" /> : <p>Loading image...</p>}
        <div className="h-[32px]" />
      </DialogDetailContent>
    </DialogContent>
  );
};

export default CoverPreviewModal;
