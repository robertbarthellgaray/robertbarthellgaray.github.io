import defaultJobsModel from "./assets/MyJobs.glb?url";
import defaultNameModel from "./assets/MyName.glb?url";

import ESJobsModel from "./assets/MyJobsES.glb?url";


import HIJobsModel from "./assets/MyJobsHIK.glb?url";
import HINameModel from "./assets/MyNameHIK.glb?url";

import RUJobsModel from "./assets/MyJobsRU.glb?url";
import RUNameModel from "./assets/MyNameRU.glb?url";

import ZHJobsModel from "./assets/MyJobsZHv2.glb?url";
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
        blurb: "Este otoño graduaré de la Universidad de Illinois con una licenciatura en Ingeniería Aeroespacial. Mis áreas de interés son astrodinámica y sistemas de control de actitud, con un enfoque en diseño de órbitas interplanetarias. Yo paso muchas horas trabajando en estas cosas en LASSI (agarren el CubeSat!) Además de eso tengo experiencia profesional en modelación y animación 3D (miren a la Luna)",
        nameModel: defaultNameModel,
        jobModel: ESJobsModel,
    },
    fr: {
        label: "Français",
        blurb: "Cet automne je finis mes études à l'Université d'Illinois, obtenant une licence en Ingénierie Aérospatiale. Mes domaines d'intérêt sont l'astrodynamique et la commande d'attitude, avec une spécialisation en la conception d'orbites interplanétaires. Je consacre beaucoup de temps à ces deux sujets à LASSI (trouve le CubeSat!) Par ailleurs j'ai de l'expérience professionnelle avec modélisation et animation 3D (regarde la Lune!)",
        nameModel: defaultNameModel,
        jobModel: defaultJobsModel,
    },
    de: {
        label: "Deutsch",
        blurb: "Ich schließe mein Studium diesen Herbst an der Universität von Illinois, mit einem Bachelorabschluss in Raumfahrttechnik. Meine Interessensgebiete sind Raumflugmechanik und Lageregelungsystemen, mit Schwerpunkt auf der Gestaltung interplanetarischer Umlaufbahnen. Ich verbringe im LASSI viel Zeit an diesen Themen zu arbeiten (hole den CubeSat!). Außerdem habe ich professionelle Erfahrung mit 3D Modeling und Animation (suche den Mond!)",
        nameModel: defaultNameModel,
        jobModel: defaultJobsModel,
    },
    ru: {
        label: "Русский",
        blurb: "Я заканчиваю учебу в Университете Иллинойса этой осенью, с дипломом бакалавра в аэрокосмической техникой. Мои сферы интересов - Астродинамика и системы управления ориентацией, с фокусом на дизайне межпланетних орбит. Я уделяю много времени работе над этими темами в LASSI (поймай CubeSat!) Кроме этого у меня тоже есть профессиональный опыт с моделированием и анимации 3Д (ищи Луну!)",
        nameModel: RUNameModel,
        jobModel: RUJobsModel,
    },
    hi: {
        label: "हिन्दी",
        blurb: "इस शरद ऋतु में मैं इलिनॉय विश्वविद्यालय से वांतरिक्ष अभियांत्रिकी में स्नातक उपाधि प्राप्त करूँगा। मेरी विशेष रुचि खगोलगतिकी तथा अभिविन्यास-नियंत्रण प्रणालियों में है, विशेषतः अंतर्ग्रहीय कक्षाओं के अभिकल्पन में। LASSI में मैं इन दोनों विषयों पर पर्याप्त समय कार्य करता हूँ (क्यूबसैट को पकड़िए!)। इसके अतिरिक्त, मुझे त्रिविमीय प्रतिरूपण एवं अनुप्राणन का व्यावसायिक अनुभव है (चंद्रमा को देखिए!)।",
        nameModel: HINameModel,
        jobModel: HIJobsModel,
    },
    zh: {
    label: "中文",
        blurb: "这个学期我完成我在伊利诺伊大学读的本科，航天工程学位。我的研究兴趣是太空动力学和姿态控制系统，注重行星际的轨道设计。我花了很多小时在LASSI研究这些主题。此外，我在3D建模/动画有专业经验。",
        nameModel: ZHNameModel,
        jobModel: ZHJobsModel,
        nameScale: 0.7,
    },
};
