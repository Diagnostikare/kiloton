import HeroImage from "./components/HeroImage/HeroImage";
import { NumberSection } from "./components/NumberSection/NumberSection";
import { LinkSection } from "./components/LinkSection/LinkSection";
import { GridSection } from "./components/GridSection/GridSection";
import { AwardsSection } from "./components/AwardsSection/AwardsSection";
import SuccessStoriesSection from "./components/SuccessStoriesSection/SuccessStoriesSection";

export default function Page() {
  return (
    <>
      <HeroImage />
      <NumberSection />
      <LinkSection />
      <GridSection />
      <SuccessStoriesSection />
      <AwardsSection />
    </>
  );
}
