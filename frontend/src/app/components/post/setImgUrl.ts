// 從 S3 拿到 url 時呼叫這個 function
export let totalImgUrl: { ImgUrl: string; Imgid: string }[] = [];
export function setImgUrl(thisImgUrl: string, stepid: string) {
  const newImgObj = {
    ImgUrl: thisImgUrl,
    Imgid: stepid,
  };
  totalImgUrl.push(newImgObj);
  console.log(`totalImgUrl: ${JSON.stringify(totalImgUrl)}`);
}
