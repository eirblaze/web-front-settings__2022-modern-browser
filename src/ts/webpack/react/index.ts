import * as ReactDOM from 'react-dom/client'
import { element } from "./hello"

export function reactIndex() {
  const domContainer = document.querySelector('#react-root')
  if ( domContainer === null ) return
  const root = ReactDOM.createRoot(domContainer);
  root.render(element);
}
