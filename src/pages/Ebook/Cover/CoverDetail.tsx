import { getCoverDetail } from "@/api/cover/coverAPI";
import CoverDataStyle from "@/pages/Ebook/Cover/CoverDataStyle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CoverDetail() {
  const { id } = useParams(); // id 값 추출
  const navigate = useNavigate(); //네비게이션

  //표지 상세 조회 api
  const { data } = useSuspenseQuery({
    queryKey: ["coverDetail", id],
    queryFn: () => getCoverDetail(Number(id)),
    select: (data) => data.data.data,
  });

  const [coverName, setCoverName] = useState<string>(data.title); //표지명
  const coverNumber: string = data.coverNo; //표지번호
  const [creater, setCreater] = useState<string>(data.author); //제작자
  const [price, setPrice] = useState<number | undefined>(
    Number(data.price.replaceAll(",", ""))
  ); //가격
  const [isCoverExposure, setIsCoverExposure] = useState<boolean>(
    data.isVisible
  ); //표지 노출 비노출 여부
  //샘플 이미지
  const [sampleImgId, setSampleImgId] = useState<number | undefined>(
    data.coverSampleUploadId
  );
  const [sampleImgName, setSampleImgName] = useState<string>(
    data.coverSampleUploadName
  );
  //디자인 파일 이미지
  const [designFileId, setDesignFileId] = useState<number | undefined>(
    data.coverDesignUploadId
  );
  const [designFileName, setDesignFileName] = useState<string>(
    data.coverDesignUploadName
  );
  const [intro, setIntro] = useState<string>(data.description); //소개
  return (
    <CoverDataStyle
      type="detail"
      coverName={coverName}
      setCoverName={setCoverName}
      coverNumber={coverNumber}
      creater={creater}
      setCreater={setCreater}
      price={price}
      setPrice={setPrice}
      sampleImgName={sampleImgName}
      setSampleImgName={setSampleImgName}
      sampleImgId={sampleImgId}
      setSampleImgId={setSampleImgId}
      designFileName={designFileName}
      setDesignFileName={setDesignFileName}
      designFileId={designFileId}
      setDesignFileId={setDesignFileId}
      isCoverExposure={isCoverExposure}
      setIsCoverExposure={setIsCoverExposure}
      intro={intro}
      setIntro={setIntro}
      onClickSave={() => {
        console.log("저장");
      }}
    />
  );
}

export default CoverDetail;
