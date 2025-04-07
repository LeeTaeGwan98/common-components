import {
  coverCreate,
  CoverCreateReq,
  coverDesignUpload,
} from "@/api/cover/coverAPI";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import CoverDataStyle from "@/pages/Ebook/Cover/CoverDataStyle";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CoverCreate() {
  const navigate = useNavigate();
  const [coverName, setCoverName] = useState<string>(""); //표지명
  const coverNumber: string = ""; //표지번호
  const [creater, setCreater] = useState<string>("북카롱"); //제작자
  const [price, setPrice] = useState<number | undefined>(); //가격
  const [isCoverExposure, setIsCoverExposure] = useState<boolean>(true); //표지 노출 비노출 여부
  const [sampleImgId, setSampleImgId] = useState<number>();
  const [sampleImgName, setSampleImgName] = useState<string>("");
  const [designFileName, setDesignFileName] = useState<string>("");
  const [designFileId, setDesignFileId] = useState<number>();
  const [intro, setIntro] =
    useState<string>(`도서의 저작권은 작가 본인이나, 표지 디자인은 표지 디자이너에게 귀속됩니다.
구매하신 표지 디자인은 도서표지 1종에 대한 권한입니다.
전자책 표지는 종횡비 1:1.6 사이즈로 제작하였습니다.
상품구매 후 즉시 사용이 진행되며, 이후 취소는 불가합니다.
사이즈, 표제, 부제 등에 의해 레이아웃이 변경 될 수 있습니다.
구매하신 표지 디자인은 오직 구매 고객만 사용 가능하며, 판매된 이후에는 다른 고객이 구매할 수 없습니다.
판매된 표지 디자인은 삭제 됩니다.
구매하신 표지는 기본적으로 제목과 부제, 저자명만 수정 가능 합니다.`);

  //표지 생성
  const { mutate: coverCreateFn } = useMutation({
    mutationFn: (payload: CoverCreateReq) => coverCreate(payload),
    onSuccess() {
      navigate(-1);
    },
    onError() {
      customToast({
        title: "표지 등록중 에러가 발생했습니다.",
      });
    },
  });
  return (
    <CoverDataStyle
      type="create"
      coverName={coverName}
      setCoverName={setCoverName}
      coverNumber={coverNumber}
      creater={creater}
      setCreater={setCreater}
      price={price}
      setPrice={setPrice}
      sampleImgId={sampleImgId}
      setSampleImgId={setSampleImgId}
      sampleImgName={sampleImgName}
      setSampleImgName={setSampleImgName}
      designFileId={setDesignFileId}
      setDesignFileId={setDesignFileId}
      designFileName={designFileName}
      setDesignFileName={setDesignFileName}
      isCoverExposure={isCoverExposure}
      setIsCoverExposure={setIsCoverExposure}
      intro={intro}
      setIntro={setIntro}
      onClickSave={() => {
        //표지 생성
        const postData: CoverCreateReq = {
          title: coverName,
          author: creater,
          price: price ?? 0,
          isVisible: isCoverExposure,
          description: intro,
        };

        if (sampleImgId) {
          postData.coverSampleUploadId = sampleImgId;
        }
        if (designFileId) {
          postData.coverDesignUploadId = designFileId;
        }
        coverCreateFn(postData);
      }}
    />
  );
}

export default CoverCreate;
