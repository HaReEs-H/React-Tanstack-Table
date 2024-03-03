import { useState } from 'react'
import { USERS } from '../data'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import DownloadBtn from './DownloadBtn'
import DebouncedInput from './DebouncedInput'
import { SearchIcon } from '../Icons/Icons'

function TanStackTable() {
  const [data] = useState(() => [...USERS])
  const [globalFilter, setGlobalFilter] = useState('')
  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor('', {
      id: 'S.No',
      cell: (info) => {
        return <span>{info.row.index + 1}</span>
      },
      header: 'S.No',
    }),
    columnHelper.accessor('profile', {
      cell: (info) => {
        return (
          <img
            src={info?.getValue()}
            alt="..."
            className="rounded-full w-10 h-10 object-cover"
          />
        )
      },
      header: 'Profile',
    }),
    columnHelper.accessor('firstName', {
      cell: (info) => {
        return <span>{info.getValue()}</span>
      },
      header: 'First Name',
    }),
    columnHelper.accessor('lastName', {
      cell: (info) => {
        return <span>{info.getValue()}</span>
      },
      header: 'Last Name',
    }),
    columnHelper.accessor('age', {
      cell: (info) => {
        return <span>{info.getValue()}</span>
      },
      header: 'Age',
    }),
    columnHelper.accessor('visits', {
      cell: (info) => {
        return <span>{info.getValue()}</span>
      },
      header: 'Visits',
    }),
    columnHelper.accessor('progress', {
      cell: (info) => {
        return <span>{info.getValue()}</span>
      },
      header: 'Progress',
    }),
  ]
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400">
      <div className="flex justify-between mb-2">
        <div className="w-full flex items-center gap-1">
          <SearchIcon />
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => {
              setGlobalFilter(String(value))
            }}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
            placeholder="Search all columns...."
          />
        </div>
        <DownloadBtn data={data} fileName={'peoples'} />
      </div>
      <table className="border border-gray-700 w-full text-left">
        <thead className="bg-indigo-600">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className="capitalize px-3.5 py-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => {
              return (
                <tr
                  key={row.id}
                  className={`${i % 2 == 0 ? 'bg-gray-900' : 'bg-gray-800'}`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="px-3.5 py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })
          ) : (
            <tr className="text-center h-32">
              <td colSpan={12}>No Records Found</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage()
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {'<'}
        </button>
        <button
          onClick={() => {
            table.nextPage()
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {'>'}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>

        <span className="flex items-center gap-1">
          | Go to Page:
          <input
            onChange={(event) => {
              const page = event.target.value
                ? Number(event.target.value) - 1
                : 0
              table.setPageIndex(page)
            }}
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            className="border p-1 rounded w-16 bg-transparent"
          />
        </span>
        <select
          onChange={(event) => {
            table.setPageSize(Number(event.target.value))
          }}
          value={table.getState().pagination.pageSize}
          className="p-2 bg-transparent"
        >
          {[10, 20, 30, 50].map((pageSize) => {
            return (
              <option value={pageSize} key={pageSize}>
                Show {pageSize}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default TanStackTable
