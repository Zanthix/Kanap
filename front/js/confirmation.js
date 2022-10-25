let parameters = new URLSearchParams(window.location.search);
const orderId = parameters.get('orderId');
if(orderId === null){
  window.location.replace("index.html");
}
document.querySelector('#orderId').innerHTML = orderId;

localStorage.clear();