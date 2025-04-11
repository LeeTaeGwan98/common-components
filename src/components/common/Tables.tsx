import { ReactNode } from "react";
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
  return (
    <table
      className={cn(
        "min-w-full overflow-hidden whitespace-nowrap table-fixed",
        className
      )}
    >
      {children}
    </table>
  );
};

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

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className,
}) => {
  const CellTag = isHeader ? "th" : "td";
  return (
    <CellTag
      className={cn(
        "text-center pl-[29px] first:pl-[48px] last:pr-[48px]",
        className
      )}
    >
      {children}
    </CellTag>
  );
};

export { TableContainer, Table, TableHeader, TableBody, TableRow, TableCell };
