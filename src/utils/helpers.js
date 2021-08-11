function formatDate (date) {
    return new Date(date * 1000).toLocaleDateString("en-US", {weekday: "long", year: 'numeric', month: 'short', day: 'numeric'});
}

export { formatDate }