import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { yellow } from "@mui/material/colors";
import PopupState, { bindHover, bindPopover } from "material-ui-popup-state";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import {
  Link as RouterLink,
  useLoaderData,
  useMatch,
  useOutletContext,
  useParams,
} from "react-router-dom";
import WatchedTags from "../components/watched-tags";
import { indexBy } from "../lib/utils";

export async function loader() {
  const [questions, watchedTags] = await Promise.all([
    fetch("/api/questions").then((res) => res.json()),
    fetch("/api/users/1/watchedTags").then((res) => res.json()),
  ]);

  return { questions, watchedTags };
}

export const handle = {
  rightSidebar: (data: any) => {
    return (
      <List>
        <ListItem>
          <WatchedTags watchedTags={data.watchedTags} />
        </ListItem>
      </List>
    );
  },
};

export default function Questions() {
  const { questions, watchedTags } = useLoaderData() as any;
  const showQuestionBody = useMatch("/questions/*");
  const tagsResponse = useOutletContext() as any;
  const tags = indexBy(tagsResponse.tags, "id");
  const { tagName } = useParams();

  const filteredQuestions = tagName
    ? questions.filter((question: any) =>
        question.tagIds.some((tagId: any) => tags[tagId].name === tagName)
      )
    : questions;

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          {tagName ? `Questions tagged [${tagName}]` : "All Questions"}
        </Typography>
        <Button component={RouterLink} to="/questions/ask" variant="contained">
          Ask Question
        </Button>
      </Toolbar>
      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="subtitle1">
          {filteredQuestions.length} question
          {filteredQuestions.length === 1 ? "" : "s"}
        </Typography>
      </Toolbar>
      <Stack spacing={2}>
        {filteredQuestions.map((question: any) => {
          const isWatched = question.tagIds.some((tagId: any) =>
            watchedTags.includes(tagId)
          );

          return (
            <Card
              key={question.id}
              sx={{ bgcolor: isWatched ? yellow[50] : undefined }}
            >
              <CardContent sx={{ "&:last-child": { pb: 2 } }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center", mb: "0.35em" }}
                >
                  <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                    {question.voteCount} vote
                    {question.voteCount === 1 ? "" : "s"}
                  </Typography>
                  {question.answerCount > 0 ? (
                    <Chip
                      color="success"
                      label={`${question.answerCount} answer${
                        question.answerCount === 1 ? "" : "s"
                      }`}
                      variant="outlined"
                    />
                  ) : (
                    <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                      {question.answerCount} answer
                      {question.answerCount === 1 ? "" : "s"}
                    </Typography>
                  )}
                </Stack>
                <Link
                  component={RouterLink}
                  sx={{
                    display: "block",
                    mb: showQuestionBody ? undefined : 1.5,
                  }}
                  to={`/questions/${question.id}`}
                  variant="h5"
                >
                  {question.title}
                </Link>
                {showQuestionBody && (
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      mb: 1.5,
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                    color="text.secondary"
                  >
                    {question.body}
                  </Typography>
                )}
                <Stack direction="row" flexWrap="wrap" spacing={1} useFlexGap>
                  {question.tagIds.map((tagId: any) => {
                    const isWatched = watchedTags.includes(tagId);
                    const tag = tags[tagId];

                    return (
                      <PopupState
                        key={tagId}
                        popupId={`demoPopover${tagId}`}
                        variant="popover"
                      >
                        {(popupState) => (
                          <div>
                            <Chip
                              component={RouterLink}
                              icon={isWatched ? <VisibilityIcon /> : undefined}
                              key={tagId}
                              label={tag.name}
                              onClick={() => {}}
                              to={`/questions/tagged/${tag.name}`}
                              {...bindHover(popupState)}
                            />
                            <HoverPopover
                              {...bindPopover(popupState)}
                              anchorOrigin={{
                                horizontal: "center",
                                vertical: "bottom",
                              }}
                              slotProps={{
                                paper: {
                                  sx: {
                                    maxWidth: 345,
                                  },
                                },
                              }}
                              transformOrigin={{
                                horizontal: "center",
                                vertical: "top",
                              }}
                            >
                              <CardContent>
                                <Typography
                                  color="text.secondary"
                                  gutterBottom
                                  sx={{ fontSize: 14 }}
                                >
                                  {tag.occurrenceCount} question
                                  {tag.occurrenceCount === 1 ? "" : "s"}
                                </Typography>
                                <Typography variant="body2">
                                  {tag.description}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button
                                  size="small"
                                  startIcon={
                                    isWatched ? (
                                      <VisibilityOffIcon />
                                    ) : (
                                      <VisibilityIcon />
                                    )
                                  }
                                >
                                  {isWatched ? "Unwatch" : "Watch"} tag
                                </Button>
                              </CardActions>
                            </HoverPopover>
                          </div>
                        )}
                      </PopupState>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
