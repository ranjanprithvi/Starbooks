import "./App.css";
import { useState } from "react";
import { LoginContext } from "./contexts/loginContext";
import {
    Grid,
    GridItem,
    useBreakpointValue,
    useColorModeValue,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Routes from "./Routes";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(
        localStorage.getItem("token") !== null
    );
    const [isAdmin, setAdmin] = useState(
        localStorage.getItem("isAdmin") == "true"
    );

    const textColor = useColorModeValue("gray.700", "white");

    const dataView = useBreakpointValue(
        {
            base: "accordion",
            md: "table",
        },
        {
            // Breakpoint to use when mediaqueries cannot be used, such as in server-side rendering
            // (Defaults to 'base')
            fallback: "md",
        }
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
                width="100vw"
                color={textColor}
                templateAreas={{
                    base: `"nav" 
            "main"`,
                    lg: `"nav nav"         
          "aside main"`,
                }}
                templateColumns={{
                    base: "100vw",
                    lg: "200px 1fr",
                }}
            >
                <GridItem area="nav" marginBottom="5">
                    <NavBar />
                </GridItem>

                <Routes dataView={dataView} />
            </Grid>
        </LoginContext.Provider>
    );
}

export default App;
