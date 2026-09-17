import re

with open('src/lib/content.ts', 'r') as f:
    content = f.read()

func = """
export async function getBookingSettings() {
  try {
    const data = await reader.singletons.bookingSettings.read();
    if (data) return data;
  } catch {}
  
  // Fallback
  return {
    start_hour: 8,
    end_hour: 20,
    slot_duration: 1,
    max_days_ahead: 30,
    closed_days: ['0']
  };
}
"""

content = content + "\n" + func

with open('src/lib/content.ts', 'w') as f:
    f.write(content)
