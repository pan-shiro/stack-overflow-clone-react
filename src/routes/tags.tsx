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
import { Link, useOutletContext, useSearchParams } from "react-router-dom";

export default function Tags() {
  const { currentPage, tags, totalPages } = useOutletContext() as any;
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "popular";

  const handleChangeTab = (_event: any, value: any) => {
    if (value) {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set("tab", value);

      setSearchParams(newSearchParams);
    }
  };

  const handleChangePage = (_event: any, page: any) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("page", page);

    setSearchParams(newSearchParams);
  };

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
        <ToggleButtonGroup
          color="primary"
          exclusive
          onChange={handleChangeTab}
          size="small"
          value={tab}
        >
          <ToggleButton value="popular">Popular</ToggleButton>
          <ToggleButton value="name">Name</ToggleButton>
          <ToggleButton value="new">New</ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
      <Grid container spacing={2}>
        {tags.map((tag: any) => (
          <Grid key={tag.id} xs={3}>
            <Card>
              <CardContent sx={{ "&:last-child": { pb: 2 } }}>
                <Chip
                  component={Link}
                  label={tag.name}
                  onClick={() => {}}
                  sx={{ mb: "0.35em" }}
                  to={`/questions/tagged/${tag.name}`}
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
        <Pagination
          count={totalPages}
          onChange={handleChangePage}
          page={currentPage}
          shape="rounded"
          variant="outlined"
        />
      </Toolbar>
    </Box>
  );
}
