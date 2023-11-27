/**
 * 根据文件名后缀区分 文件类型
 *
 * @param: fileName - 文件名称
 * @param: 数据返回 1) 无后缀匹配 - false
 * @param: 数据返回 2) 匹配图片 - image
 * @param: 数据返回 3) 匹配 txt - txt
 * @param: 数据返回 4) 匹配 excel - excel
 * @param: 数据返回 5) 匹配 word - word
 * @param: 数据返回 6) 匹配 pdf - pdf
 * @param: 数据返回 7) 匹配 ppt - ppt
 * @param: 数据返回 8) 匹配 视频 - video
 * @param: 数据返回 9) 匹配 音频 - radio
 * @param: 数据返回 10) 其他匹配项 - other
 */
export default function matchFileType(fileName) {
  // 后缀获取
  let suffix = '';
  // 获取类型结果
  let result = '';
  if (!fileName) return false;
  try {
    // 截取文件后缀
    suffix = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length)
    // 文件后缀转小写，方便匹配
    suffix = suffix.toLowerCase()
  } catch (err) {
    suffix = '';
  }
  // fileName无后缀返回 false
  if (!suffix) {
    result = false;
    return result;
  }

  let fileTypeList = [
    // 图片类型
    {'typeName': 'image', 'types': ['png', 'jpg', 'jpeg', 'bmp', 'gif','webp']},
    // 文本类型
    {'typeName': 'txt', 'types': ['txt']},
    // excel类型
    {'typeName': 'excel', 'types': ['xls', 'xlsx']},
    {'typeName': 'word', 'types': ['doc', 'docx']},
    {'typeName': 'pdf', 'types': ['pdf']},
    {'typeName': 'ppt', 'types': ['ppt']},
    // 视频类型
    {'typeName': 'video', 'types': ['mp4', 'm2v', 'mkv']},
    // 音频
    {'typeName': 'radio', 'types': ['mp3', 'wav', 'wmv']}
  ]
  // let fileTypeList = ['image', 'txt', 'excel', 'word', 'pdf', 'video', 'radio']
  for (let i = 0; i < fileTypeList.length; i++) {
    const fileTypeItem = fileTypeList[i]
    const typeName = fileTypeItem.typeName
    const types = fileTypeItem.types
    console.log(fileTypeItem);
    result = types.some(function (item) {
      return item === suffix;
    });
    if (result) {
      return typeName
    }
  }
  return 'other'
}
