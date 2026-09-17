import re

with open('src/components/Booking.tsx', 'r') as f:
    content = f.read()

# Fix Calendar signature
sig_search = r"function Calendar\(\{\n  selectedDate,\n  onSelect,\n  language,\n\}: \{\n  selectedDate: string;\n  onSelect: \(date: string\) => void;\n  language: string;\n\}\)"
sig_replace = r"function Calendar({\n  selectedDate,\n  onSelect,\n  language,\n  bookingSettings,\n}: {\n  selectedDate: string;\n  onSelect: (date: string) => void;\n  language: string;\n  bookingSettings: any;\n})"

content = re.sub(sig_search, sig_replace, content)

# Fix Calendar usage
usage_search = r"<Calendar selectedDate=\{selectedDate\} onSelect=\{handleDateSelect\} language=\{language\} />"
usage_replace = r"<Calendar selectedDate={selectedDate} onSelect={handleDateSelect} language={language} bookingSettings={bookingSettings} />"

content = re.sub(usage_search, usage_replace, content)

with open('src/components/Booking.tsx', 'w') as f:
    f.write(content)
