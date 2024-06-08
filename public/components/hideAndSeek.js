function hideAndSeek(el, check, spec) {
  _(`.${el} ${spec}`).style.visibility = check[el] ? "hidden" : "visible";
  return !check[el];
}