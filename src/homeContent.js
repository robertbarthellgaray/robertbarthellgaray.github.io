import defaultJobsModel from "./assets/MyJobs.glb?url";
import defaultNameModel from "./assets/MyName.glb?url";

// Import translated name/job GLBs above, then assign them to the matching entry.
// Edit each blurb directly here; the UI updates from this single content source.
export const HOME_CONTENT = {
    en: {
        label: "English",
        blurb: "I am graduating from the University of Illinois this Fall with a Bachelor's degree in Aerospace Engineering. My areas of interest are Astrodynamics and Attitude Control Systems, with a particular focus on interplanetary orbital mechanics.",
        nameModel: defaultNameModel,
        jobModel: defaultJobsModel,
    },
    es: {
        label: "Español",
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        nameModel: defaultNameModel,
        jobModel: defaultJobsModel,
    },
    fr: {
        label: "Français",
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        nameModel: defaultNameModel,
        jobModel: defaultJobsModel,
    },
    de: {
        label: "Deutsch",
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        nameModel: defaultNameModel,
        jobModel: defaultJobsModel,
    },
    ru: {
        label: "Русский",
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        nameModel: defaultNameModel,
        jobModel: defaultJobsModel,
    },
    hi: {
        label: "हिन्दी",
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        nameModel: defaultNameModel,
        jobModel: defaultJobsModel,
    },
    zh: {
        label: "中文",
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        nameModel: defaultNameModel,
        jobModel: defaultJobsModel,
    },
};
