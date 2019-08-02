export class ArrayIterator<T> implements Iterator<T> {
  private i: number = 0;

  constructor(readonly array: Array<T>) {
  }

  next(): IteratorResult<T> {
    return {
      done: this.i >= this.array.length,
      value: this.array[this.i++],
    };
  }
}
