function validatelogin()
{
    const callSignInput = document.getElementById("callsign").value.trim().toLowerCase();
    const monthsaryInput = document.getElementById("monthsary").value.trim();
    const message = document.getElementById("message");

    const correctCallSign = "love";
    const correctMonthsary = "may052024";

    if (callSignInput === correctCallSign && monthsaryInput === correctMonthsary)
    {
        setTimeout(() => {
            window.location.href = "monthsary.html";
        }, 1500);
    } else {
        message.textContent = "Wrong call sign or monthsary, Try Again 😢";
        message.className = "error";
    }
}