export function log(message: string, data: Json = {}, force?: boolean) {
  if (force) {
    console.log('message, data ->', message, data);
  }
}
