
import requests
url = "https://api.github.com/repos/mizugame634978/vercel_test/commits"
res = requests.get(url)

#print("res",res)#200だと成功
res_json=res.json()#jsonを辞書型に変換している
# print(res_json)
results=res_json[0]["commit"]["message"]
print(results)
# :sparkles: todoリストを実装。ただし、ドラッグアンドドロップの部分で枠内からはみ出す
print(len(res_json))
#10 ←これは全部のコミット数と等しい
results2 = res_json[0]["commit"]["committer"]["date"]
print(results2)
# 2023-08-17T14:14:30Z 日付が取得できた。