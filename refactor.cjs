const fs = require('fs');
let code = fs.readFileSync('src/components/Drawers.tsx', 'utf-8');

// 1. Remove Dedicated Left Panel
code = code.replace(/\s*\{\/\* Dedicated Left Panel for AI Itinerary Map \(Desktop Only\) \*\/\}[\s\S]*?\{\/\* Drawer Outer Wrapper \*\/\}/g, '\n      {/* Drawer Outer Wrapper */}');

// 2. Change formai drawer wrapper
const targetStart = `          {activeDrawer === 'formai' && (
            <div className="space-y-6">
              {/* FormAI Mode Switcher */}`;

const replaceStart = `          {activeDrawer === 'formai' && (
            <div className={\`space-y-6 \${aiResponse && formAiTab === 'generator' ? 'md:grid md:grid-cols-2 md:gap-6 md:space-y-0 h-full' : 'flex flex-col'}\`}>
              {/* Left Column: Itinerary Map (Only visible on desktop when aiResponse exists) */}
              {aiResponse && formAiTab === 'generator' && (
                <div className="hidden md:flex flex-col border-r border-gray-200 pr-6 h-full">
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
              <div className={\`flex flex-col space-y-6 \${aiResponse && formAiTab === 'generator' ? 'overflow-y-auto pr-2 custom-scrollbar' : 'w-full'}\`}>
              {/* FormAI Mode Switcher */}`;

code = code.replace(targetStart, replaceStart);

// 3. Add closing div at the end of activeDrawer === 'formai'
const targetEnd = `                  ))}
                </div>
              )}
            </div>
          )}

          {/* =================================================== */}
          {/* 7. ADMIN MANAGEMENT DRAWER                          */}`;

const replaceEnd = `                  ))}
                </div>
              )}
              </div>
            </div>
          )}

          {/* =================================================== */}
          {/* 7. ADMIN MANAGEMENT DRAWER                          */}`;

code = code.replace(targetEnd, replaceEnd);

fs.writeFileSync('src/components/Drawers.tsx', code);
console.log("Refactor complete.");
