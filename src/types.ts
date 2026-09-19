export type DrawerType =
  | 'destinations'  // Wisata Alam & Populer
  | 'culture'       // Seni & Budaya Minangkabau
  | 'culinary'      // Wisata Kuliner & Rendang
  | 'souvenirs'     // Oleh-oleh & Kriya Khas Minang
  | 'events'        // Festival & Event Pariwisata
  | 'formai'        // FormAI / AI Tourism Assistant
  | 'saved'         // Destinasi Favorit Disimpan
  | 'admin'
  | 'hotinfo'       // Hot Info / Update Berita Wisata
  | 'download'      // Unduh Asset, Booklet, Leaflet, Flyer
  | 'map'           // Peta Interaktif Sumatera Barat
  | 'search'        // Panel Pencarian Interaktif dari Samping Kanan
  | 'chat'          // Tanya Uni Mala Guide Chat Box
  | 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact'
  | null;

export interface SouvenirItem {
  id: string;
  title: string;
  titleEn?: string;
  category: 'Kuliner Kemasan' | 'Fashion & Tenun' | 'Kriya & Kerajinan' | 'Kopi & Rempah';
  categoryEn?: string;
  origin: string;
  originEn?: string;
  description: string;
  descriptionEn?: string;
  priceRange: string;
  priceRangeEn?: string;
  shopeeUrl: string;
  whatsappUrl?: string;
  isMinangkaos?: boolean;
  imageUrl: string;
  highlights: string[];
  highlightsEn?: string[];
  mapUrl?: string;
  lat?: number;
  lng?: number;
}

export interface Destination {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  categoryEn?: string;
  regency: string; // e.g. Bukittinggi, Tanah Datar, Mentawai, Solok, Limapuluh Kota
  regencyEn?: string;
  tag: string;
  tagEn?: string;
  description: string;
  descriptionEn?: string;
  highlights: string[];
  highlightsEn?: string[];
  bestTime: string;
  bestTimeEn?: string;
  locationDetails: string;
  locationDetailsEn?: string;
  imageUrl: string;
  isPopular?: boolean;
  videoUrl?: string;
  mapUrl?: string;
  lat?: number | string;
  lng?: number | string;
  [key: string]: any;
}

export interface CultureItem {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  categoryEn?: string;
  description: string;
  descriptionEn?: string;
  philosophy: string;
  philosophyEn?: string;
  origin: string;
  originEn?: string;
  imageUrl: string;
  videoUrl?: string;
  mapUrl?: string;
  lat?: number | string;
  lng?: number | string;
  [key: string]: any;
}

export interface CulinaryItem {
  id: string;
  title: string;
  titleEn?: string;
  type: string;
  typeEn?: string;
  category?: string;
  categoryEn?: string;
  origin: string;
  originEn?: string;
  description: string;
  descriptionEn?: string;
  flavorProfile?: string;
  flavorProfileEn?: string;
  mainIngredients?: string[];
  mainIngredientsEn?: string[];
  tasteProfile?: string;
  tasteProfileEn?: string;
  culturalPhilosophy?: string;
  culturalPhilosophyEn?: string;
  imageUrl: string;
  videoUrl?: string;
  mapUrl?: string;
  lat?: number | string;
  lng?: number | string;
  [key: string]: any;
}

export interface EventItem {
  id: string;
  title: string;
  titleEn?: string;
  schedule: string;
  scheduleEn?: string;
  location: string;
  locationEn?: string;
  locationName?: string;
  locationNameEn?: string;
  locationDetails?: string;
  locationDetailsEn?: string;
  regency?: string;
  regencyEn?: string;
  category?: string;
  categoryEn?: string;
  tag?: string;
  tagEn?: string;
  description: string;
  descriptionEn?: string;
  imageUrl: string;
  videoUrl?: string;
  mapUrl?: string;
  isKen?: boolean;
  lat?: number | string;
  lng?: number | string;
  highlights?: string[];
  highlightsEn?: string[];
  priceRange?: string;
  philosophy?: string;
  verificationConfidence?: number | string;
  verifiedAt?: string;
  [key: string]: any;
}

export interface PendingEventItem extends EventItem {
  status: 'pending' | 'approved' | 'rejected';
  discoveredAt?: string;
  sourceName?: string;
  changeType?: 'new_event' | 'schedule_update';
  originalSchedule?: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  categoryEn?: string;
  type: string;
  typeEn?: string;
  size: string;
  description: string;
  descriptionEn?: string;
  filename: string;
  content: string;
  mimeType: string;
}

export interface HotInfoRelatedStory {
  title: string;
  titleEn?: string;
  sourceName: string;
  sourceDomain?: string;
  sourceUrl: string;
  timeAgo?: string;
  sourceIcon?: string;
}

export interface HotInfoItem {
  id: string;
  title: string;
  titleEn?: string;
  date: string;
  dateEn?: string;
  category: string;
  categoryEn?: string;
  description: string;
  descriptionEn?: string;
  imageUrl?: string;
  tag?: string;
  tagEn?: string;
  actionUrl?: string;
  mapsUrl?: string;
  sourceUrl?: string;
  sourceName?: string;
  sourceDomain?: string;
  sourceIcon?: string;
  timeAgo?: string;
  relatedStories?: HotInfoRelatedStory[];
  highlights?: string[];
  highlightsEn?: string[];
  tips?: string;
  tipsEn?: string;
  locationName?: string;
  locationNameEn?: string;
  createdAt?: any;
  isUserUploadedImage?: boolean;
}

export interface AppSettings {
  bgMediaType?: 'image' | 'video';
  baseImage?: string;
  revealImage?: string;
  baseVideo?: string;
  spotlightDisplayMode?: 'both' | 'video' | 'event';
  featuredVideoEventId?: string;
  allowedAdminEmails?: string[];
  heroTextColor?: string;
  heroTextTheme?: 'black' | 'white' | 'red' | 'gold' | 'custom';
  heroTextShadow?: boolean;
  githubToken?: string;
  githubRepo?: string;
  tiketAffiliateId?: string;
  travelokaAffiliateId?: string;
  activeBookingPartner?: 'dual' | 'tiket' | 'traveloka';
  isAutonomousSyncEnabled?: boolean;
  lastAutonomousSync?: string;
}

export interface FormAIItineraryActivity {
  time: string;
  location: string;
  activity: string;
  tips: string;
}

export interface FormAIItineraryDay {
  day: number;
  title: string;
  activities: FormAIItineraryActivity[];
  culinaryRecommendation: string;
}

export interface FormAIResponse {
  title: string;
  summary: string;
  itinerary: FormAIItineraryDay[];
  localTips: string[];
}

export interface ToastNotice {
  id: string;
  message: string;
}

export type KategoriWisatawan =
  | "individu"
  | "pasangan"
  | "keluarga_anak"
  | "lansia"
  | "disabilitas"
  | "rombongan";

export type AsalWisatawan = "domestik" | "mancanegara";

export type MinatWisata =
  | "alam"
  | "budaya_sejarah"
  | "religi"
  | "kuliner"
  | "petualangan"
  | "edukasi";

export type TingkatAktivitas = "santai" | "sedang" | "ekstrem";

export type ModaTransportasi =
  | "kendaraan_pribadi"
  | "sewa_mobil"
  | "transportasi_umum";

export type RentangBudget = "hemat" | "menengah" | "mewah";

export type JenisAkomodasi = "hotel" | "homestay" | "resort";

export type FormatItinerary = "per_jam" | "per_hari" | "fleksibel";

export interface ProfilWisatawan {
  jumlahOrang: number;
  kategori: KategoriWisatawan;
  asal: AsalWisatawan;
}

export interface PreferensiMinat {
  kategoriWisata: MinatWisata[];
  tingkatAktivitas: TingkatAktivitas;
  suasanaRamai: boolean;
}

export type StartingPointType = 'airport' | 'current_location' | 'hotel' | 'custom_city' | 'must_visit';

export interface StartingPointConfig {
  type: StartingPointType;
  label: string;
  details?: string;
  city?: string;
  destinationId?: string;
  coords?: { lat: number; lng: number };
}

export interface Logistik {
  titikKeberangkatan: string;
  startingPoint?: StartingPointConfig;
  moda: ModaTransportasi;
  radiusMaksimalKm: number;
}

export interface Anggaran {
  rentang: RentangBudget;
  alokasi: {
    akomodasiPersen: number;
    makanPersen: number;
    tiketPersen: number;
    transportasiPersen: number;
  };
}

export interface Akomodasi {
  jenis: JenisAkomodasi[];
  lokasiPreferensi: string;
}

export interface WaktuKunjungan {
  tanggalMulai: string;
  tanggalSelesai: string;
}

export interface KebutuhanKhusus {
  preferensiMakanan: string[];
  alergiMakanan: string[];
  aksesibilitasFisik: boolean;
}

export interface OutputPreferensi {
  formatItinerary: FormatItinerary;
  tingkatDetail: "hanya_destinasi_utama" | "lengkap_kuliner_oleholeh";
}

export interface ItineraryFormState {
  durasiHari: number;
  profilWisatawan: ProfilWisatawan;
  preferensiMinat: PreferensiMinat;
  logistik: Logistik;
  startingPoint?: StartingPointConfig;
  anggaran: Anggaran;
  akomodasi: Akomodasi;
  waktuKunjungan: WaktuKunjungan;
  kebutuhanKhusus: KebutuhanKhusus;
  outputPreferensi: OutputPreferensi;
}

