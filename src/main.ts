import "./styles/style.css";
import router from "./router";

// Render initial content
renderContent(window.location.pathname);

window.addEventListener("popstate", (event) => {
  // The 'event.state' object contains the state we pushed earlier.
  // If the state is null, it might be the initial page load.
  const path = event.state ? event.state.path : window.location.pathname;
  console.log(`Navigating to ${path} via popstate`);
  renderContent(path);
});

// Add event listeners to our links
const linkEls: NodeListOf<HTMLAnchorElement> =
  document.querySelectorAll("#js-primary-nav a");

if (linkEls) {
  linkEls.forEach((link) => {
    link.addEventListener("click", navigate);
  });
}

function navigate(event: MouseEvent) {
  event.preventDefault();
  let path: string | null;

  const el = event?.target as HTMLAnchorElement;

  path = el.getAttribute("href");

  if (typeof path === "string") {
    // Change the URL in the address bar
    history.pushState({ path: path }, "", path);

    // Update the content based on the path
    renderContent(path);
  }
}

async function renderContent(path = "") {
  // Get the element where content will be rendered
  const contentContainer = document.getElementById("content-area");
  if (!path || !contentContainer) return;

  // Find the matching route by path

  contentContainer.innerHTML = await router(path);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.ts")
      .then(() => console.log("Service Worker: Registered"))
      .catch((err) => console.log(`Service Worker: Error: ${err}`));
  });
}
