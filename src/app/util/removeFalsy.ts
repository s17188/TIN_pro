export default function removeFalsy(obj:any){
    let newObj:any = {};
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) { newObj[prop] = obj[prop]; }
    });
    return newObj;
}