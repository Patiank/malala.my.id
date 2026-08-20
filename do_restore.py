with open('src/components/Drawers.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if "activeDrawer === 'formai'" in line:
        start_idx = i
        break

for i in range(start_idx, len(lines)):
    if "activeDrawer === 'chat'" in lines[i] or '5.5 CHATBOT TANYA UNI MALA GUIDE' in lines[i]:
        end_idx = i
        break

print('Replacing lines from', start_idx, 'to', end_idx)

with open('original_generator_block.txt', 'r', encoding='utf-8') as f:
    gen_block = f.read()

gen_block = gen_block.replace('{/* MODE 2: CHATBOT', '').strip()

replacement = '''          {activeDrawer === 'formai' && (
            <div className={`space-y-6 ${aiResponse ? 'md:grid md:grid-cols-2 md:gap-6 md:space-y-0 h-full' : 'flex flex-col'}`}>
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
              <div className={`flex flex-col space-y-6 ${aiResponse ? 'overflow-y-auto pr-2 custom-scrollbar h-[85vh]' : 'w-full'}`}>
''' + gen_block + '''
              </div>
            </div>
          )}

          '''

new_lines = lines[:start_idx] + [replacement] + lines[end_idx:]

with open('src/components/Drawers.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print('Drawers.tsx successfully updated!')
