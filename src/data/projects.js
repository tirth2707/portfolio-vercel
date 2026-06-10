import { caseStudies } from './caseStudies';

export const projects = caseStudies.map((study) => ({
  title: study.title,
  description: study.summary,
  image: null,
  technologies: study.stack,
  liveUrl: null,
  githubUrl: null,
}));
