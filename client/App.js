import React, { Fragment as Fr } from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { Container } from "@chakra-ui/react";

const App = () => {
  return (
    <Fr>
      <Navbar />
      <Container maxW="container.xl" mt="1.5rem">
        {true && <Routes />}
      </Container>
    </Fr>
  );
};

export default App;
