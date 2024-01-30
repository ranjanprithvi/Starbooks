import React from "react";
import { Navigate, Route, Routes as ReactRoutes } from "react-router-dom";
import Books from "./components/Books/Books";
import BookDetails from "./components/Books/BookDetails";
import BookForm from "./components/Books/BookForm";
import NotFound from "./components/common/NotFound";
import Rentals from "./components/Rentals/Rentals";
import Users from "./components/Users/Users";
import RentalForm from "./components/Rentals/RentalForm";
import UserDetails from "./components/Users/UserDetails";
import UserForm from "./components/Users/UserForm";
import LoginForm from "./components/Users/LoginForm";
import ProtectedAdminComponent from "./components/common/ProtectedAdminComponent";
import ProtectedComponent from "./components/common/ProtectedComponent";
import AuthorGenreList from "./components/Authors/AuthorGenreList";
import Home from "./components/Home";

const Routes = ({ dataView }: { dataView?: string | undefined }) => {
    return (
        <ReactRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/books" element={<Books />} />
            <Route path="bookDetails/:id" element={<BookDetails />} />
            <Route
                path="books/:id"
                element={
                    <ProtectedAdminComponent>
                        <BookForm />
                    </ProtectedAdminComponent>
                }
            />
            <Route
                path="users"
                element={
                    <ProtectedAdminComponent>
                        <Users dataView={dataView} />
                    </ProtectedAdminComponent>
                }
            />
            <Route
                path="userDetails/:id"
                element={
                    <ProtectedComponent>
                        <UserDetails />
                    </ProtectedComponent>
                }
            />
            <Route
                path="users/:id"
                element={
                    <ProtectedAdminComponent>
                        <UserForm />
                    </ProtectedAdminComponent>
                }
            />
            <Route
                path="rentals"
                element={
                    <ProtectedAdminComponent>
                        <Rentals />
                    </ProtectedAdminComponent>
                }
            />
            <Route
                path="rentals/:id"
                element={
                    <ProtectedAdminComponent>
                        <RentalForm />
                    </ProtectedAdminComponent>
                }
            />
            <Route path="/authorGenreList" element={<AuthorGenreList />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
        </ReactRoutes>
    );
};

export default Routes;
