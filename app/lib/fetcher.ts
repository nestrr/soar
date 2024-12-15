export function fetcher(resource: string) {
  return fetch(resource).then((res) => res.json());
}
