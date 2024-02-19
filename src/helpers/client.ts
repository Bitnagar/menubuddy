export async function getImageBase64(image: File): Promise<any> {
  const fr = new FileReader();
  fr.readAsDataURL(image);
  const promise = new Promise((resolve, reject) => {
    fr.addEventListener("load", function (evt) {
      if (evt.target) {
        resolve({ data: evt.target.result, type: image.type });
      } else reject("Failed to read the image.");
    });
  });
  return promise;
}
