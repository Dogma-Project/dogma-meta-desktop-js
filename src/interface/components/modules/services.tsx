import { useContext, useEffect } from "react";
import { AppContext, WebsocketContext } from "../../context";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import { C_API, C_System } from "@dogma-project/constants-meta";

import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";

type color =
  | "action"
  | "disabled"
  | "primary"
  | "inherit"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

function Services() {
  const { state } = useContext(AppContext);
  const { send } = useContext(WebsocketContext);

  useEffect(() => {
    send({
      type: C_API.ApiRequestType.services,
      action: C_API.ApiRequestAction.get,
    });
  }, []);

  const getIcon = (state: number): color => {
    switch (state) {
      case C_System.States.full:
        return "success";
      case C_System.States.limited:
      case C_System.States.ok:
        return "info";
      case C_System.States.ready:
      case C_System.States.reload:
      case C_System.States.empty:
        return "warning";
      default:
        return "error";
    }
  };

  return (
    <>
      <List>
        {state.services.map((service) => (
          <ListItem
            key={service.service}
            disableGutters
            secondaryAction={
              <IconButton aria-label="about" title={String(service.state)}>
                <RadioButtonCheckedRoundedIcon color={getIcon(service.state)} />
              </IconButton>
            }
          >
            <ListItemText primary={service.service} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default Services;
