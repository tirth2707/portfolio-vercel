import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  CheckCircle2,
  Cloud,
  Code2,
  DatabaseZap,
  GitBranch,
  Network,
  ShieldCheck,
} from 'lucide-react';
import { skillCategories, skillNodes } from '../../data/skillNodes';
import SectionHeader from '../ui/SectionHeader';

const iconByDemoType = {
  'cloud-topology': Cloud,
  'ai-signal': Bot,
  'ui-assembly': Code2,
  'api-flow': Network,
  'migration-timeline': DatabaseZap,
  'data-mesh': DatabaseZap,
  'quality-pipeline': ShieldCheck,
  'delivery-system': GitBranch,
};

const demoSteps = {
  'cloud-topology': ['Identity', 'Services', 'Runtime', 'Observability'],
  'ai-signal': ['Context', 'Prompt', 'Grounding', 'Insight'],
  'ui-assembly': ['Components', 'State', 'Motion', 'UX QA'],
  'api-flow': ['Client', 'Gateway', 'Service', 'Database'],
  'migration-timeline': ['Extract', 'Validate', 'Cutover', 'Rollback plan'],
  'data-mesh': ['Relational', 'Document', 'Cache', 'Realtime'],
  'quality-pipeline': ['Lint', 'Unit', 'E2E', 'SonarQube'],
  'delivery-system': ['Branch', 'Review', 'CI/CD', 'Mentor loop'],
};

const SkillDemo = ({ skill, categoryColor }) => {
  const Icon = iconByDemoType[skill.demoType] || CheckCircle2;
  const steps = demoSteps[skill.demoType] || skill.tools.slice(0, 4);

  return (
    <div className="relative min-h-[360px] overflow-hidden border border-white/10 bg-slate-950 p-5">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Live capability map</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{skill.label}</h3>
        </div>
        <div
          className="flex h-12 w-12 items-center justify-center border"
          style={{ borderColor: `${categoryColor}66`, color: categoryColor }}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>

      <div className="relative mt-10 grid gap-4 sm:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.42, delay: index * 0.08 }}
            className="relative min-h-32 border border-white/10 bg-white/[0.045] p-4 backdrop-blur"
          >
            <span
              className="mb-6 block h-2 w-12"
              style={{ backgroundColor: categoryColor }}
            />
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Node {index + 1}
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-100">{step}</div>
            <div className="mt-4 h-1.5 overflow-hidden bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${72 + index * 7}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
                className="h-full"
                style={{ backgroundColor: categoryColor }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-8 grid gap-4 lg:grid-cols-[0.7fr_1fr]">
        <div className="border border-white/10 bg-white/[0.035] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Proof</p>
          <p className="mt-3 text-sm leading-6 text-slate-200">{skill.proof}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.035] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Toolchain</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {skill.tools.map((tool) => (
              <span
                key={tool}
                className="border border-white/10 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const [activeSkillId, setActiveSkillId] = useState(
    skillNodes.find((skill) => skill.category === skillCategories[0].id)?.id,
  );

  const activeSkills = useMemo(
    () => skillNodes.filter((skill) => skill.category === activeCategory),
    [activeCategory],
  );
  const activeCategoryMeta = skillCategories.find((category) => category.id === activeCategory);
  const activeSkill =
    skillNodes.find((skill) => skill.id === activeSkillId) || activeSkills[0] || skillNodes[0];

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveSkillId(skillNodes.find((skill) => skill.category === categoryId)?.id);
  };

  return (
    <section id="skills" className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Skills Lab"
          title="Skills you can inspect, not just read."
          copy="Each skill is tied to a practical system behavior: cloud topology, API flow, data movement, UI assembly, or engineering quality loops."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="space-y-4">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
                className={`w-full border p-5 text-left transition ${
                  activeCategory === category.id
                    ? 'border-cyan-300/60 bg-cyan-300/10'
                    : 'border-white/10 bg-white/[0.035] hover:border-white/25'
                }`}
              >
                <span
                  className="mb-4 block h-2 w-12"
                  style={{ backgroundColor: category.color }}
                />
                <span className="block text-base font-semibold text-white">{category.label}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-400">
                  {category.description}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {activeSkills.map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => setActiveSkillId(skill.id)}
                  className={`border p-4 text-left transition ${
                    activeSkill.id === skill.id
                      ? 'border-emerald-300/60 bg-emerald-300/10'
                      : 'border-white/10 bg-white/[0.035] hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-white">{skill.label}</span>
                    <span className="text-sm text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden bg-white/10">
                    <div
                      className="h-full"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: activeCategoryMeta?.color || '#22d3ee',
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
            <SkillDemo skill={activeSkill} categoryColor={activeCategoryMeta?.color || '#22d3ee'} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
