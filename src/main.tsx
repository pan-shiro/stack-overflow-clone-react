import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Question, { loader as questionLoader } from './routes/question'
import Questions, { loader as questionsLoader } from './routes/questions'
import Root, { loader as tagsLoader } from './routes/root'

const router = createBrowserRouter([
  {
    children: [
      {
        element: <Questions />,
        index: true,
        loader: questionsLoader,
      },
      {
        element: <Questions />,
        loader: questionsLoader,
        path: '/questions',
      },
      {
        element: <Question />,
        loader: questionLoader,
        path: '/questions/:questionId',
      },
    ],
    element: <Root />,
    loader: tagsLoader,
    path: '/',
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
