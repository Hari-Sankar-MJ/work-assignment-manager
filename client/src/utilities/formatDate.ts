function formatDate(date: string) {
    const formattedDate = new Intl.DateTimeFormat('en-AU', { day: '2-digit', month: 'short', year: 'numeric'}).format(new Date(`${date}T00:00:00`))
    return formattedDate
}

export { formatDate }