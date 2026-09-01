const CLAUDIUS_IMAGES = ["/textures/Claudius.jpg", "/textures/claudiusearthflyby.png", "/textures/claudiusJupiterFlyby2036.png", "/textures/claudiusOUTPUT2HDcropped2.png", "/textures/claudiusOUTPUT4HD.png"];
const REMUS_IMAGES = ["/textures/remus.jpg", "/textures/remus2036to2048HoriHighRes.png", "/textures/remusromulus0423output.png", "/textures/remusseniordesign.JPG"];

const withImages = (content) => ({
    ...content,
    claudius: { ...content.claudius, images: CLAUDIUS_IMAGES },
    remus: { ...content.remus, images: REMUS_IMAGES },
});

export const TRAJECTORY_CONTENT = {
    en: withImages({
        title: "MY TRAJECTORY WORK",
        claudius: { title: "AE502 Semester Project - CLAUDIUS", paragraphs: ["This is a trajectory for a hypothetical heavy orbiter seeking to travel to Uranus. I developed a shooting method with least squares weighted optimizer in Python to model a multi gravity assist sequence.", "The probe launches in 2032 Apr, into the sequence EdvEJU. C3 needed = 26.38 km^2/s^2"] },
        remus: { title: "AE443 Senior Design Proposal - REMUS/ROMULUS", paragraphs: ["Our team worked to design a mission that kept Earth and Mars in uninterrupted contact while also measuring Solar Weather around Mars.", "Romulus enters a Halo Orbit at Mars-Sun L1 while Remus' gravity assist + DSM gets it in an orbit equal to Mars but with a 60 degree track separation."] },
    }),
    es: withImages({ title: "MI TRABAJO DE TRAYECTORIAS", claudius: { title: "CLAUDIUS", paragraphs: ["Edite aquí el primer párrafo.", "Edite aquí el segundo párrafo."] }, remus: { title: "REMUS/ROMULUS", paragraphs: ["Edite aquí el primer párrafo.", "Edite aquí el segundo párrafo."] } }),
    fr: withImages({ title: "MON TRAVAIL DE TRAJECTOIRES", claudius: { title: "CLAUDIUS", paragraphs: ["Modifiez ici le premier paragraphe.", "Modifiez ici le deuxième paragraphe."] }, remus: { title: "REMUS/ROMULUS", paragraphs: ["Modifiez ici le premier paragraphe.", "Modifiez ici le deuxième paragraphe."] } }),
    de: withImages({ title: "MEINE FLUGBAHNARBEIT", claudius: { title: "CLAUDIUS", paragraphs: ["Ersten Absatz hier bearbeiten.", "Zweiten Absatz hier bearbeiten."] }, remus: { title: "REMUS/ROMULUS", paragraphs: ["Ersten Absatz hier bearbeiten.", "Zweiten Absatz hier bearbeiten."] } }),
    ru: withImages({ title: "МОЯ РАБОТА С ТРАЕКТОРИЯМИ", claudius: { title: "CLAUDIUS", paragraphs: ["Измените здесь первый абзац.", "Измените здесь второй абзац."] }, remus: { title: "REMUS/ROMULUS", paragraphs: ["Измените здесь первый абзац.", "Измените здесь второй абзац."] } }),
    hi: withImages({ title: "मेरा प्रक्षेपपथ कार्य", claudius: { title: "CLAUDIUS", paragraphs: ["पहला अनुच्छेद यहाँ लिखें।", "दूसरा अनुच्छेद यहाँ लिखें।"] }, remus: { title: "REMUS/ROMULUS", paragraphs: ["पहला अनुच्छेद यहाँ लिखें।", "दूसरा अनुच्छेद यहाँ लिखें।"] } }),
    zh: withImages({ title: "我的轨道设计工作", claudius: { title: "CLAUDIUS", paragraphs: ["在此编辑第一段。", "在此编辑第二段。"] }, remus: { title: "REMUS/ROMULUS", paragraphs: ["在此编辑第一段。", "在此编辑第二段。"] } }),
};
