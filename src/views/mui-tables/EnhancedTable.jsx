'use client'

import { useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'

const rows = [
  { id: 1, name: 'Cupcake', calories: 305 },
  { id: 2, name: 'Donut', calories: 452 },
  { id: 3, name: 'Eclair', calories: 262 }
]

export default function EnhancedTable() {
  const [order, setOrder] = useState('asc')

  const sortedRows = [...rows].sort((a, b) => (order === 'asc' ? a.calories - b.calories : b.calories - a.calories))

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>
              <TableSortLabel active direction={order} onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
                Calories
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.calories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
