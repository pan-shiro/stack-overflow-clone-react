import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {
  Link as RouterLink,
  useLoaderData,
  useRouteLoaderData,
} from 'react-router-dom'

export async function loader() {
  return fetch('/api/questions')
}

export default function Questions() {
  const questions = useLoaderData() as any
  const { tags } = useRouteLoaderData('root') as any

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          All Questions
        </Typography>
        <Button variant="contained">Ask Question</Button>
      </Toolbar>
      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="subtitle1">
          {questions.length} question
          {questions.length === 1 ? '' : 's'}
        </Typography>
        {/* A */}
      </Toolbar>
      {/* B */}
      <Stack spacing={2}>
        {questions.map((question: any) => (
          <Card key={question.id}>
            <CardContent>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: 'center', mb: 1.5 }}
              >
                <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                  {question.voteCount} vote
                  {question.voteCount === 1 ? '' : 's'}
                </Typography>
                {question.answerCount > 0 ? (
                  <Chip
                    color="success"
                    label={`${question.answerCount} answer${
                      question.answerCount === 1 ? '' : 's'
                    }`}
                    variant="outlined"
                  />
                ) : (
                  <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                    {question.answerCount} answer
                    {question.answerCount === 1 ? '' : 's'}
                  </Typography>
                )}
              </Stack>
              <Link
                component={RouterLink}
                sx={{ display: 'block', mb: 1.5 }}
                to={`/questions/${question.id}`}
                variant="h5"
              >
                {question.title}
              </Link>
              <Stack direction="row" spacing={1}>
                {question.tagIds.map((tagId: any) => {
                  const tag = tags.find((tag: any) => tag.id === tagId)

                  return (
                    <Chip key={tagId} label={tag.name} onClick={() => {}} />
                  )
                })}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}
