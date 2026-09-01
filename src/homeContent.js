import defaultJobsModel from "./assets/MyJobs.glb?url";
import defaultNameModel from "./assets/MyName.glb?url";

import HIJobsModel from "./assets/MyJobsHI.glb?url";
import HINameModel from "./assets/MyNameHI.glb?url";

import RUJobsModel from "./assets/MyJobsRU.glb?url";
import RUNameModel from "./assets/MyNameRU.glb?url";

import ZHJobsModel from "./assets/MyJobsZH.glb?url";
import ZHNameModel from "./assets/MyNameZHsmaller.glb?url";

// Import translated name/job GLBs above, then assign them to the matching entry.
// Edit each blurb directly here; the UI updates from this single content source.
export const HOME_CONTENT = {
    en: {
        label: "English",
        blurb: "I am graduating from the University of Illinois this Fall with a Bachelor's degree in Aerospace Engineering. My areas of interest are Astrodynamics and Attitude Control Systems, with a particular focus on interplanetary orbital design. I spend a lot of time working on these two topics at LASSI (catch the CubeSat!). Furthermore, I have professional experience in 3D modeling and animation (go check the moon!)",
        nameModel: defaultNameModel,
        jobModel: defaultJobsModel,
    },
    es: {
        label: "Español",
        blurb: "Este otoño graduaré de la Universidad de Ilinois con una licenciatura en Ingenería Aeroespacial. Mis areas de interés son astrodinámica y sistemas de control de actitud, con un enfoque en diseño de orbitas interplanetarias. Yo paso muchas horas trabajando en estas cosas en LASSI (agarra el CubeSat!) Además de eso tengo experiencia profesional en modelación y animación 3D (miren a la Luna)",
        nameModel: defaultNameModel,
        jobModel: defaultJobsModel,
    },
    fr: {
        label: "Français",
        blurb: "Cet automne je finis mes études à l'Université de Illinois, obtenant un Baccaleuréat en Ingenierie Aerospatiale. Mes domaines d'intérêt sont astrodynamique et commande d'attitude, avec un focus dans la conception d'orbites interplanétaires. Je travaille sur ses sujets pour des longtemps à LASSI (trouve le CubeSat!) Ailleurs j'ai de l'expérience professionelle avec modeling et animation 3D (régarde la Lune!)",
        nameModel: defaultNameModel,
        jobModel: defaultJobsModel,
    },
    de: {
        label: "Deutsch",
        blurb: "Ich absolviere in diesem Herbst von die Universität von Illinois, mit einen Bachelorabschluss in Raumfahrttechnik. Meine Interessensgebiete sind Raumflugmechanik und Lageregelungssystemen, mit Fokus im Interplanetarischeumlaufbahnentwurf. Ich arbeite auf diese Tiemen fur viele Stunden bei LASSI (hole den CubeSat!). Außerdem habe ich professionele Erfahrung mit 3D modeling und animation (suche den Mond!)",
        nameModel: defaultNameModel,
        jobModel: defaultJobsModel,
    },
    ru: {
        label: "Русский",
        blurb: "Я заканчиваю учебу в Университете Иллинойса в этом осени, с степенем Бакалавры аэрокосмической техникой. Мои районы интереса - Астродинамика и системы управления ориентации, с фокусом на дизайне междупланетних орбит. Я работаю много часов на этих сюджетах в LASSI (поймай CubeSat!) Кроме этого у меня тоже есть профециональный опыт с моделированием и анимации 3Д (иши Луну!)",
        nameModel: RUNameModel,
        jobModel: RUJobsModel,
    },
    hi: {
        label: "हिन्दी",
        blurb: "इस शरद में, मैं इलिनोएस विश्वविद्यालय में आपनी पढ़ाई खत्म करूंगा और एक अंतरिक्ष इंजीनियरिंग की स्नातक उपाधि प्राप्त करूंगा। मेरी रुचि की इलाके - कक्षीय यांत्रिकी, और रुख नियंत्रित सिस्टेंस, अंतरग्रहीय कक्षा योजना से केंद्रित पर। इन विषयों पर मैं LASSI में बहुत घंटे के लिए काम करता हूँ (क्यूबसैट पकड़ो!) ऊसके अलावा, मेरा पास तीन-अयान मौडलिंग और एनिमेशन में पेशेवर टोजुर्बा है (चाँद को देखो!)।",
        nameModel: HINameModel,
        jobModel: HIJobsModel,
    },
    zh: {
    label: "中文",
        blurb: "这个学期我完成我在伊利诺伊大学读的本科，航天工程学位。我的研究兴趣是太空动力学和姿态控制系统，特别关心跨星星的弹道设计。我在LASSI研究这些主题很多小时。此外，我在3D建模/动画有专业经验。",
        nameModel: ZHNameModel,
        jobModel: ZHJobsModel,
        nameScale: 0.7,
    },
};
