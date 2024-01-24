export class ResultMapperHelper {
  static mapResult(result) {
    return result.reduce(
      (merged, current) => {
        merged.count = current.count;
        merged.profiles.push(...current.profiles);
        merged.items.push(...current.items);
        merged.groups.push(...current.groups);
        merged.account = current.account[0];

        return merged;
      },
      { count: 0, profiles: [], items: [], groups: [] }
    );
  }
}
