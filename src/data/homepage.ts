import { loadHomepageContent } from "@/lib/cms/store";
import type { HomepageContent } from "@/lib/cms/types";

export {
  homepageCategories,
  howItWorksSteps,
  personalizationOptions,
  nfcKeyPoints,
  digitalMemorialFields,
} from "@/data/homepage.static";

export function getHomepageContent(): HomepageContent {
  return loadHomepageContent();
}
