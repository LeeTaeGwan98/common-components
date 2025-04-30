import { getFreeImgDetail } from "@/api/freeImg/freeImgApi";
import VideoImageTemplate from "@/pages/Video/VideoImage/VideoImageTemplate";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function VideoImageDetail() {
  const { id } = useParams();

  const { data: detailData } = useSuspenseQuery({
    queryKey: ["freeImgDetail", id],
    queryFn: () => getFreeImgDetail(Number(id)),
    select: (data) => data.data.data,
  });

  return (
    <>
      <title>북카롱 | 무료 이미지 상세</title>
      <VideoImageTemplate type={"detail"} detailData={detailData} />
    </>
  );
}

export default VideoImageDetail;
