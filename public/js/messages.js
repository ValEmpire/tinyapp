// the parameters is the name of the cookie we want to get
const getCookieValue = (name) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

let error = getCookieValue("error");
let success = getCookieValue("success");

if (error) {
  Toastify({
    text: decodeURIComponent(error), // remove %20 in white space
    backgroundColor: "linear-gradient(to right, #FFC105, #DC3545)",
    className: "info",
  }).showToast();
}

if (success) {
  Toastify({
    text: decodeURIComponent(success), // remove %20 in white space
    backgroundColor: "#28A745",
    className: "info",
  }).showToast();
}
