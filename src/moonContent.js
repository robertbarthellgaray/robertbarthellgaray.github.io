const youtubeMedia = [
    { provider: "youtube", id: "PLBt9xFJ_FiRE" },
    { provider: "youtube", id: "PLLR29pi1Q4gBnNYs49NG_gnr3ArA-ELxs" },
    { provider: "youtube", id: "PLLR29pi1Q4gAxXkMaBPdWQdicUqoDFsbL" },
];

const makeMedia = (labels) => youtubeMedia.map((media, index) => ({
    ...media,
    ...labels[index],
}));

// A Bilibili entry uses: { provider: "bilibili", id: "BV...", title, description }.
export const MOON_CONTENT = {
    en: {
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo sed sapien luctus cursus. Donec vel sem at ligula volutpat facilisis.",
        media: makeMedia([
            { title: "My Orbits/ Astrodynamics Simulations", description: "Edit this description." },
            { title: "My Filmography and Videography", description: "Edit this description." },
            { title: "My Other Miscellaneous 3D Renders", description: "Edit this description." },
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
            { title: "标题二", description: "在此编辑说明。" },
            { title: "标题三", description: "在此编辑说明。" },
        ]),
    },
};
