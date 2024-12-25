import { Box} from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Createpage from "./pages/Createpage"

function App() {
  return (
    <Box minH={"100vh"} width={"100vw"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/create" element={<Createpage />}></Route>
      </Routes>
    </Box>
  )
}

export default App