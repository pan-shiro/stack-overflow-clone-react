import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
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

      <Toolbar disableGutters>
        <Typography component="div" variant="h6">
          1 Answer
        </Typography>
      </Toolbar>

      <Stack spacing={2}>
        <Card>
          <CardContent>
            <Typography color="text.secondary">
              One of the recommended ways to loop through an array in JavaScript
              is to use the 'forEach' method. It provides a more concise syntax
              and handles the iteration automatically. Here's an example:
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Toolbar disableGutters>
        <Typography component="div" variant="h6">
          Your Answer
        </Typography>
      </Toolbar>

      <Card>
        <CardContent>
          <form id="new-answer" method="post">
            <TextField fullWidth multiline name="body" rows={4} />
            {/* Body is missing. */}
            {/* Body must be at least 30 characters; you entered ${body.length}. */}
          </form>
        </CardContent>

        <CardActions>
          <Button
            form="new-answer"
            name="intent"
            size="small"
            type="submit"
            value="post-answer"
          >
            Post Your Answer
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
