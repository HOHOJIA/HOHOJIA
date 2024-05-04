# Release and deploy

## Overview
以下簡稱 release and deploy 的流程為 deployment workflow

- deployment workflow 會在有 `v開頭` 的 tag 被 push 後觸發
    - 例如 `v1.0.0` 被 push
- deployment workflow 會做：
    - 1. 跑一下 test
    - 2. 將前後端的 code build 成 docker image，上傳到 gitlab
    - 3. 將要開 server 需要的檔案複製到我們的 AWS server 上
    - 4. 重開 server
    - 5. 在 github 上發一個 release
    - ps. the workflow defined in `/.github/workflows/deployment.yml`


## 升版
- 如果要觸發 deployment workflow，要打 tag 升版本，可以使用以下方式

### 用 github action 升版本
> 推薦使用此方法，避免 local 執行時 commit 到其他更動

1. 先確認 code 已經 merge 進 main
2. 開 github 進到 repo 的 `action` tab，左邊選擇 Bump version on main head
3. 按右邊 `Run workflow`，選擇要升的版本是 major, minor 還是 patch
3. 執行後就會在 main 的 head 升版本

### 用 bump_version.sh 升版本
- `bump_version.sh`: 打 tag，更改 `.version` 檔案，並 push

1. 先確認 code 已經 merge 進 main
2. merge 完後，將 local 的 branch 切換到 main 的 head
3. :warning: 確認沒有尚未 commit 的 file，因為接下來要推 commit 跟 tag
4. 執行 `sh bump_version.sh`


