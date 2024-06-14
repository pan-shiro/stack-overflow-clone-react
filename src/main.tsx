import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Ask, { action as askAction } from "./routes/ask";
import LeftSidebar from "./routes/left-sidebar";
import Question, {
  action as questionAction,
  loader as questionLoader,
} from "./routes/question";
import Questions, {
  handle as questionsHandle,
  loader as questionsLoader,
} from "./routes/questions";
import RightSidebar from "./routes/right-sidebar";
import Root, { loader as tagsLoader } from "./routes/root";

const router = createBrowserRouter([
  {
    children: [
      {
        children: [
          {
            children: [
              {
                element: <Questions />,
                handle: questionsHandle,
                index: true,
                loader: questionsLoader,
              },
              {
                element: <Questions />,
                handle: questionsHandle,
                loader: questionsLoader,
                path: "/questions",
              },
              {
                action: questionAction,
                element: <Question />,
                loader: questionLoader,
                path: "/questions/:questionId",
              },
            ],
            // https://reactrouter.com/en/main/route/route#layout-routes
            element: <RightSidebar />,
          },
        ],
        // https://reactrouter.com/en/main/route/route#layout-routes
        element: <LeftSidebar />,
      },
      {
        action: askAction,
        element: <Ask />,
        path: "/questions/ask",
      },
    ],
    element: <Root />,
    id: "root",
    loader: tagsLoader,
    path: "/",
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
