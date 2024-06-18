import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useOutletContext } from "react-router-dom";

export default function Tags() {
  const { tags } = useOutletContext() as any;

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Toolbar disableGutters>
        <Typography component="div" variant="h6">
          Tags
        </Typography>
      </Toolbar>
      <Toolbar disableGutters>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          name="query"
          placeholder="Filter by tag name"
        />
        <Box sx={{ flexGrow: 1 }} />
        <ToggleButtonGroup color="primary" exclusive size="small">
          <ToggleButton value="popular">Popular</ToggleButton>
          <ToggleButton value="name">Name</ToggleButton>
          <ToggleButton value="new">New</ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
      <Grid container spacing={2}>
        {Object.values(tags).map((tag: any) => (
          <Grid key={tag.id} xs={3}>
            <Card>
              <CardContent sx={{ "&:last-child": { pb: 2 } }}>
                <Chip
                  label={tag.name}
                  onClick={() => {}}
                  sx={{ mb: "0.35em" }}
                />
                <Typography
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    mb: 1.5,
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 4,
                  }}
                >
                  {tag.description}
                </Typography>
                <Typography variant="body2">
                  {tag.occurrenceCount} question
                  {tag.occurrenceCount === 1 ? "" : "s"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Pagination shape="rounded" variant="outlined" />
      </Toolbar>
    </Box>
  );
}
