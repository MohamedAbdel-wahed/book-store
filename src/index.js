import { render } from "react-dom"

import App from "./App"
import "./styles/index.scss"

render(<App />, document.getElementById("root"))

// regsiter service worker
if("serviceWorker" in navigator){
  navigator.serviceWorker.register("./serviceWorker.js")
           .then(reg=> console.log("service worker registered successfully."))
           .catch(err=> console.log("service worker failed to register!"))
}