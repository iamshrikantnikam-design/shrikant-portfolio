import type { Metadata } from "next";
import { Nav } from "../../components/Nav";
import { FooterContact } from "../../components/Footer";
import { MoodPlanHero } from "./_sections/MoodPlanHero";
import { MoodPlanProblem } from "./_sections/MoodPlanProblem";
import { MoodPlanResearch } from "./_sections/MoodPlanResearch";
import { MoodPlanTension } from "./_sections/MoodPlanTension";
import { MoodPlanSolution } from "./_sections/MoodPlanSolution";
import { MoodPlanScreens } from "./_sections/MoodPlanScreens";
import { MoodPlanPrinciples } from "./_sections/MoodPlanPrinciples";
import { MoodPlanPrototype } from "./_sections/MoodPlanPrototype";
import { MoodPlanReflections } from "./_sections/MoodPlanReflections";

export const metadata: Metadata = {
  title: "MoodPlan — A planner that starts with how you feel",
  description:
    "Case study: MoodPlan, an AI daily planner that organizes your day around energy and mood, not just time.",
};

export default function MoodPlanCaseStudyPage() {
  return (
    <>
      <Nav />
      {/*
        Page-level dark background is load-bearing for the navbar's
        mix-blend-mode: difference. Sections below MUST keep an explicit
        background colour so the blend has something to subtract.
      */}
      <main className="flex-1 bg-[#04130F] text-white">
        <MoodPlanHero />
        <MoodPlanProblem />
        <MoodPlanResearch />
        <MoodPlanTension />
        <MoodPlanSolution />
        <MoodPlanScreens />
        <MoodPlanPrinciples />
        <MoodPlanPrototype />
        <MoodPlanReflections />
        <FooterContact />
      </main>
    </>
  );
}
