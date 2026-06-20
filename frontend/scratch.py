import urllib.request
import re

queries = [
    'shorts doctor explaining asthma',
    'shorts doctor explaining heart disease',
    'shorts doctor explaining lung cancer',
    'shorts doctor explaining alzheimers'
]

for q in queries:
    try:
        url = 'https://www.youtube.com/results?search_query=' + q.replace(' ', '+')
        html = urllib.request.urlopen(url).read().decode('utf-8')
        video_ids = re.findall(r'"videoId":"([^"]+)"', html)
        video_ids = [vid for vid in video_ids if len(vid) == 11]
        print(f"{q}: {video_ids[0] if video_ids else 'none'}")
    except Exception as e:
        print(f"{q}: Error {e}")
