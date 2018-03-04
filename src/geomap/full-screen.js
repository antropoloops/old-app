export default function addFullScreen() {
  document.querySelector("body").addEventListener("click", () => {
    const el = document.querySelector("body");
    const rfs =
      el.requestFullscreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;

    rfs.call(el);
  });
}
