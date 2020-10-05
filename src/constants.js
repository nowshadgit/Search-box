const constants = {
    SEARCH_BY: "Search by cities",
    LONDON:"London",
    NOTTINGHAM: "Nottingham",
    NEW_YORK: "New York",
    MANCHESTER: "Manchestar",
    SYDNEY: "Sydney",
    UNITED_KINGDOM: "United Kingdom", 
    AUSTRALIA: "Australia"
}

const popular_cities = {
    [constants.LONDON]:constants.UNITED_KINGDOM,
    [constants.NOTTINGHAM]:constants.UNITED_KINGDOM,
    [constants.NEW_YORK]:constants.UNITED_KINGDOM,
    [constants.SYDNEY]:constants.AUSTRALIA,
    [constants.MANCHESTER]:constants.UNITED_KINGDOM,
}

export {constants, popular_cities}