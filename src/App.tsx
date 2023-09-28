import "./App.css";
import {
    Box,
    Grid,
    GridItem,
    HStack,
    Show,
    useColorModeValue,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import BookDetails from "./components/BookDetails";
import BookForm from "./components/BookForm";

function App() {
    const textColor = useColorModeValue("gray.700", "white");
    return (
        <Grid
            color={textColor}
            templateAreas={{
                base: `"nav" "main"`,
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
                <Route path="/" element={<Books />} />
                <Route path="books/:id" element={<BookDetails />} />
                <Route path="editBook/:id" element={<BookForm />} />
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
