import { register } from "../config/firebase";
import { UseRedirct } from "../hooks/useRedirct"
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";

import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const Register = () => {

  const {user} = useUserContext();
  UseRedirct(user, "/dashboard")


  const onSumbit = async ({email, password},{setErrors, resetForm}) => {
    try {
      await register({ email, password });
      console.log("user registered");
      resetForm();
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
    if (error.code === "auth/email-already-in-use") {
      setErrors({ email: "Email already in use" });
    }
  }
  }

  const validation = Yup.object().shape({
    email: Yup.string().email("Email no valido").required("Email requerido"),
    password: Yup.string().trim().min(6, "Minimo 6 caracters").required("Password requerido")
  })

  return (
    <Box sx={{mt:8, maxWidth: "400px", mx:"auto", textAlign: "center"}}>

        <Avatar sx={{mx: "auto", bgcolor: "#111"}}>
          <AddAPhotoIcon/>
        </Avatar>

        <Typography variant="h5" component="h1">
          Register
        </Typography>

      <Formik initialValues={{email: "", password:""}} onSubmit={onSumbit} validationSchema={validation}>
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
                    Register
                </LoadingButton>

                <Button fullWidth component={Link} to="/">
                  ¿Ya tienes cuenta? Ingresa
                </Button>
    
              </Box>
            )
          }
      </Formik>
    </Box>
  );
};

export default Register;
