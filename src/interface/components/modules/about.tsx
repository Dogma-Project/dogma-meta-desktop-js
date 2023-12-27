import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function About() {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Dogma Meta (Headless)
      </Typography>
      <Typography component="p" py={2}>
        <b>Dogma Meta</b> is a cross-platform, non-anonymous, privacy-oriented
        fully decentralized communication platform written in TypeScript. With{" "}
        <b>Dogma Meta</b> service you can use several network-based apps
        completely without any servers. Your data is stored just on your devices
        and only you can handle it. You will not get such comfortable user
        experience like at commercial authoritarian server-based apps, but minor
        inconvenience is your price for independence and privacy. You will get{" "}
        <b>User Key</b> instead of account credentials and nobody can ban you in
        p2p networks or steal/sell your data. Keeping <b>User Key</b> is the one
        way to verify your identity in <b>Dogma Meta</b> network. You should
        export generated <b>User Key</b> to all your devices, so they will be
        able to find each other and sync data between them.
      </Typography>
      <Typography gutterBottom variant="h6" component="div">
        You can use Dogma Meta platform to:
      </Typography>
      <List>
        <ListItem>
          <ListItemText>
            Build private networks through secure e2e-encrypted connections
            between own nodes and nodes of your friends.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Synchronize important private data between own nodes to keep it
            safe.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Communicate with other people in direct conversations, chats etc.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Share files and transfer them directly.</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            Use decentralized API for own secure autonomous projects.
          </ListItemText>
        </ListItem>
      </List>
      <Typography gutterBottom variant="h6" component="div">
        Inspired by:
      </Typography>
      <List>
        <ListItem>
          <ListItemText>Retroshare</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Syncthing</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Tox</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Tor / I2P</ListItemText>
        </ListItem>
      </List>
    </>
  );
}

export default About;
