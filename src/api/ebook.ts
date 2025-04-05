import API from "@/api/API";

//전자책 모든 목록 가져오기
export const getEbookList = () => {
  const data = API.get("/admin/ebook?sortOrder=DESC");
  return data;
};

//전자책 상세
export const getEbookDetail = (id: number) => {
  const data = API.get(`/admin/ebook/${id}`);
  return data;
};
