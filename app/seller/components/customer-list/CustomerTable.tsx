"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { useProductDetails } from '../../state/manage-products/table'
import { BuyerInformation } from '../../types/product'
import { Button } from "../../../../@/components/ui/button"
import { Input } from "../../../../@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../../@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationEllipsis  ,
} from "../../../../@/components/ui/pagination";
import Image from "next/image"
import { generatePageItem } from "../manage-products/PageItems" 

export default function DataTableComp() {
    const { customer_table } = useProductDetails()
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    
    const columns: ColumnDef<BuyerInformation>[] = [
        {
            accessorKey: "buyer_username",
            header: "Username",
            cell: ({ row }) => {
                return <div className="">{row.getValue('buyer_username')}</div>;
            },
        }, 
        {
            accessorKey: "buyer_email",
            header: "Email",
            cell: ({ row }) => {
                return <div className="">{row.getValue('buyer_email')}</div>;
            },
        },
        {
            accessorKey: "total_purchases",
            header: "Total Purchases",
            cell: ({ row }) => {
                return <div className="">{row.getValue('total_purchases')}</div>;
            },
        }
    ]

    const table = useReactTable({
        data: customer_table,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        },
    })

    const totalPageCount = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1; // Pages are 1-based
    const pageItems = generatePageItem(totalPageCount, currentPage);

    return (
        <div className="w-full">
        <div className="flex justify-between items-center py-4 gap-1">
            <Input
            placeholder="Filter buyer email..."
            value={(table.getColumn("buyer_email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("buyer_email")?.setFilterValue(event.target.value)
            }
            className="w-56 sm:w-80 text-sm outline-none shadow-md border border-none"
            />
        </div>
        <div className="rounded-md border dark:border-gray-200">
            <Table className="border border-none">
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="dark:border-gray-200" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                    return (
                        <TableHead key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </TableHead>
                    )
                    })}
                </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="dark:border-gray-200"
                    >
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                        </TableCell>
                    ))}
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                    >
                    No results.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        <div className="flex flex-col sm:flex sm:flex-row items-center justify-end space-x-2 py-4">
            <Pagination className="flex w-3/4 justify-center sm:justify-end">
            <PaginationContent>
                <PaginationItem>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="border-none pr-2"
                >
                    Previous
                </Button>
                </PaginationItem>
                {pageItems.map((item, index) => {
                    if (item.type === 'page') {
                        return (
                        <PaginationItem key={index}>
                            <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                table.setPageIndex(item.number! - 1);
                            }}
                            isActive={item.number === currentPage}
                            >
                            {item.number}
                            </PaginationLink>
                        </PaginationItem>
                        );
                    } else if (item.type === 'ellipsis') {
                        return (
                        <PaginationItem key={index}>
                            <PaginationEllipsis />
                        </PaginationItem>
                        );
                    }
                    return null;
                })}
                <PaginationItem>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="border-none pl-2"
                >
                    Next
                </Button>   
                </PaginationItem>
            </PaginationContent>
            </Pagination>
        </div>
        </div>
    )
}
