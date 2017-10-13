module.exports = (src) => {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = src;
  
  link.onerror = (err) => console.log(`Failed to load ${src}, ${err}`);
  link.onload = () => console.log("WOo");
	
  document.getElementsByTagName("head")[0].appendChild(link);
};