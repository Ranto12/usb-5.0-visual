import json
import os

def fix_hero():
    try:
        with open('src/content/hero/index.json', 'r') as f:
            data = json.load(f)
        new_data = {
            "tagline": { "id": data.get("tagline_id", ""), "en": data.get("tagline_en", "") },
            "subtitle": { "id": data.get("subtitle_id", ""), "en": data.get("subtitle_en", "") },
            "stats": [
                { "val": data.get("stat1_value", ""), "label": data.get("stat1_label", "") },
                { "val": data.get("stat2_value", ""), "label": data.get("stat2_label", "") },
                { "val": data.get("stat3_value", ""), "label": data.get("stat3_label", "") }
            ]
        }
        with open('src/content/hero/index.json', 'w') as f:
            json.dump(new_data, f, indent=2)
    except Exception as e:
        print("Hero:", e)

def fix_about():
    try:
        with open('src/content/about/index.json', 'r') as f:
            data = json.load(f)
        new_data = {
            "title": { "id": data.get("title_id", ""), "en": data.get("title_en", "") },
            "subtitle": { "id": data.get("subtitle_id", ""), "en": data.get("subtitle_en", "") },
            "description1": { "id": data.get("description1_id", ""), "en": data.get("description1_en", "") },
            "description2": { "id": data.get("description2_id", ""), "en": data.get("description2_en", "") },
            "image_url": data.get("image_url", None),
            "stats": data.get("stats", [])
        }
        with open('src/content/about/index.json', 'w') as f:
            json.dump(new_data, f, indent=2)
    except Exception as e:
        print("About:", e)

def fix_contact():
    try:
        with open('src/content/contact/index.json', 'r') as f:
            data = json.load(f)
        new_data = {
            "socials": {
                "whatsapp": data.get("whatsapp", ""),
                "instagram": data.get("instagram", ""),
                "instagram_url": data.get("instagram_url", ""),
                "youtube_url": data.get("youtube_url", ""),
                "tiktok_url": data.get("tiktok_url", "")
            },
            "location": { "id": data.get("location_id", ""), "en": data.get("location_en", "") },
            "available": { "id": data.get("available_id", ""), "en": data.get("available_en", "") }
        }
        with open('src/content/contact/index.json', 'w') as f:
            json.dump(new_data, f, indent=2)
    except Exception as e:
        print("Contact:", e)

def fix_settings():
    try:
        with open('src/content/settings/index.json', 'r') as f:
            data = json.load(f)
        new_data = {
            "site_title": data.get("site_title", ""),
            "site_description": { "id": data.get("site_description_id", ""), "en": data.get("site_description_en", "") },
            "og_image": data.get("og_image", None),
            "social_links": {
                "youtube_url": data.get("youtube_url", ""),
                "tiktok_url": data.get("tiktok_url", "")
            }
        }
        with open('src/content/settings/index.json', 'w') as f:
            json.dump(new_data, f, indent=2)
    except Exception as e:
        print("Settings:", e)

fix_hero()
fix_about()
fix_contact()
fix_settings()
