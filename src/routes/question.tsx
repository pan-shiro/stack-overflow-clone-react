import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {
  useLoaderData,
  useOutletContext,
  type LoaderFunctionArgs,
} from 'react-router-dom'

export async function loader({ params }: LoaderFunctionArgs) {
  return fetch(`/api/questions/${params.questionId}`)
}

export default function Question() {
  const question = useLoaderData() as any
  const tags = useOutletContext() as any

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          {question.title}
        </Typography>
        <Button variant="contained">Ask Question</Button>
      </Toolbar>
      <Card>
        <CardContent>
          <Typography color="text.secondary" sx={{ mb: 1.5 }}>
            {question.body}
          </Typography>
          <Stack direction="row" spacing={1}>
            {question.tagIds.map((tagId: any) => {
              const tag = tags.find((tag: any) => tag.id === tagId)

              return <Chip key={tagId} label={tag.name} onClick={() => {}} />
            })}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
