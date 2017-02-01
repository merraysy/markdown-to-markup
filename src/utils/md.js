import Remarkable from 'remarkable';

const md = new Remarkable();

export default (input) => {
  return md.render(input);
};
