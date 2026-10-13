export class DemoModeError extends Error {
  constructor(action = 'This action') {
    super(`${action} needs a connected Supabase project. Add your keys to .env to enable it.`);
    this.name = 'DemoModeError';
  }
}
