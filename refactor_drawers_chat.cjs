const fs = require('fs');
let code = fs.readFileSync('src/components/Drawers.tsx', 'utf-8');

// 1. Update titles in getDrawerTitle
code = code.replace(
  "      case 'search':\n        return isEn ? 'Search Results & Information' : 'Pencarian Informasi Wisata';",
  "      case 'chat':\n        return isEn ? 'Ask Uni Mala Guide' : 'Tanya Uni Mala Guide';\n      case 'search':\n        return isEn ? 'Search Results & Information' : 'Pencarian Informasi Wisata';"
);

// 2. Update subtitles in getDrawerSubtitle
code = code.replace(
  "      case 'search':\n        return isEn ? 'Real-time search results across all West Sumatra tourism categories' : 'Hasil pencarian waktu-nyata ke seluruh data pariwisata Sumatera Barat';",
  "      case 'chat':\n        return isEn ? 'Interactive AI tourism guide for West Sumatra' : 'Asisten Percakapan & Panduan Wisata Interaktif Ranah Minang';\n      case 'search':\n        return isEn ? 'Real-time search results across all West Sumatra tourism categories' : 'Hasil pencarian waktu-nyata ke seluruh data pariwisata Sumatera Barat';"
);

// 3. Update Drawer Outer Wrapper sizing to support chat drawer on left
code = code.replace(
  "activeDrawer === 'hotinfo'\n            ? 'w-full md:w-1/2 lg:w-1/2 left-0 border-r border-gray-200 animate-drawer-slide-left'",
  "activeDrawer === 'hotinfo'\n            ? 'w-full md:w-1/2 lg:w-1/2 left-0 border-r border-gray-200 animate-drawer-slide-left'\n            : activeDrawer === 'chat'\n            ? 'w-full sm:w-[480px] md:w-[520px] left-0 border-r border-gray-200 animate-drawer-slide-left'"
);

// 4. Update Header tag for chat
code = code.replace(
  "{activeDrawer === 'download' && (",
  "{activeDrawer === 'chat' && (\n                <span className=\"bg-blue-600 text-white font-orbitron font-bold text-[9px] px-2 py-0.5 rounded flex items-center gap-1 uppercase\">\n                  <Sparkles className=\"w-2.5 h-2.5 text-yellow-300\" />\n                  Guide AI\n                </span>\n              )}\n              {activeDrawer === 'download' && ("
);

// 5. Clean up formai drawer and separate chat into its own activeDrawer === 'chat'
const formaiOldBlock = code.match(/\{\/\* 5\. FORMAI SUMATERA BARAT \(AI ITINERARY & CHAT\)[\s\S]*?\{\/\* 6\. SAVED FAVORITES DRAWER/);

if (formaiOldBlock) {
  const newBlock = `{\/* 5. FORMAI SUMATERA BARAT (AI ITINERARY BUILDER)      *\/}
          {\/* =================================================== *\/}
          {activeDrawer === 'formai' && (
            <div className={\`space-y-6 \${aiResponse ? 'md:grid md:grid-cols-2 md:gap-6 md:space-y-0 h-full' : 'flex flex-col'}\`}>
              {/* Left Column: Itinerary Map (Only visible on desktop when aiResponse exists) */}
              {aiResponse && (
                <div className="hidden md:flex flex-col border-r border-gray-200 pr-6 h-[85vh]">
                  <ItineraryMap
                    aiResponse={aiResponse}
                    destinations={destinations}
                    cultureItems={cultureItems}
                    culinaryItems={culinaryItems}
                    eventItems={eventItems}
                    lang={lang}
                    fullHeight={true}
                  />
                </div>
              )}
              {/* Right Column: AI Form & Response */}
              <div className={\`flex flex-col space-y-6 \${aiResponse ? 'overflow-y-auto pr-2 custom-scrollbar h-[85vh]' : 'w-full'}\`}>
                <div className="space-y-6">
                  <form onSubmit={handleGenerateItinerary} className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div>
                      <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                        {translations[lang].fieldDaysForm}
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5, 7].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setItineraryForm({ ...itineraryForm, durasiHari: num })}
                            className={\`flex-1 py-2 rounded-lg text-xs font-jakarta font-bold transition-all cursor-pointer \${
                              itineraryForm.durasiHari === num
                                ? 'bg-black text-white shadow-xs'
                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                            }\`}
                          >
                            {num} {translations[lang].daysText}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                          {translations[lang].fieldCategory}
                        </label>
                        <select
                          value={itineraryForm.profilWisatawan.kategori}
                          onChange={(e) =>
                            setItineraryForm({
                              ...itineraryForm,
                              profilWisatawan: { ...itineraryForm.profilWisatawan, kategori: e.target.value },
                            })
                          }
                          className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black cursor-pointer"
                        >
                          <option value="solo">{translations[lang].catSolo}</option>
                          <option value="pasangan">{translations[lang].catCouple}</option>
                          <option value="keluarga">{translations[lang].catFamily}</option>
                          <option value="rombongan">{translations[lang].catGroup}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                          {translations[lang].fieldBudget}
                        </label>
                        <select
                          value={itineraryForm.budget}
                          onChange={(e) => setItineraryForm({ ...itineraryForm, budget: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs font-jakarta text-black focus:outline-none focus:border-black cursor-pointer"
                        >
                          <option value="hemat">{translations[lang].budgetLow}</option>
                          <option value="standar">{translations[lang].budgetMedium}</option>
                          <option value="premium">{translations[lang].budgetHigh}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                        {translations[lang].fieldInterests}
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {interestOptions.map((opt) => {
                          const isSelected = itineraryForm.minat.includes(opt.id);
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                const newMinat = isSelected
                                  ? itineraryForm.minat.filter((i: string) => i !== opt.id)
                                  : [...itineraryForm.minat, opt.id];
                                setItineraryForm({ ...itineraryForm, minat: newMinat });
                              }}
                              className={\`px-2.5 py-1 rounded-md text-[11px] font-jakarta transition-all cursor-pointer \${
                                isSelected
                                  ? 'bg-black text-white font-semibold'
                                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                              }\`}
                            >
                              {lang === 'en' ? opt.labelEn : opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-jakarta font-bold uppercase tracking-wider text-black mb-1.5">
                        {translations[lang].fieldPace}
                      </label>
                      <div className="flex gap-2">
                        {[
                          { id: 'santai', label: translations[lang].paceRelaxed },
                          { id: 'sedang', label: translations[lang].paceModerate },
                          { id: 'padat', label: translations[lang].paceIntense },
                        ].map((pace) => (
                          <button
                            key={pace.id}
                            type="button"
                            onClick={() => setItineraryForm({ ...itineraryForm, pace: pace.id })}
                            className={\`flex-1 py-1.5 rounded-lg text-xs font-jakarta transition-all cursor-pointer \${
                              itineraryForm.pace === pace.id
                                ? 'bg-black text-white font-bold'
                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                            }\`}
                          >
                            {pace.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isGeneratingItinerary}
                      className="w-full bg-black text-white py-3 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      {isGeneratingItinerary ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-yellow-300" />
                          <span>{translations[lang].generatingItinerary}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-yellow-300" />
                          <span>{translations[lang].btnGenerateItinerary}</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* AI Response Display */}
                  {aiResponse && (
                    <div className="space-y-6 animate-fade-in border-t border-gray-200 pt-6">
                      <div className="bg-black text-white p-5 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-orbitron font-bold text-xs uppercase tracking-wider text-yellow-300">
                            {translations[lang].badgeAiGenerated}
                          </span>
                          <span className="text-[10px] font-jakarta text-gray-400">
                            {aiResponse.days} {translations[lang].daysText} • {aiResponse.budget}
                          </span>
                        </div>
                        <h3 className="font-orbitron font-bold text-base leading-snug">{aiResponse.title}</h3>
                        <p className="font-jakarta text-xs text-gray-300 leading-relaxed">{aiResponse.overview}</p>
                      </div>

                      {/* Itinerary Timeline */}
                      <div className="space-y-4">
                        <h4 className="font-orbitron font-bold text-xs uppercase tracking-wider text-black">
                          {translations[lang].scheduleTitle}
                        </h4>
                        <div className="space-y-4">
                          {aiResponse.itinerary.map((dayPlan: any) => (
                            <div key={dayPlan.day} className="border border-gray-200 rounded-xl p-4 bg-white space-y-3">
                              <div className="flex items-center gap-2 font-orbitron font-bold text-xs text-black border-b border-gray-100 pb-2">
                                <span className="bg-black text-white px-2 py-0.5 rounded text-[10px]">
                                  Day {dayPlan.day}
                                </span>
                                <span>{dayPlan.theme}</span>
                              </div>
                              <div className="space-y-2.5">
                                {dayPlan.activities.map((act: any, actIdx: number) => (
                                  <div key={actIdx} className="flex items-start gap-2.5 text-xs font-jakarta">
                                    <span className="font-orbitron text-[10px] text-gray-400 font-bold shrink-0 mt-0.5">
                                      {act.time}
                                    </span>
                                    <div className="space-y-0.5">
                                      <div className="font-bold text-black flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                                        <span>{act.location}</span>
                                      </div>
                                      <p className="text-gray-600 leading-relaxed">{act.activity}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Local Tips & Culinary */}
                      <div className="grid grid-cols-1 gap-4">
                        {aiResponse.culinaryRecommendations && aiResponse.culinaryRecommendations.length > 0 && (
                          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-2">
                            <h4 className="font-orbitron font-bold text-xs uppercase tracking-wider text-orange-950 flex items-center gap-1.5">
                              <span>🍽️</span> {translations[lang].culinaryRecTitle}
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {aiResponse.culinaryRecommendations.map((cul: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="bg-white border border-orange-200 text-orange-900 text-xs font-jakarta px-2.5 py-1 rounded-md"
                                >
                                  {cul}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {aiResponse.localTips && aiResponse.localTips.length > 0 && (
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
                            <h4 className="font-orbitron font-bold text-xs uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                              <span>💡</span> {translations[lang].tipsTitle}
                            </h4>
                            <ul className="space-y-1.5 text-xs font-jakarta text-blue-900">
                              {aiResponse.localTips.map((tip: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-blue-500 shrink-0">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {\/* =================================================== *\/}
          {\/* 5.5 CHATBOT TANYA UNI MALA GUIDE (DEDICATED)       *\/}
          {\/* =================================================== *\/}
          {activeDrawer === 'chat' && (
            <div className="flex flex-col h-[calc(100vh-140px)] border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
              {/* Chat Messages Log */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
                {chatHistory.map((item, index) => (
                  <div
                    key={index}
                    className={\`flex \${item.sender === 'user' ? 'justify-end' : 'justify-start'}\`}
                  >
                    <div
                      className={\`max-w-[85%] p-3.5 rounded-2xl text-xs font-jakarta leading-relaxed \${
                        item.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                          : 'bg-white border border-gray-200 text-gray-800 shadow-xs rounded-bl-none'
                      }\`}
                    >
                      {item.sender === 'ai' && (
                        <div className="flex items-center gap-1.5 font-orbitron font-bold text-[10px] text-blue-600 uppercase mb-1.5 border-b border-gray-100 pb-1">
                          <Sparkles className="w-3 h-3 text-blue-600" />
                          UNI MALA GUIDE
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{item.text}</p>
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-xl text-xs font-jakarta text-gray-500 flex items-center gap-2 shadow-xs">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                      <span>{lang === 'en' ? 'Uni Mala Guide is thinking...' : 'Uni Mala Guide sedang mengetik respon...'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleChatSubmit} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  placeholder={translations[lang].chatInputPlaceholder}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg p-2.5 text-xs font-jakarta text-black focus:outline-none focus:border-blue-600"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatMessage.trim()}
                  className="bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* =================================================== */}
          {/* 6. SAVED FAVORITES DRAWER`;

  code = code.replace(formaiOldBlock[0], newBlock);
  fs.writeFileSync('src/components/Drawers.tsx', code);
  console.log('Successfully separated formai and chat drawers in Drawers.tsx');
} else {
  console.error('Could not find formai block in Drawers.tsx');
}
