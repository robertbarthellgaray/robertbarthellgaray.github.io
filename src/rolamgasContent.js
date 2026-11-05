import tianwenModel from "./assets/RebuiltTianwen.glb?url";
import cassiniModel from "./assets/RebuiltCassini.glb?url";
import Mercurymodel from "./assets/Mercury.glb?url";
import previews from "./featuredTrajectories.json";

export const SOLVER_GALLERY = "https://robertbarthellgaray.github.io/RoLaMGAS/";

// Add the future original-trajectory GLBs here as modelUrl imports.
// Normalization automatically fits their bounds into the reserved display space.
export const SOLVER_EXHIBITS = [
    {
        id: "tianwen4-concept", title: "Tianwen-4", category: "MISSION RECREATION",
        route: "EVEEJU", dates: "2029 → 2045 · Jupiter/Uranus",
        modelUrl: tianwenModel,
        description: "Reconstructing a proposed two-destination mission from its published encounter schedule. The Uranus flyby branch continues onward after the Jupiter encounter; the Jovian orbiter is a separate trajectory.",
        note: "An independently modeled mission concept, not an official Chinese mission ephemeris. The gallery includes the integrated Uranus branch.",
    },
    {
        id: "4fed974cbffb", title: "Rebuilding Cassini", category: "MISSION RECREATION",
        route: "EVdvVEJS", dates: "1997 → 2005 · Saturn",
        modelUrl: cassiniModel,
        description: "A new Lambert solution following Cassini’s Venus–Venus–Earth–Jupiter route to Saturn, with a deep-space maneuver between the Venus encounters. Its arrival is about 479 days later than Cassini’s July 2004 arrival.",
        metrics: [["Launch C3", "15.90 km²/s²"], ["Ideal DSM", "412.4 m/s"], ["Arrival V∞", "4.54 km/s"]],
        note: "The 412.4 m/s is the ideal Lambert DSM. The current finite-radius export adds junction burns and totals 2.060 km/s before capture. This is a design comparison, not Cassini’s flown trajectory.",
    },
    {
        id: "4d76acaf1f6f", title: "Jupiter with a Low-Energy Launch", category: "ORIGINAL TRAJECTORY / 01",
        route: "EdvEVEEJ", dates: "2033 → 2041 · Jupiter", preview: previews["4d76acaf1f6f"],
        galleryUrl: "/trajectories/jupiter-low-c3/index.html",
        description: "A 494 m/s deep-space maneuver during the first Earth-return leg cuts launch C3 from 12.68 to 6.25 km²/s² while preserving the working encounter dates. Earth, Venus and two further Earth flybys then send the probe to Jupiter. All four assists pass the unpowered speed and turn screens.",
        metrics: [["Launch C3", "6.25 km²/s²"], ["Designed DSM", "493.9 m/s"], ["Flight time", "7.88 years"]],
        note: "Jupiter arrival V∞ is 8.58 km/s; capture needs a separate budget. This is an original design, not JUICE’s flown trajectory. Independent propagation checks the Sun-only arcs; finite-radius planetary passages and n-body dynamics remain separate.",
        downloadHint: "Compare five C3/DSM choices, inspect encounter dates, and download the numerical seeds or event tables.",
    },
    {
        id: "ba36e139b812", title: "Mercury via Two turns at Venus", category: "ORIGINAL TRAJECTORY / 02",
        route: "EVVMe", dates: "2034 → 2037 · Mercury", preview: previews["ba36e139b812"],
        modelUrl: Mercurymodel,
        description: "Two Venus encounters bend the probe’s path toward Mercury. This exported version corrects the seed candidate’s speed mismatches with flyby and coast-junction burns; it has no designed cruise DSM. A next study could target repeated Mercury assists to reduce relative speed.",
        metrics: [["Launch C3", "14.034 km²/s²"], ["Exported cruise Δv", "899.7 m/s"], ["Arrival V∞", "8.664 km/s"], ["Flight time", "2.57 years"]],
        note: "The exported cruise budget is 899.7 m/s, including junction corrections and flyby speed-matching burns. Launch injection and Mercury capture are excluded. The file ends 200 km above Mercury without orbital capture. Robert’s model shows trajectory ba36e139b812.",
    },
];
