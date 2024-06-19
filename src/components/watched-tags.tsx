import VisibilityIcon from "@mui/icons-material/Visibility";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useLocation, useOutletContext, useSubmit } from "react-router-dom";
import { indexBy } from "../lib/utils";

export default function WatchedTags({ watchedTags }: any) {
  const isWatching = watchedTags.length > 0;
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [pendingTagId, setPendingTagId] = useState<string | null>(null);
  const tagsResponse = useOutletContext() as any;
  const tags = indexBy(tagsResponse.tags, "id");
  const submit = useSubmit();

  const handleAdd = () => {
    if (pendingTagId) {
      const formData = new FormData();

      formData.append("redirectTo", location.pathname);
      formData.append("watchedTags", [...watchedTags, pendingTagId].join(" "));

      submit(formData, { action: "/save-watched-tags", method: "post" });

      setPendingTagId(null);
    }
  };

  const handleDelete = (tagId: any) => {
    const formData = new FormData();

    formData.append("redirectTo", location.pathname);
    formData.append(
      "watchedTags",
      watchedTags.filter((watchedTag: any) => watchedTag !== tagId)
    );

    submit(formData, { action: "/save-watched-tags", method: "post" });

    setPendingTagId(null);
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
        <CardContent>
          {isWatching ? (
            <Stack direction="row" flexWrap="wrap" spacing={1} useFlexGap>
              {watchedTags.map((tagId: any) => (
                <Chip
                  key={tagId}
                  label={tags[tagId].name}
                  onClick={() => {}}
                  onDelete={isEditing ? () => handleDelete(tagId) : undefined}
                />
              ))}
            </Stack>
          ) : null}
          {isEditing ? (
            <Autocomplete
              getOptionDisabled={(option) =>
                watchedTags.includes(parseInt(option, 10))
              }
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
