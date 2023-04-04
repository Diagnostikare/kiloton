"use client";
import HeroImage from "./components/HeroImage/HeroImage";
import {
  NumberSection,
  FormSection,
  LinkSection,
  GridSection,
  AwardsSection,
} from "./";
import SuccessStoriesSection from "./components/SuccessStoriesSection/SuccessStoriesSection";

export default function Page() {
  return (
    <>
      <HeroImage />
      <FormSection className="d-none"/>
      <NumberSection />
      <LinkSection />
      <GridSection />
      <SuccessStoriesSection />
      <AwardsSection />
    </>
  );
}
