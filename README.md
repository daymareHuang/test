# Dressify
## .md 教學網站
## https://ithelp.ithome.com.tw/articles/10203758



# 請大家一定要寫程式之前與 要上傳之前
```bash
git pull
```

### 將所在目錄的全部檔案放到暫存區列管(追蹤)
```bash
git  add  .
```

### 將暫存區的檔案提交到本機倉庫(提交新版本)
```bash
git  commit  -m  "(請打清楚你更改的部分)"
```

### 將檔案推送(上傳)到 GitHub 數據庫
```bash
git  push  數據庫位址  分支名稱
git  push
```
看更多
https://docs.google.com/document/d/1z3L8NKiEKC7ZLWIn56CqfwLtj0lRiIqCBgLHuVggiTM/edit?tab=t.0

---

# NPM mod 安裝清單

安裝 圖片編輯 mod
```cmd
 npm install react-bootstrap bootstrap react-cropper cropperjs react-draggable swiper
 npm install axios
```

## 請大家寫一下router的網址
Router 名稱
琇雁
* Closet.jsx  (/Closet)
* ClosetMatch.jsx  (/ClosetMatch)
* ClosetPart.jsx  (/ClosetPart/:part)
* AddPop.js（沒有放router)
* ClosetSearch.jsx（沒有放router)
* Crop.jsx  (/Crop)
* ClosetEditSingle.jsx  (/ClosetEditSingle)
* ClosetCheckSingle.jsx  (/ClosetCheckSingle)
* ClosetAddItems.jsx



田
* AddTag
* AddTagCloset（不會有router）
* AddTagComment（不會有router）
* AddTagControl
* Image
* ImageEditList
* ImageEditBrightness（不會有router）
* ImageEditContrast（不會有router）
* ImageEditListSaturate（不會有router）
* Outfit
* OutfitEdit
* OutfitDescription


芳萱
* Dashboard
* WeatherOverview
* CurrentDate（不會有router）
* PersonalInfoOverview（不會有router）
* TodaySuggestion（不會有router）
* MoreSuggestion（不會有router）
* Login
* LoginContent（不會有router）
* LoginModification（不會有router）
* ForgetPassword（不會有router）
* GoogleLogin （未定，按與Google串接的操作而定）
* Register
* UserInfoInput（不會有router）
* GenderInput（不會有router）
* AvatarUpload（不會有router）
* Modification


昱凱
* Dresswall (url : / dresswall)
* Selfpage (url : /dresswall/yourself)
* Wallsearch (url :  /dresswall/search)
* WallSearchResult (url : /dresswall/result)


## React Path
* public
  * myTesting.json
* src
  * assets
    * img
      * Icon
        * home.svg
      * item
      * myPicture.jpg
  * css
     * myCSS.css
     * App.css
  * components
    * Header.jsx
    * NavBar.jsx
  * layouts
    * MyLayout1.jsx
    * MyLayout2.jsx
  * pages
    * Home.jsx
App.jsx
index.css
main.jsx
