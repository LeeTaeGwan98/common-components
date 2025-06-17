import {
  NoData,
  TableCell,
  TableRow,
  useTableContext,
} from "@/components/common/Tables";

function RenderEmptyRows({ dataLength }: { dataLength: number }) {
  const { columnCount } = useTableContext();

  // 테이블 빈 row 처리
  const renderEmptyRows = () => {
    if (dataLength) {
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
    } else {
      return (
        <TableRow>
          <td colSpan={columnCount} className="p-0">
            <NoData />
          </td>
        </TableRow>
      );
    }
  };

  return <>{renderEmptyRows()}</>;
}

export default RenderEmptyRows;
