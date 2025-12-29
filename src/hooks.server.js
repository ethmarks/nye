export async function handle({ event, resolve }) {
    // Get timezone from cookie, default to UTC if not set
    const timezone = event.cookies.get('timezone') || 'UTC';
    event.locals.timezone = timezone;

    return resolve(event);
}