function cardPrompt(el, message, input) {
  if (input) {
    // el: ["a", "b"];
    // where a is the great parent and b is the specific child
   _(el[0] + " " + el[2]).classList.toggle("off", false);
  } else {
    _(el[0] + " " + el[2]).classList.toggle("off", true);
  }

  _(el[0] + " " + el[1]).innerText = message || "What is your name?";
  _(el[0]).setAttribute("status", "active");
  console.log(_(el[0]).getAttribute("status"))
}
