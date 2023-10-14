import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/loading/Loading";
import {useState} from "react";
import {Alert} from "@mui/material";
import {useForm} from "react-hook-form";


export const LoginPage = () => {
  const { login, logout,  api } = useAuth();
  const[isLoading, setIsloading]= useState(false);
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const { register, handleSubmit, formState: { errors }, setError: setFormError } = useForm();
  const [showFormErrors, setShowFormErrors] = useState(false);

  const onSubmit = async (data) => {
    setIsloading(true);
    setError({ status: false, msg: '', type: '' })
    const loginData = {
      email: data.email,
      password: data.password
    };
    try {
      const loginResponse = await fetch(api + '/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(loginData)
      });

      if (loginResponse.ok) {
        const userResponse = await fetch(api + '/user', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });

        if (userResponse.ok) {
          login(await userResponse.json());
        } else {
          await logout();
          setError({ status: true, msg: 'Erro ao buscar dados do usuário', type: 'error' });
        }
      } else {
        const errorData = await loginResponse.json();
        setFormError('email', { message: errorData.message });
        setFormError('password', { message: errorData.message });
        setShowFormErrors(true);
      }
    } catch (e) {
      setError({ status: true, msg: 'Erro na solicitação tente mais tarde ou entre em contato com o suporte', type: 'error' });
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" paddingBottom={2} >
          Log In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {error.status ? <Alert severity={error.type} sx={{ mt: 3 , mb: 2}}>{error.msg}</Alert> : ''}
          <TextField
              id="outlined-basic"
              name="email"
              required
              label="email"
              variant="outlined"
              fullWidth
              {...register("email", { required: "email é requerido" })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
          />
          <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: "password é requerido" })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login In
          </Button>
        </form>
          <Grid container>
            <Grid item>
              <RouterLink to="/forgotpassword">
                <p>esqueceu a senha? clique aqui!</p>
              </RouterLink>
            </Grid>
          </Grid>
      </Box>
      {isLoading && <Loading/> }

    </Container>
  );
};
