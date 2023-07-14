export function read(key="") {
	let name = key + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let allCookies = decodedCookie.split(';');
	for(let i = 0; i <allCookies.length; i++) {
	  let cookie = allCookies[i];
	  while (cookie.charAt(0) == ' ') {
		cookie = cookie.substring(1);
	  }
	  if (cookie.indexOf(name) == 0) {
		return cookie.substring(name.length, cookie.length);
	  }
	}
	return "";
  }

export function write(key="", value) {
	document.cookie = key + "=" + value + ";path=/";
}