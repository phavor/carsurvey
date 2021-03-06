import { Box, Button, Container, Typography } from "@mui/material"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Wrapper } from "./feedback.styles"

interface ILocation {
  pathname: string
  state: any
}
const Feedback = () => {
  const location = useLocation() as ILocation
  const navigate = useNavigate()

  return (
    <Wrapper>
      <Container maxWidth="lg" className="container">
        {location?.state?.reason === "beginner" ? (
          <Typography variant="h3" textAlign={"center"} color="#f1f1f1">
            We are targeting more experienced clients, thank you for your
            interest
          </Typography>
        ) : (
          <Typography variant="h3" textAlign={"center"} color="#f1f1f1">
            Thank you for participating in Car Survey
          </Typography>
        )}

        <Typography
          variant="body1"
          textAlign={"center"}
          color="#f1f1f1"
          mt="2em"
        >
          Your answers have been recorded, you can retake this survey and share
          it with your friends
        </Typography>

        <Box sx={{ marginTop: "4em" }}>
          <Button
            size="large"
            onClick={() => navigate("/")}
            variant="contained"
            sx={{ marginRight: "1.5em" }}
          >
            Retake
          </Button>
          <Button color="success" size="large" variant="contained">
            Share
          </Button>
        </Box>
      </Container>
    </Wrapper>
  )
}

export default Feedback
