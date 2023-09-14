import { TopicOrganic } from '@blaze-write/api-operations'
import { Box, IconButton, Link, Stack, Typography, styled } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { BinaryIcon, Bitcoin, ExternalLink, FolderKanban, Linkedin, PencilLine, PlusCircleIcon, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface CustomTabPanelProps {
  topic: TopicOrganic[]
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
  },
}))

export function Organic({ topic }: CustomTabPanelProps) {
  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 5 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: params => (
        <Stack direction="row" justifyContent="center" spacing={1} alignItems="center" width={'100%'}>
          <IconButton aria-label="edit">
            <FolderKanban />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => window.open(params.row.link, '_blank')}>
            <ExternalLink />
          </IconButton>
        </Stack>
      ),
    },
  ]

  const rows = topic.map((organic, index) => {
    return {
      id: organic?.title,
      number: index,
      title: organic?.title,
      link: organic?.link,
    }
  })
  return (
    <Box sx={{ height: '100%', width: 'calc(100vw - 362px)' }}>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
              page: 0,
            },
          },
        }}
        pageSizeOptions={[10, 15, 20, 25, 30, 35, 40, 45, 50]}
        checkboxSelection
        disableRowSelectionOnClick
        density="compact"
        disableColumnMenu
        disableColumnSelector
        showCellVerticalBorder
        showColumnVerticalBorder
      />
    </Box>
  )
}

interface OrganicLinkCardProps {
  index: number
  title: string
  link: string
  snippet: string
  date?: string | null
}
function OrganicLinkCard({ index, title, link, snippet, date }: OrganicLinkCardProps) {
  return (
    <Box
      sx={{
        width: '72vw',
        padding: '0.15rem 1rem',
        margin: '0rem',
        boxSizing: 'border-box',
      }}
    >
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <Typography variant="h6" gutterBottom>
          {index} - {title}
        </Typography>
      </Link>
    </Box>
  )
}
