import { type Plugin } from 'vite';

/**
 * Vite плагин, позволяющий использовать ключевое слово `accessor`, которое было добавлено в typescript 4.9
 * Но ещё не поддерживается esbuild (https://github.com/evanw/esbuild/issues/104)
 * Конвертирует код так, как это бы сделал `tsc` с `target: ES2022`
 */
export default function accessorPlugin(): Plugin {
  return {
    name: 'vite-plugin-accessor',
    transform(code, id) {
      if (id.endsWith('.ts') || id.endsWith('.tsx')) {
        code = code.replace(
          /accessor\s+(?<name>\w+)(?: = (?<value>.+))?;/gu,
          (_match, name, value) =>
            `#x_accessor_storage = ${value};\nget ${name}() { return this.#x_accessor_storage; }\nset ${name}(value) { this.#x_accessor_storage = value; }`,
        );
      }
      return code;
    },
  };
}
