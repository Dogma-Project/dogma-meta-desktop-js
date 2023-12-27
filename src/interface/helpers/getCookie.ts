export default function getCookie(name: string) {
  const parted = document.cookie.split(";").map((i) => i.trim());
  const needle = parted.find((i) => i.indexOf(`${name}=`) > -1);
  if (!needle) return undefined;
  return needle.split("=")[1];
}
