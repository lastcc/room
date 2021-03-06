/**
 * 最终上传到cos的URL
 * 把以下字段配置成自己的cos相关信息，详情可看API文档 https://www.qcloud.com/document/product/436/6066
 * REGION: cos上传的地区
 * APPID: 账号的appid
 * BUCKET_NAME: cos bucket的名字
 * DIR_NAME: 上传的文件目录
 */

var cosUrl = "https://" + "ap-guangzhou" + ".file.myqcloud.com/files/v2/" + "1255976527" + "/" + "kuaizhu-1255976527" + "/houseImage"

//这里是自己的域名，上面注释的是腾讯云的demo的域名
// var cosUrl = "https://" + "www.kzroom.club/" + "1255976527" + "/" + "kuaizhu-1255976527" + "houseImage"

//填写自己的鉴权服务器地址
var cosSignatureUrl = 'https://www.kzroom.club/v1/signature?file=iCon/123.txt?bucket=kuaizhu-1255976527'

/**
 * 上传方法
 * filePath: 上传的文件路径
 * fileName： 上传到cos后的文件名
 */
function upload(filePath, fileName) {
 console.log("获取签名",cosUrll);
    // 鉴权获取签名
    wx.request({
        url: cosSignatureUrl,
        success: function (cosRes) {

            // 签名
            var signature = cosRes.data.result[0]
            console.log("这里的签名",signature),
            // 头部带上签名，上传文件至COS
            wx.uploadFile({
                url: cosUrl + '/' + fileName,
                filePath: filePath,
                header: {
                    'Authorization': signature
                },
                name: 'filecontent',
                formData: {
                    op: 'upload'
                },
                success: function (uploadRes) {
                    var data = uploadRes.data
                    console.log('uploadRes', uploadRes)
                    //do something
                },
                fail: function (e) {
                    console.log('e', e)
                }
            })
        }
    })
}

module.exports = upload