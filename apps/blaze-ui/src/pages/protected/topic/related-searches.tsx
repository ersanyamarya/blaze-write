import { EnumResourceType, useTopicDeleteResourceMutation } from '@blaze-write/api-operations'
import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { ExternalLink, FolderKanban, Trash2 } from 'lucide-react'
import { useDataGrid } from '../../../hooks'

interface RelatedSearchesTabPanelProps {
  relatedSearch: string[]
  topicId: string
}

export function RelatedSearch({ relatedSearch, topicId }: RelatedSearchesTabPanelProps) {
  const { register, selectedRows, setSelectedRows } = useDataGrid()
  const [deleteRelatedSearch, { loading }] = useTopicDeleteResourceMutation({
    refetchQueries: ['TopicFindById'],
    onCompleted: () => {
      setSelectedRows([])
    },
  })
  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 5,
      sortable: false,
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
  const rows = relatedSearch.map((question, index) => {
    return {
      id: index,
      title: question,
    }
  })
  return (
    <Box sx={{ width: 'calc(100vw - 362px)' }}>
      <DataGrid
        loading={loading}
        rows={rows}
        columns={columns}
        {...register()}
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
                backgroundColor: 'transparent',
              }}
            >
              {selectedRows.length > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<Trash2 />}
                  color="error"
                  onClick={() => {
                    deleteRelatedSearch({
                      variables: {
                        resourceType: EnumResourceType.RelatedSearches,
                        topicDeleteResourceId: topicId,
                        indexes: selectedRows,
                      },
                    })
                  }}
                >
                  Remove selected questions
                </Button>
              )}
            </Box>
          ),
          noRowsOverlay: () => <Box> No organic links found. Please add some organic links to this topic.</Box>,
        }}
      />
    </Box>
  )
}
