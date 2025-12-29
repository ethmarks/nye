export function load({ locals }) {
    return {
        timezone: locals.timezone || 'UTC'
    };
}