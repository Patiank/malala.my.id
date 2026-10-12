import React from 'react';

/**
 * MINANGKABAU CULTURAL & TOURISM SVG ICON SUITE
 * 
 * Styled in "Chubby Filled-Outline Vector" aesthetic:
 * - Bold rounded outline (strokeWidth 2 to 2.5, round caps and joins)
 * - Authentic Minangkabau Marawa color palette (Hitam, Merah, Kuning Emas, Hijau Zamrud, Terracotta)
 * - Playful, friendly, and culturally accurate shapes
 */

export interface MinangIconProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

// 1. RUMAH GADANG (Traditional Minangkabau Ancestral House with Gonjong Curved Roofs)
export const IconRumahGadang: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Rumah Gadang"
  >
    {/* Foundation Stilts */}
    <rect x="14" y="50" width="4" height="8" rx="1.5" fill="#78350F" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
    <rect x="23" y="50" width="4" height="8" rx="1.5" fill="#78350F" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
    <rect x="37" y="50" width="4" height="8" rx="1.5" fill="#78350F" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
    <rect x="46" y="50" width="4" height="8" rx="1.5" fill="#78350F" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
    {/* Ground Base */}
    <path d="M8 58H56" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

    {/* Main Wooden Body / Rumah Banjar */}
    <path
      d="M14 36H50L47 50H17L14 36Z"
      fill="#B45309"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Wood Carving Patterns on Wall (Ukiran Minang) */}
    <path d="M19 43H45" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" />
    <circle cx="24" cy="40" r="2" fill="#FEF3C7" stroke="#1E293B" strokeWidth="1.2" />
    <circle cx="40" cy="40" r="2" fill="#FEF3C7" stroke="#1E293B" strokeWidth="1.2" />
    <rect x="29" y="41" width="6" height="9" rx="1" fill="#DC2626" stroke="#1E293B" strokeWidth="1.5" />

    {/* Front Entrance Stairs (Tanggo) */}
    <path d="M28 50H36V58H28V50Z" fill="#FBBF24" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
    <line x1="28" y1="54" x2="36" y2="54" stroke="#1E293B" strokeWidth="1.5" />

    {/* Sweeping Gonjong Roof (Buffalo Horn Silhouette) */}
    <path
      d="M3 24C9 23 15 29 18 36H46C49 29 55 23 61 24C53 16 46 22 41 27C37 18 34 13 32 10C30 13 27 18 23 27C18 22 11 16 3 24Z"
      fill="#DC2626"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    {/* Golden Gonjong Crest & Ridge Highlights */}
    <path d="M32 10V20" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="32" cy="9" r="2" fill="#FBBF24" stroke="#1E293B" strokeWidth="1.5" />
    <circle cx="3" cy="23" r="1.5" fill="#FBBF24" stroke="#1E293B" strokeWidth="1.2" />
    <circle cx="61" cy="23" r="1.5" fill="#FBBF24" stroke="#1E293B" strokeWidth="1.2" />

    {/* Roof Shingle Texture */}
    <path d="M22 30C28 32 36 32 42 30" stroke="#991B1B" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 2. JAM GADANG (Iconic Bukittinggi Clock Tower with Gonjong Crown)
export const IconJamGadang: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Jam Gadang Bukittinggi"
  >
    {/* Base Plinth */}
    <rect x="18" y="55" width="28" height="5" rx="1.5" fill="#64748B" stroke="#1E293B" strokeWidth="2.2" strokeLinejoin="round" />
    <rect x="21" y="51" width="22" height="4" rx="1" fill="#94A3B8" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />

    {/* Main White Tower Body */}
    <path d="M23 28H41L42 51H22L23 28Z" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Arched Observation Balcony */}
    <path d="M28 41H36V47H28V41Z" fill="#1E293B" stroke="#1E293B" strokeWidth="1.5" />
    <path d="M28 41C28 39 36 39 36 41" fill="#1E293B" />

    {/* Clock Section Top Box */}
    <rect x="21" y="24" width="22" height="8" rx="1.5" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.2" strokeLinejoin="round" />

    {/* Clock Face Dial */}
    <circle cx="32" cy="34" r="6" fill="#FEF08A" stroke="#1E293B" strokeWidth="2" />
    {/* Clock Hands showing ~ 10:10 */}
    <line x1="32" y1="34" x2="32" y2="30.5" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="32" y1="34" x2="35" y2="34" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
    {/* Roman IIII marker dot */}
    <circle cx="36" cy="35" r="0.6" fill="#B45309" />

    {/* Gonjong Crown on Top */}
    <path
      d="M13 18C17 18 22 21 24 24H40C42 21 47 18 51 18C46 12 41 16 38 19C35 13 33 9 32 7C31 9 29 13 26 19C23 16 18 12 13 18Z"
      fill="#DC2626"
      stroke="#1E293B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="6" r="1.5" fill="#FBBF24" stroke="#1E293B" strokeWidth="1.2" />
    <circle cx="13" cy="17" r="1" fill="#FBBF24" stroke="#1E293B" strokeWidth="1" />
    <circle cx="51" cy="17" r="1" fill="#FBBF24" stroke="#1E293B" strokeWidth="1" />
  </svg>
);

// 3. RENDANG DAGING (World Famous Minang Caramelized Beef Curry)
export const IconRendang: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Rendang Minangkabau"
  >
    {/* Steam Swirls */}
    <path d="M24 14C23 11 25 9 27 7" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 2" />
    <path d="M33 13C32 9 35 7 37 5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 2" />
    <path d="M42 14C41 11 43 9 45 7" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 2" />

    {/* Traditional Clay Serving Pot / Belanga */}
    <ellipse cx="32" cy="53" rx="16" ry="3" fill="#D97706" opacity="0.3" />
    <path
      d="M12 32C12 45 20 54 32 54C44 54 52 45 52 32H12Z"
      fill="#78350F"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Pot Rim */}
    <ellipse cx="32" cy="32" rx="21" ry="6" fill="#92400E" stroke="#1E293B" strokeWidth="2.5" />

    {/* Savory Dark Caramelized Rendang Gravy Surface */}
    <ellipse cx="32" cy="32" rx="18" ry="4.5" fill="#451A03" />

    {/* Chunks of Tender Beef (Daging Rendang Empuk) */}
    <path
      d="M20 30C19 25 25 23 29 26C31 28 29 32 25 32C22 32 20 31 20 30Z"
      fill="#78350F"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M33 28C32 24 38 22 43 25C45 28 42 32 38 32C35 32 33 30 33 28Z"
      fill="#592308"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="28" cy="27" r="1.5" fill="#B45309" />
    <circle cx="39" cy="27" r="1.5" fill="#B45309" />

    {/* Red Chili Curl & Green Herb Leaf Garnish */}
    <path
      d="M27 22C30 20 36 21 34 25"
      stroke="#DC2626"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Turmeric / Kaffir Leaf */}
    <path
      d="M36 21C39 19 41 21 40 23C38 24 36 23 36 21Z"
      fill="#16A34A"
      stroke="#1E293B"
      strokeWidth="1.2"
    />

    {/* Pot Side Handles */}
    <path d="M12 33C9 33 8 36 8 38C8 40 10 41 13 41" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M52 33C55 33 56 36 56 38C56 40 54 41 51 41" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 4. MARAWA MINANGKABAU (Sacred Tricolor Flag: Hitam, Merah, Kuning)
export const IconMarawa: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Marawa Minangkabau"
  >
    {/* Pole Base */}
    <ellipse cx="16" cy="56" rx="6" ry="2.5" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
    {/* Flagpole */}
    <line x1="16" y1="8" x2="16" y2="56" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    {/* Golden Finial Cap */}
    <circle cx="16" cy="7" r="3" fill="#FBBF24" stroke="#1E293B" strokeWidth="2" />

    {/* The Authentic 3 Stripes of Marawa Minangkabau */}
    {/* 1. Hitam (Black - Luhak 50 Kota) */}
    <path
      d="M16 11C24 9 32 14 42 12C47 11 52 10 56 12V22C52 20 47 21 42 22C32 24 24 19 16 21V11Z"
      fill="#18181B"
      stroke="#1E293B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* 2. Merah (Red - Luhak Agam) */}
    <path
      d="M16 21C24 19 32 24 42 22C47 21 52 20 56 22V33C52 31 47 32 42 33C32 35 24 30 16 32V21Z"
      fill="#DC2626"
      stroke="#1E293B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* 3. Kuning Emas (Yellow - Luhak Tanah Datar) */}
    <path
      d="M16 32C24 30 32 35 42 33C47 32 52 31 56 33V44C52 42 47 43 42 44C32 46 24 41 16 43V32Z"
      fill="#FBBF24"
      stroke="#1E293B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />

    {/* Wind Flutter Shine Highlights */}
    <path d="M28 14C33 16 38 16 43 14" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    <path d="M28 25C33 27 38 27 43 25" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
    <path d="M28 36C33 38 38 38 43 36" stroke="#FEF08A" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// 5. CARANO (Traditional Brass Ceremonial Betel Box for Guest Welcoming)
export const IconCarano: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Carano Sirih Adat Minangkabau"
  >
    {/* Embroidered Dalamaq Cloth draped below */}
    <path
      d="M14 48L11 56H53L50 48H14Z"
      fill="#DC2626"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M16 52H48" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 2" />

    {/* Broad Flared Brass Pedestal Foot */}
    <path
      d="M20 46H44L41 52H23L20 46Z"
      fill="#D97706"
      stroke="#1E293B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Stem Column */}
    <rect x="29" y="38" width="6" height="8" rx="1" fill="#FBBF24" stroke="#1E293B" strokeWidth="2" />

    {/* Golden Carano Bowl Body */}
    <path
      d="M12 28C12 38 22 40 32 40C42 40 52 38 52 28H12Z"
      fill="#F59E0B"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <ellipse cx="32" cy="28" rx="20" ry="5.5" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.2" />

    {/* Betel Leaves Array (Sirih Pinang) arranged elegantly inside */}
    <path
      d="M23 26C21 21 24 16 28 14C30 18 29 23 27 26H23Z"
      fill="#15803D"
      stroke="#1E293B"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M32 26C31 20 33 13 37 11C39 16 38 22 36 26H32Z"
      fill="#16A34A"
      stroke="#1E293B"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M41 26C43 21 40 16 36 14C34 18 35 23 37 26H41Z"
      fill="#15803D"
      stroke="#1E293B"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />

    {/* Golden Areca Nut & Gambier (Pinang & Gambir) */}
    <circle cx="32" cy="27" r="2.5" fill="#D97706" stroke="#1E293B" strokeWidth="1.5" />
    <circle cx="28" cy="28" r="1.8" fill="#B45309" stroke="#1E293B" strokeWidth="1.2" />
    <circle cx="36" cy="28" r="1.8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.2" />
  </svg>
);

// 6. TARI PIRING (Traditional Plate Dancer with Golden Suntiang Headpiece)
export const IconTariPiring: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Tari Piring Minangkabau"
  >
    {/* Golden Suntiang Headpiece (Tiered Crowns) */}
    <path
      d="M20 22C20 13 25 8 32 6C39 8 44 13 44 22H20Z"
      fill="#FBBF24"
      stroke="#1E293B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M24 16C28 13 36 13 40 16" stroke="#D97706" strokeWidth="1.5" />
    <circle cx="32" cy="5" r="2" fill="#DC2626" stroke="#1E293B" strokeWidth="1.2" />
    <circle cx="24" cy="8" r="1.2" fill="#DC2626" />
    <circle cx="40" cy="8" r="1.2" fill="#DC2626" />

    {/* Face & Traditional Neckline */}
    <circle cx="32" cy="24" r="5" fill="#FED7AA" stroke="#1E293B" strokeWidth="2" />
    {/* Body / Baju Kurung Minang */}
    <path
      d="M23 29H41L45 52H19L23 29Z"
      fill="#DC2626"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Gold Waist Sash (Salempang Songket) */}
    <path d="M24 30L39 45" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />

    {/* Left Arm & Dancing Plate (Piring Kiri) */}
    <path d="M23 34L14 36" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="12" cy="37" rx="8" ry="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
    <ellipse cx="12" cy="37" rx="4.5" ry="2" fill="#F1F5F9" stroke="#38BDF8" strokeWidth="1.2" />

    {/* Right Arm & Dancing Plate (Piring Kanan) */}
    <path d="M41 34L50 36" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="52" cy="37" rx="8" ry="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
    <ellipse cx="52" cy="37" rx="4.5" ry="2" fill="#F1F5F9" stroke="#38BDF8" strokeWidth="1.2" />

    {/* Skirt Base (Kain Songket Bawah) */}
    <rect x="22" y="52" width="20" height="4" rx="1" fill="#78350F" stroke="#1E293B" strokeWidth="2" />
  </svg>
);

// 7. SONGKET MINANG (Woven Textile with Golden Itiak Pulang Patang & Pucuak Rabuang)
export const IconSongket: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Tenun Songket Pandai Sikek"
  >
    {/* Rich Silk Fabric Base */}
    <rect
      x="10"
      y="12"
      width="44"
      height="40"
      rx="4"
      fill="#881337"
      stroke="#1E293B"
      strokeWidth="2.5"
    />
    {/* Golden Border Weave */}
    <rect x="14" y="16" width="36" height="32" rx="2" stroke="#FBBF24" strokeWidth="1.8" strokeDasharray="2 2" />

    {/* Center Geometric Songket Motif: Diamond Rhombus (Sajamba / Itiak Pulang Patang) */}
    <path
      d="M32 20L42 32L32 44L22 32L32 20Z"
      fill="#FBBF24"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M32 26L37 32L32 38L27 32L32 26Z"
      fill="#DC2626"
      stroke="#1E293B"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Corner Motifs (Pucuak Rabuang) */}
    <path d="M16 18L21 23M16 23L21 18" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M48 18L43 23M48 23L43 18" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 46L21 41M16 41L21 46" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M48 46L43 41M48 41L43 46" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />

    {/* Traditional Tassel Fringe at Bottom */}
    <line x1="14" y1="52" x2="14" y2="57" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="52" x2="20" y2="57" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    <line x1="26" y1="52" x2="26" y2="57" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="52" x2="32" y2="57" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="52" x2="38" y2="57" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    <line x1="44" y1="52" x2="44" y2="57" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    <line x1="50" y1="52" x2="50" y2="57" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 8. SALUANG & TALEMPONG (Minangkabau Traditional Musical Ensemble)
export const IconSaluang: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Saluang dan Talempong Minang"
  >
    {/* Musical Notes in Air */}
    <path d="M12 14C12 11 16 11 16 14V21" stroke="#DC2626" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="21" r="2.5" fill="#DC2626" />
    <path d="M49 9C49 7 53 7 53 9V15" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="49" cy="15" r="2" fill="#F59E0B" />

    {/* Slanted Bamboo Flute (Saluang) */}
    <g transform="rotate(35 32 32)">
      {/* Bamboo Tube */}
      <rect x="29" y="8" width="6" height="48" rx="2.5" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.2" />
      {/* Bamboo Nodes */}
      <line x1="29" y1="18" x2="35" y2="18" stroke="#B45309" strokeWidth="1.8" />
      <line x1="29" y1="32" x2="35" y2="32" stroke="#B45309" strokeWidth="1.8" />
      <line x1="29" y1="46" x2="35" y2="46" stroke="#B45309" strokeWidth="1.8" />
      {/* 4 Tone Holes */}
      <circle cx="32" cy="24" r="1.2" fill="#1E293B" />
      <circle cx="32" cy="28" r="1.2" fill="#1E293B" />
      <circle cx="32" cy="38" r="1.2" fill="#1E293B" />
      <circle cx="32" cy="42" r="1.2" fill="#1E293B" />
    </g>

    {/* Talempong (Brass Kettle Gong) */}
    <ellipse cx="22" cy="45" rx="14" ry="7" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.2" />
    <ellipse cx="22" cy="43" rx="12" ry="5.5" fill="#FBBF24" stroke="#1E293B" strokeWidth="1.8" />
    {/* Center Knob (Pencu Talempong) */}
    <circle cx="22" cy="42" r="3" fill="#D97706" stroke="#1E293B" strokeWidth="1.8" />
  </svg>
);

// 9. PACU JAWI (Traditional Mud Cow Racing of Tanah Datar)
export const IconPacuJawi: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Pacu Jawi Tanah Datar"
  >
    {/* Mud / Water Splashes (Cipratan Lumpur) */}
    <ellipse cx="32" cy="54" rx="24" ry="4" fill="#78350F" opacity="0.25" />
    <path d="M10 50C12 45 15 47 14 52" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M22 52C24 46 27 49 26 54" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M42 52C44 46 47 49 46 54" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M54 50C52 45 49 47 50 52" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" />

    {/* Wooden Yoke Harness (Singguluang Kayu) */}
    <path d="M16 28C24 25 40 25 48 28" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M16 28C24 25 40 25 48 28" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

    {/* Left Bull (Jawi Kiri) */}
    <circle cx="21" cy="35" r="9" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.2" />
    {/* Horns */}
    <path d="M16 28C13 24 15 20 18 22" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M26 28C29 24 27 20 24 22" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Snout & Eyes */}
    <ellipse cx="21" cy="38" rx="4.5" ry="3" fill="#FED7AA" stroke="#1E293B" strokeWidth="1.5" />
    <circle cx="18" cy="33" r="1.2" fill="#1E293B" />
    <circle cx="24" cy="33" r="1.2" fill="#1E293B" />

    {/* Right Bull (Jawi Kanan) */}
    <circle cx="43" cy="35" r="9" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2.2" />
    {/* Horns */}
    <path d="M38 28C35 24 37 20 40 22" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M48 28C51 24 49 20 46 22" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Snout & Eyes */}
    <ellipse cx="43" cy="38" rx="4.5" ry="3" fill="#FED7AA" stroke="#1E293B" strokeWidth="1.5" />
    <circle cx="40" cy="33" r="1.2" fill="#1E293B" />
    <circle cx="46" cy="33" r="1.2" fill="#1E293B" />

    {/* Jockey Grip Center Handle */}
    <rect x="30" y="23" width="4" height="12" rx="1.5" fill="#DC2626" stroke="#1E293B" strokeWidth="2" />
  </svg>
);

// 10. KELOK 9 (Iconic Multi-Tier Flyover Bridge in Limapuluh Kota)
export const IconKelok9: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Jembatan Kelok Sembilan"
  >
    {/* Lush Green Mountain Valley Background */}
    <path
      d="M4 42C12 28 20 30 28 40C36 32 46 30 60 44V56H4V42Z"
      fill="#15803D"
      stroke="#1E293B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M12 28L20 40M44 30L52 44" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />

    {/* Concrete Bridge Support Pillars */}
    <rect x="18" y="34" width="4" height="18" rx="1" fill="#94A3B8" stroke="#1E293B" strokeWidth="1.8" />
    <rect x="34" y="30" width="4" height="22" rx="1" fill="#94A3B8" stroke="#1E293B" strokeWidth="1.8" />
    <rect x="46" y="32" width="4" height="20" rx="1" fill="#94A3B8" stroke="#1E293B" strokeWidth="1.8" />

    {/* Upper Serpentine Viaduct Curve (Jembatan Atas) */}
    <path
      d="M6 36C18 24 30 24 44 32C52 36 58 35 62 33"
      stroke="#334155"
      strokeWidth="7"
      strokeLinecap="round"
    />
    <path
      d="M6 36C18 24 30 24 44 32C52 36 58 35 62 33"
      stroke="#F8FAFC"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Road Marking Dashes */}
    <path
      d="M10 33C20 26 30 26 42 33"
      stroke="#F59E0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="2 3"
    />

    {/* Lower Highway Loop Curve (Kelokan Bawah) */}
    <path
      d="M4 48C18 42 34 50 48 46C54 44 58 41 60 39"
      stroke="#1E293B"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M4 48C18 42 34 50 48 46C54 44 58 41 60 39"
      stroke="#CBD5E1"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
  </svg>
);

// 11. DANAU SINGKARAK & ALAM (Serene Highland Lake & Traditional Boat)
export const IconDanauSingkarak: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Danau Singkarak & Maninjau"
  >
    {/* Rising Sun */}
    <circle cx="32" cy="24" r="8" fill="#FBBF24" stroke="#1E293B" strokeWidth="2" />
    <line x1="32" y1="12" x2="32" y2="15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="17" x2="24" y2="19" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="42" y1="17" x2="40" y2="19" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

    {/* Twin Mountain Ranges (Bukit Barisan) */}
    <path
      d="M4 36L18 20L34 36L48 22L60 36V56H4V36Z"
      fill="#059669"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Distant Mountain Peak Highlight */}
    <path d="M18 20L15 25M48 22L45 27" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />

    {/* Water Basin / Lake (Permukaan Danau) */}
    <path
      d="M4 38H60V56H4V38Z"
      fill="#0284C7"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Gentle Ripples */}
    <path d="M10 44H24M38 44H54" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 50H46" stroke="#BAE6FD" strokeWidth="1.8" strokeLinecap="round" />

    {/* Traditional Wooden Canoe (Biduak Minang) */}
    <path
      d="M23 44C23 44 26 48 35 48C44 48 47 44 47 44L44 42H26L23 44Z"
      fill="#78350F"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Paddle */}
    <line x1="33" y1="39" x2="37" y2="47" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 12. SATE PADANG (Skewers of Savory Beef Drizzled in Golden Curry)
export const IconSatePadang: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Sate Padang"
  >
    {/* Banana Leaf Base Plate (Daun Pisang) */}
    <ellipse cx="32" cy="46" rx="24" ry="10" fill="#15803D" stroke="#1E293B" strokeWidth="2.5" />
    <path d="M12 46C22 47 42 47 52 46" stroke="#16A34A" strokeWidth="1.5" />

    {/* Rice Cake Cubes (Ketupat Potong) */}
    <rect x="18" y="40" width="8" height="8" rx="1.5" fill="#FEF08A" stroke="#1E293B" strokeWidth="1.8" />
    <rect x="24" y="38" width="8" height="8" rx="1.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />

    {/* 3 Bamboo Skewers Slanted */}
    <line x1="16" y1="12" x2="36" y2="48" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
    <line x1="26" y1="9" x2="42" y2="48" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
    <line x1="36" y1="12" x2="48" y2="48" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />

    {/* Meat Chunks (Daging Sate) */}
    <circle cx="21" cy="21" r="4" fill="#78350F" stroke="#1E293B" strokeWidth="1.8" />
    <circle cx="26" cy="29" r="4.2" fill="#592308" stroke="#1E293B" strokeWidth="1.8" />
    <circle cx="31" cy="18" r="4" fill="#78350F" stroke="#1E293B" strokeWidth="1.8" />
    <circle cx="35" cy="26" r="4.2" fill="#592308" stroke="#1E293B" strokeWidth="1.8" />
    <circle cx="41" cy="21" r="4" fill="#78350F" stroke="#1E293B" strokeWidth="1.8" />

    {/* Thick Golden Curry Sauce Drizzle (Kuah Kuning Kental Sate Padang) */}
    <path
      d="M20 32C24 30 32 30 46 34C44 42 36 44 26 43C22 41 20 36 20 32Z"
      fill="#FBBF24"
      stroke="#1E293B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Crispy Fried Shallots Sprinkles (Bawang Goreng) */}
    <circle cx="30" cy="35" r="1.2" fill="#B45309" />
    <circle cx="36" cy="36" r="1.2" fill="#B45309" />
    <circle cx="40" cy="34" r="1.2" fill="#B45309" />
    <circle cx="26" cy="38" r="1.2" fill="#B45309" />
  </svg>
);

// 13. TABUIK PARIAMAN (Majestic Festival Effigy of Pariaman Coastal Heritage)
export const IconTabuik: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Pesta Budaya Tabuik Pariaman"
  >
    {/* Base Carrying Litter (Usungan Tabuik) */}
    <rect x="12" y="52" width="40" height="4" rx="1.5" fill="#78350F" stroke="#1E293B" strokeWidth="2.2" />
    <line x1="8" y1="54" x2="56" y2="54" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

    {/* Lower Tier: Mythical Buraq Body */}
    <ellipse cx="32" cy="45" rx="12" ry="7" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2.2" />
    <path d="M22 45C22 40 26 38 29 42" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
    <path d="M42 45C42 40 38 38 35 42" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />

    {/* Middle Tier: Decorative Wooden Drum Pagoda */}
    <path d="M25 32H39L42 41H22L25 32Z" fill="#DC2626" stroke="#1E293B" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M27 22H37L39 32H25L27 22Z" fill="#FBBF24" stroke="#1E293B" strokeWidth="2.2" strokeLinejoin="round" />

    {/* Upper Tier: Umbrella Dome & Finial (Payung Tabuik) */}
    <path
      d="M20 22C20 14 26 10 32 10C38 10 44 14 44 22H20Z"
      fill="#059669"
      stroke="#1E293B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <line x1="32" y1="5" x2="32" y2="10" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="32" cy="5" r="2" fill="#FBBF24" stroke="#1E293B" strokeWidth="1.5" />

    {/* Colorful Pennants / Bunting Streamers */}
    <path d="M16 26L20 22" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <path d="M48 26L44 22" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 14. AIR TERJUN LEMBAH ANAI (Iconic Natural Waterfall at Bukit Barisan Gorge)
export const IconAirTerjunLembahAnai: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Air Terjun Lembah Anai"
  >
    {/* Rocky Canyon Flanks */}
    <path
      d="M4 14C12 16 18 24 20 54H4V14Z"
      fill="#475569"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M60 14C52 16 46 24 44 54H60V14Z"
      fill="#334155"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    {/* Green Tropical Moss & Ferns */}
    <path d="M6 18C12 18 14 26 12 32" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M58 18C52 18 50 26 52 32" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />

    {/* Historic Railway Viaduct Arch overhead */}
    <path d="M18 16C24 12 40 12 46 16" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
    <path d="M18 16C24 12 40 12 46 16" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

    {/* Cascading Waterfall Streams */}
    <path
      d="M26 15C26 26 25 40 22 52H42C39 40 38 26 38 15H26Z"
      fill="#38BDF8"
      stroke="#1E293B"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M29 20V46" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M35 20V46" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

    {/* Plunge Pool & Misty Splash (Kolam Tampungan) */}
    <ellipse cx="32" cy="53" rx="18" ry="5" fill="#0284C7" stroke="#1E293B" strokeWidth="2.2" />
    <circle cx="27" cy="50" r="1.5" fill="#FFFFFF" />
    <circle cx="37" cy="50" r="1.5" fill="#FFFFFF" />
  </svg>
);

// 15. KOPI KAWA DAUN (Traditional Coffee Leaf Brew Served in Coconut Sayak)
export const IconKopiKawaDaun: React.FC<MinangIconProps> = ({ size = 28, className = '', style }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    style={style}
    aria-label="Kopi Kawa Daun Minang"
  >
    {/* Steam Swirls */}
    <path d="M28 15C27 11 30 9 30 6" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <path d="M36 15C35 11 38 9 38 6" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

    {/* Bamboo Stand Base (Dudukan Bambu) */}
    <rect x="22" y="47" width="20" height="7" rx="2" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.2" />
    <line x1="22" y1="50" x2="42" y2="50" stroke="#B45309" strokeWidth="1.5" />

    {/* Polished Coconut Shell Cup (Tempurung Kelapa / Sayak) */}
    <path
      d="M14 28C14 43 22 49 32 49C42 49 50 43 50 28H14Z"
      fill="#78350F"
      stroke="#1E293B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <ellipse cx="32" cy="28" rx="18" ry="5.5" fill="#92400E" stroke="#1E293B" strokeWidth="2.2" />

    {/* Smoked Brew Surface */}
    <ellipse cx="32" cy="28" rx="15" ry="4" fill="#451A03" />

    {/* Coffee Leaf Accent (Daun Kopi) */}
    <path
      d="M38 18C44 14 49 17 48 22C44 24 40 22 38 18Z"
      fill="#16A34A"
      stroke="#1E293B"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <line x1="39" y1="19" x2="46" y2="21" stroke="#15803D" strokeWidth="1" />
  </svg>
);

/**
 * Registry and Helper mappings for quick lookup by category or tag
 */
export const MINANG_ICON_REGISTRY = {
  rumahGadang: IconRumahGadang,
  jamGadang: IconJamGadang,
  rendang: IconRendang,
  marawa: IconMarawa,
  carano: IconCarano,
  tariPiring: IconTariPiring,
  songket: IconSongket,
  saluang: IconSaluang,
  pacuJawi: IconPacuJawi,
  kelok9: IconKelok9,
  danauSingkarak: IconDanauSingkarak,
  satePadang: IconSatePadang,
  tabuik: IconTabuik,
  airTerjun: IconAirTerjunLembahAnai,
  kawaDaun: IconKopiKawaDaun,
} as const;

export type MinangIconName = keyof typeof MINANG_ICON_REGISTRY;

export const MinangIcon: React.FC<{
  name: MinangIconName;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ name, size = 28, className = '', style }) => {
  const Component = MINANG_ICON_REGISTRY[name] || IconRumahGadang;
  return <Component size={size} className={className} style={style} />;
};

/**
 * Returns raw standalone SVG strings with inline styles for high-fidelity PDF rendering
 */
export const MINANG_RAW_SVGS: Record<MinangIconName, string> = {
  rumahGadang: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="50" width="4" height="8" rx="1.5" fill="#78350F" stroke="#1E293B" stroke-width="2" stroke-linejoin="round"/>
    <rect x="23" y="50" width="4" height="8" rx="1.5" fill="#78350F" stroke="#1E293B" stroke-width="2" stroke-linejoin="round"/>
    <rect x="37" y="50" width="4" height="8" rx="1.5" fill="#78350F" stroke="#1E293B" stroke-width="2" stroke-linejoin="round"/>
    <rect x="46" y="50" width="4" height="8" rx="1.5" fill="#78350F" stroke="#1E293B" stroke-width="2" stroke-linejoin="round"/>
    <path d="M8 58H56" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M14 36H50L47 50H17L14 36Z" fill="#B45309" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M19 43H45" stroke="#FDE68A" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 3"/>
    <circle cx="24" cy="40" r="2" fill="#FEF3C7" stroke="#1E293B" stroke-width="1.2"/>
    <circle cx="40" cy="40" r="2" fill="#FEF3C7" stroke="#1E293B" stroke-width="1.2"/>
    <rect x="29" y="41" width="6" height="9" rx="1" fill="#DC2626" stroke="#1E293B" stroke-width="1.5"/>
    <path d="M28 50H36V58H28V50Z" fill="#FBBF24" stroke="#1E293B" stroke-width="2" stroke-linejoin="round"/>
    <line x1="28" y1="54" x2="36" y2="54" stroke="#1E293B" stroke-width="1.5"/>
    <path d="M3 24C9 23 15 29 18 36H46C49 29 55 23 61 24C53 16 46 22 41 27C37 18 34 13 32 10C30 13 27 18 23 27C18 22 11 16 3 24Z" fill="#DC2626" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M32 10V20" stroke="#FBBF24" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="32" cy="9" r="2" fill="#FBBF24" stroke="#1E293B" stroke-width="1.5"/>
    <circle cx="3" cy="23" r="1.5" fill="#FBBF24" stroke="#1E293B" stroke-width="1.2"/>
    <circle cx="61" cy="23" r="1.5" fill="#FBBF24" stroke="#1E293B" stroke-width="1.2"/>
    <path d="M22 30C28 32 36 32 42 30" stroke="#991B1B" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,

  jamGadang: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="55" width="28" height="5" rx="1.5" fill="#64748B" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
    <rect x="21" y="51" width="22" height="4" rx="1" fill="#94A3B8" stroke="#1E293B" stroke-width="2" stroke-linejoin="round"/>
    <path d="M23 28H41L42 51H22L23 28Z" fill="#F8FAFC" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M28 41H36V47H28V41Z" fill="#1E293B" stroke="#1E293B" stroke-width="1.5"/>
    <rect x="21" y="24" width="22" height="8" rx="1.5" fill="#E2E8F0" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="32" cy="34" r="6" fill="#FEF08A" stroke="#1E293B" stroke-width="2"/>
    <line x1="32" y1="34" x2="32" y2="30.5" stroke="#1E293B" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="32" y1="34" x2="35" y2="34" stroke="#1E293B" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M13 18C17 18 22 21 24 24H40C42 21 47 18 51 18C46 12 41 16 38 19C35 13 33 9 32 7C31 9 29 13 26 19C23 16 18 12 13 18Z" fill="#DC2626" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="32" cy="6" r="1.5" fill="#FBBF24" stroke="#1E293B" stroke-width="1.2"/>
  </svg>`,

  rendang: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 14C23 11 25 9 27 7" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
    <path d="M33 13C32 9 35 7 37 5" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
    <path d="M42 14C41 11 43 9 45 7" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 32C12 45 20 54 32 54C44 54 52 45 52 32H12Z" fill="#78350F" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="32" cy="32" rx="21" ry="6" fill="#92400E" stroke="#1E293B" stroke-width="2.5"/>
    <ellipse cx="32" cy="32" rx="18" ry="4.5" fill="#451A03"/>
    <path d="M20 30C19 25 25 23 29 26C31 28 29 32 25 32C22 32 20 31 20 30Z" fill="#78350F" stroke="#1E293B" stroke-width="2"/>
    <path d="M33 28C32 24 38 22 43 25C45 28 42 32 38 32C35 32 33 30 33 28Z" fill="#592308" stroke="#1E293B" stroke-width="2"/>
    <path d="M27 22C30 20 36 21 34 25" stroke="#DC2626" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M36 21C39 19 41 21 40 23C38 24 36 23 36 21Z" fill="#16A34A" stroke="#1E293B" stroke-width="1.2"/>
  </svg>`,

  marawa: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="56" rx="6" ry="2.5" fill="#64748B" stroke="#1E293B" stroke-width="2"/>
    <line x1="16" y1="8" x2="16" y2="56" stroke="#1E293B" stroke-width="3" stroke-linecap="round"/>
    <circle cx="16" cy="7" r="3" fill="#FBBF24" stroke="#1E293B" stroke-width="2"/>
    <path d="M16 11C24 9 32 14 42 12C47 11 52 10 56 12V22C52 20 47 21 42 22C32 24 24 19 16 21V11Z" fill="#18181B" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M16 21C24 19 32 24 42 22C47 21 52 20 56 22V33C52 31 47 32 42 33C32 35 24 30 16 32V21Z" fill="#DC2626" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M16 32C24 30 32 35 42 33C47 32 52 31 56 33V44C52 42 47 43 42 44C32 46 24 41 16 43V32Z" fill="#FBBF24" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
  </svg>`,

  carano: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 48L11 56H53L50 48H14Z" fill="#DC2626" stroke="#1E293B" stroke-width="2" stroke-linejoin="round"/>
    <path d="M20 46H44L41 52H23L20 46Z" fill="#D97706" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
    <rect x="29" y="38" width="6" height="8" rx="1" fill="#FBBF24" stroke="#1E293B" stroke-width="2"/>
    <path d="M12 28C12 38 22 40 32 40C42 40 52 38 52 28H12Z" fill="#F59E0B" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="32" cy="28" rx="20" ry="5.5" fill="#FDE68A" stroke="#1E293B" stroke-width="2.2"/>
    <path d="M23 26C21 21 24 16 28 14C30 18 29 23 27 26H23Z" fill="#15803D" stroke="#1E293B" stroke-width="1.8"/>
    <path d="M32 26C31 20 33 13 37 11C39 16 38 22 36 26H32Z" fill="#16A34A" stroke="#1E293B" stroke-width="1.8"/>
    <path d="M41 26C43 21 40 16 36 14C34 18 35 23 37 26H41Z" fill="#15803D" stroke="#1E293B" stroke-width="1.8"/>
    <circle cx="32" cy="27" r="2.5" fill="#D97706" stroke="#1E293B" stroke-width="1.5"/>
  </svg>`,

  tariPiring: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 22C20 13 25 8 32 6C39 8 44 13 44 22H20Z" fill="#FBBF24" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="32" cy="5" r="2" fill="#DC2626"/>
    <circle cx="32" cy="24" r="5" fill="#FED7AA" stroke="#1E293B" stroke-width="2"/>
    <path d="M23 29H41L45 52H19L23 29Z" fill="#DC2626" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M24 30L39 45" stroke="#FBBF24" stroke-width="3" stroke-linecap="round"/>
    <path d="M23 34L14 36" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="12" cy="37" rx="8" ry="4" fill="#FFFFFF" stroke="#1E293B" stroke-width="2.2"/>
    <path d="M41 34L50 36" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="52" cy="37" rx="8" ry="4" fill="#FFFFFF" stroke="#1E293B" stroke-width="2.2"/>
  </svg>`,

  songket: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="12" width="44" height="40" rx="4" fill="#881337" stroke="#1E293B" stroke-width="2.5"/>
    <rect x="14" y="16" width="36" height="32" rx="2" stroke="#FBBF24" stroke-width="1.8" stroke-dasharray="2 2"/>
    <path d="M32 20L42 32L32 44L22 32L32 20Z" fill="#FBBF24" stroke="#1E293B" stroke-width="2" stroke-linejoin="round"/>
    <path d="M32 26L37 32L32 38L27 32L32 26Z" fill="#DC2626" stroke="#1E293B" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`,

  saluang: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="21" r="2.5" fill="#DC2626"/>
    <g transform="rotate(35 32 32)">
      <rect x="29" y="8" width="6" height="48" rx="2.5" fill="#FDE68A" stroke="#1E293B" stroke-width="2.2"/>
      <circle cx="32" cy="24" r="1.2" fill="#1E293B"/>
      <circle cx="32" cy="28" r="1.2" fill="#1E293B"/>
      <circle cx="32" cy="38" r="1.2" fill="#1E293B"/>
      <circle cx="32" cy="42" r="1.2" fill="#1E293B"/>
    </g>
    <ellipse cx="22" cy="45" rx="14" ry="7" fill="#F59E0B" stroke="#1E293B" stroke-width="2.2"/>
    <circle cx="22" cy="42" r="3" fill="#D97706" stroke="#1E293B" stroke-width="1.8"/>
  </svg>`,

  pacuJawi: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="54" rx="24" ry="4" fill="#78350F" opacity="0.25"/>
    <path d="M16 28C24 25 40 25 48 28" stroke="#B45309" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="21" cy="35" r="9" fill="#E2E8F0" stroke="#1E293B" stroke-width="2.2"/>
    <ellipse cx="21" cy="38" rx="4.5" ry="3" fill="#FED7AA" stroke="#1E293B" stroke-width="1.5"/>
    <circle cx="43" cy="35" r="9" fill="#CBD5E1" stroke="#1E293B" stroke-width="2.2"/>
    <ellipse cx="43" cy="38" rx="4.5" ry="3" fill="#FED7AA" stroke="#1E293B" stroke-width="1.5"/>
    <rect x="30" y="23" width="4" height="12" rx="1.5" fill="#DC2626" stroke="#1E293B" stroke-width="2"/>
  </svg>`,

  kelok9: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 42C12 28 20 30 28 40C36 32 46 30 60 44V56H4V42Z" fill="#15803D" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M6 36C18 24 30 24 44 32C52 36 58 35 62 33" stroke="#334155" stroke-width="7" stroke-linecap="round"/>
    <path d="M6 36C18 24 30 24 44 32C52 36 58 35 62 33" stroke="#F8FAFC" stroke-width="4" stroke-linecap="round"/>
    <path d="M4 48C18 42 34 50 48 46C54 44 58 41 60 39" stroke="#1E293B" stroke-width="6" stroke-linecap="round"/>
    <path d="M4 48C18 42 34 50 48 46C54 44 58 41 60 39" stroke="#CBD5E1" stroke-width="3.2" stroke-linecap="round"/>
  </svg>`,

  danauSingkarak: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="24" r="8" fill="#FBBF24" stroke="#1E293B" stroke-width="2"/>
    <path d="M4 36L18 20L34 36L48 22L60 36V56H4V36Z" fill="#059669" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M4 38H60V56H4V38Z" fill="#0284C7" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M10 44H24M38 44H54" stroke="#BAE6FD" stroke-width="2" stroke-linecap="round"/>
    <path d="M23 44C23 44 26 48 35 48C44 48 47 44 47 44L44 42H26L23 44Z" fill="#78350F" stroke="#1E293B" stroke-width="2" stroke-linejoin="round"/>
  </svg>`,

  satePadang: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="46" rx="24" ry="10" fill="#15803D" stroke="#1E293B" stroke-width="2.5"/>
    <line x1="16" y1="12" x2="36" y2="48" stroke="#B45309" stroke-width="2" stroke-linecap="round"/>
    <line x1="26" y1="9" x2="42" y2="48" stroke="#B45309" stroke-width="2" stroke-linecap="round"/>
    <line x1="36" y1="12" x2="48" y2="48" stroke="#B45309" stroke-width="2" stroke-linecap="round"/>
    <circle cx="21" cy="21" r="4" fill="#78350F" stroke="#1E293B" stroke-width="1.8"/>
    <circle cx="26" cy="29" r="4.2" fill="#592308" stroke="#1E293B" stroke-width="1.8"/>
    <circle cx="31" cy="18" r="4" fill="#78350F" stroke="#1E293B" stroke-width="1.8"/>
    <circle cx="35" cy="26" r="4.2" fill="#592308" stroke="#1E293B" stroke-width="1.8"/>
    <circle cx="41" cy="21" r="4" fill="#78350F" stroke="#1E293B" stroke-width="1.8"/>
    <path d="M20 32C24 30 32 30 46 34C44 42 36 44 26 43C22 41 20 36 20 32Z" fill="#FBBF24" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
  </svg>`,

  tabuik: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="52" width="40" height="4" rx="1.5" fill="#78350F" stroke="#1E293B" stroke-width="2.2"/>
    <ellipse cx="32" cy="45" rx="12" ry="7" fill="#F8FAFC" stroke="#1E293B" stroke-width="2.2"/>
    <path d="M25 32H39L42 41H22L25 32Z" fill="#DC2626" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M27 22H37L39 32H25L27 22Z" fill="#FBBF24" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M20 22C20 14 26 10 32 10C38 10 44 14 44 22H20Z" fill="#059669" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="32" cy="5" r="2" fill="#FBBF24" stroke="#1E293B" stroke-width="1.5"/>
  </svg>`,

  airTerjun: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 14C12 16 18 24 20 54H4V14Z" fill="#475569" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M60 14C52 16 46 24 44 54H60V14Z" fill="#334155" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M18 16C24 12 40 12 46 16" stroke="#92400E" stroke-width="4" stroke-linecap="round"/>
    <path d="M26 15C26 26 25 40 22 52H42C39 40 38 26 38 15H26Z" fill="#38BDF8" stroke="#1E293B" stroke-width="2.2" stroke-linejoin="round"/>
    <ellipse cx="32" cy="53" rx="18" ry="5" fill="#0284C7" stroke="#1E293B" stroke-width="2.2"/>
  </svg>`,

  kawaDaun: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="47" width="20" height="7" rx="2" fill="#FDE68A" stroke="#1E293B" stroke-width="2.2"/>
    <path d="M14 28C14 43 22 49 32 49C42 49 50 43 50 28H14Z" fill="#78350F" stroke="#1E293B" stroke-width="2.5" stroke-linejoin="round"/>
    <ellipse cx="32" cy="28" rx="18" ry="5.5" fill="#92400E" stroke="#1E293B" stroke-width="2.2"/>
    <ellipse cx="32" cy="28" rx="15" ry="4" fill="#451A03"/>
    <path d="M38 18C44 14 49 17 48 22C44 24 40 22 38 18Z" fill="#16A34A" stroke="#1E293B" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`,
};

/**
 * Utility to render any Minang icon into a base64 PNG data URL for jsPDF embedding
 */
export async function getMinangIconDataUrl(
  name: MinangIconName,
  targetSize: number = 128
): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  const svg = MINANG_RAW_SVGS[name];
  if (!svg) return null;

  return new Promise((resolve) => {
    let resolved = false;
    const safeResolve = (val: string | null) => {
      if (!resolved) {
        resolved = true;
        resolve(val);
      }
    };

    // Timeout safety net (200ms max) so PDF generation NEVER freezes
    const timer = setTimeout(() => {
      safeResolve(null);
    }, 200);

    try {
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        clearTimeout(timer);
        try {
          const canvas = document.createElement('canvas');
          canvas.width = targetSize;
          canvas.height = targetSize;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            URL.revokeObjectURL(url);
            safeResolve(null);
            return;
          }
          ctx.drawImage(img, 0, 0, targetSize, targetSize);
          const dataUrl = canvas.toDataURL('image/png');
          URL.revokeObjectURL(url);
          safeResolve(dataUrl);
        } catch {
          URL.revokeObjectURL(url);
          safeResolve(null);
        }
      };
      img.onerror = () => {
        clearTimeout(timer);
        URL.revokeObjectURL(url);
        safeResolve(null);
      };
      img.src = url;
    } catch {
      clearTimeout(timer);
      safeResolve(null);
    }
  });
}
