import { SpeedDial, SpeedDialAction, Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { logout } from "../../../apis/auth";

export default function OptionDial() {
  const actions = [
    { icon: <LogoutIcon />, name: "Log out" },
    { icon: <ChangeCircleIcon />, name: "Change password", to: "/change-pwd" },
    { icon: <AddIcon />, name: "Create new chat", to: "/create" },
  ];

  const handleAction = async (action) => {
    if (action.name === "Log out") {
      const resp = await logout();
      if (resp.status === 200) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        toast.success("The login page will be redirected after 2 seconds!", {
          autoClose: 1000,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        toast.error("Error logging out:", resp);
      }
    } else {
      window.location.href = action.to;
    }
  };
  return (
    <Box
      sx={{
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "absolute",
        bottom: 4,
        left: 72,
        zIndex: 100,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SettingsIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              handleAction(action);
            }}
          ></SpeedDialAction>
        ))}
      </SpeedDial>
    </Box>
  );
}
