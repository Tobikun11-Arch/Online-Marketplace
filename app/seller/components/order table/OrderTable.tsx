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
import { ChevronsUpDown, ChevronDown, MoreHorizontal, Forward, Download, Trash } from "lucide-react"
import { useProductDetails, usefilter } from '../../state/manage-products/table'
import { Product_Orders } from '../../types/product'
import { Button } from "../../../../@/components/ui/button"
import { Checkbox } from "../../../../@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../../@/components/ui/dropdown-menu"
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
import { useSideBarState } from "../../state/Sidebar"
import { useProductId } from "../../state/manage-products/ViewProduct"
import { useUser } from "../../state/User"
import { useToast } from "../../../../@/hooks/use-toast"
import Link from "next/link"

export default function DataTableComp() {
    const { order_table, setorderTable } = useProductDetails()
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const { setActiveTab } = useSideBarState()
    const { setProductId } = useProductId()
    const { user }= useUser()
    const { toast } = useToast()
    
    const columns: ColumnDef<Product_Orders>[] = [
        {
            accessorKey: "productName",
            header: "Product Name",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 relative">
                    {row.original.images ? (
                        <Image
                            fill
                            src={row.original.images}
                            alt="product image"
                            className="rounded-full object-cover"
                        />
                    ) : (
                        // Render a placeholder or nothing if there's no image
                        <div className="w-full h-full bg-gray-200 rounded-full"></div>
                    )}
                    </div>
                    <div className="capitalize">{row.getValue("productName")}</div>
                </div>
            ),
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
            cell: ({ row }) => (
                <div className="capitaliz">{row.getValue("quantity")}</div>
            ),
        },  
        {
            accessorKey: "price",
            header: ({ column }) => {
                return (
                    <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-right flex items-center text-xs"
                    >
                    Amount
                    </Button>
                )   
                },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("price"))
                const quantity = parseFloat(row.getValue("quantity"))
                const Amount = amount * quantity
    
                // Format the amount as a dollar amount
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(Amount)
    
                return <div className="font-medium pl-3">{formatted}</div>
            },
        },
        {
            accessorKey: "addedAt",
            header: "Order date and time",
            cell: ({ row }) => {
                const date = new Date(row.getValue("addedAt")); 
                const formattedDate = date.toLocaleString("en-US", {
                    month: "long", 
                    day: "2-digit",
                    year: "numeric", 
                    hour: "numeric", 
                    minute: "2-digit", 
                    hour12: true,
                });
        
                return <div className="capitalize">{formattedDate}</div>;
            },
        }
    ]

    const table = useReactTable({
        data: order_table,
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
            placeholder="Filter Product Name..."
            value={(table.getColumn("productName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("productName")?.setFilterValue(event.target.value)
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
