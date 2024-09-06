import { SpeedDial, SpeedDialAction, Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";

export default function OptionDial() {
  const actions = [
    { icon: <LogoutIcon />, name: "Log out", to: "/logout" },
    { icon: <ChangeCircleIcon />, name: "Change password", to: "/change-pwd" },
    { icon: <AddIcon />, name: "Create new chat", to: "/create" },
  ];
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
              window.location.href = action.to;
            }}
          ></SpeedDialAction>
        ))}
      </SpeedDial>
    </Box>
  );
}
