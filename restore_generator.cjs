const fs = require('fs');
let code = fs.readFileSync('src/components/Drawers.tsx', 'utf-8');
const originalGen = fs.readFileSync('original_generator_block.txt', 'utf-8')
  .replace('{/* MODE 2: CHATBOT', '')
  .trim();

// Target what is currently inside activeDrawer === 'formai'
const currentFormai = code.match(/\{\/\* 5\. FORMAI SUMATERA BARAT \(AI ITINERARY BUILDER\) \*\/\}[\s\S]*?\{\/\* 5\.5 CHATBOT TANYA UNI MALA GUIDE/);

if (currentFormai) {
  const newFormaiBlock = `{\/* 5. FORMAI SUMATERA BARAT (AI ITINERARY BUILDER) *\/}
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
                ${originalGen}
              </div>
            </div>
          )}

          `;

  code = code.replace(currentFormai[0], newFormaiBlock + '{/* 5.5 CHATBOT TANYA UNI MALA GUIDE');
  fs.writeFileSync('src/components/Drawers.tsx', code);
  console.log('Successfully restored original generator block inside Drawers.tsx!');
} else {
  console.error('Could not find currentFormai block');
}
