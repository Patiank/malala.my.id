import React, { useState, useMemo } from 'react';
import { Star, MessageSquare, PlusCircle, CheckCircle, ThumbsUp, UserCheck, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { ReviewItem, DestinationRatingSummary, getDestinationRatingSummary, saveUserReview } from '../data/reviewsData';
import { Language } from '../lib/translations';

interface ReviewSectionProps {
  destId: string;
  destTitle: string;
  lang: Language;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ destId, destTitle, lang }) => {
  const isEn = lang === 'en';
  const [summaryData, setSummaryData] = useState<DestinationRatingSummary>(() =>
    getDestinationRatingSummary(destId, destTitle)
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Form state
  const [author, setAuthor] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [travelerType, setTravelerType] = useState<'Keluarga' | 'Solo Traveler' | 'Pasangan' | 'Grup Teman' | 'Wisatawan Mancanegara'>('Keluarga');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      saveUserReview(destId, {
        author,
        originCity,
        travelerType,
        rating,
        comment
      });

      // Refresh local summary
      setSummaryData(getDestinationRatingSummary(destId, destTitle));
      setAuthor('');
      setOriginCity('');
      setComment('');
      setRating(5);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsFormOpen(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedReviews = useMemo(() => {
    return showAllReviews ? summaryData.reviews : summaryData.reviews.slice(0, 3);
  }, [summaryData.reviews, showAllReviews]);

  const ratingLabel = useMemo(() => {
    const active = hoverRating || rating;
    if (active === 5) return isEn ? 'Exceptional (5/5)' : 'Sangat Istimewa (5/5)';
    if (active === 4) return isEn ? 'Very Good (4/5)' : 'Sangat Bagus (4/5)';
    if (active === 3) return isEn ? 'Average (3/5)' : 'Cukup Baik (3/5)';
    if (active === 2) return isEn ? 'Fair (2/5)' : 'Kurang Memuaskan (2/5)';
    return isEn ? 'Poor (1/5)' : 'Perlu Ditingkatkan (1/5)';
  }, [rating, hoverRating, isEn]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs mt-3 font-jakarta">
      {/* Header Summary */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 border-b border-gray-100">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="bg-amber-500 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full tracking-wider shadow-2xs">
              ⭐ Google Rich Snippets
            </span>
            <span className="text-xs font-bold text-gray-900">
              {isEn ? 'Tourist Reviews & Rating' : 'Ulasan & Rating Wisatawan'}
            </span>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-100/80 hover:bg-amber-200/80 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            {isEn ? 'Write Review' : 'Tulis Ulasan'}
          </button>
        </div>

        {/* Rating Score Banner */}
        <div className="flex items-center gap-3 pt-1">
          <div className="text-3xl font-black font-orbitron text-gray-950 leading-none">
            {summaryData.rating.toFixed(1)}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    s <= Math.round(summaryData.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="text-[10px] text-gray-500 font-medium">
              <span>{summaryData.reviewCount} {isEn ? 'verified reviews' : 'ulasan terverifikasi'}</span>
              <span className="mx-1">•</span>
              <span className="text-emerald-700 font-semibold">{summaryData.recommendPercentage}% {isEn ? 'recommend' : 'merekomendasikan'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Review Submission Form Drawer / Accordion */}
      {isFormOpen && (
        <div className="p-4 bg-amber-50/40 border-b border-amber-100/70 animate-fadeIn">
          {submitSuccess ? (
            <div className="bg-emerald-100/80 text-emerald-800 p-3 rounded-lg text-xs font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isEn ? 'Thank you! Your review has been successfully published.' : 'Terima kasih! Ulasan Anda berhasil diterbitkan dan langsung tampil.'}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-800">
                  {isEn ? 'Share your travel experience' : 'Bagikan pengalaman wisata Anda'}
                </span>
                <span className="text-[10px] text-amber-700 font-semibold">{ratingLabel}</span>
              </div>

              {/* Star Rating Selector */}
              <div className="flex items-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 hover:scale-115 transition-transform cursor-pointer"
                    title={`${star} Bintang`}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-500 drop-shadow-xs'
                          : 'fill-gray-200 text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">
                    {isEn ? 'Your Name *' : 'Nama Lengkap *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isEn ? 'e.g. Budi Santoso' : 'Cth: Budi Santoso'}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-white border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">
                    {isEn ? 'Origin City / Country' : 'Asal Kota / Negara'}
                  </label>
                  <input
                    type="text"
                    placeholder={isEn ? 'e.g. Jakarta / Malaysia' : 'Cth: Jakarta / Bandung / Padang'}
                    value={originCity}
                    onChange={(e) => setOriginCity(e.target.value)}
                    className="w-full bg-white border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">
                  {isEn ? 'Traveler Category' : 'Kategori Wisatawan'}
                </label>
                <select
                  value={travelerType}
                  onChange={(e: any) => setTravelerType(e.target.value)}
                  className="w-full bg-white border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 outline-none cursor-pointer"
                >
                  <option value="Keluarga">Keluarga (Family Vacation)</option>
                  <option value="Solo Traveler">Solo Traveler (Petualang Sendiri)</option>
                  <option value="Pasangan">Pasangan (Couple Trip)</option>
                  <option value="Grup Teman">Grup Teman (Friends / Community)</option>
                  <option value="Wisatawan Mancanegara">Wisatawan Mancanegara (International)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-600 mb-0.5">
                  {isEn ? 'Your Review & Tips *' : 'Ulasan & Tips Wisata *'}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={isEn ? 'Describe scenery, facilities, route, or culinary tips...' : 'Ceritakan keindahan pemandangan, kenyamanan fasilitas, kuliner terdekat, atau tips waktu berkunjung...'}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-white border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg p-2.5 text-xs text-gray-900 outline-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-semibold cursor-pointer"
                >
                  {isEn ? 'Cancel' : 'Batal'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isEn ? 'Submit Review' : 'Kirim Ulasan'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="divide-y divide-gray-100">
        {displayedReviews.map((rev) => {
          const initials = (rev.author || 'W')
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

          return (
            <article key={rev.id} className="p-3.5 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0 shadow-2xs">
                    {initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h5 className="font-bold text-xs text-gray-900">{rev.author}</h5>
                      <span className="text-[10px] text-gray-400 font-medium">({rev.originCity || 'Indonesia'})</span>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-emerald-700 font-medium">
                      <UserCheck className="w-3 h-3 text-emerald-600" />
                      <span>{isEn ? 'Verified Traveler' : 'Wisatawan Terverifikasi'}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500">{rev.travelerType}</span>
                    </div>
                  </div>
                </div>

                {/* Stars & Date */}
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-0.5 justify-end">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <time className="text-[9px] text-gray-400 block pt-0.5 font-mono">{rev.date}</time>
                </div>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed pl-9">
                {rev.comment}
              </p>
            </article>
          );
        })}
      </div>

      {/* Show more toggle button */}
      {summaryData.reviews.length > 3 && (
        <div className="p-2.5 bg-gray-50 text-center border-t border-gray-100">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="text-[11px] font-bold text-gray-700 hover:text-black inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showAllReviews ? (
              <>
                <span>{isEn ? 'Show Less Reviews' : 'Tampilkan Lebih Sedikit'}</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>{isEn ? `View All ${summaryData.reviews.length} Reviews` : `Lihat Semua ${summaryData.reviews.length} Ulasan`}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};