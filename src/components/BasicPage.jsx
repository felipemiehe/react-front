import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Footer from "./footer/Footer";

export const BasicPage = ({ title, icon, ...props }) => {

  return (
      <Box
          sx={{
              height: '90vh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',

          }}
      >
          <Box
              sx={{
                  height: '90%',
                  width: '100%'

              }}
          >
            {props.children}

          </Box>
          <Box
              sx={{
                  height: '10%',
                  width: '100%',
                  bottom: 0,

              }}
          >
              <Footer/>

          </Box>
      </Box>

  );
};
