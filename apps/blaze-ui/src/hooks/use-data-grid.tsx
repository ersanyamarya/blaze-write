import { DataGridProps } from '@mui/x-data-grid'
import { useState } from 'react'

interface ReturnDataGrid {
  register: () => Partial<DataGridProps>
  selectedRows: number[]
  setSelectedRows: (rows: number[]) => void
}
export function useDataGrid(): ReturnDataGrid {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const register = (): Partial<DataGridProps> => ({
    onRowSelectionModelChange: newRowSelectionModel => {
      setSelectedRows(newRowSelectionModel as number[])
    },
    rowSelectionModel: selectedRows,
  })

  return {
    register,
    selectedRows,
    setSelectedRows,
  }
}
