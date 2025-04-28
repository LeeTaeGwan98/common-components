import { getCoverPreview } from "@/api/cover/coverAPI";
import {
  getBankStatePreview,
  getBusCertifPreview,
  getIdCardPreview,
} from "@/api/user/userAPI";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import DialogDetailContent from "@/components/common/BookaroongAdmin/DialogDetailContent";
import { DialogContent } from "@/components/ui/dialog";
import { useModalStore } from "@/store/modalStore";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const UserPreviewModal = ({
  id,
  type,
}: {
  id: number;
  type: "bussiness" | "bank" | "idcard";
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  //미리보기 api
  const { data } = useQuery({
    queryKey: ["UserFilePreview", id, type],
    queryFn: () => {
      if (type === "idcard") {
        return getIdCardPreview(Number(id));
      } else if (type === "bussiness") {
        return getBusCertifPreview(Number(id));
      } else if (type === "bank") {
        return getBankStatePreview(Number(id));
      } else {
        return null;
      }
    },
    select: (data) => data && data.data,
  });

  //다이얼로그 제목
  const handleDialogTitle = () => {
    if (type === "idcard") {
      return "주민등록증 사본";
    } else if (type === "bussiness") {
      return "사업자등록증";
    } else if (type === "bank") {
      return "통장 사본";
    }
  };

  //이미지 데이터 볼 수 있게 변환
  useEffect(() => {
    const imageData = data;

    if (!imageData) return;

    const objectUrl = URL.createObjectURL(imageData);
    setImageSrc(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [data]);

  return (
    <DialogContent
      onOpenAutoFocus={(event) => event.preventDefault()}
      className="max-w-[560px] max-h-dialog-height min-w-0 w-full p-0 border-none rounded-[12px] [&>button]:hidden"
    >
      <DialogDetailContent
        fixed={true}
        heading={handleDialogTitle()}
        close={true}
        childrenClassName="max-h-[548px] h-full py-detail-content-vertical-margin px-detail-content-vertical-margin"
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
        <img src={imageSrc ?? ""} alt="미리보기 이미지" />
      </DialogDetailContent>
    </DialogContent>
  );
};

export default UserPreviewModal;
