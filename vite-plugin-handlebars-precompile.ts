import Handlebars from 'handlebars';

export default function handlebars() {
  return {
    name: 'vite-plugin-handlebars-precompile',
    transform(src: string, id: string) {
      if (!id.endsWith('.hbs')) {
        return undefined;
      }

      return {
        code: /*ts*/ `
          import Handlebars from 'handlebars';

          export default Handlebars.template(${String(Handlebars.precompile(src))});
          `,
      };
    },
  };
}
