import json, os

data = json.load(open('emoji.json'))
print("%d emojis loaded"%len(data))
colon_codes = []
for emoji_data in data:
    for colon_code in emoji_data["short_names"]:
        colon_codes.append(colon_code)
_out = ["| `:{c}:` | :{c}: |".format(c=code) for code in colon_codes]
def chunks(l, n):
    for i in range(0, len(l), n):
        yield ' '.join(l[i:i + n])
md_table = '\n'.join(list(chunks(_out, 5)))
with open('README.md','w') as f: f.write(md_table)
