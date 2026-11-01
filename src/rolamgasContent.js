import tianwenModel from "./assets/RebuiltTianwen.glb?url";
import cassiniModel from "./assets/RebuiltCassini.glb?url";
import jupiterModel from "./assets/EEVEEJ.glb?url";
import previews from "./featuredTrajectories.json";

export const SOLVER_GALLERY = "https://robertbarthellgaray.github.io/RoLaMGAS/";

// Add the future original-trajectory GLBs here as modelUrl imports.
// Normalization automatically fits their bounds into the reserved display space.
export const SOLVER_EXHIBITS = [
    {
        id: "tianwen4-concept", title: "Tianwen-4", category: "MISSION RECREATION",
        route: "EVEEJU", dates: "Earth → Venus → Earth → Earth → Jupiter → Uranus",
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
        id: "45a45fc7816a", title: "The long way to Jupiter", category: "ORIGINAL TRAJECTORY / 01",
        route: "EEVEEJ", dates: "2033 → 2041 · Jupiter", preview: previews["45a45fc7816a"],
        modelUrl: jupiterModel,
        description: "A low-launch-energy route that returns to Earth, visits Venus, and uses two more Earth encounters before reaching Jupiter. All four assists pass the saved unpowered speed and turn screens, with no designed cruise DSM.",
        metrics: [["Launch C3", "12.68 km²/s²"], ["Designed DSM", "0 m/s"], ["Flight time", "7.88 years"]],
        note: "Jupiter arrival V∞ is 8.58 km/s, so capture still needs its own budget. The displayed model is Robert’s EEVEEJ route; the gallery contains its encounter dates and downloadable solar coast states.",
    },
    {
        id: "3ee87f3d91eb", title: "Two turns at Venus", category: "ORIGINAL TRAJECTORY / 02",
        route: "EVVMe", dates: "2033 → 2036 · Mercury", preview: previews["3ee87f3d91eb"],
        modelUrl: null,
        description: "Two Venus encounters, each about 302 km above the surface, bend the probe’s path toward Mercury. The saved ballistic candidate has no designed cruise DSM and closely matched incoming and outgoing Venus excess speeds.",
        metrics: [["Launch C3", "92.43 km²/s²"], ["Arrival V∞", "13.71 km/s"], ["Flight time", "2.39 years"]],
        note: "This is a high-energy Mercury encounter, not a low-speed Mercury orbiter. A second original exhibit is reserved here, with a live preview of the candidate until its 3D model is ready.",
    },
];
