import Box from "@mui/material/Box";
import Homefundo from '../assets/wepik-export-20231027142224ATMP.png';
import {BasicPage} from "../components/BasicPage";
import SwipeableTextMobileStepper from "../components/CarroselHom/SwipeableTextMobileStepper";
import Typography from "@mui/material/Typography";

export const HomePage = () => {

  return <BasicPage>
    <Box
      sx={{
          width: '100%',
          height: '83vh',
          display: { xs: "none", md: "flex" },
          backgroundSize: '100% auto',
          backgroundPosition: 'center',
          background: `url(${Homefundo})`,
          backgroundRepeat: 'no-repeat',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4rem'

      }}
  >
        <Box>
            <Typography variant="h4" color={"whitesmoke"} fontWeight={"900"}  >Plataforma Online</Typography>
            <Typography variant="h4" color={"whitesmoke"} fontWeight={"900"}  > para...</Typography>
            <Typography variant="h4" color={"greenyellow"} fontWeight={"900"}  >Gestão da manutenção,</Typography>
            <Typography variant="h4" color={"greenyellow"} fontWeight={"900"}  >Ordem de serviços,</Typography>
            <Typography variant="h4" color={"greenyellow"} fontWeight={"900"}  >IoT,</Typography>
            <Typography variant="h4" color={"greenyellow"} fontWeight={"900"}  >Sensoriamento</Typography>
        </Box>

        <Box
            sx={{
                display: "flex",
                flexDirection: 'column',
                backgroundSize: '100% auto',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'

            }}
        >
            <Typography variant="h4" color={"whitesmoke"} fontWeight={"999"}
            >Funcionalidades</Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '70vh',
                    height: 'auto',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                    borderRadius: '5px',
                    border: '1px solid #e0e0e0',

                }}
            >

                <SwipeableTextMobileStepper/>
            </Box>
        </Box>

  </Box>

      <Box
          // celular
          sx={{
              width: '100%',
              height: '83vh',
              display: { xs: "flex", md: "none" },
              background: `url(${Homefundo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              justifyContent: 'center',
              alignItems: 'center',
          }}
      >
          testete
      </Box>


  </BasicPage>

};

