import { skillCategories, skillNodes } from './skillNodes';

export const skills = skillCategories.map((category) => ({
  category: category.label,
  items: skillNodes
    .filter((skill) => skill.category === category.id)
    .flatMap((skill) => skill.tools)
    .filter((tool, index, tools) => tools.indexOf(tool) === index),
}));
