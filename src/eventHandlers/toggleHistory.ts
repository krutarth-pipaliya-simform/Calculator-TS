export default function () {
    const asideList = document.getElementsByTagName("aside");
    if (!asideList) return;
    const element = asideList[0];
    if (!element) return;
    if (element.style.display === "none") element.style.display = "flex";
    else element.style.display = "none";
}
