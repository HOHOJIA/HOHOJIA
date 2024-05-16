// 從 S3 拿到 url 時呼叫這個 function
export let totalImgUrl: string[] = [];
export function setImgUrl(thisImgUrl: string) {
  totalImgUrl.push(thisImgUrl);
  console.log(`totalImgUrl: ${totalImgUrl}`);
}
