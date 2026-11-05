// Same trajectory data in every language; only descriptive copy is localized.
export const SOLVER_TRANSLATIONS = {
    "en": {
        "eyebrow": "ROBERT’S MISSION DESIGN LAB",
        "subtitle": "Robert’s Lambert Multi Gravity Assist Solver",
        "portalHint": "Turn left. Explore the possibilities.",
        "recreation": "MISSION RECREATION",
        "original": "ORIGINAL TRAJECTORY",
        "explore": "Explore this trajectory",
        "downloadHint": "Open its gallery page to download CSV / XYZV states and inspect encounter dates.",
        "source": "Source code & desktop solver",
        "methodTitle": "How does the solver work?",
        "choose": "Choose a trajectory exhibit",
        "selection": "Selected trajectory and solver explanation",
        "handmade": "Handmade trajectories",
        "sequenceKey": "C3 is departure V∞ squared. DSM means deep-space maneuver; ‘dv’ marks one in a sequence. E = Earth, V = Venus, Me = Mercury, J = Jupiter, S = Saturn, U = Uranus.",
        "budgetNote": "Zero designed DSM does not mean zero mission propellant: launch injection, navigation corrections and terminal capture require separate budgets.",
        "years": "years",
        "metricLabels": {
            "Launch C3": "Launch C3",
            "Ideal DSM": "Ideal DSM",
            "Arrival V∞": "Arrival V∞",
            "Designed DSM": "Designed DSM",
            "Flight time": "Flight time",
            "Exported cruise Δv": "Exported cruise Δv"
        },
        "steps": [
            [
                "Find the planets.",
                "Cached JPL Horizons positions and velocities give the destination states at candidate encounter dates."
            ],
            [
                "Connect the dates.",
                "Lambert’s problem gives Sun-centered transfer arcs. The search varies encounter dates, revolution branches and optional deep-space maneuvers."
            ],
            [
                "Check each assist.",
                "Incoming and outgoing V∞ magnitudes must match for an unpowered flyby, and the required turn must fit above the minimum periapsis."
            ],
            [
                "Choose the tradeoff.",
                "Compare launch energy, cruise burns, flight time and arrival speed. Refine a favorite locally; finite-radius exports report additional corrections separately."
            ]
        ],
        "missions": null,
        "portalLead": "HANDMADE TRAJECTORIES ON TOP, BUT YOU’RE PROBABLY LOOKING FOR",
        "home": "Take me home"
    },
    "es": {
        "eyebrow": "LABORATORIO DE DISEÑO DE MISIONES DE ROBERT",
        "subtitle": "Solucionador Lambert de múltiples asistencias gravitatorias de Robert",
        "portalHint": "Gira a la izquierda. Explora las posibilidades.",
        "recreation": "RECREACIÓN DE UNA MISIÓN",
        "original": "TRAYECTORIA ORIGINAL",
        "explore": "Explorar esta trayectoria",
        "downloadHint": "Abre su página en la galería para descargar los estados en CSV / XYZV y consultar las fechas de los encuentros.",
        "source": "Código fuente y programa de escritorio",
        "methodTitle": "¿Cómo funciona el solucionador?",
        "choose": "Elegir una trayectoria",
        "selection": "Trayectoria seleccionada y explicación del solucionador",
        "handmade": "Trayectorias hechas a mano",
        "sequenceKey": "C3 es el cuadrado de V∞ de salida. DSM significa maniobra en el espacio profundo; ‘dv’ la indica en una secuencia. E = Tierra, V = Venus, Me = Mercurio, J = Júpiter, S = Saturno, U = Urano.",
        "budgetNote": "Cero DSM diseñadas no significa cero propelente: la inyección de lanzamiento, las correcciones de navegación y la captura final necesitan presupuestos separados.",
        "years": "años",
        "metricLabels": {
            "Launch C3": "C3 de lanzamiento",
            "Ideal DSM": "DSM ideal",
            "Arrival V∞": "V∞ de llegada",
            "Designed DSM": "DSM diseñada",
            "Flight time": "Tiempo de vuelo",
            "Exported cruise Δv": "Δv de crucero exportada"
        },
        "steps": [
            [
                "Localizar los planetas.",
                "Las posiciones y velocidades de JPL Horizons guardadas en caché definen los estados planetarios en las fechas de encuentro candidatas."
            ],
            [
                "Conectar las fechas.",
                "El problema de Lambert proporciona arcos de transferencia heliocéntricos. La búsqueda varía las fechas, las ramas de varias revoluciones y las maniobras opcionales en el espacio profundo."
            ],
            [
                "Comprobar cada asistencia.",
                "En un sobrevuelo sin propulsión, las magnitudes de V∞ de entrada y salida deben coincidir, y el giro necesario debe ser posible por encima del periapsis mínimo."
            ],
            [
                "Elegir el compromiso.",
                "Compara energía de lanzamiento, maniobras, duración y velocidad de llegada. Refina tu favorita localmente; las exportaciones con encuentros a distancia finita indican las correcciones adicionales por separado."
            ]
        ],
        "missions": [
            {
                "title": "Tianwen-4",
                "dates": "2029 → 2045 · Júpiter/Urano",
                "description": "Reconstrucción de una misión propuesta con dos destinos a partir de su calendario publicado de encuentros. La rama de sobrevuelo de Urano continúa después de Júpiter; el orbitador joviano sigue una trayectoria distinta.",
                "note": "Concepto modelado de forma independiente, no una efeméride oficial de la misión china. La galería incluye la rama integrada hacia Urano."
            },
            {
                "title": "Reconstruyendo Cassini",
                "dates": "1997 → 2005 · Saturno",
                "description": "Una nueva solución de Lambert que sigue la ruta Venus–Venus–Tierra–Júpiter de Cassini hacia Saturno, con una maniobra entre los encuentros con Venus. Llega unos 479 días después de la llegada de Cassini en julio de 2004.",
                "note": "Los 412.4 m/s corresponden a la DSM ideal de Lambert. La exportación actual con encuentros a distancia finita añade maniobras de empalme y suma 2.060 km/s antes de la captura. Es una comparación de diseños, no la trayectoria volada por Cassini."
            },
            {
                "title": "Júpiter con un lanzamiento de baja energía",
                "dates": "2033 → 2041 · Júpiter",
                "description": "Una maniobra de 494 m/s durante el primer tramo de retorno a la Tierra reduce el C3 de lanzamiento de 12.68 a 6.25 km²/s² sin cambiar las fechas de encuentro. Después, un sobrevuelo de la Tierra, uno de Venus y otros dos de la Tierra conducen la sonda a Júpiter. Las cuatro asistencias superan las comprobaciones de velocidad y giro sin propulsión.",
                "note": "La V∞ de llegada a Júpiter es 8.58 km/s; la captura necesita un presupuesto aparte. Es un diseño original, no la trayectoria volada por JUICE. La propagación independiente verifica los arcos bajo gravedad solar; los encuentros a distancia finita y la dinámica de varios cuerpos se estudian por separado.",
                "downloadHint": "Consulta esta misión en RoLaMGAS, compara su energía de lanzamiento y duración, y descarga los estados CSV / XYZV."
            },
            {
                "title": "Mercurio con dos giros en Venus",
                "dates": "2034 → 2037 · Mercurio",
                "description": "Dos encuentros con Venus desvían la sonda hacia Mercurio. Esta versión exportada corrige los desajustes de velocidad de la candidata mediante maniobras durante los sobrevuelos y en los empalmes; no tiene una DSM de crucero diseñada. Un siguiente estudio podría buscar sobrevuelos repetidos de Mercurio para reducir la velocidad relativa.",
                "note": "El coste de crucero exportado es 899.7 m/s, incluidas las correcciones de empalme y de velocidad de los sobrevuelos. La inyección de lanzamiento y la captura en Mercurio quedan fuera. El archivo termina a 200 km de altitud, sin captura orbital. Se muestra el modelo de Robert de la trayectoria ba36e139b812."
            }
        ],
        "portalLead": "ARRIBA ESTÁN LAS TRAYECTORIAS HECHAS A MANO, PERO PROBABLEMENTE BUSCAS",
        "home": "Volver al inicio"
    },
    "fr": {
        "eyebrow": "LABORATOIRE DE CONCEPTION DE MISSIONS DE ROBERT",
        "subtitle": "Solveur Lambert multi-assistances gravitationnelles de Robert",
        "portalHint": "Tournez à gauche. Explorez les possibilités.",
        "recreation": "RECONSTITUTION DE MISSION",
        "original": "TRAJECTOIRE ORIGINALE",
        "explore": "Explorer cette trajectoire",
        "downloadHint": "Ouvrez sa page dans la galerie pour télécharger les états CSV / XYZV et consulter les dates des rencontres.",
        "source": "Code source et logiciel de bureau",
        "methodTitle": "Comment fonctionne le solveur ?",
        "choose": "Choisir une trajectoire",
        "selection": "Trajectoire sélectionnée et explication du solveur",
        "handmade": "Trajectoires conçues à la main",
        "sequenceKey": "C3 est le carré de V∞ au départ. DSM désigne une manœuvre dans l’espace lointain ; ‘dv’ la signale dans une séquence. E = Terre, V = Vénus, Me = Mercure, J = Jupiter, S = Saturne, U = Uranus.",
        "budgetNote": "Aucune DSM prévue ne signifie pas zéro ergol : l’injection au lancement, les corrections de navigation et la capture finale nécessitent des budgets distincts.",
        "years": "ans",
        "metricLabels": {
            "Launch C3": "C3 au lancement",
            "Ideal DSM": "DSM idéale",
            "Arrival V∞": "V∞ à l’arrivée",
            "Designed DSM": "DSM prévue",
            "Flight time": "Durée du vol",
            "Exported cruise Δv": "Δv de croisière exporté"
        },
        "steps": [
            [
                "Localiser les planètes.",
                "Les positions et vitesses de JPL Horizons mises en cache donnent les états planétaires aux dates de rencontre candidates."
            ],
            [
                "Relier les dates.",
                "Le problème de Lambert fournit des arcs de transfert héliocentriques. La recherche fait varier les dates, les branches à plusieurs révolutions et les manœuvres facultatives dans l’espace lointain."
            ],
            [
                "Vérifier chaque assistance.",
                "Pour un survol sans propulsion, les normes de V∞ à l’entrée et à la sortie doivent coïncider, et la déviation requise doit être possible au-dessus du périastre minimal."
            ],
            [
                "Choisir le compromis.",
                "Comparez énergie de lancement, manœuvres, durée et vitesse d’arrivée. Affinez votre choix localement ; les exports avec survols à distance finie détaillent séparément les corrections supplémentaires."
            ]
        ],
        "missions": [
            {
                "title": "Tianwen-4",
                "dates": "2029 → 2045 · Jupiter/Uranus",
                "description": "Reconstitution d’un concept de mission à deux destinations à partir de son calendrier publié de rencontres. La branche de survol d’Uranus se poursuit après Jupiter ; l’orbiteur jovien suit une trajectoire distincte.",
                "note": "Concept modélisé indépendamment, et non éphéméride officielle de la mission chinoise. La galerie contient la branche intégrée vers Uranus."
            },
            {
                "title": "Reconstituer Cassini",
                "dates": "1997 → 2005 · Saturne",
                "description": "Une nouvelle solution de Lambert suit l’itinéraire Vénus–Vénus–Terre–Jupiter de Cassini vers Saturne, avec une manœuvre entre les passages à Vénus. Elle arrive environ 479 jours après l’arrivée de Cassini en juillet 2004.",
                "note": "Les 412.4 m/s correspondent à la DSM idéale de Lambert. L’export actuel avec survols à distance finie ajoute des manœuvres de raccordement et totalise 2.060 km/s avant la capture. Il s’agit d’une comparaison de concepts, pas de la trajectoire réellement suivie par Cassini."
            },
            {
                "title": "Jupiter avec un lancement à faible énergie",
                "dates": "2033 → 2041 · Jupiter",
                "description": "Une manœuvre de 494 m/s pendant le premier retour vers la Terre abaisse le C3 de lancement de 12.68 à 6.25 km²/s² sans modifier les dates des rencontres. Un survol terrestre, un survol de Vénus et deux autres survols terrestres conduisent ensuite la sonde à Jupiter. Les quatre assistances respectent les critères de vitesse et de déviation sans propulsion.",
                "note": "La V∞ à l’arrivée sur Jupiter est de 8.58 km/s ; la capture demande un budget distinct. Cette conception originale ne reproduit pas le vol réel de JUICE. La propagation indépendante vérifie les arcs soumis à la gravité solaire ; les passages à distance finie et la dynamique à plusieurs corps restent des études séparées.",
                "downloadHint": "Consultez cette mission dans RoLaMGAS, comparez son énergie de lancement et sa durée, puis téléchargez les états CSV / XYZV."
            },
            {
                "title": "Mercure via deux virages à Vénus",
                "dates": "2034 → 2037 · Mercure",
                "description": "Deux rencontres avec Vénus orientent la sonde vers Mercure. Cette version exportée corrige les écarts de vitesse de la candidate par des manœuvres de survol et de raccordement ; aucune DSM de croisière n’est prévue. Une étude ultérieure pourrait rechercher des survols répétés de Mercure pour diminuer la vitesse relative.",
                "note": "Le coût de croisière exporté est de 899.7 m/s, corrections de raccordement et de vitesse des survols comprises. L’injection au lancement et la capture à Mercure sont exclues. Le fichier se termine à 200 km d’altitude, sans capture orbitale. Le modèle de Robert représente la trajectoire ba36e139b812."
            }
        ],
        "portalLead": "LES TRAJECTOIRES CONÇUES À LA MAIN SONT AU-DESSUS, MAIS VOUS CHERCHEZ SANS DOUTE",
        "home": "Retour à l’accueil"
    },
    "de": {
        "eyebrow": "ROBERTS LABOR FÜR MISSIONSENTWURF",
        "subtitle": "Roberts Lambert-Solver für mehrfache Swing-bys",
        "portalHint": "Nach links drehen. Möglichkeiten entdecken.",
        "recreation": "MISSIONSREKONSTRUKTION",
        "original": "EIGENER TRAJEKTORIENENTWURF",
        "explore": "Diese Flugbahn erkunden",
        "downloadHint": "Auf der Galerieseite stehen Zustandsdaten als CSV / XYZV und die Begegnungsdaten bereit.",
        "source": "Quellcode und Desktop-Solver",
        "methodTitle": "Wie arbeitet der Solver?",
        "choose": "Ein Flugbahnexponat auswählen",
        "selection": "Ausgewählte Flugbahn und Erklärung des Solvers",
        "handmade": "Von Hand entworfene Flugbahnen",
        "sequenceKey": "C3 ist das Quadrat der hyperbolischen Überschussgeschwindigkeit V∞ beim Abflug. DSM bezeichnet ein Manöver im interplanetaren Raum; ‘dv’ markiert es in einer Sequenz. E = Erde, V = Venus, Me = Merkur, J = Jupiter, S = Saturn, U = Uranus.",
        "budgetNote": "Keine geplante DSM bedeutet nicht null Treibstoff: Startinjektion, Navigationskorrekturen und Einbremsen am Ziel brauchen eigene Budgets.",
        "years": "Jahre",
        "metricLabels": {
            "Launch C3": "C3 beim Start",
            "Ideal DSM": "Ideale DSM",
            "Arrival V∞": "V∞ bei Ankunft",
            "Designed DSM": "Geplante DSM",
            "Flight time": "Flugdauer",
            "Exported cruise Δv": "Exportiertes Reise-Δv"
        },
        "steps": [
            [
                "Planeten bestimmen.",
                "Zwischengespeicherte Positionen und Geschwindigkeiten von JPL Horizons liefern die Planetenzustände an möglichen Begegnungsterminen."
            ],
            [
                "Termine verbinden.",
                "Das Lambert-Problem liefert heliozentrische Transferbögen. Die Suche variiert Termine, Lösungszweige mit mehreren Umläufen und optionale Manöver im interplanetaren Raum."
            ],
            [
                "Jedes Swing-by prüfen.",
                "Bei einem unbetriebenen Vorbeiflug müssen die Beträge der ein- und auslaufenden V∞ übereinstimmen. Die erforderliche Ablenkung muss oberhalb der Mindestperiapsis möglich sein."
            ],
            [
                "Den Zielkonflikt abwägen.",
                "Startenergie, Manöver, Flugdauer und Ankunftsgeschwindigkeit vergleichen und einen Favoriten lokal verfeinern. Exporte mit endlichen Vorbeiflugabständen weisen zusätzliche Korrekturen gesondert aus."
            ]
        ],
        "missions": [
            {
                "title": "Tianwen-4",
                "dates": "2029 → 2045 · Jupiter/Uranus",
                "description": "Rekonstruktion eines vorgeschlagenen Missionskonzepts mit zwei Zielen anhand der veröffentlichten Begegnungstermine. Der Uranus-Vorbeiflugzweig führt nach der Jupiterbegegnung weiter; der Jupiterorbiter folgt einer eigenen Flugbahn.",
                "note": "Ein unabhängig modelliertes Konzept, keine offizielle Ephemeride der chinesischen Mission. Die Galerie enthält den integrierten Uranus-Zweig."
            },
            {
                "title": "Cassini rekonstruieren",
                "dates": "1997 → 2005 · Saturn",
                "description": "Eine neue Lambert-Lösung folgt Cassinis Venus–Venus–Erde–Jupiter-Route zum Saturn, mit einem Manöver zwischen den Venusbegegnungen. Sie erreicht Saturn etwa 479 Tage nach Cassinis Ankunft im Juli 2004.",
                "note": "Die 412.4 m/s bezeichnen die ideale Lambert-DSM. Der aktuelle Export mit endlichen Vorbeiflugabständen ergänzt Anschlussmanöver und erreicht vor dem Einbremsen insgesamt 2.060 km/s. Dies ist ein Entwurfsvergleich, nicht Cassinis tatsächlich geflogene Bahn."
            },
            {
                "title": "Jupiter mit energiearmem Start",
                "dates": "2033 → 2041 · Jupiter",
                "description": "Ein Bahnmanöver von 494 m/s auf dem ersten Rückflug zur Erde senkt den Start-C3 von 12.68 auf 6.25 km²/s², ohne die Begegnungsdaten zu verändern. Ein Erdvorbeiflug, ein Venusvorbeiflug und zwei weitere Erdvorbeiflüge führen die Sonde anschließend zum Jupiter. Alle vier Vorbeiflüge erfüllen die Geschwindigkeits- und Ablenkungskriterien ohne Triebwerkseinsatz.",
                "note": "Die Ankunfts-V∞ am Jupiter beträgt 8.58 km/s; das Einbremsen benötigt ein eigenes Budget. Dies ist ein eigener Entwurf, nicht die tatsächlich geflogene JUICE-Bahn. Die unabhängige Integration prüft die Bahnbögen unter Sonnengravitation; planetennahe Passagen mit endlichem Abstand und Mehrkörperdynamik werden getrennt untersucht.",
                "downloadHint": "Diese Mission in RoLaMGAS ansehen, Startenergie und Flugzeit vergleichen und Zustandsdaten als CSV / XYZV herunterladen."
            },
            {
                "title": "Über zwei Venusvorbeiflüge zum Merkur",
                "dates": "2034 → 2037 · Merkur",
                "description": "Zwei Venusbegegnungen lenken die Sonde zum Merkur. Dieser Export gleicht die Geschwindigkeitsabweichungen des Entwurfs durch Vorbeiflug- und Anschlussmanöver aus; eine Reiseflug-DSM ist nicht vorgesehen. Eine weitere Studie könnte wiederholte Merkurvorbeiflüge suchen, um die Relativgeschwindigkeit zu senken.",
                "note": "Das exportierte Reiseflugbudget beträgt 899.7 m/s einschließlich Anschluss- und Geschwindigkeitskorrekturen an den Vorbeiflügen. Startinjektion und Einbremsen am Merkur sind ausgeschlossen. Die Datei endet in 200 km Höhe ohne Orbitaleinfang. Roberts Modell zeigt die Flugbahn ba36e139b812."
            }
        ],
        "portalLead": "OBEN SIND DIE VON HAND ENTWORFENEN FLUGBAHNEN, ABER WAHRSCHEINLICH SUCHST DU",
        "home": "Zur Startansicht"
    },
    "ru": {
        "eyebrow": "ЛАБОРАТОРИЯ ПРОЕКТИРОВАНИЯ МИССИЙ РОБЕРТА",
        "subtitle": "Решатель Ламберта Роберта для цепочек гравитационных манёвров",
        "portalHint": "Поверните налево. Исследуйте возможности.",
        "recreation": "РЕКОНСТРУКЦИЯ МИССИИ",
        "original": "АВТОРСКАЯ ТРАЕКТОРИЯ",
        "explore": "Изучить эту траекторию",
        "downloadHint": "Откройте страницу в галерее, чтобы скачать векторы состояния в CSV / XYZV и посмотреть даты встреч.",
        "source": "Исходный код и настольная программа",
        "methodTitle": "Как работает решатель?",
        "choose": "Выбрать экспонат с траекторией",
        "selection": "Выбранная траектория и описание решателя",
        "handmade": "Траектории ручной разработки",
        "sequenceKey": "C3 — квадрат гиперболической избыточной скорости V∞ при отлёте. DSM — манёвр в межпланетном пространстве; в последовательности он обозначен ‘dv’. E = Земля, V = Венера, Me = Меркурий, J = Юпитер, S = Сатурн, U = Уран.",
        "budgetNote": "Отсутствие запланированной DSM не означает нулевой расход топлива: выведение на траекторию, навигационные коррекции и захват у цели требуют отдельных бюджетов.",
        "years": "лет",
        "metricLabels": {
            "Launch C3": "C3 при запуске",
            "Ideal DSM": "Идеальная DSM",
            "Arrival V∞": "V∞ при прибытии",
            "Designed DSM": "Расчётная DSM",
            "Flight time": "Время полёта",
            "Exported cruise Δv": "Δv экспортированного перелёта"
        },
        "steps": [
            [
                "Определить положения планет.",
                "Сохранённые в кэше положения и скорости JPL Horizons задают состояния планет на предполагаемые даты встреч."
            ],
            [
                "Соединить даты.",
                "Задача Ламберта даёт гелиоцентрические перелётные дуги. Поиск меняет даты встреч, ветви решений с несколькими оборотами и необязательные межпланетные манёвры."
            ],
            [
                "Проверить каждый пролёт.",
                "Для гравитационного манёвра без тяги модули входящей и исходящей V∞ должны совпадать. Требуемый поворот должен быть возможен при перицентре не ниже допустимого."
            ],
            [
                "Выбрать компромисс.",
                "Сравните энергию запуска, манёвры, длительность и скорость прибытия. Уточните понравившийся вариант локально; экспорт с пролётами на конечном расстоянии отдельно учитывает дополнительные коррекции."
            ]
        ],
        "missions": [
            {
                "title": "Тяньвэнь-4",
                "dates": "2029 → 2045 · Юпитер/Уран",
                "description": "Реконструкция предложенной миссии с двумя целями по опубликованному расписанию встреч. Ветка пролёта Урана продолжается после встречи с Юпитером; юпитерианский орбитальный аппарат следует отдельной траектории.",
                "note": "Независимо смоделированная концепция, а не официальная эфемерида китайской миссии. В галерее представлена интегрированная ветка к Урану."
            },
            {
                "title": "Реконструкция «Кассини»",
                "dates": "1997 → 2005 · Сатурн",
                "description": "Новое решение Ламберта повторяет схему Венера–Венера–Земля–Юпитер аппарата «Кассини» на пути к Сатурну, с манёвром между встречами с Венерой. Прибытие происходит примерно на 479 дней позже, чем у «Кассини» в июле 2004 года.",
                "note": "412.4 m/s — идеальная DSM решения Ламберта. Текущий экспорт с пролётами на конечном расстоянии добавляет стыковочные импульсы: до захвата суммарно требуется 2.060 km/s. Это сравнение проектов, а не реально выполненная траектория «Кассини»."
            },
            {
                "title": "К Юпитеру с низкой энергией запуска",
                "dates": "2033 → 2041 · Юпитер",
                "description": "Манёвр 494 м/с на первом участке возвращения к Земле снижает C3 запуска с 12.68 до 6.25 км²/с², сохраняя даты встреч. Затем пролёт Земли, пролёт Венеры и ещё два пролёта Земли направляют аппарат к Юпитеру. Все четыре гравитационных манёвра проходят проверки скорости и угла поворота без включения двигателя.",
                "note": "V∞ при прибытии к Юпитеру составляет 8.58 км/с; для захвата нужен отдельный бюджет. Это оригинальный проект, а не траектория реального полёта JUICE. Независимое интегрирование проверяет участки под действием гравитации Солнца; пролёты на конечном расстоянии и многотельная динамика рассматриваются отдельно.",
                "downloadHint": "Откройте миссию в RoLaMGAS, сравните энергию запуска и время полёта и скачайте векторы состояния CSV / XYZV."
            },
            {
                "title": "К Меркурию через два пролёта Венеры",
                "dates": "2034 → 2037 · Меркурий",
                "description": "Две встречи с Венерой направляют зонд к Меркурию. Этот экспорт компенсирует рассогласования скорости исходного варианта импульсами при пролётах и на стыках дуг; межпланетная DSM не предусмотрена. Следующий этап исследования может искать повторные пролёты Меркурия для снижения относительной скорости.",
                "note": "Экспортированный бюджет перелёта составляет 899.7 m/s, включая стыковочные импульсы и согласование скоростей при пролётах. Выведение на траекторию и захват у Меркурия исключены. Файл заканчивается на высоте 200 km без выхода на орбиту. Модель Роберта показывает траекторию ba36e139b812."
            }
        ],
        "portalLead": "ВЫШЕ — ТРАЕКТОРИИ РУЧНОЙ РАЗРАБОТКИ, НО ВЫ, ВЕРОЯТНО, ИЩЕТЕ",
        "home": "На главную"
    },
    "hi": {
        "eyebrow": "रॉबर्ट की मिशन डिज़ाइन प्रयोगशाला",
        "subtitle": "रॉबर्ट का लैम्बर्ट बहु-गुरुत्वीय-सहायता सॉल्वर",
        "portalHint": "बाईं ओर मुड़ें। संभावनाएँ खोजें।",
        "recreation": "मिशन का पुनर्निर्माण",
        "original": "मौलिक प्रक्षेपपथ",
        "explore": "इस प्रक्षेपपथ को देखें",
        "downloadHint": "स्थिति और वेग के CSV / XYZV डेटा डाउनलोड करने तथा ग्रहों से मुठभेड़ की तारीखें देखने के लिए इसका गैलरी पृष्ठ खोलें।",
        "source": "सोर्स कोड और डेस्कटॉप सॉल्वर",
        "methodTitle": "सॉल्वर कैसे काम करता है?",
        "choose": "एक प्रक्षेपपथ प्रदर्शनी चुनें",
        "selection": "चुना गया प्रक्षेपपथ और सॉल्वर का विवरण",
        "handmade": "हाथ से डिज़ाइन किए गए प्रक्षेपपथ",
        "sequenceKey": "C3, प्रस्थान के समय की अतिरिक्त अतिपरवलयिक गति V∞ का वर्ग है। DSM का अर्थ है गहरे अंतरिक्ष में किया गया प्रणोदन-संशोधन; क्रम में ‘dv’ इसे दर्शाता है। E = पृथ्वी, V = शुक्र, Me = बुध, J = बृहस्पति, S = शनि, U = अरुण।",
        "budgetNote": "नियोजित DSM शून्य होने का अर्थ शून्य प्रणोदक नहीं है: प्रक्षेपण के बाद पथ पर प्रवेश, नेविगेशन सुधार और गंतव्य की कक्षा में प्रवेश के लिए अलग बजट चाहिए।",
        "years": "वर्ष",
        "metricLabels": {
            "Launch C3": "प्रक्षेपण C3",
            "Ideal DSM": "आदर्श DSM",
            "Arrival V∞": "आगमन V∞",
            "Designed DSM": "नियोजित DSM",
            "Flight time": "उड़ान अवधि",
            "Exported cruise Δv": "एक्सपोर्ट का यात्रा Δv"
        },
        "steps": [
            [
                "ग्रहों की स्थिति पाएँ।",
                "कैश में सहेजी गई JPL Horizons की स्थितियाँ और वेग संभावित मुठभेड़ की तारीखों पर ग्रहों की अवस्थाएँ देते हैं।"
            ],
            [
                "तारीखों को जोड़ें।",
                "लैम्बर्ट समस्या से सूर्य-केंद्रित स्थानांतरण चाप मिलते हैं। खोज मुठभेड़ की तारीखें, कई चक्कर वाले समाधान और वैकल्पिक गहरे-अंतरिक्ष प्रणोदन-संशोधन बदलती है।"
            ],
            [
                "हर गुरुत्वीय सहायता जाँचें।",
                "बिना प्रणोदन वाले फ्लाइबाइ के लिए आने और जाने वाली V∞ के परिमाण मिलने चाहिए। आवश्यक मोड़ न्यूनतम अनुमत निकटतम पहुँच दूरी से ऊपर संभव होना चाहिए।"
            ],
            [
                "उचित संतुलन चुनें।",
                "प्रक्षेपण ऊर्जा, प्रणोदन-संशोधन, उड़ान अवधि और आगमन गति की तुलना करें। पसंदीदा विकल्प अपने कंप्यूटर पर सुधारें; सीमित दूरी वाले फ्लाइबाइ के एक्सपोर्ट में अतिरिक्त सुधार अलग से बताए जाते हैं।"
            ]
        ],
        "missions": [
            {
                "title": "तियानवेन-4",
                "dates": "2029 → 2045 · बृहस्पति/अरुण",
                "description": "प्रकाशित मुठभेड़-सारणी से दो गंतव्यों वाले प्रस्तावित मिशन का पुनर्निर्माण। बृहस्पति से मुठभेड़ के बाद अरुण के फ्लाइबाइ वाला भाग आगे बढ़ता है; बृहस्पति का ऑर्बिटर अलग प्रक्षेपपथ पर जाता है।",
                "note": "यह स्वतंत्र रूप से मॉडल की गई अवधारणा है, चीनी मिशन का आधिकारिक स्थिति-डेटा नहीं। गैलरी में अरुण की ओर जाने वाला समाकलित प्रक्षेपपथ उपलब्ध है।"
            },
            {
                "title": "कैसिनी का पुनर्निर्माण",
                "dates": "1997 → 2005 · शनि",
                "description": "लैम्बर्ट का नया समाधान कैसिनी के शुक्र–शुक्र–पृथ्वी–बृहस्पति मार्ग से शनि पहुँचता है; शुक्र की दोनों मुठभेड़ों के बीच एक गहरे-अंतरिक्ष प्रणोदन-संशोधन है। यह जुलाई 2004 में कैसिनी के आगमन से लगभग 479 दिन बाद पहुँचता है।",
                "note": "412.4 m/s आदर्श लैम्बर्ट DSM है। सीमित दूरी वाले फ्लाइबाइ का वर्तमान एक्सपोर्ट जोड़-बिंदुओं पर प्रणोदन-संशोधन जोड़ता है; कक्षा में प्रवेश से पहले कुल 2.060 km/s लगता है। यह डिज़ाइनों की तुलना है, कैसिनी की वास्तविक उड़ान नहीं।"
            },
            {
                "title": "कम प्रक्षेपण ऊर्जा से बृहस्पति तक",
                "dates": "2033 → 2041 · बृहस्पति",
                "description": "पृथ्वी की ओर पहले वापसी चरण में 494 m/s की अंतरिक्षीय पैंतरेबाज़ी, मुलाकातों की तारीखें बदले बिना, प्रक्षेपण C3 को 12.68 से घटाकर 6.25 km²/s² करती है। इसके बाद पृथ्वी, शुक्र और फिर दो बार पृथ्वी के फ्लाइबाय यान को बृहस्पति की ओर भेजते हैं। चारों गुरुत्व सहायता चरण बिना इंजन चलाए गति और मोड़ की जाँच में सफल हैं।",
                "note": "बृहस्पति पर आगमन V∞ 8.58 km/s है; कक्षा में प्रवेश के लिए अलग बजट चाहिए। यह मौलिक डिज़ाइन है, JUICE की वास्तविक उड़ान का पुनर्निर्माण नहीं। स्वतंत्र संख्यात्मक समाकलन केवल सूर्य के गुरुत्व वाले चापों की जाँच करता है; सीमित दूरी के ग्रह फ्लाइबाय और बहु-पिंड गतिकी अलग अध्ययन हैं।",
                "downloadHint": "इस मिशन को RoLaMGAS में देखें, प्रक्षेपण ऊर्जा और उड़ान अवधि की तुलना करें तथा CSV / XYZV स्थिति और वेग डेटा डाउनलोड करें।"
            },
            {
                "title": "शुक्र के दो फ्लाइबाइ से बुध तक",
                "dates": "2034 → 2037 · बुध",
                "description": "शुक्र से दो मुठभेड़ें यान को बुध की ओर मोड़ती हैं। यह एक्सपोर्ट मूल विकल्प की गति-असंगतियाँ फ्लाइबाइ और चापों के जोड़ पर प्रणोदन-संशोधनों से ठीक करता है; यात्रा के दौरान कोई DSM नियोजित नहीं है। आगे का अध्ययन सापेक्ष गति घटाने के लिए बुध के बार-बार फ्लाइबाइ खोज सकता है।",
                "note": "एक्सपोर्ट का यात्रा बजट 899.7 m/s है, जिसमें जोड़-बिंदु और फ्लाइबाइ की गति-मिलान सुधार शामिल हैं। प्रक्षेपण के बाद पथ में प्रवेश और बुध की कक्षा में प्रवेश इसमें शामिल नहीं हैं। फ़ाइल 200 km की ऊँचाई पर समाप्त होती है, कक्षा में प्रवेश किए बिना। रॉबर्ट का मॉडल ba36e139b812 प्रक्षेपपथ दिखाता है।"
            }
        ],
        "portalLead": "हाथ से डिज़ाइन किए गए प्रक्षेपपथ ऊपर हैं, लेकिन आप शायद ढूँढ़ रहे हैं",
        "home": "मुख्य दृश्य"
    },
    "zh": {
        "eyebrow": "ROBERT 的任务设计实验室",
        "subtitle": "Robert 的兰伯特多次引力助推求解器",
        "portalHint": "向左转，探索更多可能。",
        "recreation": "任务轨迹重建",
        "original": "原创轨迹",
        "explore": "探索这条轨迹",
        "downloadHint": "打开轨迹库中的对应页面，即可下载 CSV / XYZV 位置和速度数据，并查看交会日期。",
        "source": "源代码与桌面求解器",
        "methodTitle": "求解器如何工作？",
        "choose": "选择轨迹展品",
        "selection": "所选轨迹与求解器说明",
        "handmade": "手工设计的轨迹",
        "sequenceKey": "C3 是出发时双曲线超额速度 V∞ 的平方。DSM 表示深空机动，序列中的 ‘dv’ 表示此类机动。E = 地球，V = 金星，Me = 水星，J = 木星，S = 土星，U = 天王星。",
        "budgetNote": "没有设计中的 DSM，并不意味着任务无需推进剂：发射注入、导航修正和终端捕获都需要单独计算预算。",
        "years": "年",
        "metricLabels": {
            "Launch C3": "发射 C3",
            "Ideal DSM": "理想 DSM",
            "Arrival V∞": "到达 V∞",
            "Designed DSM": "设计 DSM",
            "Flight time": "飞行时间",
            "Exported cruise Δv": "导出巡航 Δv"
        },
        "steps": [
            [
                "确定行星状态。",
                "缓存的 JPL Horizons 位置和速度数据，给出各候选交会日期的行星状态。"
            ],
            [
                "连接交会日期。",
                "通过兰伯特问题求得日心转移弧段。搜索会改变交会日期、多圈解分支以及可选的深空机动。"
            ],
            [
                "检查每次助推。",
                "无动力飞越要求入射与出射 V∞ 的大小相匹配，而且所需转角必须能在不低于最低近心点的条件下实现。"
            ],
            [
                "选择合适的取舍。",
                "比较发射能量、巡航机动、飞行时间和到达速度，在本机进一步优化喜欢的方案。采用有限距离飞越的导出文件会单独列出额外修正机动。"
            ]
        ],
        "missions": [
            {
                "title": "天问四号",
                "dates": "2029 → 2045 · 木星/天王星",
                "description": "根据已公布的交会时间表，重建一项具有两个目的地的任务方案。飞越天王星的分支在木星交会后继续前进；木星轨道器则沿另一条轨迹飞行。",
                "note": "这是独立建模的任务概念，并非中国任务的官方星历。轨迹库提供了通往天王星分支的积分轨迹。"
            },
            {
                "title": "重建卡西尼号轨迹",
                "dates": "1997 → 2005 · 土星",
                "description": "新的兰伯特解沿卡西尼号的金星—金星—地球—木星路线前往土星，并在两次金星交会之间进行深空机动。它比卡西尼号在 2004 年 7 月的到达时间晚约 479 天。",
                "note": "412.4 m/s 是理想兰伯特解的 DSM。当前采用有限距离飞越的导出文件加入了弧段连接修正，在土星捕获前总计需要 2.060 km/s。这是设计方案的比较，并非卡西尼号实际飞行的轨迹。"
            },
            {
                "title": "以低发射能量前往木星",
                "dates": "2033 → 2041 · 木星",
                "description": "在首次返回地球的航段中，一次 494 m/s 的深空机动将发射 C3 从 12.68 降至 6.25 km²/s²，同时保持各次交会日期不变。此后，探测器依次飞越地球、金星，再飞越地球两次，最终抵达木星。四次无动力引力辅助均通过了速度和转向检查。",
                "note": "抵达木星时的 V∞ 为 8.58 km/s，轨道捕获需要另行分配速度增量。这是原创方案，并非 JUICE 的实际飞行轨迹。独立数值积分验证了仅受太阳引力作用的弧段；有限距离的行星飞越及多体动力学仍需分别研究。",
                "downloadHint": "在 RoLaMGAS 中查看此任务，比较发射能量与飞行时间，并下载 CSV / XYZV 位置和速度数据。"
            },
            {
                "title": "经两次金星飞越前往水星",
                "dates": "2034 → 2037 · 水星",
                "description": "两次金星交会使探测器转向水星。这个导出版本通过飞越机动与弧段连接机动修正原候选方案的速度不匹配，未设计巡航 DSM。后续研究可尝试多次水星飞越，以降低相对速度。",
                "note": "导出的巡航预算为 899.7 m/s，包含弧段连接修正与飞越速度匹配机动，不包括发射注入和水星捕获。文件在距水星表面 200 km 处结束，并未入轨。Robert 的模型展示的是 ba36e139b812 轨迹。"
            }
        ],
        "portalLead": "上方是手工设计的轨迹，不过你可能在找",
        "home": "返回主页"
    }
};

export function getSolverTranslation(language) {
    return SOLVER_TRANSLATIONS[language] ?? SOLVER_TRANSLATIONS.en;
}
