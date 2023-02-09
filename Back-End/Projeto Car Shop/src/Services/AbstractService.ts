abstract class AbstractService<Something, ISomething> {
  protected abstract createDomain(something: ISomething | null): Something | null;
  abstract register(something: ISomething): Promise<Something | null>;

  findAll?(): Promise<ISomething[]>;
  findById?(id: string): Promise<Something | null>;
  updateById?(id: string, something: ISomething): Promise<Something | null>;
}

export default AbstractService;