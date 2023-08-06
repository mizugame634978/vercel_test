import requests
url = "https://pokeapi.co/api/v2/pokemon/0/"
res = requests.get(url)

#print("res",res)#200だと成功
res_json=res.json()#jsonを辞書型に変換している
# print(res_json)
results=res_json["forms"][0]["name"]
print("名前：",results)

results= res_json["height"]
print("身長:",results/10,"m")

results= res_json["abilities"]
print("覚える特殊技")
for i in results:
    print(i["ability"]["name"])

results= res_json["moves"]
print("覚える技の例")
cnt:int = 0
for i in results:
    print(i["move"]["name"])
    cnt += 1
    if cnt >= 3:
        break

print("図鑑No",res_json["id"])

print("登場作品例")
cnt = 0
results = res_json["game_indices"]
for i in results:
    print(i["version"]["name"])
    cnt += 1
    if cnt >= 3:
        break

results = res_json["sprites"]["front_default"]
print("正面画像",results)

results = res_json["sprites"]["back_default"]
print("背後画像",results)

results = res_json["sprites"]["other"]["official-artwork"]["front_default"]
print("正面画像2",results)
