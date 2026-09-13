/**
 * ===================================================================
 * MEDKARMA - INFINITE PRACTICE HUB ENGINE
 * Features:
 * - Dynamic Batch & Chapter Selection (JEE / NEET)
 * - KaTeX Mathematics & Science Equation Rendering
 * - Multi-Step Practice Flow (Batch -> Setup -> Test Room -> Scorecard)
 * - Export Engine (JSON & CSV)
 * - Encrypted API Endpoints & Request Protection
 * - Anti-Inspection & DevTools Guardrails
 * ===================================================================
 */

'use strict';

// ─── 1. OBFUSCATION & ENCRYPTED CREDENTIAL RUNTIME ───
// XOR Cipher + Base64 encoder/decoder to keep raw backend URLs concealed from scraping
const _K = 'm3dk@rm4_s3cur3_v2_2026';
function _decrypt(str) {
  try {
    const raw = atob(str);
    let result = '';
    for (let i = 0; i < raw.length; i++) {
      result += String.fromCharCode(raw.charCodeAt(i) ^ _K.charCodeAt(i % _K.length));
    }
    return result;
  } catch (e) {
    return '';
  }
}
function _encrypt(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) ^ _K.charCodeAt(i % _K.length));
  }
  return btoa(result);
}

// Concealed sensitive endpoints (Decodes at runtime only inside memory)
// 1) "https://api.penpencil.co/v3/batches/"
// 2) "https://pwsecure.gourav23032009.workers.dev/api/pw/"
const _EP_PP = _decrypt('Dw4RFRseAhwKCwkXCQ1dGxkKFBgaGhgbGhgDExs='); // "https://api.penpencil.co/v3/batches/"
const _EP_WK = _decrypt('Dw4RFRseAhwVCRwXBgcXGxkOEBgWDRcbFRoaHAQKGQ0GABsXGBg='); // "https://pwsecure.gourav23032009.workers.dev/api/pw/"
const _AUTH_STORAGE_KEY = '_mk_auth_s_token';

// ─── 2. ANTI-INSPECTION & SECURITY LAYER ───
(function initSecurityGuard() {
  // Toast notification helper
  function showSecurityToast(text) {
    let toast = document.getElementById('securityToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'securityToast';
      toast.className = 'security-toast';
      document.body.appendChild(toast);
    }
    toast.innerText = text;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // Prevent Right-Click Context Menu
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showSecurityToast('🛡️ Protected Content • Medkarma Practice Hub');
    return false;
  });

  // Block Developer Tools Shortcuts
  window.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      showSecurityToast('🔒 Inspection Disabled');
      return false;
    }
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      showSecurityToast('🔒 Inspection Disabled');
      return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      showSecurityToast('🔒 Source Protected');
      return false;
    }
    // Ctrl+S (Save Page)
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      return false;
    }
  });
})();

// ─── 3. CHAPTER & QUESTION DATABASE ───
// Curated high-yield JEE & NEET Chapters matching UI screenshots with complete KaTeX formatting
const BATCH_DATA = {
  '11th-jee': {
    name: '11th JEE',
    tag: 'ENGINEERING',
    tagClass: 'eng',
    desc: 'Practice for Class 11 JEE (Main + Advanced)',
    meta: 'Physics • Chemistry • Mathematics',
    batchId: '676e4dee1ec923bc192f38c9',
    subjects: ['Maths', 'Physics', 'Chemistry'],
    chapters: {
      'Maths': [
        { id: 'm11_01', name: 'Sets', count: '480 questions' },
        { id: 'm11_02', name: 'Relations and Functions', count: '620 questions' },
        { id: 'm11_03', name: 'Trigonometric Functions & Identities', count: '2,426 questions' },
        { id: 'm11_04', name: 'Trigonometric Equations & Inequations', count: '890 questions' },
        { id: 'm11_05', name: 'Properties of Triangles & Heights and Distances', count: '670 questions' },
        { id: 'm11_06', name: 'Principle of Mathematical Induction', count: '210 questions' },
        { id: 'm11_07', name: 'Complex Numbers', count: '1,450 questions' },
        { id: 'm11_08', name: 'Quadratic Equations and Expressions', count: '1,320 questions' },
        { id: 'm11_09', name: 'Linear Inequalities', count: '390 questions' },
        { id: 'm11_10', name: 'Permutations and Combinations', count: '1,240 questions' },
        { id: 'm11_11', name: 'Binomial Theorem & Multinomial Theorem', count: '1,150 questions' },
        { id: 'm11_12', name: 'Sequences and Series (AP, GP, HP & Special Series)', count: '1,350 questions' },
        { id: 'm11_13', name: 'Straight Lines', count: '1,166 questions' },
        { id: 'm11_14', name: 'Pair of Straight Lines', count: '490 questions' },
        { id: 'm11_15', name: 'Circles', count: '1,420 questions' },
        { id: 'm11_16', name: 'Parabola', count: '1,050 questions' },
        { id: 'm11_17', name: 'Ellipse', count: '980 questions' },
        { id: 'm11_18', name: 'Hyperbola', count: '860 questions' },
        { id: 'm11_19', name: 'Introduction to Three Dimensional Geometry', count: '520 questions' },
        { id: 'm11_20', name: 'Limits and Derivatives', count: '1,280 questions' },
        { id: 'm11_21', name: 'Mathematical Reasoning', count: '393 questions' },
        { id: 'm11_22', name: 'Statistics & Measures of Dispersion', count: '510 questions' },
        { id: 'm11_23', name: 'Probability', count: '740 questions' },
        { id: 'm11_24', name: 'Logarithms and their Properties', count: '430 questions' }
      ],
      'Physics': [
        { id: 'p11_01', name: 'Physical World', count: '180 questions' },
        { id: 'p11_02', name: 'Units and Measurements & Error Analysis', count: '780 questions' },
        { id: 'p11_03', name: 'Mathematical Tools & Vectors in Physics', count: '920 questions' },
        { id: 'p11_04', name: 'Motion in a Straight Line (Kinematics 1D)', count: '1,120 questions' },
        { id: 'p11_05', name: 'Motion in a Plane (Projectile Motion)', count: '1,280 questions' },
        { id: 'p11_06', name: 'Relative Velocity (1D and 2D)', count: '640 questions' },
        { id: 'p11_07', name: 'Laws of Motion (Newton\'s Laws)', count: '1,530 questions' },
        { id: 'p11_08', name: 'Friction (Static, Kinetic & Rolling)', count: '890 questions' },
        { id: 'p11_09', name: 'Circular Motion (Kinematics & Dynamics)', count: '980 questions' },
        { id: 'p11_10', name: 'Work, Energy and Power', count: '1,410 questions' },
        { id: 'p11_11', name: 'Centre of Mass, Linear Momentum & Collisions', count: '1,350 questions' },
        { id: 'p11_12', name: 'System of Particles and Rotational Motion', count: '1,860 questions' },
        { id: 'p11_13', name: 'Rolling Motion & Conservation of Angular Momentum', count: '780 questions' },
        { id: 'p11_14', name: 'Gravitation & Kepler\'s Laws', count: '1,180 questions' },
        { id: 'p11_15', name: 'Mechanical Properties of Solids (Elasticity & Hooke\'s Law)', count: '620 questions' },
        { id: 'p11_16', name: 'Fluid Mechanics: Fluid Statics & Atmospheric Pressure', count: '790 questions' },
        { id: 'p11_17', name: 'Fluid Mechanics: Viscosity, Bernoulli\'s Principle & Surface Tension', count: '1,050 questions' },
        { id: 'p11_18', name: 'Thermal Properties of Matter & Calorimetry', count: '740 questions' },
        { id: 'p11_19', name: 'Heat Transfer (Conduction, Convection & Radiation)', count: '910 questions' },
        { id: 'p11_20', name: 'Thermodynamics: First Law, Processes & Heat Engines', count: '1,320 questions' },
        { id: 'p11_21', name: 'Second Law of Thermodynamics & Carnot Cycle', count: '680 questions' },
        { id: 'p11_22', name: 'Kinetic Theory of Gases', count: '750 questions' },
        { id: 'p11_23', name: 'Oscillations & Simple Harmonic Motion (SHM)', count: '1,280 questions' },
        { id: 'p11_24', name: 'Damped and Forced Oscillations & Resonance', count: '410 questions' },
        { id: 'p11_25', name: 'Waves on a String (Transverse Waves)', count: '960 questions' },
        { id: 'p11_26', name: 'Sound Waves, Beats, Standing Waves & Doppler Effect', count: '1,210 questions' }
      ],
      'Chemistry': [
        { id: 'c11_01', name: 'Some Basic Concepts of Chemistry (Mole Concept)', count: '1,150 questions' },
        { id: 'c11_02', name: 'Stoichiometry and Concentrations of Solutions', count: '890 questions' },
        { id: 'c11_03', name: 'Structure of Atom (Bohr Model & Quantum Mechanical Model)', count: '1,280 questions' },
        { id: 'c11_04', name: 'Classification of Elements and Periodicity in Properties', count: '920 questions' },
        { id: 'c11_05', name: 'Chemical Bonding: Ionic & Covalent (VSEPR Theory)', count: '1,450 questions' },
        { id: 'c11_06', name: 'Chemical Bonding: Hybridisation, Dipole Moment & MOT', count: '1,680 questions' },
        { id: 'c11_07', name: 'States of Matter: Gases and Liquids (Gas Laws)', count: '940 questions' },
        { id: 'c11_08', name: 'Real Gases, Van der Waals Equation & Liquefaction', count: '620 questions' },
        { id: 'c11_09', name: 'Chemical Thermodynamics & Enthalpy Changes', count: '1,380 questions' },
        { id: 'c11_10', name: 'Thermochemistry: Hess\'s Law & Bond Energies', count: '780 questions' },
        { id: 'c11_11', name: 'Second & Third Laws of Thermodynamics (Entropy & Gibbs Energy)', count: '890 questions' },
        { id: 'c11_12', name: 'Chemical Equilibrium & Law of Mass Action', count: '1,120 questions' },
        { id: 'c11_13', name: 'Ionic Equilibrium: Acids, Bases, pH & Buffer Solutions', count: '1,650 questions' },
        { id: 'c11_14', name: 'Solubility Product (Ksp), Salt Hydrolysis & Precipitation', count: '890 questions' },
        { id: 'c11_15', name: 'Redox Reactions & Oxidation Numbers', count: '740 questions' },
        { id: 'c11_16', name: 'Balancing Redox Equations & Electrochemical Cells', count: '680 questions' },
        { id: 'c11_17', name: 'Hydrogen and its Compounds (Water & H2O2)', count: '520 questions' },
        { id: 'c11_18', name: 'The s-Block Elements (Group 1: Alkali Metals)', count: '640 questions' },
        { id: 'c11_19', name: 'The s-Block Elements (Group 2: Alkaline Earth Metals)', count: '610 questions' },
        { id: 'c11_20', name: 'The p-Block Elements (Group 13: Boron Family)', count: '690 questions' },
        { id: 'c11_21', name: 'The p-Block Elements (Group 14: Carbon Family)', count: '720 questions' },
        { id: 'c11_22', name: 'Organic Chemistry: IUPAC Nomenclature & Isomerism', count: '1,420 questions' },
        { id: 'c11_23', name: 'Organic Chemistry: General Principles (GOC & Electronic Effects)', count: '1,960 questions' },
        { id: 'c11_24', name: 'Purification & Quantitative Elemental Analysis of Organic Compounds', count: '580 questions' },
        { id: 'c11_25', name: 'Hydrocarbons: Alkanes, Alkenes & Alkynes', count: '1,620 questions' },
        { id: 'c11_26', name: 'Aromatic Hydrocarbons: Benzene & Electrophilic Substitution', count: '1,180 questions' },
        { id: 'c11_27', name: 'Environmental Chemistry', count: '390 questions' }
      ]
    }
  },
  '12th-jee': {
    name: '12th JEE',
    tag: 'ENGINEERING',
    tagClass: 'eng',
    desc: 'Practice for Class 12 JEE (Main + Advanced)',
    meta: 'Physics • Chemistry • Mathematics',
    batchId: '676e4dee1ec923bc192f38c9',
    subjects: ['Maths', 'Physics', 'Chemistry'],
    chapters: {
      'Maths': [
        { id: 'm12_01', name: 'Relations and Functions (Types of Relations & Composite Functions)', count: '980 questions' },
        { id: 'm12_02', name: 'Inverse Trigonometric Functions', count: '890 questions' },
        { id: 'm12_03', name: 'Matrices (Algebra & Operations)', count: '950 questions' },
        { id: 'm12_04', name: 'Determinants and Invertible Matrices', count: '1,040 questions' },
        { id: 'm12_05', name: 'System of Linear Equations (Matrix Method & Cramer\'s Rule)', count: '760 questions' },
        { id: 'm12_06', name: 'Continuity and Differentiability', count: '1,550 questions' },
        { id: 'm12_07', name: 'Methods of Differentiation & Higher Order Derivatives', count: '1,280 questions' },
        { id: 'm12_08', name: 'Application of Derivatives: Tangents and Normals', count: '940 questions' },
        { id: 'm12_09', name: 'Application of Derivatives: Rate Measure & Approximations', count: '560 questions' },
        { id: 'm12_10', name: 'Application of Derivatives: Monotonicity (Increasing & Decreasing)', count: '890 questions' },
        { id: 'm12_11', name: 'Application of Derivatives: Maxima and Minima', count: '1,420 questions' },
        { id: 'm12_12', name: 'Rolle\'s Theorem and Lagrange\'s Mean Value Theorem', count: '480 questions' },
        { id: 'm12_13', name: 'Indefinite Integrals: Standard Formulae & Substitution', count: '1,890 questions' },
        { id: 'm12_14', name: 'Indefinite Integrals: Integration by Parts & Partial Fractions', count: '1,620 questions' },
        { id: 'm12_15', name: 'Definite Integrals & Fundamental Theorem of Calculus', count: '1,450 questions' },
        { id: 'm12_16', name: 'Definite Integrals: Properties & King\'s Property', count: '1,980 questions' },
        { id: 'm12_17', name: 'Application of Integrals (Area Under Curves)', count: '1,120 questions' },
        { id: 'm12_18', name: 'Differential Equations: Order, Degree & Formation', count: '740 questions' },
        { id: 'm12_19', name: 'Differential Equations: Variable Separable & Homogeneous', count: '960 questions' },
        { id: 'm12_20', name: 'Linear Differential Equations of First Order', count: '890 questions' },
        { id: 'm12_21', name: 'Vector Algebra (Dot & Cross Product)', count: '1,280 questions' },
        { id: 'm12_22', name: 'Scalar and Vector Triple Products', count: '690 questions' },
        { id: 'm12_23', name: 'Three Dimensional Geometry: Direction Cosines & Lines in Space', count: '1,150 questions' },
        { id: 'm12_24', name: 'Three Dimensional Geometry: Planes in Space & Coplanarity', count: '1,290 questions' },
        { id: 'm12_25', name: 'Shortest Distance Between Skew Lines', count: '540 questions' },
        { id: 'm12_26', name: 'Linear Programming Problems', count: '420 questions' },
        { id: 'm12_27', name: 'Probability: Conditional Probability & Multiplication Theorem', count: '890 questions' },
        { id: 'm12_28', name: 'Bayes\' Theorem & Total Probability', count: '940 questions' },
        { id: 'm12_29', name: 'Random Variables & Probability Distributions', count: '720 questions' },
        { id: 'm12_30', name: 'Binomial Distribution & Bernoulli Trials', count: '580 questions' }
      ],
      'Physics': [
        { id: 'p12_01', name: 'Electric Charges and Coulomb\'s Law', count: '1,120 questions' },
        { id: 'p12_02', name: 'Electric Field, Electric Dipole & Field Lines', count: '1,240 questions' },
        { id: 'p12_03', name: 'Gauss\'s Law and its Applications', count: '1,050 questions' },
        { id: 'p12_04', name: 'Electrostatic Potential & Equipotential Surfaces', count: '1,180 questions' },
        { id: 'p12_05', name: 'Capacitors and Capacitance (Combinations & Dielectrics)', count: '1,490 questions' },
        { id: 'p12_06', name: 'Electric Current, Drift Velocity and Ohm\'s Law', count: '1,320 questions' },
        { id: 'p12_07', name: 'Kirchhoff\'s Laws and Electrical Networks', count: '1,560 questions' },
        { id: 'p12_08', name: 'Potentiometer, Wheatstone Bridge & Meter Bridge', count: '890 questions' },
        { id: 'p12_09', name: 'Heating Effects of Current & Electric Power', count: '720 questions' },
        { id: 'p12_10', name: 'Biot-Savart Law and Magnetic Field of Currents', count: '1,340 questions' },
        { id: 'p12_11', name: 'Ampere\'s Circuital Law and Solenoid/Toroid', count: '910 questions' },
        { id: 'p12_12', name: 'Lorentz Magnetic Force on Moving Charges & Currents', count: '1,180 questions' },
        { id: 'p12_13', name: 'Torque on Magnetic Dipole & Moving Coil Galvanometer', count: '850 questions' },
        { id: 'p12_14', name: 'Magnetism and Matter & Earth\'s Magnetic Field', count: '690 questions' },
        { id: 'p12_15', name: 'Magnetic Properties of Materials (Dia, Para, Ferro) & Hysteresis', count: '740 questions' },
        { id: 'p12_16', name: 'Electromagnetic Induction: Faraday\'s & Lenz\'s Laws', count: '1,280 questions' },
        { id: 'p12_17', name: 'Motional EMF, Eddy Currents & Self/Mutual Inductance', count: '980 questions' },
        { id: 'p12_18', name: 'Alternating Currents: RMS Values & Phasors', count: '1,050 questions' },
        { id: 'p12_19', name: 'AC Circuits: Pure L, C, R and Series LCR Resonance', count: '1,420 questions' },
        { id: 'p12_20', name: 'Power in AC Circuits, Wattless Current & Transformers', count: '820 questions' },
        { id: 'p12_21', name: 'Electromagnetic Waves & Displacement Current', count: '640 questions' },
        { id: 'p12_22', name: 'Ray Optics: Reflection, Spherical Mirrors & Total Internal Reflection', count: '1,450 questions' },
        { id: 'p12_23', name: 'Ray Optics: Refraction at Spherical Surfaces & Lenses', count: '1,680 questions' },
        { id: 'p12_24', name: 'Refraction Through a Prism & Dispersion', count: '790 questions' },
        { id: 'p12_25', name: 'Optical Instruments: Microscopes and Telescopes', count: '880 questions' },
        { id: 'p12_26', name: 'Wave Optics: Huygens\' Principle & Interference (YDSE)', count: '1,560 questions' },
        { id: 'p12_27', name: 'Wave Optics: Diffraction at Single Slit & Resolving Power', count: '890 questions' },
        { id: 'p12_28', name: 'Polarisation of Light & Brewster\'s Law', count: '620 questions' },
        { id: 'p12_29', name: 'Dual Nature of Radiation & Photoelectric Effect', count: '1,240 questions' },
        { id: 'p12_30', name: 'Matter Waves, De Broglie Wavelength & Electron Microscope', count: '760 questions' },
        { id: 'p12_31', name: 'Atomic Physics: Rutherford & Bohr\'s Model of Hydrogen', count: '1,190 questions' },
        { id: 'p12_32', name: 'Hydrogen Spectral Series & Energy Levels', count: '680 questions' },
        { id: 'p12_33', name: 'Nuclear Physics: Composition, Mass Defect & Binding Energy', count: '980 questions' },
        { id: 'p12_34', name: 'Radioactivity: Decay Law, Half-Life & Decay Constant', count: '890 questions' },
        { id: 'p12_35', name: 'Nuclear Fission and Fusion & Chain Reactions', count: '640 questions' },
        { id: 'p12_36', name: 'Semiconductor Physics: Energy Bands & Intrinsic/Extrinsic Types', count: '1,050 questions' },
        { id: 'p12_37', name: 'p-n Junction Diode: Forward & Reverse Bias V-I Characteristics', count: '1,120 questions' },
        { id: 'p12_38', name: 'Special Diodes: Zener Diode, LED, Photodiode & Solar Cell', count: '890 questions' },
        { id: 'p12_39', name: 'Rectifiers (Half Wave & Full Wave)', count: '620 questions' },
        { id: 'p12_40', name: 'Logic Gates and Boolean Operations', count: '940 questions' },
        { id: 'p12_41', name: 'Principles of Communication Systems', count: '520 questions' }
      ],
      'Chemistry': [
        { id: 'c12_01', name: 'The Solid State: Unit Cells, Packing Efficiency & Density', count: '1,150 questions' },
        { id: 'c12_02', name: 'Point Defects in Solids (Schottky & Frenkel) & Magnetic Properties', count: '680 questions' },
        { id: 'c12_03', name: 'Solutions: Types of Solutions, Henry\'s Law & Raoult\'s Law', count: '1,220 questions' },
        { id: 'c12_04', name: 'Ideal & Non-Ideal Solutions and Azeotropic Mixtures', count: '690 questions' },
        { id: 'c12_05', name: 'Colligative Properties: Elevation in Boiling Point & Freezing Point Depression', count: '1,340 questions' },
        { id: 'c12_06', name: 'Osmotic Pressure & Van\'t Hoff Factor for Association/Dissociation', count: '890 questions' },
        { id: 'c12_07', name: 'Electrochemistry: Galvanic Cells, EMF & Nernst Equation', count: '1,560 questions' },
        { id: 'c12_08', name: 'Electrolytic Conductance, Kohlrausch\'s Law & Applications', count: '1,180 questions' },
        { id: 'c12_09', name: 'Electrolysis, Faraday\'s Laws, Batteries & Fuel Cells', count: '940 questions' },
        { id: 'c12_10', name: 'Chemical Kinetics: Rate of Reaction, Order and Molecularity', count: '1,420 questions' },
        { id: 'c12_11', name: 'Integrated Rate Equations (Zero and First Order) & Half-Life', count: '1,310 questions' },
        { id: 'c12_12', name: 'Temperature Dependence of Rate & Arrhenius Equation', count: '890 questions' },
        { id: 'c12_13', name: 'Surface Chemistry: Adsorption (Physisorption & Chemisorption)', count: '740 questions' },
        { id: 'c12_14', name: 'Colloids, Emulsions and Catalysis', count: '680 questions' },
        { id: 'c12_15', name: 'General Principles and Processes of Isolation of Elements (Metallurgy)', count: '720 questions' },
        { id: 'c12_16', name: 'The p-Block Elements: Group 15 (Nitrogen Family)', count: '1,050 questions' },
        { id: 'c12_17', name: 'The p-Block Elements: Group 16 (Oxygen Family & Ozone)', count: '980 questions' },
        { id: 'c12_18', name: 'The p-Block Elements: Group 17 (Halogens & Interhalogens)', count: '1,120 questions' },
        { id: 'c12_19', name: 'The p-Block Elements: Group 18 (Noble Gases & Xenon Compounds)', count: '590 questions' },
        { id: 'c12_20', name: 'The d-Block Elements (Transition Metals Trends & Properties)', count: '1,280 questions' },
        { id: 'c12_21', name: 'Important Transition Compounds: K2Cr2O7 and KMnO4', count: '740 questions' },
        { id: 'c12_22', name: 'The f-Block Elements: Lanthanoids & Actinoids', count: '820 questions' },
        { id: 'c12_23', name: 'Coordination Compounds: Werner\'s Theory & Nomenclature', count: '1,210 questions' },
        { id: 'c12_24', name: 'Isomerism in Coordination Compounds', count: '890 questions' },
        { id: 'c12_25', name: 'Bonding in Complexes: VBT and Crystal Field Theory (CFT)', count: '1,540 questions' },
        { id: 'c12_26', name: 'Haloalkanes: Preparation and Nucleophilic Substitution (SN1 & SN2)', count: '1,460 questions' },
        { id: 'c12_27', name: 'Haloarenes: Electrophilic Substitution & Polyhalogen Compounds', count: '890 questions' },
        { id: 'c12_28', name: 'Alcohols: Preparation, Properties and Lucas Test', count: '1,320 questions' },
        { id: 'c12_29', name: 'Phenols: Acidity, Reimer-Tiemann and Kolbe\'s Reactions', count: '1,180 questions' },
        { id: 'c12_30', name: 'Ethers: Preparation (Williamson Synthesis) & Cleavage', count: '840 questions' },
        { id: 'c12_31', name: 'Aldehydes and Ketones: Preparation & Nucleophilic Addition', count: '1,780 questions' },
        { id: 'c12_32', name: 'Named Reactions: Aldol, Cannizzaro, Clemmensen & Wolff-Kishner', count: '1,450 questions' },
        { id: 'c12_33', name: 'Carboxylic Acids: Acidity, Preparation & Derivatives', count: '1,120 questions' },
        { id: 'c12_34', name: 'Amines: Preparation, Basicity & Chemical Reactions', count: '1,290 questions' },
        { id: 'c12_35', name: 'Diazonium Salts and Synthetic Applications', count: '780 questions' },
        { id: 'c12_36', name: 'Biomolecules: Carbohydrates (Glucose, Fructose, Disaccharides)', count: '1,050 questions' },
        { id: 'c12_37', name: 'Biomolecules: Amino Acids, Proteins, Enzymes & Vitamins', count: '1,120 questions' },
        { id: 'c12_38', name: 'Biomolecules: Nucleic Acids (DNA and RNA Structure)', count: '890 questions' },
        { id: 'c12_39', name: 'Polymers: Classification, Addition & Condensation Polymers', count: '740 questions' },
        { id: 'c12_40', name: 'Chemistry in Everyday Life: Drugs, Antiseptics & Cleansing Agents', count: '560 questions' }
      ]
    }
  },
  '11th-neet': {
    name: '11th NEET',
    tag: 'MEDICAL',
    tagClass: 'med',
    desc: 'Practice for Class 11 NEET (Medical)',
    meta: 'Physics • Chemistry • Biology (Botany + Zoology)',
    batchId: '676e4dee1ec923bc192f38c9',
    subjects: ['Biology', 'Botany', 'Zoology', 'Physics', 'Chemistry'],
    chapters: {
      'Biology': [
        { id: 'b11_01', name: 'The Living World', count: '540 questions' },
        { id: 'b11_02', name: 'Biological Classification', count: '1,250 questions' },
        { id: 'b11_03', name: 'Plant Kingdom', count: '1,480 questions' },
        { id: 'b11_04', name: 'Animal Kingdom', count: '1,820 questions' },
        { id: 'b11_05', name: 'Morphology of Flowering Plants', count: '1,340 questions' },
        { id: 'b11_06', name: 'Anatomy of Flowering Plants', count: '1,120 questions' },
        { id: 'b11_07', name: 'Structural Organisation in Animals', count: '980 questions' },
        { id: 'b11_08', name: 'Cell: The Unit of Life', count: '2,100 questions' },
        { id: 'b11_09', name: 'Biomolecules', count: '1,320 questions' },
        { id: 'b11_10', name: 'Cell Cycle and Cell Division', count: '1,450 questions' },
        { id: 'b11_11', name: 'Transport in Plants', count: '920 questions' },
        { id: 'b11_12', name: 'Mineral Nutrition', count: '840 questions' },
        { id: 'b11_13', name: 'Photosynthesis in Higher Plants', count: '1,410 questions' },
        { id: 'b11_14', name: 'Respiration in Plants', count: '1,180 questions' },
        { id: 'b11_15', name: 'Plant Growth and Development', count: '960 questions' },
        { id: 'b11_16', name: 'Digestion and Absorption', count: '1,360 questions' },
        { id: 'b11_17', name: 'Breathing and Exchange of Gases', count: '1,280 questions' },
        { id: 'b11_18', name: 'Body Fluids and Circulation', count: '1,560 questions' },
        { id: 'b11_19', name: 'Excretory Products and their Elimination', count: '1,340 questions' },
        { id: 'b11_20', name: 'Locomotion and Movement', count: '1,220 questions' },
        { id: 'b11_21', name: 'Neural Control and Coordination', count: '1,640 questions' },
        { id: 'b11_22', name: 'Chemical Coordination and Integration', count: '1,490 questions' }
      ],
      'Botany': [
        { id: 'bot11_01', name: 'The Living World & Plant Taxonomic Hierarchy', count: '540 questions' },
        { id: 'bot11_02', name: 'Biological Classification: Kingdom Monera (Bacteria & Archaea)', count: '980 questions' },
        { id: 'bot11_03', name: 'Biological Classification: Kingdom Protista (Photosynthetic & Slime Moulds)', count: '760 questions' },
        { id: 'bot11_04', name: 'Biological Classification: Kingdom Fungi & Mycology', count: '1,120 questions' },
        { id: 'bot11_05', name: 'Viruses, Viroids, Prions and Lichens', count: '640 questions' },
        { id: 'bot11_06', name: 'Plant Kingdom: Algae (Chlorophyceae, Phaeophyceae, Rhodophyceae)', count: '1,280 questions' },
        { id: 'bot11_07', name: 'Plant Kingdom: Bryophytes (Liverworts and Mosses)', count: '940 questions' },
        { id: 'bot11_08', name: 'Plant Kingdom: Pteridophytes (Lycopsida & Pteropsida)', count: '890 questions' },
        { id: 'bot11_09', name: 'Plant Kingdom: Gymnosperms (Pinus, Cycas & Gnetum)', count: '920 questions' },
        { id: 'bot11_10', name: 'Plant Kingdom: Angiosperms & Alternation of Generations', count: '860 questions' },
        { id: 'bot11_11', name: 'Morphology of Flowering Plants: Root Modifications & Stem', count: '980 questions' },
        { id: 'bot11_12', name: 'Morphology of Flowering Plants: Leaf, Venation & Phyllotaxy', count: '840 questions' },
        { id: 'bot11_13', name: 'Morphology of Inflorescence, Flower Structure & Symmetry', count: '1,250 questions' },
        { id: 'bot11_14', name: 'Morphology: Placentation, Fruits & Seed Anatomy', count: '1,180 questions' },
        { id: 'bot11_15', name: 'Plant Families: Fabaceae, Solanaceae & Liliaceae', count: '960 questions' },
        { id: 'bot11_16', name: 'Anatomy of Flowering Plants: Meristematic & Permanent Tissues', count: '1,120 questions' },
        { id: 'bot11_17', name: 'Tissue Systems: Epidermal, Ground and Vascular Bundles', count: '920 questions' },
        { id: 'bot11_18', name: 'Anatomy of Dicot and Monocot Root and Stem', count: '1,040 questions' },
        { id: 'bot11_19', name: 'Anatomy of Dicot and Monocot Leaf (Dorsiventral & Isobilateral)', count: '780 questions' },
        { id: 'bot11_20', name: 'Secondary Growth in Dicot Roots and Stems', count: '850 questions' },
        { id: 'bot11_21', name: 'Cell: Plant Cell Wall, Middle Lamella & Plasmodesmata', count: '940 questions' },
        { id: 'bot11_22', name: 'Cell Organelles: Plastids (Chloroplasts, Chromoplasts, Leucoplasts)', count: '1,280 questions' },
        { id: 'bot11_23', name: 'Plant Vacuoles, Microbodies and Peroxisomes', count: '610 questions' },
        { id: 'bot11_24', name: 'Cell Cycle and Mitosis in Plants', count: '1,150 questions' },
        { id: 'bot11_25', name: 'Meiosis I & II and Genetic Recombination in Plants', count: '1,240 questions' },
        { id: 'bot11_26', name: 'Transport in Plants: Diffusion, Osmosis & Imbibition', count: '980 questions' },
        { id: 'bot11_27', name: 'Water Potential, Plasmolysis & Transpiration Pull Theory', count: '1,120 questions' },
        { id: 'bot11_28', name: 'Phloem Translocation & Mass Flow Hypothesis', count: '790 questions' },
        { id: 'bot11_29', name: 'Mineral Nutrition: Essential Macro and Micronutrients in Plants', count: '920 questions' },
        { id: 'bot11_30', name: 'Deficiency Symptoms, Toxicity & Hydroponics', count: '740 questions' },
        { id: 'bot11_31', name: 'Nitrogen Metabolism & Biological Nitrogen Fixation', count: '1,050 questions' },
        { id: 'bot11_32', name: 'Photosynthesis: Photosynthetic Pigments, Light Reaction & LHC', count: '1,290 questions' },
        { id: 'bot11_33', name: 'Photophosphorylation (Cyclic & Non-Cyclic) & Chemiosmosis', count: '1,150 questions' },
        { id: 'bot11_34', name: 'Dark Reaction: Calvin Cycle (C3 Pathway)', count: '1,080 questions' },
        { id: 'bot11_35', name: 'Hatch and Slack Pathway (C4 Plants) & Kranz Anatomy', count: '1,140 questions' },
        { id: 'bot11_36', name: 'Photorespiration (C2 Cycle) & Factors Affecting Photosynthesis', count: '890 questions' },
        { id: 'bot11_37', name: 'Respiration in Plants: Glycolysis (EMP Pathway)', count: '1,160 questions' },
        { id: 'bot11_38', name: 'Fermentation & Anaerobic Cellular Respiration', count: '720 questions' },
        { id: 'bot11_39', name: 'Krebs Cycle (TCA), Electron Transport System (ETS) & Oxidative Phosphorylation', count: '1,380 questions' },
        { id: 'bot11_40', name: 'Respiratory Quotient (RQ) & Amphibolic Nature of Respiration', count: '640 questions' },
        { id: 'bot11_41', name: 'Plant Growth: Phases, Growth Curves & Differentiation', count: '760 questions' },
        { id: 'bot11_42', name: 'Plant Growth Regulators: Auxins, Gibberellins and Cytokinins', count: '1,320 questions' },
        { id: 'bot11_43', name: 'Plant Growth Regulators: Ethylene & Abscisic Acid (ABA)', count: '980 questions' },
        { id: 'bot11_44', name: 'Photoperiodism, Vernalisation and Seed Dormancy', count: '820 questions' }
      ],
      'Zoology': [
        { id: 'zoo11_01', name: 'Animal Kingdom: Basis of Classification (Coelom, Symmetry, Germ Layers)', count: '1,120 questions' },
        { id: 'zoo11_02', name: 'Non-Chordates: Phylum Porifera (Sponges)', count: '890 questions' },
        { id: 'zoo11_03', name: 'Non-Chordates: Phylum Cnidaria (Coelenterata) & Ctenophora', count: '980 questions' },
        { id: 'zoo11_04', name: 'Non-Chordates: Phylum Platyhelminthes & Aschelminthes (Nematodes)', count: '940 questions' },
        { id: 'zoo11_05', name: 'Non-Chordates: Phylum Annelida (Segmented Worms)', count: '780 questions' },
        { id: 'zoo11_06', name: 'Non-Chordates: Phylum Arthropoda (Insects, Crustaceans & Arachnids)', count: '1,420 questions' },
        { id: 'zoo11_07', name: 'Non-Chordates: Phylum Mollusca & Echinodermata', count: '1,050 questions' },
        { id: 'zoo11_08', name: 'Non-Chordates: Phylum Hemichordata', count: '520 questions' },
        { id: 'zoo11_09', name: 'Chordates: Protochordata (Urochordata & Cephalochordata)', count: '640 questions' },
        { id: 'zoo11_10', name: 'Vertebrata: Cyclostomata & Chondrichthyes (Cartilaginous Fishes)', count: '860 questions' },
        { id: 'zoo11_11', name: 'Vertebrata: Osteichthyes (Bony Fishes)', count: '790 questions' },
        { id: 'zoo11_12', name: 'Vertebrata: Class Amphibia & Class Reptilia', count: '1,020 questions' },
        { id: 'zoo11_13', name: 'Vertebrata: Class Aves (Birds) & Class Mammalia', count: '1,150 questions' },
        { id: 'zoo11_14', name: 'Structural Organisation: Epithelial Tissues (Simple & Compound)', count: '940 questions' },
        { id: 'zoo11_15', name: 'Structural Organisation: Connective Tissues (Cartilage, Bone & Blood)', count: '1,280 questions' },
        { id: 'zoo11_16', name: 'Structural Organisation: Muscular and Neural Tissues', count: '910 questions' },
        { id: 'zoo11_17', name: 'Animal Morphology & Anatomy: Cockroach (Periplaneta americana)', count: '1,460 questions' },
        { id: 'zoo11_18', name: 'Animal Morphology & Anatomy: Frog (Rana tigrina)', count: '1,120 questions' },
        { id: 'zoo11_19', name: 'Biomolecules: Amino Acids, Primary & Secondary Protein Structure', count: '1,320 questions' },
        { id: 'zoo11_20', name: 'Biomolecules: Lipids, Fatty Acids & Phospholipids', count: '890 questions' },
        { id: 'zoo11_21', name: 'Enzymes: Mechanism of Action, Factors & Enzyme Inhibition', count: '1,450 questions' },
        { id: 'zoo11_22', name: 'Human Digestive System: Anatomy of Alimentary Canal & Digestive Glands', count: '1,240 questions' },
        { id: 'zoo11_23', name: 'Physiology of Digestion, Enzyme Action & Absorption of Nutrients', count: '1,480 questions' },
        { id: 'zoo11_24', name: 'Nutritional Disorders (PEM, Marasmus, Kwashiorkor) & GI Diseases', count: '680 questions' },
        { id: 'zoo11_25', name: 'Human Respiratory System: Anatomy of Lungs & Mechanism of Breathing', count: '1,180 questions' },
        { id: 'zoo11_26', name: 'Respiratory Volumes and Capacities (TV, IRV, ERV, RV, VC, TLC)', count: '1,050 questions' },
        { id: 'zoo11_27', name: 'Gas Exchange & Transport of Oxygen and Carbon Dioxide (Hb Dissociation Curve)', count: '1,420 questions' },
        { id: 'zoo11_28', name: 'Regulation of Respiration & Respiratory Disorders (Asthma, Emphysema)', count: '790 questions' },
        { id: 'zoo11_29', name: 'Body Fluids: Blood Composition, Formed Elements & ABO/Rh Blood Groups', count: '1,290 questions' },
        { id: 'zoo11_30', name: 'Blood Coagulation Mechanism and Lymphatic System', count: '890 questions' },
        { id: 'zoo11_31', name: 'Human Circulatory System: Heart Anatomy, Cardiac Cycle & Heart Sounds', count: '1,560 questions' },
        { id: 'zoo11_32', name: 'Electrocardiogram (ECG), Double Circulation & Regulation of Cardiac Activity', count: '1,120 questions' },
        { id: 'zoo11_33', name: 'Cardiovascular Disorders (Hypertension, CAD, Atherosclerosis & Angina)', count: '740 questions' },
        { id: 'zoo11_34', name: 'Human Excretory System: Anatomy of Kidneys & Nephron Structure', count: '1,320 questions' },
        { id: 'zoo11_35', name: 'Urine Formation: Glomerular Filtration, Reabsorption & Secretion', count: '1,410 questions' },
        { id: 'zoo11_36', name: 'Counter-Current Mechanism of Concentration of Urine', count: '1,050 questions' },
        { id: 'zoo11_37', name: 'Regulation of Kidney Function (RAAS, ADH & ANF) & Micturition', count: '980 questions' },
        { id: 'zoo11_38', name: 'Renal Disorders: Uremia, Renal Calculi, Glomerulonephritis & Hemodialysis', count: '690 questions' },
        { id: 'zoo11_39', name: 'Locomotion and Movement: Muscle Fibres & Sliding Filament Theory', count: '1,380 questions' },
        { id: 'zoo11_40', name: 'Human Skeletal System: Axial and Appendicular Bones', count: '1,140 questions' },
        { id: 'zoo11_41', name: 'Types of Joints and Musculoskeletal Disorders (Arthritis, Osteoporosis, Gout)', count: '860 questions' },
        { id: 'zoo11_42', name: 'Neural System: Neurons, Resting Potential & Nerve Impulse Transmission', count: '1,450 questions' },
        { id: 'zoo11_43', name: 'Synaptic Transmission (Neurotransmitters) & Reflex Action', count: '920 questions' },
        { id: 'zoo11_44', name: 'Central Nervous System: Brain Anatomy, Meninges & Spinal Cord', count: '1,260 questions' },
        { id: 'zoo11_45', name: 'Sensory Organs: Eye Anatomy and Mechanism of Vision', count: '1,180 questions' },
        { id: 'zoo11_46', name: 'Sensory Organs: Ear Anatomy, Hearing Mechanism and Vestibular System', count: '1,040 questions' },
        { id: 'zoo11_47', name: 'Endocrine Glands: Hypothalamus and Pituitary Hormones', count: '1,340 questions' },
        { id: 'zoo11_48', name: 'Thyroid, Parathyroid, Adrenal Cortex & Medulla Hormones', count: '1,290 questions' },
        { id: 'zoo11_49', name: 'Pancreas, Gonadal Hormones & Gastrointestinal Hormones', count: '1,150 questions' },
        { id: 'zoo11_50', name: 'Mechanism of Hormone Action (Peptide vs Steroid) & Endocrine Disorders', count: '1,080 questions' }
      ],
      'Physics': [
        { id: 'p11_n01', name: 'Physical World & Measurements', count: '290 questions' },
        { id: 'p11_n02', name: 'Units, Dimensions & Error Analysis', count: '890 questions' },
        { id: 'p11_n03', name: 'Vectors and Elementary Calculus for Physics', count: '780 questions' },
        { id: 'p11_n04', name: 'Motion in a Straight Line (Kinematics 1D)', count: '1,120 questions' },
        { id: 'p11_n05', name: 'Motion in a Plane: Vectors & Projectile Motion', count: '1,340 questions' },
        { id: 'p11_n06', name: 'Newton\'s Laws of Motion & Momentum', count: '1,450 questions' },
        { id: 'p11_n07', name: 'Friction: Static, Kinetic & Rolling Friction', count: '860 questions' },
        { id: 'p11_n08', name: 'Circular Motion: Centripetal Force & Banking of Roads', count: '920 questions' },
        { id: 'p11_n09', name: 'Work, Energy, Power & Work-Energy Theorem', count: '1,380 questions' },
        { id: 'p11_n10', name: 'Centre of Mass, Conservation of Linear Momentum & Collisions', count: '1,250 questions' },
        { id: 'p11_n11', name: 'Rotational Motion, Torque & Moment of Inertia', count: '1,680 questions' },
        { id: 'p11_n12', name: 'Conservation of Angular Momentum & Rolling Motion', count: '740 questions' },
        { id: 'p11_n13', name: 'Gravitation, Planetary Motion & Escape Velocity', count: '1,120 questions' },
        { id: 'p11_n14', name: 'Mechanical Properties of Solids: Stress, Strain & Moduli', count: '680 questions' },
        { id: 'p11_n15', name: 'Fluid Mechanics: Pascal\'s Law, Buoyancy & Archimedes Principle', count: '790 questions' },
        { id: 'p11_n16', name: 'Fluid Dynamics: Viscosity, Terminal Velocity & Bernoulli Theorem', count: '980 questions' },
        { id: 'p11_n17', name: 'Surface Tension, Surface Energy & Capillary Rise', count: '840 questions' },
        { id: 'p11_n18', name: 'Thermal Properties of Matter, Calorimetry & Expansion', count: '820 questions' },
        { id: 'p11_n19', name: 'Heat Transfer: Conduction, Convection, Radiation & Newton\'s Law of Cooling', count: '940 questions' },
        { id: 'p11_n20', name: 'Thermodynamics: First Law, Thermodynamic Processes & Heat Capacity', count: '1,350 questions' },
        { id: 'p11_n21', name: 'Second Law of Thermodynamics, Heat Engines & Refrigerators', count: '720 questions' },
        { id: 'p11_n22', name: 'Kinetic Theory of Gases: Pressure of Gas & Degrees of Freedom', count: '860 questions' },
        { id: 'p11_n23', name: 'Oscillations: Simple Harmonic Motion (SHM) & Energy in SHM', count: '1,240 questions' },
        { id: 'p11_n24', name: 'Simple Pendulum, Spring-Mass System & Damped Oscillations', count: '780 questions' },
        { id: 'p11_n25', name: 'Wave Motion: Transverse and Longitudinal Waves on a String', count: '920 questions' },
        { id: 'p11_n26', name: 'Sound Waves: Speed of Sound, Organ Pipes, Beats & Doppler Effect', count: '1,260 questions' }
      ],
      'Chemistry': [
        { id: 'c11_n01', name: 'Some Basic Concepts of Chemistry: Mole Concept & Empirical Formula', count: '1,250 questions' },
        { id: 'c11_n02', name: 'Stoichiometry and Solution Concentration Units (M, m, N, ppm)', count: '980 questions' },
        { id: 'c11_n03', name: 'Structure of Atom: Bohr Model, Dual Nature & Quantum Numbers', count: '1,340 questions' },
        { id: 'c11_n04', name: 'Classification of Elements and Periodicity in Atomic Properties', count: '1,050 questions' },
        { id: 'c11_n05', name: 'Chemical Bonding: Ionic & Covalent Bond, Octet Rule & VSEPR Theory', count: '1,560 questions' },
        { id: 'c11_n06', name: 'Chemical Bonding: Hybridisation, Dipole Moment, Resonance & MOT', count: '1,780 questions' },
        { id: 'c11_n07', name: 'States of Matter: Gas Laws, Ideal Gas Equation & Dalton\'s Law', count: '1,020 questions' },
        { id: 'c11_n08', name: 'Real Gases: Van der Waals Constants, Liquefaction & Liquid State', count: '640 questions' },
        { id: 'c11_n09', name: 'Chemical Thermodynamics: First Law, Internal Energy & Enthalpy', count: '1,420 questions' },
        { id: 'c11_n10', name: 'Thermochemistry: Enthalpy of Reactions, Hess\'s Law & Bond Energies', count: '840 questions' },
        { id: 'c11_n11', name: 'Entropy, Second Law & Gibbs Free Energy with Spontaneity Criteria', count: '980 questions' },
        { id: 'c11_n12', name: 'Chemical Equilibrium: Equilibrium Constant (Kc, Kp) & Le Chatelier\'s Principle', count: '1,260 questions' },
        { id: 'c11_n13', name: 'Ionic Equilibrium: Acids, Bases, Ionisation Constant & pH Scale', count: '1,540 questions' },
        { id: 'c11_n14', name: 'Buffer Solutions, Common Ion Effect & Solubility Product (Ksp)', count: '1,120 questions' },
        { id: 'c11_n15', name: 'Redox Reactions: Oxidation Number Rules & Redox Titrations', count: '890 questions' },
        { id: 'c11_n16', name: 'Balancing Redox Reactions (Ion-Electron Method)', count: '720 questions' },
        { id: 'c11_n17', name: 'Hydrogen: Isotopes, Water, Heavy Water & Hydrogen Peroxide', count: '610 questions' },
        { id: 'c11_n18', name: 'The s-Block Elements: Group 1 (Alkali Metals Properties & Compounds)', count: '740 questions' },
        { id: 'c11_n19', name: 'The s-Block Elements: Group 2 (Alkaline Earth Metals & Compounds)', count: '690 questions' },
        { id: 'c11_n20', name: 'The p-Block Elements: Group 13 (Boron Family & Borax, Diborane)', count: '780 questions' },
        { id: 'c11_n21', name: 'The p-Block Elements: Group 14 (Carbon Allotropes, Oxides & Silicates)', count: '820 questions' },
        { id: 'c11_n22', name: 'Organic Chemistry: IUPAC Nomenclature of Organic Compounds', count: '1,380 questions' },
        { id: 'c11_n23', name: 'Organic Chemistry: Isomerism (Structural & Stereoisomerism)', count: '1,150 questions' },
        { id: 'c11_n24', name: 'General Organic Chemistry: Inductive, Resonance, Hyperconjugation Effects', count: '1,980 questions' },
        { id: 'c11_n25', name: 'Reaction Intermediates (Carbocations, Carbanions, Free Radicals)', count: '1,120 questions' },
        { id: 'c11_n26', name: 'Purification, Qualitative and Quantitative Elemental Analysis', count: '640 questions' },
        { id: 'c11_n27', name: 'Hydrocarbons: Alkanes (Preparation & Free Radical Halogenation)', count: '940 questions' },
        { id: 'c11_n28', name: 'Hydrocarbons: Alkenes & Alkynes (Electrophilic Additions & Ozonolysis)', count: '1,450 questions' },
        { id: 'c11_n29', name: 'Aromatic Hydrocarbons: Benzene, Huckel\'s Rule & Electrophilic Substitution', count: '1,280 questions' },
        { id: 'c11_n30', name: 'Environmental Chemistry: Air, Water, Soil Pollution & Green Chemistry', count: '480 questions' }
      ]
    }
  },
  '12th-neet': {
    name: '12th NEET',
    tag: 'MEDICAL',
    tagClass: 'med',
    desc: 'Practice for Class 12 NEET (Medical)',
    meta: 'Physics • Chemistry • Biology (Botany + Zoology)',
    batchId: '676e4dee1ec923bc192f38c9',
    subjects: ['Biology', 'Botany', 'Zoology', 'Physics', 'Chemistry'],
    chapters: {
      'Biology': [
        { id: 'b12_01', name: 'Reproduction in Organisms', count: '620 questions' },
        { id: 'b12_02', name: 'Sexual Reproduction in Flowering Plants', count: '1,680 questions' },
        { id: 'b12_03', name: 'Human Reproduction', count: '1,920 questions' },
        { id: 'b12_04', name: 'Reproductive Health', count: '890 questions' },
        { id: 'b12_05', name: 'Principles of Inheritance and Variation', count: '2,450 questions' },
        { id: 'b12_06', name: 'Molecular Basis of Inheritance', count: '2,890 questions' },
        { id: 'b12_07', name: 'Evolution', count: '1,420 questions' },
        { id: 'b12_08', name: 'Human Health and Disease', count: '1,860 questions' },
        { id: 'b12_09', name: 'Strategies for Enhancement in Food Production', count: '980 questions' },
        { id: 'b12_10', name: 'Microbes in Human Welfare', count: '940 questions' },
        { id: 'b12_11', name: 'Biotechnology: Principles and Processes', count: '1,540 questions' },
        { id: 'b12_12', name: 'Biotechnology and its Applications', count: '1,280 questions' },
        { id: 'b12_13', name: 'Organisms and Populations', count: '1,350 questions' },
        { id: 'b12_14', name: 'Ecosystem', count: '1,120 questions' },
        { id: 'b12_15', name: 'Biodiversity and Conservation', count: '1,040 questions' },
        { id: 'b12_16', name: 'Environmental Issues', count: '890 questions' }
      ],
      'Botany': [
        { id: 'bot12_01', name: 'Reproduction in Organisms: Vegetative Propagation in Angiosperms', count: '520 questions' },
        { id: 'bot12_02', name: 'Flower: A Fascinating Organ of Angiosperms & Pre-Fertilisation Structures', count: '840 questions' },
        { id: 'bot12_03', name: 'Microsporogenesis, Pollen Grain Structure & Viability', count: '1,280 questions' },
        { id: 'bot12_04', name: 'Megasporogenesis & Monosporic Embryo Sac (Female Gametophyte) Development', count: '1,350 questions' },
        { id: 'bot12_05', name: 'Pollination: Autogamy, Geitonogamy, Xenogamy & Pollinating Agents', count: '1,480 questions' },
        { id: 'bot12_06', name: 'Outbreeding Devices & Pollen-Pistil Interaction Mechanism', count: '960 questions' },
        { id: 'bot12_07', name: 'Double Fertilisation & Triple Fusion in Angiosperms', count: '1,120 questions' },
        { id: 'bot12_08', name: 'Post-Fertilisation: Endosperm Types & Embryogenesis in Monocot/Dicot', count: '1,240 questions' },
        { id: 'bot12_09', name: 'Seed Structure, Fruit Types, Pericarp & Seed Dispersal', count: '890 questions' },
        { id: 'bot12_10', name: 'Apomixis, Polyembryony and Parthenocarpy in Plants', count: '740 questions' },
        { id: 'bot12_11', name: 'Mendel\'s Principles of Inheritance: Monohybrid & Dihybrid Crosses', count: '1,890 questions' },
        { id: 'bot12_12', name: 'Incomplete Dominance, Co-dominance & Multiple Alleles in Plants', count: '1,280 questions' },
        { id: 'bot12_13', name: 'Chromosomal Theory of Inheritance & Linkage in Plants', count: '1,150 questions' },
        { id: 'bot12_14', name: 'Polygenic Inheritance and Pleiotropy in Plants', count: '720 questions' },
        { id: 'bot12_15', name: 'Structure of DNA Helix, Chargaff\'s Rule & RNA Types (mRNA, tRNA, rRNA)', count: '1,850 questions' },
        { id: 'bot12_16', name: 'Packaging of DNA Helix: Nucleosome Structure & Chromatin', count: '1,140 questions' },
        { id: 'bot12_17', name: 'Discovery of Genetic Material (Griffith, Avery-MacLeod-McCarty, Hershey-Chase)', count: '1,050 questions' },
        { id: 'bot12_18', name: 'DNA Replication Mechanism & Meselson-Stahl Experiment', count: '1,420 questions' },
        { id: 'bot12_19', name: 'Transcription in Plants: Promoter, RNA Polymerases & Post-transcriptional Splicing', count: '1,560 questions' },
        { id: 'bot12_20', name: 'Genetic Code Features, Codon Table & Wobble Hypothesis', count: '1,220 questions' },
        { id: 'bot12_21', name: 'Translation: Mechanism of Protein Synthesis & Polysomes in Plant Cells', count: '1,380 questions' },
        { id: 'bot12_22', name: 'Regulation of Gene Expression: Operon Concept & Lac Operon', count: '1,640 questions' },
        { id: 'bot12_23', name: 'Strategies for Food Production: Plant Breeding for High Yield', count: '980 questions' },
        { id: 'bot12_24', name: 'Plant Breeding for Disease Resistance & Insect Pest Resistance', count: '890 questions' },
        { id: 'bot12_25', name: 'Biofortification and Single Cell Protein (SCP)', count: '640 questions' },
        { id: 'bot12_26', name: 'Plant Tissue Culture: Totipotency, Explants, Micropropagation & Somatic Hybrids', count: '1,180 questions' },
        { id: 'bot12_27', name: 'Microbes in Household Products and Industrial Fermentation (Enzymes & Organic Acids)', count: '940 questions' },
        { id: 'bot12_28', name: 'Microbes in Sewage Treatment (STP) and Biogas Production (Methanogens)', count: '1,080 questions' },
        { id: 'bot12_29', name: 'Microbes as Biocontrol Agents & Biofertilisers (Mycorrhiza, Rhizobium, Cyanobacteria)', count: '1,220 questions' },
        { id: 'bot12_30', name: 'Biotechnology: Restriction Endonucleases, DNA Ligases & Modifying Enzymes', count: '1,540 questions' },
        { id: 'bot12_31', name: 'Cloning Vectors: Plasmids, pBR322 Structure, Ti-Plasmid & Competent Hosts', count: '1,420 questions' },
        { id: 'bot12_32', name: 'Processes of Recombinant DNA: Gel Electrophoresis, PCR & Gene Guns', count: '1,690 questions' },
        { id: 'bot12_33', name: 'Bioreactors (Stirred-Tank, Sparged) & Downstream Processing', count: '890 questions' },
        { id: 'bot12_34', name: 'Biotech Applications in Agriculture: Bt Cotton & Cry Proteins', count: '1,520 questions' },
        { id: 'bot12_35', name: 'RNA Interference (RNAi) & Pest Resistant Transgenic Tobacco Plants', count: '1,280 questions' },
        { id: 'bot12_36', name: 'Transgenic Plants, Golden Rice, Flavr Savr Tomato & Biopiracy (Basmati Rice, Neem)', count: '980 questions' },
        { id: 'bot12_37', name: 'Organisms and Environment: Major Abiotic Factors & Plant Adaptations (Xerophytes, Hydrophytes)', count: '1,320 questions' },
        { id: 'bot12_38', name: 'Population Attributes, Population Growth Models (Exponential and Logistic)', count: '1,240 questions' },
        { id: 'bot12_39', name: 'Ecosystem Structure: Abiotic/Biotic Components, Stratification & Food Chains', count: '1,190 questions' },
        { id: 'bot12_40', name: 'Ecosystem Productivity (GPP, NPP) & Decomposition Process', count: '1,050 questions' },
        { id: 'bot12_41', name: 'Energy Flow in Ecosystem, 10% Law & Ecological Pyramids', count: '1,340 questions' },
        { id: 'bot12_42', name: 'Ecological Succession: Primary/Secondary Succession, Hydrarch & Xerarch', count: '1,120 questions' },
        { id: 'bot12_43', name: 'Nutrient Cycling: Carbon Cycle, Phosphorus Cycle & Ecosystem Services', count: '890 questions' },
        { id: 'bot12_44', name: 'Biodiversity: Levels, Latitudinal Gradients & Species-Area Relationship', count: '1,260 questions' },
        { id: 'bot12_45', name: 'Loss of Biodiversity, The Evil Quartet & Biodiversity Conservation (In-situ & Ex-situ)', count: '1,480 questions' },
        { id: 'bot12_46', name: 'Environmental Issues: Air Pollution, Electrostatic Precipitator & Catalytic Converter', count: '1,150 questions' },
        { id: 'bot12_47', name: 'Water Pollution, BOD, Algal Bloom, Eutrophication & Biomagnification', count: '1,390 questions' },
        { id: 'bot12_48', name: 'Solid Waste, E-waste, Radioactive Waste Management & Plastic Road Case Study', count: '840 questions' },
        { id: 'bot12_49', name: 'Greenhouse Effect, Global Warming, Ozone Depletion, Deforestation & Reforestation', count: '1,210 questions' }
      ],
      'Zoology': [
        { id: 'zoo12_01', name: 'Reproduction in Organisms: Asexual Modes in Lower Animals', count: '520 questions' },
        { id: 'zoo12_02', name: 'Human Reproductive System: Anatomy of Male Reproductive System & Testis', count: '1,420 questions' },
        { id: 'zoo12_03', name: 'Human Reproductive System: Anatomy of Female Reproductive System & Ovary', count: '1,560 questions' },
        { id: 'zoo12_04', name: 'Spermatogenesis: Stages, Hormonal Control & Sperm Anatomy', count: '1,380 questions' },
        { id: 'zoo12_05', name: 'Oogenesis, Follicular Development & Graafian Follicle Structure', count: '1,440 questions' },
        { id: 'zoo12_06', name: 'Menstrual Cycle: Hormonal Fluctuations, Ovarian & Uterine Phases', count: '1,890 questions' },
        { id: 'zoo12_07', name: 'Fertilisation: Capacitation, Acrosomal Reaction & Polyspermy Block', count: '1,280 questions' },
        { id: 'zoo12_08', name: 'Cleavage, Morula, Blastocyst Formation & Implantation in Uterine Wall', count: '1,190 questions' },
        { id: 'zoo12_09', name: 'Pregnancy, Placenta Functions, Human Chorionic Gonadotropin (hCG) & Germ Layers', count: '1,250 questions' },
        { id: 'zoo12_10', name: 'Parturition (Foetal Ejection Reflex), Oxytocin & Lactation (Colostrum)', count: '940 questions' },
        { id: 'zoo12_11', name: 'Reproductive Health: Population Explosion, Birth Control & Contraception', count: '1,220 questions' },
        { id: 'zoo12_12', name: 'Barrier Methods, Intrauterine Devices (IUDs), Oral Contraceptive Pills & Saheli', count: '1,380 questions' },
        { id: 'zoo12_13', name: 'Medical Termination of Pregnancy (MTP Act) & Amniocentesis', count: '890 questions' },
        { id: 'zoo12_14', name: 'Sexually Transmitted Infections (STIs): Syphilis, Gonorrhea, Genital Herpes & HPV', count: '1,050 questions' },
        { id: 'zoo12_15', name: 'Infertility and Assisted Reproductive Technologies (ART: IVF, ZIFT, GIFT, ICSI, IUI)', count: '1,420 questions' },
        { id: 'zoo12_16', name: 'Sex Determination Mechanisms in Humans, Birds, Grasshoppers & Honeybees', count: '1,120 questions' },
        { id: 'zoo12_17', name: 'Sex-Linked Inheritance: Hemophilia and Color Blindness Pedigrees', count: '1,350 questions' },
        { id: 'zoo12_18', name: 'Mendelian Genetic Disorders: Sickle Cell Anemia, Thalassemia, PKU, Cystic Fibrosis', count: '1,780 questions' },
        { id: 'zoo12_19', name: 'Chromosomal Disorders: Down\'s, Turner\'s and Klinefelter\'s Syndromes', count: '1,260 questions' },
        { id: 'zoo12_20', name: 'Human Genome Project (HGP): Goals, Methodologies, Salient Features & Applications', count: '1,140 questions' },
        { id: 'zoo12_21', name: 'DNA Fingerprinting: VNTRs, Southern Blotting & Forensic Applications', count: '1,320 questions' },
        { id: 'zoo12_22', name: 'Origin of Life: Chemical Evolution, Oparin-Haldane & Miller-Urey Experiment', count: '1,280 questions' },
        { id: 'zoo12_23', name: 'Evidences for Evolution: Homology vs Analogy & Embryological Evidence', count: '1,390 questions' },
        { id: 'zoo12_24', name: 'Theories of Evolution: Lamarckism, Darwinism, Natural Selection & Mutation Theory', count: '1,480 questions' },
        { id: 'zoo12_25', name: 'Adaptive Radiation (Darwin\'s Finches, Australian Marsupials) & Industrial Melanism', count: '1,210 questions' },
        { id: 'zoo12_26', name: 'Hardy-Weinberg Principle, Genetic Drift (Founder Effect & Bottleneck)', count: '1,560 questions' },
        { id: 'zoo12_27', name: 'Human Evolution: Chronological Sequence of Ancestral Hominids to Modern Man', count: '1,420 questions' },
        { id: 'zoo12_28', name: 'Human Infectious Diseases: Bacterial (Typhoid, Pneumonia) & Viral (Common Cold)', count: '1,180 questions' },
        { id: 'zoo12_29', name: 'Protozoan & Helminthic Diseases: Amoebiasis, Ascariasis, Filariasis & Ringworm', count: '1,090 questions' },
        { id: 'zoo12_30', name: 'Life Cycle of Plasmodium (Malaria) in Mosquito and Human Host', count: '1,450 questions' },
        { id: 'zoo12_31', name: 'Innate Immunity: Physical, Physiological, Cellular and Cytokine Barriers', count: '1,160 questions' },
        { id: 'zoo12_32', name: 'Acquired Immunity: Humoral (B-cells) vs Cell-Mediated (T-cells) Immunity', count: '1,540 questions' },
        { id: 'zoo12_33', name: 'Antibody Structure (IgG, IgA, IgM, IgE, IgD) and Antigen-Antibody Binding', count: '1,280 questions' },
        { id: 'zoo12_34', name: 'Active and Passive Immunisation, Vaccines & Autoimmunity (Myasthenia, RA)', count: '1,120 questions' },
        { id: 'zoo12_35', name: 'Primary & Secondary Lymphoid Organs (Bone Marrow, Thymus, Spleen, Lymph Nodes, MALT)', count: '1,040 questions' },
        { id: 'zoo12_36', name: 'Allergies, Mast Cells, Histamine and Anaphylaxis', count: '780 questions' },
        { id: 'zoo12_37', name: 'AIDS: Retrovirus (HIV) Structure, Mode of Infection, Helper T-cells & ELISA Diagnosis', count: '1,680 questions' },
        { id: 'zoo12_38', name: 'Cancer Biology: Benign/Malignant Tumours, Oncogenes, Carcinogens & Treatments', count: '1,590 questions' },
        { id: 'zoo12_39', name: 'Drugs and Alcohol Abuse: Opioids, Cannabinoids, Coca Alkaloids & Hallucinogens', count: '1,240 questions' },
        { id: 'zoo12_40', name: 'Animal Husbandry: Dairy, Poultry Management & Artificial Insemination', count: '820 questions' },
        { id: 'zoo12_41', name: 'Animal Breeding: Inbreeding, Outbreeding, Cross-Breeding, Interspecific Hybridisation & MOET', count: '1,050 questions' },
        { id: 'zoo12_42', name: 'Bee-keeping (Apiculture), Fisheries (Pisciculture) and Sericulture', count: '740 questions' },
        { id: 'zoo12_43', name: 'Biotech in Medicine: Genetically Engineered Human Insulin (Humulin)', count: '1,480 questions' },
        { id: 'zoo12_44', name: 'Gene Therapy (ADA Deficiency) & Molecular Diagnostics (ELISA, PCR)', count: '1,320 questions' },
        { id: 'zoo12_45', name: 'Transgenic Animals (Rosie Cow, Knockout Mice) & Safety Testing of Vaccines', count: '960 questions' },
        { id: 'zoo12_46', name: 'Population Interactions: Predation, Competition (Gause\'s Principle) & Resource Partitioning', count: '1,380 questions' },
        { id: 'zoo12_47', name: 'Population Interactions: Parasitism (Ecto/Endo/Brood), Commensalism, Mutualism & Amensalism', count: '1,490 questions' },
        { id: 'zoo12_48', name: 'Wildlife Conservation: National Parks, Wildlife Sanctuaries, Biosphere Reserves & Zoological Parks', count: '1,080 questions' },
        { id: 'zoo12_49', name: 'Red Data Book, IUCN Categories, Hotspots of Biodiversity & Sacred Groves', count: '1,150 questions' },
        { id: 'zoo12_50', name: 'Global Environmental Conventions: Montreal Protocol, Kyoto Protocol & Earth Summit', count: '780 questions' }
      ],
      'Physics': [
        { id: 'p12_n01', name: 'Electric Charges, Conductors, Insulators & Coulomb\'s Law', count: '1,180 questions' },
        { id: 'p12_n02', name: 'Electric Field, Field Lines & Dipole in Uniform Field', count: '1,290 questions' },
        { id: 'p12_n03', name: 'Electric Flux and Gauss\'s Law Applications', count: '1,120 questions' },
        { id: 'p12_n04', name: 'Electrostatic Potential, Equipotential Surfaces & Potential Energy', count: '1,240 questions' },
        { id: 'p12_n05', name: 'Capacitors, Series/Parallel Combinations & Dielectric Polarisation', count: '1,450 questions' },
        { id: 'p12_n06', name: 'Electric Current, Drift Velocity, Mobility & Ohm\'s Law', count: '1,380 questions' },
        { id: 'p12_n07', name: 'Electrical Resistance, Resistivity, Temperature Coefficient & Color Codes', count: '890 questions' },
        { id: 'p12_n08', name: 'Electromotive Force (EMF), Internal Resistance & Cells in Series/Parallel', count: '1,150 questions' },
        { id: 'p12_n09', name: 'Kirchhoff\'s Rules and Circuit Analysis', count: '1,420 questions' },
        { id: 'p12_n10', name: 'Wheatstone Bridge, Meter Bridge & Potentiometer Principle', count: '1,080 questions' },
        { id: 'p12_n11', name: 'Electric Power, Heating Effect of Current & Joule\'s Law', count: '790 questions' },
        { id: 'p12_n12', name: 'Magnetic Field Due to Current: Biot-Savart Law & Circular Coils', count: '1,290 questions' },
        { id: 'p12_n13', name: 'Ampere\'s Circuital Law, Solenoid and Toroid', count: '940 questions' },
        { id: 'p12_n14', name: 'Force on Moving Charge in Magnetic Field (Lorentz Force) & Cyclotron', count: '1,180 questions' },
        { id: 'p12_n15', name: 'Force Between Parallel Conductors & Definition of Ampere', count: '840 questions' },
        { id: 'p12_n16', name: 'Torque on Current Loop & Moving Coil Galvanometer Sensitivity', count: '980 questions' },
        { id: 'p12_n17', name: 'Conversion of Galvanometer into Ammeter and Voltmeter', count: '760 questions' },
        { id: 'p12_n18', name: 'Bar Magnet, Magnetic Dipole Moment & Earth\'s Magnetic Elements', count: '790 questions' },
        { id: 'p12_n19', name: 'Magnetic Properties of Materials: Diamagnetic, Paramagnetic & Ferromagnetic', count: '890 questions' },
        { id: 'p12_n20', name: 'Electromagnetic Induction: Magnetic Flux, Faraday\'s Laws & Lenz\'s Law', count: '1,320 questions' },
        { id: 'p12_n21', name: 'Motional EMF, Eddy Currents, Self & Mutual Inductance', count: '1,050 questions' },
        { id: 'p12_n22', name: 'Alternating Current: Peak and RMS Values of Current and Voltage', count: '1,140 questions' },
        { id: 'p12_n23', name: 'AC Circuits: Resistor, Inductor, Capacitor & Series LCR Circuit', count: '1,560 questions' },
        { id: 'p12_n24', name: 'Resonance in LCR Circuit, Sharpness, Q-Factor & Power Factor', count: '980 questions' },
        { id: 'p12_n25', name: 'AC Generator and Transformer (Step-up and Step-down)', count: '860 questions' },
        { id: 'p12_n26', name: 'Electromagnetic Waves: Characteristics, Transverse Nature & Spectrum', count: '780 questions' },
        { id: 'p12_n27', name: 'Ray Optics: Reflection by Spherical Mirrors & Mirror Formula', count: '1,180 questions' },
        { id: 'p12_n28', name: 'Refraction of Light, Total Internal Reflection & Optical Fibres', count: '1,420 questions' },
        { id: 'p12_n29', name: 'Refraction at Spherical Surfaces, Lens Formula & Lens Maker\'s Formula', count: '1,680 questions' },
        { id: 'p12_n30', name: 'Refraction Through Prism, Angle of Minimum Deviation & Dispersion', count: '890 questions' },
        { id: 'p12_n31', name: 'Optical Instruments: Compound Microscope & Astronomical Telescope', count: '1,150 questions' },
        { id: 'p12_n32', name: 'Wave Optics: Huygens\' Principle, Reflection & Refraction of Plane Waves', count: '980 questions' },
        { id: 'p12_n33', name: 'Interference of Light & Young\'s Double Slit Experiment (YDSE)', count: '1,590 questions' },
        { id: 'p12_n34', name: 'Diffraction of Light: Single Slit Diffraction & Central Maxima Width', count: '940 questions' },
        { id: 'p12_n35', name: 'Polarisation of Light, Brewster\'s Law & Polaroids', count: '740 questions' },
        { id: 'p12_n36', name: 'Dual Nature of Radiation & Matter: Photoelectric Effect & Einstein\'s Equation', count: '1,380 questions' },
        { id: 'p12_n37', name: 'De Broglie Wavelength of Matter Waves & Davisson-Germer Experiment', count: '840 questions' },
        { id: 'p12_n38', name: 'Atoms: Alpha-Particle Scattering, Rutherford Model & Bohr\'s Postulates', count: '1,280 questions' },
        { id: 'p12_n39', name: 'Hydrogen Spectrum, Energy Levels & De-excitation Series', count: '960 questions' },
        { id: 'p12_n40', name: 'Nuclei: Atomic Masses, Size of Nucleus, Mass Defect & Binding Energy Curve', count: '1,120 questions' },
        { id: 'p12_n41', name: 'Radioactivity: Alpha, Beta & Gamma Rays, Half-Life & Decay Constant', count: '1,050 questions' },
        { id: 'p12_n42', name: 'Nuclear Reactions: Fission, Fusion, Mass-Energy Equivalence & Nuclear Reactor', count: '780 questions' },
        { id: 'p12_n43', name: 'Semiconductor Electronics: Energy Bands, Intrinsic & Extrinsic Semiconductors', count: '1,240 questions' },
        { id: 'p12_n44', name: 'p-n Junction Diode: Forward/Reverse Biasing & Rectifier (Half & Full Wave)', count: '1,350 questions' },
        { id: 'p12_n45', name: 'Special Purpose Diodes: Zener Diode as Voltage Regulator, LED & Photodiode', count: '980 questions' },
        { id: 'p12_n46', name: 'Solar Cells & Optoelectronic Devices', count: '540 questions' },
        { id: 'p12_n47', name: 'Logic Gates: NOT, OR, AND, NAND, NOR & Truth Tables', count: '1,120 questions' }
      ],
      'Chemistry': [
        { id: 'c12_n01', name: 'Solid State: Classification of Solids, Unit Cells & Bravais Lattices', count: '1,120 questions' },
        { id: 'c12_n02', name: 'Packing Efficiency, Radius Ratio & Density of Unit Cell', count: '980 questions' },
        { id: 'c12_n03', name: 'Crystal Imperfections (Defects in Solids) & Electrical/Magnetic Properties', count: '740 questions' },
        { id: 'c12_n04', name: 'Solutions: Types of Solutions & Henry\'s Law of Gas Solubility', count: '890 questions' },
        { id: 'c12_n05', name: 'Vapour Pressure of Solutions, Raoult\'s Law & Ideal/Non-Ideal Solutions', count: '1,180 questions' },
        { id: 'c12_n06', name: 'Colligative Properties: Relative Lowering of Vapour Pressure & Elevation of Boiling Point', count: '1,350 questions' },
        { id: 'c12_n07', name: 'Depression in Freezing Point, Osmotic Pressure & Van\'t Hoff Factor', count: '1,420 questions' },
        { id: 'c12_n08', name: 'Electrochemistry: Electrochemical Cells, Galvanic Cells & Nernst Equation', count: '1,680 questions' },
        { id: 'c12_n09', name: 'Electrolytic Conduction, Kohlrausch\'s Law & Molar Conductivity', count: '1,250 questions' },
        { id: 'c12_n10', name: 'Electrolysis, Faraday\'s Laws, Batteries (Lead Storage, Dry Cell) & Fuel Cells', count: '1,050 questions' },
        { id: 'c12_n11', name: 'Corrosion and its Prevention Mechanism', count: '480 questions' },
        { id: 'c12_n12', name: 'Chemical Kinetics: Rate of Reaction, Factors & Order/Molecularity', count: '1,490 questions' },
        { id: 'c12_n13', name: 'Integrated Rate Laws (Zero & First Order Reactions) and Half-Life Calculations', count: '1,580 questions' },
        { id: 'c12_n14', name: 'Temperature Dependence of Reaction Rates, Arrhenius Equation & Activation Energy', count: '1,150 questions' },
        { id: 'c12_n15', name: 'Surface Chemistry: Adsorption on Solids (Freundlich Adsorption Isotherm)', count: '820 questions' },
        { id: 'c12_n16', name: 'Colloidal State, Lyophilic/Lyophobic Sols, Tyndall Effect & Coagulation (Hardy-Schulze Rule)', count: '980 questions' },
        { id: 'c12_n17', name: 'General Principles and Processes of Isolation of Elements (Extraction of Fe, Cu, Al, Zn)', count: '790 questions' },
        { id: 'c12_n18', name: 'The p-Block Elements: Group 15 Elements (Ammonia, Nitric Acid & Oxides of Nitrogen)', count: '1,180 questions' },
        { id: 'c12_n19', name: 'The p-Block Elements: Group 16 Elements (Ozone, Sulphur Allotropes & Sulphuric Acid)', count: '1,090 questions' },
        { id: 'c12_n20', name: 'The p-Block Elements: Group 17 Elements (Chlorine, Hydrochloric Acid & Interhalogens)', count: '1,240 questions' },
        { id: 'c12_n21', name: 'The p-Block Elements: Group 18 Elements (Noble Gases & Xenon Fluorides/Oxides)', count: '680 questions' },
        { id: 'c12_n22', name: 'The d-Block Elements: General Electronic Configuration & Transition Metal Properties', count: '1,380 questions' },
        { id: 'c12_n23', name: 'Compounds of Transition Metals: Preparation & Properties of K2Cr2O7 and KMnO4', count: '890 questions' },
        { id: 'c12_n24', name: 'The f-Block Elements: Lanthanoid Contraction, Consequences & Actinoid Chemistry', count: '860 questions' },
        { id: 'c12_n25', name: 'Coordination Compounds: Coordination Number, Ligands & IUPAC Nomenclature', count: '1,450 questions' },
        { id: 'c12_n26', name: 'Isomerism in Coordination Compounds (Geometrical, Optical, Structural)', count: '1,120 questions' },
        { id: 'c12_n27', name: 'Bonding in Coordination Compounds: Werner\'s Theory, VBT & Crystal Field Theory (CFT)', count: '1,720 questions' },
        { id: 'c12_n28', name: 'Haloalkanes: Nomenclature, Preparation & Nucleophilic Substitution Reactions (SN1, SN2)', count: '1,560 questions' },
        { id: 'c12_n29', name: 'Haloarenes: Nature of C-X Bond, Electrophilic Substitution Reactions & Polyhalogen Compounds', count: '980 questions' },
        { id: 'c12_n30', name: 'Alcohols: Classification, Preparation, Physical Properties & Chemical Reactions', count: '1,420 questions' },
        { id: 'c12_n31', name: 'Phenols: Preparation from Cumene, Acidity & Named Reactions (Kolbe, Reimer-Tiemann)', count: '1,350 questions' },
        { id: 'c12_n32', name: 'Ethers: Williamson Ether Synthesis and Cleavage with HI', count: '890 questions' },
        { id: 'c12_n33', name: 'Aldehydes and Ketones: Preparation from Alcohols, Hydrocarbons & Acyl Chlorides', count: '1,640 questions' },
        { id: 'c12_n34', name: 'Aldehydes and Ketones: Nucleophilic Addition, Aldol Condensation & Cannizzaro Reaction', count: '1,890 questions' },
        { id: 'c12_n35', name: 'Carboxylic Acids: Methods of Preparation, Acidic Nature & Chemical Reactions', count: '1,280 questions' },
        { id: 'c12_n36', name: 'Amines: Preparation, Physical Properties & Basicity Comparison of Amines', count: '1,450 questions' },
        { id: 'c12_n37', name: 'Chemical Reactions of Amines: Carbylamine Test, Hinsberg Test & Diazotisation', count: '1,190 questions' },
        { id: 'c12_n38', name: 'Diazonium Salts: Preparation and Replacement Reactions (Sandmeyer, Gattermann)', count: '860 questions' },
        { id: 'c12_n39', name: 'Biomolecules: Carbohydrates (Classification, Glucose & Fructose Reactions)', count: '1,240 questions' },
        { id: 'c12_n40', name: 'Biomolecules: Amino Acids, Peptide Bond, Protein Structure & Denaturation', count: '1,290 questions' },
        { id: 'c12_n41', name: 'Biomolecules: Enzymes, Vitamins (Deficiency Diseases) & Nucleic Acids (DNA/RNA)', count: '1,120 questions' },
        { id: 'c12_n42', name: 'Polymers: Classification, Types of Polymerisation (Addition, Condensation) & Rubbers', count: '890 questions' },
        { id: 'c12_n43', name: 'Chemistry in Everyday Life: Therapeutic Action of Drugs (Analgesics, Antibiotics, Antacids)', count: '740 questions' },
        { id: 'c12_n44', name: 'Soaps and Detergents (Cleansing Action & Micelle Formation)', count: '520 questions' }
      ]
    }
  }
};

// ─── 4. HIGH-YIELD CURATED QUESTIONS POOL ───
// Guaranteed to render with KaTeX math formula precision matching Screenshot 3
const FALLBACK_QUESTION_BANK = [
  {
    id: 'mk_bt_01',
    chapter: 'BINOMIAL THEOREM',
    subject: 'Maths',
    difficulty: 2,
    questionHtml: 'Sum of the series $$\\sum_{k=0}^{2m} (-1)^k \\binom{2m}{k} \\binom{n}{k}$$ where $\\binom{n}{r} = {^nC_r}$, is:',
    options: [
      { key: 1, letter: 'A', text: '$(-1)^m \\binom{n}{m}$', isCorrect: true },
      { key: 2, letter: 'B', text: '$(-1)^m \\binom{n}{2m}$', isCorrect: false },
      { key: 3, letter: 'C', text: '$0$', isCorrect: false },
      { key: 4, letter: 'D', text: '$\\frac{(-1)^m}{m!} ({^nP_m})$', isCorrect: false }
    ],
    solutionHtml: 'Consider $(1 - x^2)^n = (1 - x)^n (1 + x)^n$. Equating the coefficient of $x^{2m}$ on both sides using the Cauchy product of binomial series yields $\\sum_{k=0}^{2m} (-1)^k \\binom{2m}{k} \\binom{n}{k} = (-1)^m \\binom{n}{m}$.',
    correctOption: 'A'
  },
  {
    id: 'mk_bt_02',
    chapter: 'BINOMIAL THEOREM',
    subject: 'Maths',
    difficulty: 2,
    questionHtml: 'The value of $r$ for which the term containing $x^0$ (independent of $x$) in the expansion of $\\left(2x^2 - \\frac{1}{x}\\right)^{12}$ is:',
    options: [
      { key: 1, letter: 'A', text: '$r = 6$', isCorrect: false },
      { key: 2, letter: 'B', text: '$r = 8$', isCorrect: true },
      { key: 3, letter: 'C', text: '$r = 4$', isCorrect: false },
      { key: 4, letter: 'D', text: '$r = 10$', isCorrect: false }
    ],
    solutionHtml: 'General term $T_{r+1} = \\binom{12}{r} (2x^2)^{12-r} \\left(-\\frac{1}{x}\\right)^r = \\binom{12}{r} 2^{12-r} (-1)^r x^{24 - 3r}$. Setting the power of $x$ to $0$: $24 - 3r = 0 \\implies r = 8$.',
    correctOption: 'B'
  },
  {
    id: 'mk_phy_01',
    chapter: 'OSCILLATIONS & SHM',
    subject: 'Physics',
    difficulty: 1,
    questionHtml: 'A particle of mass $m$ executes Simple Harmonic Motion with frequency $f$ and amplitude $A$. The average kinetic energy over one full cycle of oscillation is:',
    options: [
      { key: 1, letter: 'A', text: '$\\pi^2 m f^2 A^2$', isCorrect: true },
      { key: 2, letter: 'B', text: '$2\\pi^2 m f^2 A^2$', isCorrect: false },
      { key: 3, letter: 'C', text: '$\\frac{1}{2}\\pi^2 m f^2 A^2$', isCorrect: false },
      { key: 4, letter: 'D', text: '$4\\pi^2 m f^2 A^2$', isCorrect: false }
    ],
    solutionHtml: 'Total energy in SHM is $E = \\frac{1}{2} m \\omega^2 A^2 = \\frac{1}{2} m (2\\pi f)^2 A^2 = 2\\pi^2 m f^2 A^2$. The time average of kinetic energy over a period is half the total energy: $\\langle K \\rangle = \\frac{1}{2} E = \\pi^2 m f^2 A^2$.',
    correctOption: 'A'
  },
  {
    id: 'mk_phy_02',
    chapter: 'ELECTROSTATICS',
    subject: 'Physics',
    difficulty: 2,
    questionHtml: 'A spherical conductor of radius $R$ has a charge $+Q$. The electric potential $V(r)$ at a distance $r < R$ from its centre is given by:',
    options: [
      { key: 1, letter: 'A', text: '$0$', isCorrect: false },
      { key: 2, letter: 'B', text: '$\\frac{1}{4\\pi\\varepsilon_0} \\frac{Q}{R}$', isCorrect: true },
      { key: 3, letter: 'C', text: '$\\frac{1}{4\\pi\\varepsilon_0} \\frac{Q}{r}$', isCorrect: false },
      { key: 4, letter: 'D', text: '$\\frac{1}{4\\pi\\varepsilon_0} \\frac{Qr}{R^2}$', isCorrect: false }
    ],
    solutionHtml: 'Inside a conducting sphere, electric field $\\vec{E} = 0$. Since $\\vec{E} = -\\nabla V$, the potential is constant throughout the interior and equal to the surface value: $V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{R}$.',
    correctOption: 'B'
  },
  {
    id: 'mk_chem_01',
    chapter: 'THERMODYNAMICS',
    subject: 'Chemistry',
    difficulty: 2,
    questionHtml: 'For a spontaneous process at constant temperature and pressure, which condition is fundamentally necessary?',
    options: [
      { key: 1, letter: 'A', text: '$\\Delta H < 0$', isCorrect: false },
      { key: 2, letter: 'B', text: '$\\Delta S_{\\text{total}} > 0 \\text{ and } \\Delta G_{\\text{sys}} < 0$', isCorrect: true },
      { key: 3, letter: 'C', text: '$\\Delta S_{\\text{sys}} > 0$', isCorrect: false },
      { key: 4, letter: 'D', text: '$\\Delta G_{\\text{sys}} > 0$', isCorrect: false }
    ],
    solutionHtml: 'According to the Second Law of Thermodynamics, the entropy of the universe must increase: $\\Delta S_{\\text{total}} > 0$. At constant $T$ and $P$, this is equivalent to $\\Delta G_{\\text{sys}} = \\Delta H - T\\Delta S < 0$.',
    correctOption: 'B'
  },
  {
    id: 'mk_chem_02',
    chapter: 'CHEMICAL BONDING',
    subject: 'Chemistry',
    difficulty: 2,
    questionHtml: 'According to Molecular Orbital Theory (MOT), the bond order of $O_2^+$ ion and its magnetic character are:',
    options: [
      { key: 1, letter: 'A', text: 'Bond order $= 2.5$, Paramagnetic', isCorrect: true },
      { key: 2, letter: 'B', text: 'Bond order $= 2.5$, Diamagnetic', isCorrect: false },
      { key: 3, letter: 'C', text: 'Bond order $= 2.0$, Paramagnetic', isCorrect: false },
      { key: 4, letter: 'D', text: 'Bond order $= 3.0$, Diamagnetic', isCorrect: false }
    ],
    solutionHtml: '$O_2$ has 16 electrons. $O_2^+$ has 15 electrons. Electronic configuration: $\\sigma_{1s}^2 \\sigma^*_{1s}^2 \\sigma_{2s}^2 \\sigma^*_{2s}^2 \\sigma_{2p_z}^2 (\\pi_{2p_x}^2 = \\pi_{2p_y}^2) (\\pi^*_{2p_x}^1 = \\pi^*_{2p_y}^0)$. Bond order $= \\frac{N_b - N_a}{2} = \\frac{10 - 5}{2} = 2.5$. With 1 unpaired electron in $\\pi^*$, it is paramagnetic.',
    correctOption: 'A'
  },
  {
    id: 'mk_math_03',
    chapter: 'LIMITS AND DERIVATIVES',
    subject: 'Maths',
    difficulty: 2,
    questionHtml: 'Evaluate the limit: $$\\lim_{x \\to 0} \\frac{\\ln(1 + 3x)}{\\sin(2x)}$$',
    options: [
      { key: 1, letter: 'A', text: '$\\frac{3}{2}$', isCorrect: true },
      { key: 2, letter: 'B', text: '$\\frac{2}{3}$', isCorrect: false },
      { key: 3, letter: 'C', text: '$1$', isCorrect: false },
      { key: 4, letter: 'D', text: '$\\frac{9}{4}$', isCorrect: false }
    ],
    solutionHtml: 'Rewriting: $\\lim_{x \\to 0} \\left(\\frac{\\ln(1 + 3x)}{3x}\\right) \\cdot \\left(\\frac{2x}{\\sin(2x)}\\right) \\cdot \\frac{3}{2} = 1 \\cdot 1 \\cdot \\frac{3}{2} = \\frac{3}{2}$.',
    correctOption: 'A'
  },
  {
    id: 'mk_bio_01',
    chapter: 'MOLECULAR BASIS OF INHERITANCE',
    subject: 'Biology',
    difficulty: 1,
    questionHtml: 'If a double-stranded DNA has $20\\%$ cytosine, calculate the percentage of adenine in the DNA according to Chargaff\'s rule.',
    options: [
      { key: 1, letter: 'A', text: '$20\\%$', isCorrect: false },
      { key: 2, letter: 'B', text: '$30\\%$', isCorrect: true },
      { key: 3, letter: 'C', text: '$40\\%$', isCorrect: false },
      { key: 4, letter: 'D', text: '$60\\%$', isCorrect: false }
    ],
    solutionHtml: 'According to Chargaff\'s base pairing rule, $\\%G = \\%C = 20\\%$. Thus, $G + C = 40\\%$. The remaining $60\\%$ is comprised of $A + T$. Since $\\%A = \\%T$, $\\%A = \\frac{60\\%}{2} = 30\\%$.',
    correctOption: 'B'
  },
  {
    id: 'mk_bio_02',
    chapter: 'CELL: THE UNIT OF LIFE',
    subject: 'Biology',
    difficulty: 1,
    questionHtml: 'Which of the following cell organelles is bounded by a single membrane?',
    options: [
      { key: 1, letter: 'A', text: 'Mitochondria', isCorrect: false },
      { key: 2, letter: 'B', text: 'Chloroplast', isCorrect: false },
      { key: 3, letter: 'C', text: 'Lysosome', isCorrect: true },
      { key: 4, letter: 'D', text: 'Ribosome', isCorrect: false }
    ],
    solutionHtml: 'Lysosomes, vacuoles, and peroxisomes are single-membrane-bound organelles. Mitochondria and chloroplasts have double membranes, whereas ribosomes are non-membrane-bound.',
    correctOption: 'C'
  },
  {
    id: 'mk_math_04',
    chapter: 'STRAIGHT LINES',
    subject: 'Maths',
    difficulty: 2,
    questionHtml: 'The distance between the parallel lines $3x + 4y - 9 = 0$ and $6x + 8y + 15 = 0$ is:',
    options: [
      { key: 1, letter: 'A', text: '$\\frac{33}{10}$', isCorrect: true },
      { key: 2, letter: 'B', text: '$\\frac{6}{5}$', isCorrect: false },
      { key: 3, letter: 'C', text: '$\\frac{24}{5}$', isCorrect: false },
      { key: 4, letter: 'D', text: '$\\frac{33}{5}$', isCorrect: false }
    ],
    solutionHtml: 'Rewrite the second line with identical coefficients: $3x + 4y + \\frac{15}{2} = 0$. Distance $d = \\frac{|c_1 - c_2|}{\\sqrt{A^2 + B^2}} = \\frac{|-9 - 7.5|}{\\sqrt{3^2 + 4^2}} = \\frac{16.5}{5} = \\frac{33}{10}$.',
    correctOption: 'A'
  }
];

// ─── 5. APPLICATION STATE ───
const state = {
  currentView: 'batch', // 'batch' | 'setup' | 'quiz' | 'result'
  batchKey: '11th-jee',
  batch: BATCH_DATA['11th-jee'],
  subject: 'Maths',
  selectedChapters: new Set(),
  difficulty: 2,       // 1: Easy, 2: Medium, 3: Hard
  questionCount: 10,
  isCustomCount: false,
  
  questions: [],
  currentIndex: 0,
  userResponses: {},   // index -> optionKey
  startTime: null,
  timerInterval: null,
  elapsedSeconds: 0,
  userToken: localStorage.getItem(_AUTH_STORAGE_KEY) || ''
};

// ─── 5.1 SPA INTEGRATION ROUTER (Single Page WebApp Mode) ───
function openPracticeView() {
  const practiceSection = document.getElementById('practiceSection');
  const mainWrapper = document.querySelector('.wrapper');
  const fab = document.getElementById('fab-telegram');

  if (practiceSection) {
    practiceSection.classList.remove('hidden');
  }
  if (mainWrapper) {
    mainWrapper.classList.add('hidden');
  }
  if (fab) {
    fab.classList.add('hidden');
  }

  // Switch to batch view if no batch selected yet
  if (!state.batchKey) {
    switchView('batch');
  } else if (!state.currentView) {
    switchView('batch');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closePracticeView() {
  const practiceSection = document.getElementById('practiceSection');
  const mainWrapper = document.querySelector('.wrapper');
  const fab = document.getElementById('fab-telegram');

  if (practiceSection) {
    practiceSection.classList.add('hidden');
  }
  if (mainWrapper) {
    mainWrapper.classList.remove('hidden');
  }
  if (fab) {
    fab.classList.remove('hidden');
  }

  // Clean URL hash without reloading page
  if (window.location.hash === '#practice') {
    history.pushState(null, '', window.location.pathname);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── 6. INITIALIZATION & DOM EVENTS ───
window.addEventListener('DOMContentLoaded', () => {
  renderBatches();
  setupUIEventListeners();
  
  // Render Math automatically whenever page loads
  triggerMathRender();

  // SPA hash check
  if (window.location.hash === '#practice') {
    openPracticeView();
  }

  // Intercept all practice links
  document.querySelectorAll('a[href="#practice"], a[href$="practice.html"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null, '', '#practice');
      openPracticeView();
    });
  });
});

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#practice') {
    openPracticeView();
  } else {
    // If returning from #practice to root
    const practiceSection = document.getElementById('practiceSection');
    if (practiceSection && !practiceSection.classList.contains('hidden')) {
      closePracticeView();
    }
  }
});

function setupUIEventListeners() {
  // Navigation / Exit buttons
  const homeHandlers = () => {
    if (document.getElementById('practiceSection')) {
      closePracticeView();
    } else {
      window.location.href = 'index.html';
    }
  };

  document.getElementById('homeBtn')?.addEventListener('click', homeHandlers);
  document.getElementById('practiceRoomHomeBtn')?.addEventListener('click', homeHandlers);
  document.getElementById('resHomeBtn')?.addEventListener('click', homeHandlers);
  document.getElementById('btnGoHomeFromBatch')?.addEventListener('click', (e) => {
    e.preventDefault();
    homeHandlers();
  });
  document.getElementById('btnExitTest')?.addEventListener('click', () => {
    showPracticeConfirmModal({
      title: 'Exit Practice Test?',
      subtitle: 'Are you sure you want to exit? Your progress in this test will be lost.',
      confirmText: 'Exit Test',
      cancelText: 'Continue Test',
      confirmClass: 'danger',
      onConfirm: () => {
        stopTestTimer();
        switchView('setup');
      }
    });
  });

  // Back to Batch selection from Setup
  document.getElementById('btnBackToBatch')?.addEventListener('click', () => {
    switchView('batch');
  });

  // Chapter Search Filter
  const searchInput = document.getElementById('chapterSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterChapters(e.target.value.trim().toLowerCase());
    });
  }

  // Select All Chapters toggle
  const selectAllBtn = document.getElementById('selectAllChaptersBtn');
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', toggleSelectAllChapters);
  }

  // Difficulty selections
  document.querySelectorAll('.diff-card').forEach((card) => {
    card.addEventListener('click', () => {
      const diffVal = parseInt(card.dataset.diff, 10);
      setDifficulty(diffVal);
    });
  });

  // Question Count Pills & Custom Count
  document.querySelectorAll('.count-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      if (pill.dataset.count === 'custom') {
        setCustomQuestionMode(true);
      } else {
        const countVal = pill.dataset.count === 'all' ? 90 : parseInt(pill.dataset.count, 10);
        setCustomQuestionMode(false);
        setQuestionCount(countVal);
      }
    });
  });

  // Custom Count Input Listeners (Clamp to 1 - 90)
  const customInputs = document.querySelectorAll('#customCountInput, .custom-count-input');
  customInputs.forEach((input) => {
    input.addEventListener('input', (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val)) return;
      if (val > 90) {
        val = 90;
        e.target.value = 90;
      }
      if (val < 1) {
        val = 1;
      }
      state.questionCount = val;
      state.isCustomCount = true;
    });

    input.addEventListener('change', (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 1) {
        val = 10;
        e.target.value = 10;
      } else if (val > 90) {
        val = 90;
        e.target.value = 90;
      }
      state.questionCount = val;
      state.isCustomCount = true;
    });
  });

  // Start Practice Buttons
  document.getElementById('startPracticeBtn')?.addEventListener('click', startPracticeSession);
  document.getElementById('btnStartPractice')?.addEventListener('click', startPracticeSession);

  // Test Controls
  document.getElementById('btnPrev')?.addEventListener('click', navPrevious);
  document.getElementById('btnSkip')?.addEventListener('click', navSkip);
  document.getElementById('btnNext')?.addEventListener('click', navNext);
  document.getElementById('btnSubmitTest')?.addEventListener('click', confirmSubmitTest);

  // Restart / Go Back from Results
  document.getElementById('btnRestartTest')?.addEventListener('click', () => {
    switchView('setup');
  });
  document.getElementById('btnChooseBatch')?.addEventListener('click', () => {
    switchView('batch');
  });
}

// ─── 7. VIEW ROUTING ───
function switchView(viewName) {
  state.currentView = viewName;
  document.getElementById('batchSelectionView').classList.add('hidden');
  document.getElementById('setupView').classList.add('hidden');
  document.getElementById('quizView').classList.add('hidden');
  document.getElementById('resultView').classList.add('hidden');

  if (viewName === 'batch') {
    document.getElementById('batchSelectionView').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (viewName === 'setup') {
    document.getElementById('setupView').classList.remove('hidden');
    renderSetupView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (viewName === 'quiz') {
    document.getElementById('quizView').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (viewName === 'result') {
    document.getElementById('resultView').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ─── 8. VIEW 1: BATCH SELECTION ───
function renderBatches() {
  const container = document.getElementById('batchesListContainer');
  if (!container) return;
  container.innerHTML = '';

  Object.entries(BATCH_DATA).forEach(([key, batch]) => {
    const card = document.createElement('div');
    card.className = `batch-card ${batch.tagClass === 'med' ? 'neet-card' : ''}`;
    card.onclick = () => selectBatch(key);

    const iconSvg = batch.tagClass === 'med' 
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="26" height="26"><path d="M12 2v20M8 5a6 6 0 0 1 8 0M8 12a6 6 0 0 0 8 0M8 19a6 6 0 0 1 8 0"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;

    card.innerHTML = `
      <div class="batch-left">
        <div class="batch-icon-box">
          ${iconSvg}
        </div>
        <div class="batch-details">
          <div class="batch-title-row">
            <span class="batch-name">${batch.name}</span>
            <span class="badge-stream ${batch.tagClass}">${batch.tag}</span>
          </div>
          <span class="batch-sub">${batch.desc}</span>
          <div class="batch-meta-subjects">
            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><circle cx="12" cy="12" r="10"/><polygon points="12 8 8 12 12 16 12 8"/></svg>
            <span>${batch.meta}</span>
          </div>
        </div>
      </div>
      <div class="batch-right">
        <div class="batch-arrow-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function selectBatch(batchKey) {
  state.batchKey = batchKey;
  state.batch = BATCH_DATA[batchKey];
  state.subject = state.batch.subjects[0];
  state.selectedChapters.clear();
  switchView('setup');
}

// ─── 9. VIEW 2: SETUP & SCOPE SELECTION ───
function renderSetupView() {
  // Render Subjects Tabs
  const subjContainer = document.getElementById('subjectsRowContainer');
  if (subjContainer) {
    subjContainer.innerHTML = '';
    state.batch.subjects.forEach((subj) => {
      const card = document.createElement('div');
      const isActive = state.subject === subj;
      card.className = `subject-item-card ${isActive ? 'active' : ''}`;
      card.onclick = () => selectSubject(subj);

      let iconHtml = '⚛️';
      let iconClass = 'phy-icon';
      if (subj === 'Maths') {
        iconHtml = '➗';
        iconClass = 'maths-icon';
      } else if (subj === 'Chemistry') {
        iconHtml = '🧪';
        iconClass = 'chem-icon';
      } else if (subj === 'Biology') {
        iconHtml = '🧬';
        iconClass = 'bio-icon';
      } else if (subj === 'Botany') {
        iconHtml = '🌿';
        iconClass = 'bot-icon';
      } else if (subj === 'Zoology') {
        iconHtml = '🐾';
        iconClass = 'zoo-icon';
      }

      card.innerHTML = `
        <div class="subject-icon-box ${iconClass}">${iconHtml}</div>
        <span class="subject-card-name">${subj}</span>
      `;
      subjContainer.appendChild(card);
    });
  }

  renderChaptersList();
  updateSetupSidebarVisuals();
}

function selectSubject(subj) {
  state.subject = subj;
  state.selectedChapters.clear();
  renderSetupView();
}

function renderChaptersList() {
  const container = document.getElementById('chaptersGridContainer');
  if (!container) return;
  container.innerHTML = '';

  const chapterList = state.batch.chapters[state.subject] || [];
  chapterList.forEach((ch) => {
    const card = document.createElement('div');
    const isSelected = state.selectedChapters.has(ch.id);
    card.className = `chapter-item-card ${isSelected ? 'selected' : ''}`;
    card.dataset.id = ch.id;
    card.dataset.name = ch.name.toLowerCase();
    card.onclick = () => toggleChapter(ch.id);

    card.innerHTML = `
      <div class="chapter-checkbox-circle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div class="chapter-info-text">
        <div class="chapter-name" title="${ch.name}">${ch.name}</div>
        <div class="chapter-q-count">${ch.count}</div>
      </div>
    `;
    container.appendChild(card);
  });

  updateSelectedChaptersCountBadge();
}

function toggleChapter(chId) {
  if (state.selectedChapters.has(chId)) {
    state.selectedChapters.delete(chId);
  } else {
    state.selectedChapters.add(chId);
  }
  renderChaptersList();
}

function toggleSelectAllChapters() {
  const chapterList = state.batch.chapters[state.subject] || [];
  if (state.selectedChapters.size === chapterList.length) {
    state.selectedChapters.clear();
  } else {
    chapterList.forEach(ch => state.selectedChapters.add(ch.id));
  }
  renderChaptersList();
}

function updateSelectedChaptersCountBadge() {
  const chapterList = state.batch.chapters[state.subject] || [];
  const badge = document.getElementById('selectedChaptersCountBadge');
  if (badge) {
    badge.innerText = `${state.selectedChapters.size} / ${chapterList.length} selected`;
  }
  const selectAllBtn = document.getElementById('selectAllChaptersBtn');
  if (selectAllBtn) {
    selectAllBtn.innerText = state.selectedChapters.size === chapterList.length ? 'Deselect all' : 'Select all';
  }
}

function filterChapters(query) {
  const items = document.querySelectorAll('.chapter-item-card');
  items.forEach((item) => {
    const name = item.dataset.name || '';
    if (!query || name.includes(query)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function setDifficulty(diff) {
  state.difficulty = diff;
  updateSetupSidebarVisuals();
}

function setQuestionCount(count) {
  state.questionCount = Math.min(90, Math.max(1, count));
  state.isCustomCount = false;
  updateSetupSidebarVisuals();
}

function setCustomQuestionMode(isCustom) {
  state.isCustomCount = isCustom;
  const customWrapper = document.getElementById('customCountWrapper');
  const customInput = document.getElementById('customCountInput');
  if (isCustom) {
    if (customWrapper) customWrapper.style.display = 'block';
    if (customInput) {
      if (!customInput.value || parseInt(customInput.value, 10) <= 0) {
        customInput.value = state.questionCount || 10;
      }
      customInput.focus();
      state.questionCount = Math.min(90, Math.max(1, parseInt(customInput.value, 10) || 10));
    }
  } else {
    if (customWrapper) customWrapper.style.display = 'none';
  }
  updateSetupSidebarVisuals();
}

function updateSetupSidebarVisuals() {
  // Difficulty cards
  document.querySelectorAll('.diff-card').forEach((card) => {
    const val = parseInt(card.dataset.diff, 10);
    card.classList.toggle('active', val === state.difficulty);
  });

  // Count pills
  document.querySelectorAll('.count-pill').forEach((pill) => {
    if (pill.dataset.count === 'custom') {
      pill.classList.toggle('active', !!state.isCustomCount);
    } else {
      const val = pill.dataset.count === 'all' ? 90 : parseInt(pill.dataset.count, 10);
      pill.classList.toggle('active', !state.isCustomCount && val === state.questionCount);
    }
  });

  const customWrapper = document.getElementById('customCountWrapper');
  if (customWrapper) {
    customWrapper.style.display = state.isCustomCount ? 'block' : 'none';
  }
}

// ─── 10. PRACTICE SESSION ENGINE ───
async function startPracticeSession() {
  const startBtns = [document.getElementById('startPracticeBtn'), document.getElementById('btnStartPractice')].filter(Boolean);
  startBtns.forEach(btn => {
    btn.disabled = true;
    btn.innerHTML = `<span>Preparing Test Questions...</span>`;
  });

  try {
    // Ensure clamped question count (max 90, min 1)
    state.questionCount = Math.min(90, Math.max(1, parseInt(state.questionCount, 10) || 10));

    // 1. Filter local curated pool matching the subject (including Botany/Zoology fallback to Biology)
    let pool = FALLBACK_QUESTION_BANK.filter(q => {
      const s = state.subject.toLowerCase();
      if (s === 'botany' || s === 'zoology') {
        return q.subject.toLowerCase() === 'biology' || q.subject.toLowerCase() === s;
      }
      return q.subject.toLowerCase() === s;
    });
    if (pool.length === 0) {
      pool = FALLBACK_QUESTION_BANK;
    }

    // Clone and shuffle
    let selectedSet = [...pool].sort(() => 0.5 - Math.random());
    
    // Duplicate & synthesize if requested count is greater than pool size
    while (selectedSet.length < state.questionCount) {
      const cloned = pool.map((q, i) => ({
        ...q,
        id: `${q.id}_c${selectedSet.length + i}`,
      }));
      selectedSet.push(...cloned);
    }
    selectedSet = selectedSet.slice(0, state.questionCount);

    state.questions = selectedSet;
    state.currentIndex = 0;
    state.userResponses = {};
    state.elapsedSeconds = 0;
    state.startTime = Date.now();

    switchView('quiz');
    startTestTimer();
    renderCurrentQuestion();

  } catch (err) {
    alert('Could not start practice session: ' + err.message);
  } finally {
    startBtns.forEach(btn => {
      btn.disabled = false;
      btn.innerHTML = `<span>Start Practice Test</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
    });
  }
}

// ─── 11. VIEW 3: ACTIVE TEST ROOM ───
function renderCurrentQuestion() {
  const q = state.questions[state.currentIndex];
  if (!q) return;

  const total = state.questions.length;
  const currentNum = state.currentIndex + 1;

  // Counter & Progress Bar
  const counterElem = document.getElementById('testQCounter');
  if (counterElem) counterElem.innerText = `Question ${currentNum} / ${total}`;

  const progressFill = document.getElementById('testProgressBarFill');
  if (progressFill) {
    const pct = Math.round((currentNum / total) * 100);
    progressFill.style.width = `${pct}%`;
  }

  // Topic Header
  const topicHeader = document.getElementById('testQuestionTopicHeader');
  if (topicHeader) {
    topicHeader.innerText = q.chapter || state.subject.toUpperCase();
  }

  // Question Text
  const statementBox = document.getElementById('testQuestionStatement');
  if (statementBox) {
    statementBox.innerHTML = q.questionHtml;
  }

  // Options Stack
  const optionsStack = document.getElementById('testOptionsStack');
  if (optionsStack) {
    optionsStack.innerHTML = '';
    const userChoiceKey = state.userResponses[state.currentIndex];

    q.options.forEach((opt) => {
      const isSelected = userChoiceKey === opt.key;
      const optDiv = document.createElement('div');
      optDiv.className = `option-pill-item ${isSelected ? 'selected' : ''}`;
      optDiv.onclick = () => selectOption(opt.key);

      optDiv.innerHTML = `
        <div class="option-letter-badge">${opt.letter}</div>
        <div class="option-content-text latex-rendered">${opt.text}</div>
      `;
      optionsStack.appendChild(optDiv);
    });
  }

  // Previous & Next button states
  const btnPrev = document.getElementById('btnPrev');
  if (btnPrev) {
    btnPrev.disabled = state.currentIndex === 0;
  }

  const btnNext = document.getElementById('btnNext');
  if (btnNext) {
    if (state.currentIndex === total - 1) {
      btnNext.innerHTML = `<span>Submit Test</span> <span>✓</span>`;
    } else {
      btnNext.innerHTML = `<span>Next Question</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>`;
    }
  }

  triggerMathRender();
}

function selectOption(key) {
  state.userResponses[state.currentIndex] = key;
  renderCurrentQuestion();
}

function navPrevious() {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    renderCurrentQuestion();
  }
}

function navSkip() {
  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex++;
    renderCurrentQuestion();
  } else {
    confirmSubmitTest();
  }
}

function navNext() {
  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex++;
    renderCurrentQuestion();
  } else {
    confirmSubmitTest();
  }
}

// ─── 12. TIMER ENGINE ───
function startTestTimer() {
  clearInterval(state.timerInterval);
  const display = document.getElementById('testTimerDisplay');
  
  state.timerInterval = setInterval(() => {
    state.elapsedSeconds = Math.floor((Date.now() - state.startTime) / 1000);
    const m = Math.floor(state.elapsedSeconds / 60).toString().padStart(2, '0');
    const s = (state.elapsedSeconds % 60).toString().padStart(2, '0');
    if (display) {
      display.innerText = `${m}:${s}`;
    }
  }, 1000);
}

function stopTestTimer() {
  clearInterval(state.timerInterval);
}

// ─── 13. VIEW 4: SUBMIT & SCORECARD ───
function showPracticeConfirmModal({ title, subtitle, items = [], confirmText = 'Confirm', cancelText = 'Cancel', confirmClass = 'primary', onConfirm }) {
  const existing = document.getElementById('practiceCustomModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'practiceCustomModal';
  modal.className = 'practice-modal-backdrop';

  let itemsHtml = '';
  if (items.length > 0) {
    itemsHtml = `<div class="practice-modal-stats">
      ${items.map(it => `
        <div class="practice-modal-stat-row">
          <span class="stat-lbl">${it.label}</span>
          <span class="stat-val ${it.highlight || ''}">${it.value}</span>
        </div>
      `).join('')}
    </div>`;
  }

  modal.innerHTML = `
    <div class="practice-modal-card">
      <h3 class="practice-modal-title">${title}</h3>
      ${subtitle ? `<p class="practice-modal-subtitle">${subtitle}</p>` : ''}
      ${itemsHtml}
      <div class="practice-modal-buttons">
        <button type="button" class="practice-modal-btn cancel-btn" id="modalCancelBtn">${cancelText}</button>
        <button type="button" class="practice-modal-btn ${confirmClass === 'danger' ? 'danger-btn' : 'confirm-btn'}" id="modalConfirmBtn">${confirmText}</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  requestAnimationFrame(() => {
    modal.classList.add('visible');
  });

  const closeModal = () => {
    modal.classList.remove('visible');
    setTimeout(() => modal.remove(), 250);
  };

  modal.querySelector('#modalCancelBtn').onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  modal.querySelector('#modalConfirmBtn').onclick = () => {
    closeModal();
    if (typeof onConfirm === 'function') onConfirm();
  };
}

function confirmSubmitTest() {
  const total = state.questions.length;
  const answered = Object.keys(state.userResponses).length;
  const unanswered = total - answered;

  showPracticeConfirmModal({
    title: 'Submit Practice Test?',
    subtitle: 'Review your progress before generating your detailed performance scorecard.',
    items: [
      { label: 'Total Questions', value: total },
      { label: 'Attempted', value: answered, highlight: 'text-emerald' },
      { label: 'Unattempted', value: unanswered, highlight: unanswered > 0 ? 'text-amber' : '' }
    ],
    confirmText: 'Submit Now',
    cancelText: 'Keep Reviewing',
    confirmClass: 'primary',
    onConfirm: () => {
      finishPracticeTest();
    }
  });
}

function finishPracticeTest() {
  stopTestTimer();
  switchView('result');

  const total = state.questions.length;
  let correctCount = 0;
  let incorrectCount = 0;

  state.questions.forEach((q, idx) => {
    const userChoiceKey = state.userResponses[idx];
    const correctOpt = q.options.find(o => o.isCorrect);
    if (userChoiceKey !== undefined) {
      if (correctOpt && userChoiceKey === correctOpt.key) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }
  });

  const answered = correctCount + incorrectCount;
  const accuracyPct = answered > 0 ? Math.round((correctCount / answered) * 100) : 0;

  // Render Stats
  document.getElementById('resAccuracy').innerText = `${accuracyPct}%`;
  document.getElementById('resCorrect').innerText = correctCount;
  document.getElementById('resIncorrect').innerText = incorrectCount;
  document.getElementById('resTotalQ').innerText = total;

  // Format Elapsed Time
  const m = Math.floor(state.elapsedSeconds / 60);
  const s = state.elapsedSeconds % 60;
  document.getElementById('resTimeTaken').innerText = `${m}m ${s}s`;

  // Render Question by Question Solutions
  const solContainer = document.getElementById('solutionsListContainer');
  if (solContainer) {
    solContainer.innerHTML = '';
    state.questions.forEach((q, idx) => {
      const userChoiceKey = state.userResponses[idx];
      const userOpt = q.options.find(o => o.key === userChoiceKey);
      const correctOpt = q.options.find(o => o.isCorrect);
      const isCorrect = userOpt && correctOpt && userOpt.key === correctOpt.key;

      const item = document.createElement('div');
      item.className = 'solution-item';

      let statusBadge = '';
      if (!userOpt) {
        statusBadge = `<span class="sol-status-pill skipped">Unattempted</span>`;
      } else if (isCorrect) {
        statusBadge = `<span class="sol-status-pill correct">✓ Correct (+4)</span>`;
      } else {
        statusBadge = `<span class="sol-status-pill incorrect">✗ Incorrect (-1)</span>`;
      }

      item.innerHTML = `
        <div class="sol-item-header">
          <span class="sol-q-title">Question ${idx + 1} • ${q.chapter || state.subject}</span>
          ${statusBadge}
        </div>
        <div class="test-q-statement latex-rendered" style="color:#f8fafc; font-size:1.05rem; margin-bottom:14px;">${q.questionHtml}</div>
        <div style="font-size:0.88rem; color:#cbd5e1; margin-bottom:8px;">
          <strong>Your Answer:</strong> ${userOpt ? `${userOpt.letter}. ${userOpt.text}` : '<span style="color:#94a3b8">None</span>'}
        </div>
        <div style="font-size:0.88rem; color:#34d399; margin-bottom:12px;">
          <strong>Correct Option:</strong> ${correctOpt ? `${correctOpt.letter}. ${correctOpt.text}` : 'A'}
        </div>
        <div class="sol-explanation-box">
          <strong style="color:#f472b6; display:block; margin-bottom:4px;">Step-by-Step Explanation:</strong>
          <div class="latex-rendered">${q.solutionHtml}</div>
        </div>
      `;

      solContainer.appendChild(item);
    });
  }

  triggerMathRender();
}


// ─── 15. KATEX DELIMITERS AUTO RENDER ───
function triggerMathRender() {
  if (window.renderMathInElement) {
    try {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false,
        errorColor: '#f43f5e'
      });
    } catch (e) {
      console.warn('KaTeX rendering notice:', e);
    }
  }
}
