import { EnumResourceType, TopicPeopleAlsoAsk, useTopicDeleteResourceMutation } from '@blaze-write/api-operations'
import { Box, Button, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useDataGrid } from '../../../hooks'
import { ExternalLink, FolderKanban, Trash2 } from 'lucide-react'

interface QuestionTabPanelProps {
  questions: TopicPeopleAlsoAsk[]
  topicId: string
}

export function Question({ questions, topicId }: QuestionTabPanelProps) {
  const { register, selectedRows, setSelectedRows } = useDataGrid()
  const [deleteQuestion, { loading }] = useTopicDeleteResourceMutation({
    refetchQueries: ['TopicFindById'],
    onCompleted: () => {
      setSelectedRows([])
    },
  })
  const columns: GridColDef[] = [
    {
      field: 'question',
      headerName: 'Question',
      flex: 5,
      sortable: false,
      renderCell: params => (
        <Tooltip title={params.row.snippet} placement="top-start" arrow>
          <Typography variant="body2" noWrap>
            {params.row.question}
          </Typography>
        </Tooltip>
      ),
    },
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
  const rows = questions.map((question, index) => {
    return {
      id: index,
      question: question?.question,
      snippet: question?.snippet,
      link: question?.link,
      title: question?.title,
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
                    deleteQuestion({
                      variables: {
                        resourceType: EnumResourceType.PeopleAlsoAsk,
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
