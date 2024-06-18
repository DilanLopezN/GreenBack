export class ResourceAlreadyExist extends Error {
  constructor(itemName: string) {
    super(`Resource ${itemName} already exist`);
  }
}