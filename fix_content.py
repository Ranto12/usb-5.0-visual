import re

with open('src/lib/content.ts', 'r') as f:
    content = f.read()

# Replace getBookingSettings
new_func = """export async function getBookingSettings() {
  try {
    const data = await reader.singletons.bookingSettings.read();
    if (data) {
      return {
        start_hour: data.start_hour ?? 8,
        end_hour: data.end_hour ?? 20,
        slot_duration: data.slot_duration ?? 1,
        max_days_ahead: data.max_days_ahead ?? 30,
        closed_days: data.closed_days || ['0']
      };
    }
  } catch {}
  
  // Fallback
  return {
    start_hour: 8,
    end_hour: 20,
    slot_duration: 1,
    max_days_ahead: 30,
    closed_days: ['0']
  };
}"""

content = re.sub(
    r"export async function getBookingSettings\(\) \{.*?return \{\n    start_hour: 8,\n    end_hour: 20,\n    slot_duration: 1,\n    max_days_ahead: 30,\n    closed_days: \['0'\]\n  \};\n\}",
    new_func,
    content,
    flags=re.DOTALL
)

with open('src/lib/content.ts', 'w') as f:
    f.write(content)
