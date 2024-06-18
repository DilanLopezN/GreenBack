export class ResourceNotFound extends Error {
  constructor(itemName: string) {
    super(`Resource ${itemName} not found`);
  }
}