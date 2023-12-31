import {
  EnumResourceType,
  TopicOrganic,
  useTopicDeleteResourceMutation,
  useTopicScrapeLinksMutation,
} from '@blaze-write/api-operations'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { ExternalLink, FolderKanban, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { StyledActionSection } from '../../../../components/table-tool-bar-menu'
import { useDataGrid } from '../../../../hooks'

interface OrganicTabPanelProps {
  organicLinks: TopicOrganic[]
  topicId: string
}

export function Organic({ organicLinks, topicId }: OrganicTabPanelProps) {
  const { register, selectedRows, setSelectedRows } = useDataGrid()
  const [open, setOpen] = useState(false)
  const [scrapedDialogData, setScrapedDialogData] = useState({
    title: '',
    scrapedData: '',
  })

  const handleClickOpen = (title: string, scrapedData: string) => {
    setScrapedDialogData({
      title,
      scrapedData,
    })

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setScrapedDialogData({
      title: '',
      scrapedData: '',
    })
  }

  const [deleteOrganic, { loading }] = useTopicDeleteResourceMutation({
    refetchQueries: ['TopicFindById'],
    onCompleted: () => {
      setSelectedRows([])
    },
  })

  const [scrapeOrganic, { loading: loadingScrape }] = useTopicScrapeLinksMutation({
    refetchQueries: ['TopicFindById'],
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
          {params.row.scrapedData && (
            <IconButton aria-label="edit" onClick={() => handleClickOpen(params.row.title, params.row.scrapedData)}>
              <FolderKanban />
            </IconButton>
          )}
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
      scrapedData: organic?.scraped,
    }
  })
  return (
    <>
      <ScrapedDataDialog
        open={open}
        handleClose={handleClose}
        title={scrapedDialogData.title}
        scrapedData={scrapedDialogData.scrapedData}
      />

      <Box sx={{ width: 'calc(100vw - 362px)' }}>
        <DataGrid
          loading={loading || loadingScrape}
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
                    <Button
                      variant="outlined"
                      startIcon={<FolderKanban />}
                      color="primary"
                      onClick={() => {
                        scrapeOrganic({
                          variables: {
                            topicScrapeLinksId: topicId,
                            indexes: selectedRows,
                          },
                        })
                      }}
                    >
                      Scrape selected links
                    </Button>
                  </>
                )}
              </StyledActionSection>
            ),
            noRowsOverlay: () => <Box> No organic links found. Please add some organic links to this topic.</Box>,
          }}
        />
      </Box>
    </>
  )
}

interface ScrapedDataDialogProps {
  open: boolean
  handleClose: () => void
  title: string
  scrapedData: string
}

export function ScrapedDataDialog({ open, handleClose, title, scrapedData }: ScrapedDataDialogProps) {
  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={handleClose}
      aria-labelledby="scraped-data-dialog-title"
      aria-describedby="scraped-data-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{scrapedData}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
