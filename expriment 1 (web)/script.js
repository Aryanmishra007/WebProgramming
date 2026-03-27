function showGreeting() {
    alert("Welcome to Aryan Mishra's Portfolio!");
}

function submitData() {
    let name = document.getElementById("name").value;
    document.getElementById("response").innerText =
        "Thank you, " + name + "! Your message has been received.";
    return false;
}
