import { Button } from "@mui/material";
import { logOut } from "../config/firebase";

const Dashboard = () => {

    const handelLogout = async () =>{
        try {
            await logOut();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1>DashBoard</h1>
            <Button variant="contained" onClick={handelLogout}>LogOut</Button>
        </>
    );
};

export default Dashboard;
