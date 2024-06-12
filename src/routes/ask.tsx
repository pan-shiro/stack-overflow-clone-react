import LoadingButton from '@mui/lab/LoadingButton'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import { useState } from 'react'
import {
  Form,
  redirect,
  useOutletContext,
  type ActionFunctionArgs,
} from 'react-router-dom'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const tagIds = formData.get('tagIds')
  const newQuestion = {
    body: formData.get('body'),
    tagIds: tagIds !== '' ? tagIds.split(',').map(Number) : [],
    title: formData.get('title'),
    userId: 1,
  }

  const response = await fetch('/api/questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newQuestion),
  })

  const { id } = await response.json()

  return redirect(`/questions/${id}`)
}

export default function Ask() {
  const tags = useOutletContext() as any
  const [selectedTagIds, setSelectedTagIds] = useState<any>([])

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Card>
        <CardHeader
          title="Ask a public question"
          titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent>
          <Stack component={Form} id="new-question" method="post" spacing={2}>
            <TextField
              autoFocus
              label="Title"
              name="title"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            />
            <TextField label="Body" multiline name="body" rows={4} />
            <Autocomplete
              getOptionLabel={(option: number) =>
                tags.find((tag: any) => tag.id === option)?.name
              }
              multiple
              onChange={(_, value) => setSelectedTagIds(value)}
              options={tags.map((tag: any) => tag.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tags"
                  placeholder="e.g. (database ruby .net)"
                  variant="outlined"
                />
              )}
              value={selectedTagIds}
            />
            <input
              name="tagIds"
              onChange={() => {}}
              type="hidden"
              value={selectedTagIds.join(',')}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <LoadingButton form="new-question" size="small" type="submit">
            Post your question
          </LoadingButton>
        </CardActions>
      </Card>
    </Box>
  )
}
