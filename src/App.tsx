import "./App.css";
import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import BookDetails from "./components/BookDetails";
import BookForm from "./components/BookForm";
import NotFound from "./components/NotFound";
import Rentals from "./components/Rentals";
import Users from "./components/Users";
import RentalForm from "./components/RentalForm";
import UserDetails from "./components/UserDetails";
import UserForm from "./components/UserForm";
import { useState } from "react";
import { LoginContext } from "./contexts/loginContext";
import LoginForm from "./components/LoginForm";
import ProtectedAdminComponent from "./components/common/ProtectedAdminComponent";
import ProtectedComponent from "./components/common/ProtectedComponent";
import AuthorGenreList from "./components/AuthorGenreList";
import Home from "./components/Home";

function App() {
    const textColor = useColorModeValue("gray.700", "white");
    const [isLoggedIn, setLoggedIn] = useState(
        localStorage.getItem("token") !== null
    );
    const [isAdmin, setAdmin] = useState(
        localStorage.getItem("isAdmin") == "true"
    );

    return (
        <LoginContext.Provider
            value={{
                isLoggedIn,
                setLoggedIn: setLoggedIn,
                isAdmin,
                setAdmin: setAdmin,
            }}
        >
            <Grid
                color={textColor}
                templateAreas={{
                    base: `"nav" 
                        "main"`,
                    lg: `"nav nav"         
                      "aside main"`,
                }}
                templateColumns={{
                    base: "1fr",
                    lg: "200px 1fr",
                }}
            >
                <GridItem area="nav" marginBottom="5">
                    <NavBar />
                </GridItem>

                <Routes>
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
                                <Users />
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
                    <Route
                        path="/authorGenreList"
                        element={<AuthorGenreList />}
                    />
                    <Route path="/not-found" element={<NotFound />} />
                    <Route
                        path="*"
                        element={<Navigate to="/not-found" replace />}
                    />

                    {/* User Routes
                    <Route path="records/:id" element={<RecordForm />} />

                    <Route path="appointments" element={<Appointments />} />
                    <Route path="medicalrecords" element={<MedicalRecords />} />
                    <Route
                        path="externalrecords"
                        element={<ExternalRecords />}
                    />
                    <Route path="prescriptions" element={<Prescriptions />} />
                    <Route path="profiles/:id" element={<ProfileForm />} />
                    <Route path="profiles" element={<Profiles />} />
                    {/* </Route>
                <Route
                    path="/hospitaldashboard"
                    element={<HospitalDashboard />}
                > */}

                    {/* Hospital Routes */}
                    {/* <Route
                        path="hospitalappointments"
                        element={<HospitalAppointments />}
                    />
                    <Route path="allprofiles" element={<AllProfiles />} />
                    <Route
                        path="profiledocuments/:id"
                        element={<ProfileDocuments />}
                    />
                    <Route path="createslots" element={<CreateSlotsForm />} />
                </Route>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/rough" element={<Rough />} />

                <Route path="/not-found" element={<NotFound />} />
                <Route
                    path="*"
                    element={<Navigate to="/not-found" replace />}
                /> */}
                </Routes>
            </Grid>
        </LoginContext.Provider>
    );
}

export default App;
