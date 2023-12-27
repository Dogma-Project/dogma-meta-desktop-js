import Typography from "@mui/material/Typography";

function Home() {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Welcome
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
    </>
  );
}

export default Home;
