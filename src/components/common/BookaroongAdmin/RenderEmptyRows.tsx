import { TableCell, TableRow } from "@/components/common/Tables";

function RenderEmptyRows({ dataLength }: { dataLength: number }) {
  // 테이블 빈 row 처리
  const renderEmptyRows = () => {
    const emptyRowsCount = 10 - dataLength;
    const emptyRows = [];

    for (let i = 0; i < emptyRowsCount; i++) {
      emptyRows.push(
        <TableRow key={`empty-row-${i}`}>
          <></>
        </TableRow>
      );
    }

    return emptyRows;
  };

  return <>{renderEmptyRows()}</>;
}

export default RenderEmptyRows;
