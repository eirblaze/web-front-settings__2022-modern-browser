export function reactIndex() {
  const domContainer = document.querySelector('#react-root');
  const root = ReactDOM.createRoot(domContainer);
  root.render(e(LikeButton));
}
