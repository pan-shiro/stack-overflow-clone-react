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
  Form,
  useActionData,
  useLoaderData,
  useOutletContext,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router-dom'

function validateAnswerBody(body: string) {
  if (!body) {
    return 'Body is missing.'
  }

  if (body.length < 30) {
    return `Body must be at least 30 characters; you entered ${body.length}.`
  }
}

export async function action({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const newAnswer = {
    body: formData.get('body'),
    userId: 1,
  }

  const fieldErrors = {
    body: validateAnswerBody(newAnswer.body as string),
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return {
      fieldErrors,
    }
  }

  await fetch(`/api/questions/${params.questionId}/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAnswer),
  })

  return {}
}

export async function loader({ params }: LoaderFunctionArgs) {
  const [question, answers] = await Promise.all([
    fetch(`/api/questions/${params.questionId}`).then((res) => res.json()),
    fetch(`/api/questions/${params.questionId}/answers`).then((res) =>
      res.json()
    ),
  ])

  return { answers, question }
}

export default function Question() {
  const actionData = useActionData() as any
  const { answers, question } = useLoaderData() as any
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
          {answers.length} Answer{answers.length === 1 ? '' : 's'}
        </Typography>
      </Toolbar>

      <Stack spacing={2}>
        {answers.map((answer: any) => (
          <Card key={answer.id}>
            <CardContent>
              <Typography color="text.secondary">{answer.body}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Toolbar disableGutters>
        <Typography component="div" variant="h6">
          Your Answer
        </Typography>
      </Toolbar>

      <Card>
        <CardContent>
          <Form id="new-answer" method="post">
            <TextField
              error={!!actionData?.fieldErrors?.body}
              fullWidth
              helperText={actionData?.fieldErrors?.body}
              multiline
              name="body"
              rows={4}
            />
          </Form>
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
