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

export default function Ask() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Card>
        <CardHeader
          title="Ask a public question"
          titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent>
          <Stack component="form" id="new-question" method="post" spacing={2}>
            <TextField
              autoFocus
              label="Title"
              name="title"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            />
            <TextField label="Body" multiline name="body" rows={4} />
            <Autocomplete
              multiple
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tags"
                  placeholder="e.g. (database ruby .net)"
                  variant="outlined"
                />
              )}
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
