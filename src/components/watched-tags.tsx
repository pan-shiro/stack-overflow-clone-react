import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function WatchedTags() {
  const isWatching = false;
  const [isEditing, setIsEditing] = useState(false);
  const [pendingTagId, setPendingTagId] = useState<any>(null);
  const tags = useOutletContext() as any;

  const handleAdd = () => {
    if (pendingTagId) {
      setPendingTagId(null);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClickAway = () => {
    setIsEditing(false);
    setPendingTagId(null);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Card sx={{ flexGrow: 1 }}>
        <CardHeader title="Watched Tags" />
        <CardContent sx={{ "&:last-child": { pb: 2 } }}>
          {isWatching ? (
            <Stack direction="row">
              <Chip label="javascript" onClick={() => {}} onDelete={() => {}} />
            </Stack>
          ) : null}
          {isEditing ? (
            <Autocomplete
              getOptionLabel={(option) => tags[option].name}
              onChange={(_event, value) => setPendingTagId(value)}
              options={Object.keys(tags)}
              renderInput={(params) => (
                <TextField {...params} autoFocus variant="outlined" />
              )}
              sx={{ mt: isWatching ? 1.5 : undefined }}
              value={pendingTagId}
            />
          ) : null}
          {!isEditing && !isWatching ? (
            <Typography color="text.secondary" variant="body2">
              Watch tags to curate your list of questions.
            </Typography>
          ) : null}
        </CardContent>
        <CardActions>
          {isEditing ? (
            <Button onClick={handleAdd} size="small">
              Add
            </Button>
          ) : (
            <Button
              onClick={handleEdit}
              size="small"
              startIcon={isWatching ? undefined : <VisibilityIcon />}
            >
              {isWatching ? "Edit" : "Watch a tag"}
            </Button>
          )}
        </CardActions>
      </Card>
    </ClickAwayListener>
  );
}
