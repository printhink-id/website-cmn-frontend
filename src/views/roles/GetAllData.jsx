'use client'

import { useEffect, useState, useMemo } from 'react'

import {
  Card,
  Typography,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Skeleton,
  Tooltip,
  Box,
  Chip
} from '@mui/material'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import classnames from 'classnames'
import { encryptId } from '@/utils/crypto'
import { useRouter } from 'next/navigation'
import ConfirmModal from '@/components/ConfirmModal'

import tableStyles from '@core/styles/table.module.css'

const mockRoles = [
  { id: 1, name: 'Super Admin', description: 'Akses penuh ke semua fitur', totalUsers: 1 },
  { id: 2, name: 'Admin', description: 'Kelola pengguna dan konten', totalUsers: 5 },
  { id: 3, name: 'Manager', description: 'Kelola operasional harian', totalUsers: 8 },
  { id: 4, name: 'Supervisor', description: 'Pantau dan approve aktivitas', totalUsers: 12 },
  { id: 5, name: 'Staff', description: 'Akses fitur standar', totalUsers: 34 },
  { id: 6, name: 'Viewer', description: 'Hanya bisa melihat data', totalUsers: 20 }
]

const fetchRoles = ({ page, pageSize, search }) =>
  new Promise(resolve => {
    setTimeout(() => {
      const filtered = mockRoles.filter(
        r =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.description.toLowerCase().includes(search.toLowerCase())
      )

      resolve({ data: filtered.slice(page * pageSize, page * pageSize + pageSize), total: filtered.length })
    }, 600)
  })

const columnHelper = createColumnHelper()

const DebouncedInput = ({ value: initialValue, onChange, debounce = 400, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <TextField {...props} size='small' value={value} onChange={e => setValue(e.target.value)} />
}

const GetAllRoles = () => {
  const [dataApi, setDataApi] = useState([])
  const [totalRows, setTotalRows] = useState(0)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [loading, setLoading] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const router = useRouter()

  const columns = useMemo(() => {
    const skeletonProps = {
      animation: 'wave',
      variant: 'rectangular',
      height: 15,
      sx: { bgcolor: '#DEE9FA', borderRadius: '6px' }
    }

    const renderSkeleton = width => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton {...skeletonProps} width={width} />
      </Box>
    )

    return [
      columnHelper.accessor('name', {
        header: 'Role',
        cell: ({ row }) =>
          loading ? (
            renderSkeleton(150)
          ) : (
            <Typography variant='body2' fontWeight={500}>
              {row.original.name}
            </Typography>
          )
      }),

      columnHelper.accessor('description', {
        header: 'Deskripsi',
        cell: ({ row }) =>
          loading ? (
            renderSkeleton(200)
          ) : (
            <Typography variant='body2' color='text.secondary'>
              {row.original.description}
            </Typography>
          )
      }),

      columnHelper.accessor('totalUsers', {
        header: 'Total Pengguna',
        cell: ({ row }) =>
          loading ? (
            renderSkeleton(80)
          ) : (
            <Chip label={`${row.original.totalUsers} Users`} size='small' color='primary' variant='tonal' />
          )
      }),

      columnHelper.accessor('action', {
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) =>
          loading ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton {...skeletonProps} width={30} />
              <Skeleton {...skeletonProps} width={30} />
            </Box>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Tooltip title='Edit'>
                <IconButton
                  onClick={() => {
                    const encrypted = encryptId(row.original.id)
                    router.push(`/roles/edit/${encodeURIComponent(encrypted)}`)
                  }}
                >
                  <i className='ri-edit-box-line text-[22px] text-warning' />
                </IconButton>
              </Tooltip>

              <Tooltip title='Delete'>
                <IconButton size='small' onClick={() => setDeleteTarget(row.original)}>
                  <i className='ri-delete-bin-7-line text-[22px] text-error' />
                </IconButton>
              </Tooltip>
            </Box>
          )
      })
    ]
  }, [loading])

  const table = useReactTable({
    data: dataApi,
    columns,
    manualPagination: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } }
  })

  const loadData = async () => {
    setLoading(true)

    try {
      const res = await fetchRoles({ page, pageSize, search: globalFilter })

      setDataApi(res.data)
      setTotalRows(res.total)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [page, pageSize, globalFilter])

  const handlePageChange = (_, newPage) => setPage(newPage)

  const handleRowsPerPageChange = e => {
    setPageSize(Number(e.target.value))
    setPage(0)
  }

  const handleDelete = async () => {
    // await deleteRole(deleteTarget.id)
    console.log('Deleting role:', deleteTarget.id)
    setDeleteTarget(null)
    await loadData()
  }

  return (
    <Card>
      {/* Toolbar */}
      <Box sx={{ px: 5, py: 3, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <DebouncedInput
          value={globalFilter}
          onChange={val => {
            setGlobalFilter(val)
            setPage(0)
          }}
          placeholder='Search role atau deskripsi…'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <i className='ri-search-line text-[18px] text-textSecondary' />
              </InputAdornment>
            )
          }}
          sx={{ minWidth: 240 }}
        />
      </Box>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className='ri-arrow-up-s-line text-xl' />,
                          desc: <i className='ri-arrow-down-s-line text-xl' />
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {table.getRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component='div'
        className='border-bs'
        count={totalRows}
        rowsPerPage={pageSize}
        page={page}
        SelectProps={{ inputProps: { 'aria-label': 'rows per page' } }}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <ConfirmModal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        variant='danger'
        title='Hapus Role'
        description={
          deleteTarget
            ? `Apakah Anda yakin ingin menghapus role "${deleteTarget.name}"? Tindakan ini tidak dapat dibatalkan.`
            : ''
        }
        confirmText='Hapus'
        cancelText='Batal'
      />
    </Card>
  )
}

export default GetAllRoles
