import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SourceRoundedIcon from "@mui/icons-material/SourceRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import MiscellaneousServicesRoundedIcon from "@mui/icons-material/MiscellaneousServicesRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";

export default function LeftMenu(props: {
  drawerState?: (value: React.SetStateAction<boolean>) => void;
}) {
  const click = () => {
    props.drawerState && props.drawerState(false);
  };

  return (
    <div>
      {/* <Toolbar /> */}
      <Divider />
      <List>
        <ListItem key={"home"} disablePadding>
          <ListItemButton href="#/" onClick={click}>
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem key={"network"} disablePadding>
          <ListItemButton href="#/network" onClick={click}>
            <ListItemIcon>
              <HubRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Network" />
          </ListItemButton>
        </ListItem>
        <ListItem key={"user"} disablePadding>
          <ListItemButton href="#/user" onClick={click}>
            <ListItemIcon>
              <ManageAccountsRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItemButton>
        </ListItem>

        <ListItem key={"chats"} disablePadding>
          <ListItemButton href="#/chats" disabled onClick={click}>
            <ListItemIcon>
              <ChatRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Chats" />
          </ListItemButton>
        </ListItem>

        <ListItem key={"storage"} disablePadding>
          <ListItemButton href="#/storage" disabled onClick={click}>
            <ListItemIcon>
              <SourceRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Storage" />
          </ListItemButton>
        </ListItem>

        <ListItem key={"mail"} disablePadding>
          <ListItemButton href="#/mail" disabled onClick={click}>
            <ListItemIcon>
              <MailRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Mail" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={"settings"} disablePadding>
          <ListItemButton href="#/settings" onClick={click}>
            <ListItemIcon>
              <SettingsRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>

        <ListItem key={"services"} disablePadding>
          <ListItemButton href="#/services" onClick={click}>
            <ListItemIcon>
              <MiscellaneousServicesRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItemButton>
        </ListItem>

        <ListItem key={"about"} disablePadding>
          <ListItemButton href="#/about" onClick={click}>
            <ListItemIcon>
              <InfoRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="About Dogma" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
}
