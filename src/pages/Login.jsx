import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);


  const onSubmit = async ({email, password}, {setErrors, resetForm}) => {
    console.log(email, password);
    try {
        const credent = await login({ email, password });
        console.log(credent);
        resetForm();
      } catch (error) {
        console.log(error.code);
        console.log(error.message);
          if(error.code === "auth/invalid-login-credentials"){
            setErrors({email: "Usuario no registrado"})
          }
      }
  }

  const validation = Yup.object().shape({
    email: Yup.string().email("Email no valido").required("Email requerido"),
    password: Yup.string().trim().min(6, "Minimo 6 caracters").required("Password requerido")
  })

  return (
    <>
      <Box sx={{mt:8, maxWidth: "400px", mx:"auto", textAlign: "center"}} >

        <Avatar sx={{mx: "auto", bgcolor: "#111"}}>
          <AddAPhotoIcon/>
        </Avatar>

        <Typography variant="h5" component="h1">
          Login
        </Typography>

        <Formik initialValues={{email: "", password:""}} onSubmit={onSubmit} validationSchema={validation}>
          {
            ({values, handleSubmit, handleChange, errors, touched, handleBlur, isSubmitting}) => (
              <Box onSubmit={handleSubmit} sx={{mt: 1}} component= "form">
                <TextField
                    type="text"
                    placeholder="email@example.com"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    onBlur={handleBlur}
                    id="email"
                    label="Ingrese Email"
                    fullWidth
                    sx={{mb: 3}}
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email && errors.email}
                />
                <TextField
                  type="password"
                  placeholder="123123"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  onBlur={handleBlur}
                  id="password"
                  label="Ingrese Password"
                  fullWidth
                  sx={{mb: 3}}
                  error={errors.password && touched.password}
                  helperText={errors.password && touched.password && errors.password}
                />

                <LoadingButton type="submit" disabled={isSubmitting} loading={isSubmitting} variant="contained" fullWidth sx={{mb: 3}}>
                    Acceder
                </LoadingButton>

                <Button fullWidth component={Link} to="/register">
                  ¿No tienes cuenta? Registrate
                </Button>
            </Box>
            )
          }

        </Formik>
      </Box>
    </>
  );
};

export default Login;




