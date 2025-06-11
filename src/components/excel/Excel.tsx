import * as XLSX from "xlsx";
import FileSaver from "file-saver";

//문자열 arraybuffer로 변환
const s2ab = (s: any) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
};

export const excelDownload = (
  title: string,
  headers: string[],
  widths: number[],
  datas: any[][]
) => {
  //엑셀 파일 타입
  const excelFileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const excelFileExtension = ".xlsx";

  //엑셀 제목 지정
  const excelFileName = title;

  //엑셀 헤더 내용 세팅
  const ws = XLSX.utils.aoa_to_sheet([headers]);

  //엑셀 데이터 담기
  if (datas) {
    datas?.forEach((data) => {
      XLSX.utils.sheet_add_aoa(ws, [data], { origin: -1 });
      //엑셀 행 크기
      ws["!cols"] = widths.map((width) => ({ wpx: width }));
    });
  }

  // 가운데 정렬 스타일
  const centerStyle = {
    alignment: { horizontal: "center", vertical: "center" },
  };

  // 전체 셀에 스타일 적용
  const allRows = [headers, ...datas];
  for (let r = 0; r < allRows.length; r++) {
    for (let c = 0; c < allRows[r].length; c++) {
      const cellAddress = XLSX.utils.encode_cell({ r, c });
      if (ws[cellAddress]) {
        ws[cellAddress].s = centerStyle;
      }
    }
  }

  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelButter = XLSX.write(wb, {
    bookType: "xlsx",
    type: "binary",
  }); // 엑셀 쓰기, type을 'binary'로 수정
  const excelFile = new Blob([s2ab(excelButter)], {
    type: excelFileType,
  }); // Blob 생성 시 s2ab 함수 사용
  FileSaver.saveAs(excelFile, excelFileName + excelFileExtension); // 파일 저장
};
