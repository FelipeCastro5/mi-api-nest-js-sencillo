export class UpdateProjectCommand {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly details: string,
  ) {}
}
