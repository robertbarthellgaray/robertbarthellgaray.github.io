const youtubeMedia = [
    { provider: "youtube", id: "PLBt9xFJ_FiRE" },
    { provider: "youtube", id: "PLLR29pi1Q4gBnNYs49NG_gnr3ArA-ELxs" },
    { provider: "youtube", id: "PLLR29pi1Q4gAxXkMaBPdWQdicUqoDFsbL" },
];

const makeMedia = (labels) => youtubeMedia.map((media, index) => ({
    ...media,
    ...labels[index],
}));

// Use "\n\n" inside blurb or description strings to start a new paragraph.
// Add linkUrl when a title should open a collection/series instead of the embedded video.
// Bilibili example: { provider: "bilibili", id: "BV...", linkUrl: "https://...", title, description }.
export const MOON_CONTENT = {
    en: {
        blurb: "Since my childhood, I have been interested in 3D Modeling and Animation. I began making stuff in Blender at age 13, later producing my high school news videos with it. At 18, I had the honor of interning at NASA and doing 3D work for their Mars simulator.\n\nNowadays (and having picked up Unreal Engine 5 too) I work on 3D animation and visualization for both my line of work, and also miscellaneous sci-fi and architectural renderings.",
        media: makeMedia([
            { title: "My Orbits/ Astrodynamics Simulations", description: "Actual, physically accurate propagated trajectories." },
            { title: "My Filmography and Videography", description: "My most recent short film is about pilots of a cargo ship." },
            { title: "My Other Miscellaneous 3D Renders", description: "Some less accurate sci-fi from my earlier college days, and architectural renders." },
        ]),
    },
    es: {
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo sed sapien luctus cursus. Donec vel sem at ligula volutpat facilisis.",
        media: makeMedia([
            { title: "Título uno", description: "Edita esta descripción." },
            { title: "Título dos", description: "Edita esta descripción." },
            { title: "Título tres", description: "Edita esta descripción." },
        ]),
    },
    fr: {
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo sed sapien luctus cursus. Donec vel sem at ligula volutpat facilisis.",
        media: makeMedia([
            { title: "Titre un", description: "Modifiez cette description." },
            { title: "Titre deux", description: "Modifiez cette description." },
            { title: "Titre trois", description: "Modifiez cette description." },
        ]),
    },
    de: {
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo sed sapien luctus cursus. Donec vel sem at ligula volutpat facilisis.",
        media: makeMedia([
            { title: "Titel eins", description: "Diese Beschreibung bearbeiten." },
            { title: "Titel zwei", description: "Diese Beschreibung bearbeiten." },
            { title: "Titel drei", description: "Diese Beschreibung bearbeiten." },
        ]),
    },
    ru: {
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo sed sapien luctus cursus. Donec vel sem at ligula volutpat facilisis.",
        media: makeMedia([
            { title: "Заголовок один", description: "Измените это описание." },
            { title: "Заголовок два", description: "Измените это описание." },
            { title: "Заголовок три", description: "Измените это описание." },
        ]),
    },
    hi: {
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo sed sapien luctus cursus. Donec vel sem at ligula volutpat facilisis.",
        media: makeMedia([
            { title: "शीर्षक एक", description: "इस विवरण को संपादित करें।" },
            { title: "शीर्षक दो", description: "इस विवरण को संपादित करें।" },
            { title: "शीर्षक तीन", description: "इस विवरण को संपादित करें।" },
        ]),
    },
    zh: {
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo sed sapien luctus cursus. Donec vel sem at ligula volutpat facilisis.",
        media: makeMedia([
            { title: "标题一", description: "在此编辑说明。" },
            { provider: "bilibili", id: "BV1jzQKBrEqq", linkUrl: "", title: "标题二", description: "在此编辑说明。" },
            { title: "标题三", description: "在此编辑说明。" },
        ]),
    },
};
