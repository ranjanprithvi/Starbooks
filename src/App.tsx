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

function App() {
    const textColor = useColorModeValue("gray.700", "white");
    return (
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
            <GridItem area="nav">
                <NavBar />
            </GridItem>
            <Routes>
                <Route path="/books" element={<Books />} />
                <Route path="bookDetails/:id" element={<BookDetails />} />
                <Route path="books/:id" element={<BookForm />} />
                <Route path="users" element={<Users />} />
                <Route path="userDetails/:id" element={<UserDetails />} />
                <Route path="users/:id" element={<UserForm />} />
                <Route path="rentals" element={<Rentals />} />
                <Route path="rentals/:id" element={<RentalForm />} />
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
    );
}

export default App;
