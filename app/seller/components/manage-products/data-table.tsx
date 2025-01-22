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
import { ChevronsUpDown, ChevronDown, MoreHorizontal, Forward, Files, Trash } from "lucide-react"
import { useProductDetails, usefilter } from '../../state/manage-products/table'
import { tableData } from '../../types/product'
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
import { generatePageItem } from "./PageItems" 
import { useSideBarState } from "../../state/Sidebar"
import { useProductId } from "../../state/manage-products/ViewProduct"
import { httpDeleteReq } from "../../services/axios-instance/DeleteInstance"
import { delete_product } from "../../services/axios/ProductRequests"
import { useUser } from "../../state/User"
import { useToast } from "../../../../@/hooks/use-toast"

export default function DataTableComp() {
    const { tableData, setTableData } = useProductDetails()
    const { setStatus } = usefilter()
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const { setActiveTab } = useSideBarState()
    const { setProductId } = useProductId()
    const { user }= useUser()
    const { toast } = useToast()

    React.useEffect(() => {
        setRowSelection({})
    }, [tableData])

    const columns: ColumnDef<tableData>[] = [
        {
            id: "select",
            header: ({ table }) => (
            <Checkbox
                checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
            ),
            cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
            ),
            enableSorting: false,
            enableHiding: false,
        },
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
            accessorKey: "status",
            header: () => {
            return (
                <div>Status</div>
            )
            },
            cell: ({ row }) => <div className="lowercase">{row.original.status !== "draft" ? <span className="bg-[#B7F0B6] font-medium px-2 py-1 rounded-md">{row.getValue("status")}</span> : <span className="px-2 py-1 rounded-md bg-[#EFEFEE] font-medium">{row.getValue("status")}</span>}</div>,
        },
        {
            accessorKey: "productPrice",
            header: ({ column }) => {
                return (
                    <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-right flex items-center text-xs"
                    >
                    Price
                    <ChevronsUpDown size={15}/>
                    </Button>
                )   
                },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("productPrice"))
    
                // Format the amount as a dollar amount
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount)
    
                return <div className="font-medium pl-3">{formatted}</div>
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
            const payment = row.original
            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-black">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white outline-none dark:border-gray-200 dark:text-black">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(payment._id)}
                    >
                    Copy Product ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=> {
                        setActiveTab('ViewProduct')
                        setProductId(row.original._id)
                    }}>View product</DropdownMenuItem>
                    <DropdownMenuItem onClick={()=> {
                        setActiveTab('EditProduct')
                        setProductId(row.original._id)
                    }}>Edit product</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
            },
        },
    ]

    const table = useReactTable({
        data: tableData,
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

    const handleDelete = async(productId: string[]) => {
        const details = {
            productId,
            userId: user?._id
        }
        try {
            const response = await httpDeleteReq('', delete_product, details)
            if(response) {
                const filtered_product = tableData.filter(product => !productId.includes(product._id))
                setTableData(filtered_product)
                toast({
                    description: `${response}`,
                    className: "text-black bg-white shadow-md"
                })
            }
        } catch (error) {
            console.error("Internal error")
        }
    }

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
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1 outline-none dark:border-gray-200">
                Filter 
                <ChevronDown size={15}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" bg-white dark:border-gray-200 dark:text-black">
            <DropdownMenuCheckboxItem
            onClick={()=> setStatus("All")}
        >
            All
        </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
            onClick={()=> setStatus("Published")}
        >
            Published
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
            onClick={()=> setStatus("draft")}
        >
            Draft
        </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
            </DropdownMenu>
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
            <div className="bg-transparent fixed bottom-14 sm:bottom-1 left-0 right-0 text-white text-xs">
                {table.getFilteredSelectedRowModel().rows.length >= 1 && (
                    <>
                        <div className="bg-transparent w-full flex justify-center items-center">
                            <div className="flex gap-32 sm:48 lg:ml-80 bg-[#222531] p-2 rounded-lg">
                                <div className="flex gap-1 items-center">
                                    <h1 className="py-1 px-2 bg-[#B1E6FB] text-black rounded-sm">{table.getFilteredSelectedRowModel().rows.length}</h1>
                                    <h1 className="font-medium">Selected</h1>
                                </div>
                                <div className="sub-end flex gap-2">
                                    <div className="flex gap-1 items-center bg-[#363D4B] py-1 px-2 rounded-md ">
                                        <div className="tooltip tooltip-top sm:tooltip-none" data-tip="Share">
                                            <Forward size={15}/>
                                        </div>
                                        <h1 className="font-medium hidden sm:block">Share</h1>
                                    </div>
                                    <div className="flex gap-1 items-center bg-[#363D4B] py-1 px-2 rounded-md">
                                        <div className="tooltip tooltip-top sm:tooltip-none" data-tip="Duplicate">
                                            <Files size={15}/>
                                        </div>
                                        <h1 className="font-medium hidden sm:block">Duplicate</h1>
                                    </div>
                                    <div className="flex gap-1 items-center bg-[#363D4B] py-1 px-2 rounded-md" onClick={()=> handleDelete(table.getSelectedRowModel().rows.map((row)=> row.original._id))}>
                                    <div className="tooltip tooltip-top sm:tooltip-none" data-tip="Delete">
                                        <Trash size={15}/>
                                    </div>
                                        <h1 className="font-medium hidden sm:block">Delete</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
