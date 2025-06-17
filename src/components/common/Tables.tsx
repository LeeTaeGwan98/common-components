import {
  Children,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import { cn } from "@/lib/utils";

interface TableContainerProps {
  children: ReactNode;
  className?: string;
}

// Props for Table
interface TableProps {
  children: ReactNode; // Table content (thead, tbody, etc.)
  className?: string; // Optional className for styling
}

// Props for TableHeader
interface TableHeaderProps {
  children: ReactNode; // Header row(s)
  className?: string; // Optional className for styling
}

// Props for TableBody
interface TableBodyProps {
  children: ReactNode; // Body row(s)
  className?: string; // Optional className for styling
}

// Props for TableRow
interface TableRowProps {
  children: ReactNode; // Cells (th or td)
  className?: string; // Optional className for styling
}

// Props for TableCell
interface TableCellProps {
  children: ReactNode; // Cell content
  isHeader?: boolean; // If true, renders as <th>, otherwise <td>
  className?: string; // Optional className for styling
  isChildIcon?: boolean;
}

const TableContainer: React.FC<TableContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "overflow-x-auto border-[1px] border-line-solid-normal rounded-radius-admin",
        className
      )}
    >
      {children}
    </div>
  );
};

// Table Component
const Table: React.FC<TableProps> = ({ children, className }) => {
  const columnCount = getColumnCount(children);

  return (
    <TableContext.Provider value={{ columnCount }}>
      <table
        className={cn(
          "min-w-[1491px] overflow-hidden whitespace-nowrap table-fixed w-full",
          className
        )}
      >
        {children}
      </table>
    </TableContext.Provider>
  );
};

function getColumnCount(children: React.ReactNode): number {
  let count = 0;

  Children.forEach(children, (child) => {
    if (
      typeof child === "object" &&
      child !== null &&
      (child as any).type?.displayName === "TableHeader"
    ) {
      const headerRows = (child as ReactElement<any>).props.children;
      Children.forEach(headerRows, (row) => {
        if (
          typeof row === "object" &&
          row !== null &&
          (row as any).type?.displayName === "TableRow"
        ) {
          const cells = (row as ReactElement<any>).props.children;
          count = Children.toArray(cells).length;
        }
      });
    }
  });

  return count || 1;
}

// TableHeader Component
const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return (
    <thead
      className={cn(
        "bg-fill-normal border-b border-line-solid-normal",
        className
      )}
    >
      {children}
    </thead>
  );
};

// TableBody Component
const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return <tbody className={cn("", className)}>{children}</tbody>;
};

// TableRow Component
const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return (
    <tr
      className={cn(
        "h-[60px] border-b border-line-solid-normal last:border-b-0",
        className
      )}
    >
      {children}
    </tr>
  );
};

const NoData: React.FC = () => {
  return (
    <div className="flex flex-col justify-center w-full h-[600px] text-center text-body1-normal-bold text-label-normal">
      No data
    </div>
  );
};

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className,
  isChildIcon = false,
}) => {
  const CellTag = isHeader ? "th" : "td";
  return (
    <CellTag
      className={cn(
        "h-[inherit] text-center pl-[29px] first:pl-[48px] last:pr-[48px]",
        CellTag === "th" && "text-body1-normal-bold",
        CellTag === "td" && "text-label1-normal-regular",
        className
      )}
    >
      <div className="flex justify-center">
        <div
          className={
            isChildIcon
              ? ""
              : "break-words whitespace-normal text-ellipsis line-clamp-2"
          }
        >
          {children}
        </div>
      </div>
    </CellTag>
  );
};

export const TableContext = createContext<{
  columnCount: number;
}>({
  columnCount: 1, // default 값
});

export const useTableContext = () => useContext(TableContext);

TableHeader.displayName = "TableHeader";
TableRow.displayName = "TableRow";
TableCell.displayName = "TableCell";

export {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  NoData,
};
