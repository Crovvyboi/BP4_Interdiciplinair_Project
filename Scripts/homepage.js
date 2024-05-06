function inUitklappenZonnepanelen() {
    // Check of zonnepaneel in of uitgeklapt is
    // Zo ja, klap de zonnepanelen in. Zo nee, klap ze uit.

    // To do: 
    //      - Vervang if statements voor api checks van de status van de zonnepanelen
    //      - Blokkeer de knop totdat een signaal is gegeven dat de zonnepanelen volledig in/uit zijn geklapt

    if (document.getElementById("statusZonnepaneel").innerHTML == "Ingeklapt" || document.getElementById("statusZonnepaneel").innerHTML == "Kan niet verbinden") {
        // Verander status van zonnepaneel -> Uitgeklapt
        document.getElementById("statusZonnepaneel").innerHTML = "Uitgeklapt"
    }
    else if (document.getElementById("statusZonnepaneel").innerHTML == "Uitgeklapt") {
        // Verander status van zonnepaneel -> Ingeklapt
        document.getElementById("statusZonnepaneel").innerHTML = "Ingeklapt"
    }
    else {
        // Kan geen verbinding maken met de aaadlander
        document.getElementById("statusZonnepaneel").innerHTML = "Kan niet verbinden"
    }
}