//Query Params "valor"
(function () {
    const urlparams = new URLSearchParams(window.location.search);
    const valor = urlparams.get("valor")

    //literal expression `${}`
    document.getElementById("VALOR").innerHTML = `TOTAL A PAGAR: ${valor}`

})()