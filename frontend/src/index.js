import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ShowBooks from './book/ShowBooks';
import ShowAuthors from './author/ShowAuthors';
import ShowGenres from './genre/ShowGenres';
import NewGenre from './genre/NewGenre';
import NewAuthor from './author/NewAuthor';
import NewBook from './book/NewBook';
import Book from './book/Book';
import EditBook from './book/EditBook';
import EditGenre from './genre/EditGenre';
import { check_login } from './login_logic';
import ErrorDisplay from './ErrorDisplay';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: 'books',
        element: <ShowBooks/>,
        loader: async() => {
          const user = check_login();
          return fetch('http://localhost:8080/api/v1/book');
        },
        errorElement: <ErrorDisplay entity="knjige"/>
      },
      {
        path: 'authors',
        element: <ShowAuthors/>,
        loader: async() => {
          const user = check_login();
          return fetch('http://localhost:8080/api/v1/author');
        },
        errorElement: <ErrorDisplay entity="autori"/>
      },
      {
        path: 'genres',
        element: <ShowGenres/>,
        loader: async() => {
          const user = check_login();
          return fetch('http://localhost:8080/api/v1/genre');
        },
        errorElement: <ErrorDisplay entity="zanrovi"/>
      },
      {
        path:'genres/add_new',
        element: <NewGenre/>
      },
      {
        path:'authors/add_new',
        element: <NewAuthor/>
      },
      {
        path:'books/add_new',
        element: <NewBook/>
      },
      {
        path:'books/update/:id',
        element: <EditBook/>,
        loader: async({params}) => {
          return fetch(`http://localhost:8080/api/v1/book/${params.id}`);
        }
      },
      {
        path:'/books/book/:id',
        element: <Book/>,
        loader: async({params}) => {
          return fetch(`http://localhost:8080/api/v1/book/${params.id}`);
        }
      },
      {
        path:'genres/update/:id',
        element: <EditGenre/>,
        errorElement: <ErrorDisplay entity="zanr"/>,
        loader: async({params}) => {
          const user = check_login(['admin']);
          return fetch(`http://localhost:8080/api/v1/genre/${params.id}`);
        },
        action: async({params,request}) =>{
          const data = Object.fromEntries(await request.formData());
          return fetch(`http://localhost:8080/api/v1/genre/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
      }
    }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
