import { EnumResourceType, TopicOrganic, useTopicDeleteResourceMutation } from '@blaze-write/api-operations'
import { Box, Button, IconButton, Stack, Tooltip, Typography, styled } from '@mui/material'
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import { ExternalLink, FolderKanban, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface CustomTabPanelProps {
  organicLinks: TopicOrganic[]
  topicId: string
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
  },
}))

export function Organic({ organicLinks, topicId }: CustomTabPanelProps) {
  const [deleteOrganic, { loading }] = useTopicDeleteResourceMutation({
    refetchQueries: ['TopicFindById'],
    onCompleted: () => {
      setRowSelectionModel([])
    },
  })
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([])
  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 5,
      sortable: false,
      renderCell: params => (
        <Tooltip title={params.row.snippet} placement="top-start" arrow>
          <Typography variant="body2" noWrap>
            {params.row.title}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: params => (
        <Stack direction="row" justifyContent="center" spacing={1} alignItems="center" width={'100%'}>
          <IconButton aria-label="edit">
            <FolderKanban />
          </IconButton>
          <Tooltip title={params.row.link} placement="left-start" arrow>
            <IconButton aria-label="edit" onClick={() => window.open(params.row.link, '_blank')}>
              <ExternalLink />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ]

  const rows = organicLinks.map((organic, index) => {
    return {
      id: index,
      title: organic?.title,
      link: organic?.link,
      snippet: organic?.snippet,
    }
  })
  return (
    <Box sx={{ width: 'calc(100vw - 362px)' }}>
      <StyledDataGrid
        loading={loading}
        autoHeight
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
        onRowSelectionModelChange={newRowSelectionModel => {
          setRowSelectionModel(newRowSelectionModel)
        }}
        rowSelectionModel={rowSelectionModel}
        slots={{
          toolbar: () => (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                height: '3rem',
              }}
            >
              {rowSelectionModel.length > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<Trash2 />}
                  color="error"
                  onClick={() => {
                    deleteOrganic({
                      variables: {
                        resourceType: EnumResourceType.Organic,
                        topicDeleteResourceId: topicId,
                        indexes: rowSelectionModel as number[],
                      },
                    })
                  }}
                >
                  Remove selected links
                </Button>
              )}
            </Box>
          ),
          noRowsOverlay: () => <Box> No organic links found. Please add some organic links to this topic.</Box>,
        }}
        slotProps={{
          toolbar: {},
        }}
      />
    </Box>
  )
}
