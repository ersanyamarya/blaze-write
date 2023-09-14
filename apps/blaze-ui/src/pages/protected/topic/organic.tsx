import { EnumResourceType, TopicOrganic, useTopicDeleteResourceMutation } from '@blaze-write/api-operations'
import { Box, Button, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { ExternalLink, FolderKanban, Trash2 } from 'lucide-react'
import { useDataGrid } from '../../../hooks'

interface OrganicTabPanelProps {
  organicLinks: TopicOrganic[]
  topicId: string
}

export function Organic({ organicLinks, topicId }: OrganicTabPanelProps) {
  const { register, selectedRows, setSelectedRows } = useDataGrid()

  const [deleteOrganic, { loading }] = useTopicDeleteResourceMutation({
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
                    deleteOrganic({
                      variables: {
                        resourceType: EnumResourceType.Organic,
                        topicDeleteResourceId: topicId,
                        indexes: selectedRows,
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
      />
    </Box>
  )
}
