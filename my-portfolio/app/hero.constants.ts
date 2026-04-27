// Orb flee behaviour
export const ORB_FLEE_RADIUS = 130; // px from cursor that triggers a flee
export const ORB_FLEE_MIN_DISTANCE = ORB_FLEE_RADIUS * 1.8; // new position must be at least this far from cursor
export const ORB_FLEE_MAX_TRIES = 30; // max random attempts before giving up on min-distance requirement
export const ORB_FLEE_COOLDOWN_MS = 500; // ms before orb can flee again after one flee

// Orb spring physics — higher stiffness = snappier, higher damping = less bounce
export const ORB_SPRING_STIFFNESS = 280;
export const ORB_SPRING_DAMPING = 22;

// Keeps orb away from hero edges so it never clips outside the section
export const ORB_EDGE_PADDING = 60; // px inset from each edge

// Fallback hero height fraction of viewport when getBoundingClientRect returns 0 (pre-layout)
export const ORB_HERO_HEIGHT_FALLBACK_FRACTION = 0.7;

// Orb visual size
export const ORB_SIZE = 12; // px diameter

// Entrance animation timing
export const HEADING_ENTRANCE_DURATION = 0.7; // seconds
export const HEADING_ENTRANCE_OFFSET_Y = 30; // px drop distance on entrance

export const SUBTITLE_ENTRANCE_DURATION = 0.7;
export const SUBTITLE_ENTRANCE_DELAY = 0.2; // staggers after heading
export const SUBTITLE_ENTRANCE_OFFSET_Y = 20;

export const ARROW_ENTRANCE_DURATION = 0.5;
export const ARROW_ENTRANCE_DELAY = 0.6; // fades in last, after heading + subtitle settle

// Arrow icon size
export const SCROLL_ARROW_SIZE = 28; // px

// Orb idle blink — pulses opacity twice to draw attention after inactivity
export const ORB_BLINK_IDLE_THRESHOLD_MS = 5000; // ms without flee before blink triggers
export const ORB_BLINK_INTERVAL_MS = 5000; // how often to check for idle + blink
export const ORB_BLINK_DIM_OPACITY = 0; // opacity at dim peak of blink
export const ORB_BLINK_DURATION = 2.0; // seconds for two-pulse blink sequence
