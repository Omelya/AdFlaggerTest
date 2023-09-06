import React from 'react';
import ReactDOM from 'react-dom/client';
import Main, { loader as adsLoader, } from './Components/Main.jsx';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ErrorPage from '@/Layouts/ErrorPage.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        loader: adsLoader,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
