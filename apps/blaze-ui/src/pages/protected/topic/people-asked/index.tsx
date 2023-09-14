import { TopicPeopleAlsoAsk } from '@blaze-write/api-operations'
import { Box, Button, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { ExternalLink, FolderKanban, Trash2 } from 'lucide-react'
import { StyledActionSection } from '../../../../components/table-tool-bar-menu'
import { useDataGrid } from '../../../../hooks'
import useServerData from './use-server-data'

interface QuestionTabPanelProps {
  questions: TopicPeopleAlsoAsk[]
  topicId: string
}

export function Question({ questions, topicId }: QuestionTabPanelProps) {
  const { register, selectedRows, setSelectedRows } = useDataGrid()
  const { loading, handleDeleteQuestion, handleCopyQuestionToOrganic } = useServerData({
    topicId,
    onMutationCompleted: () => {
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
            <StyledActionSection>
              {selectedRows.length > 0 && (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<Trash2 />}
                    color="error"
                    onClick={() => {
                      handleDeleteQuestion(selectedRows)
                    }}
                  >
                    Remove selected questions
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<FolderKanban />}
                    color="primary"
                    onClick={() => {
                      handleCopyQuestionToOrganic(selectedRows)
                    }}
                  >
                    Copy selected questions to organic
                  </Button>
                </>
              )}
            </StyledActionSection>
          ),
          noRowsOverlay: () => <Box> No organic links found. Please add some organic links to this topic.</Box>,
        }}
      />
    </Box>
  )
}
