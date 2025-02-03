document.getElementById("unhighlight").addEventListener("click", () => {
	fetch("http://localhost:3672/unhighlight", {
		method: "POST",
	});
});
