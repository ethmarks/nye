export function load({ locals, depends }) {
    depends('app:timezone');
    
    return {
        timezone: locals.timezone || 'UTC'
    };
}