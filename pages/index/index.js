// index.js
// const app = getApp()

Page({
  data: {
    // 弹出群组数据
    isSuccess: false,
    poster: [{
      title: '蹲货组织',
      tip: '欢迎大家进群分享交流',
    }],

    // 货物数据
    powerList: [{
      title: 'XSX',
      tip: '微软京东自营官方旗舰店',
      sku: '100011513445',
      available: -1,
      state: -1,
      subscribe: -1,
      book: 0,
    },{
      title: 'XSX & 黑色游戏耳机套装',
      tip: '微软京东自营官方旗舰店',
      sku: '100016346817',
      available: -1,
      state: -1,
      subscribe: -1,
      book: 0,
    },{
      title: 'Xbox Series 手柄 磨砂黑',
      tip: '微软京东自营官方旗舰店',
      sku: '100016148888',
      available: -1,
      state: -1,
      subscribe: -1,
      book: 0,
    },{
      title: 'Xbox Series 手柄 磨砂黑 USB-C线缆',
      tip: '微软京东自营官方旗舰店',
      sku: '100016148810',
      available: -1,
      state: -1,
      subscribe: -1,
      book: 0,
    },{
      title: 'Xbox Series 手柄 磨砂黑 无线适配器',
      tip: '微软京东自营官方旗舰店',
      sku: '100016148908',
      available: -1,
      state: -1,
      subscribe: -1,
      book: 0,
    },{
      title: 'Xbox Series 手柄 冰雪白',
      tip: '微软京东自营官方旗舰店',
      sku: '100016148864',
      available: -1,
      state: -1,
      subscribe: -1,
      book: 0,
    },{
      title: 'Xbox Series 手柄 波动蓝',
      tip: '微软京东自营官方旗舰店',
      sku: '100009153053',
      available: -1,
      state: -1,
      subscribe: -1,
      book: 0,
    },{
      title: 'Xbox Series 手柄 极光蓝',
      tip: '微软京东自营官方旗舰店',
      sku: '100013915485',
      available: -1,
      state: -1,
      subscribe: -1,
      book: 0,
    },{
      title: 'Xbox Series 手柄 电光黄',
      tip: '微软京东自营官方旗舰店',
      sku: '100021197380',
      available: -1,
      state: -1,
      subscribe: -1,
      book: 0,
    },{
      title: 'Xbox Series 手柄 锦鲤红',
      tip: '微软京东自营官方旗舰店',
      sku: '100017833496',
      available: -1,
      state: -1,
      subscribe: -1,
      book: 0,
    },{
      title: 'Xbox 无线适配器',
      tip: '微软京东自营官方旗舰店',
      sku: '5028827',
      available: -1,
      state: -1,
      subscribe: -1,
      book: 0,
    }
    // ,{
    //   title: 'iPhone 14 Pro Max (A2896) 512GB 深空黑色',
    //   tip: 'Apple产品京东自营旗舰店',
    //   sku: '100038004377',
    //   available: -1,
    //   state: -1,
    //   subscribe: -1,
    //   book: 0,
    // },
    ,{
      title: 'iPhone 14 Plus (A2888) 256GB 蓝色',
      tip: 'Apple产品京东自营旗舰店',
      sku: '100038004407',
      available: -1,
      state: -1,
      subscribe: -1,
      book: 0,
    }],

    // 时间
    time: "00:00:00",

    // 地点 Version 1
    // city: 'Beijing',
    // cityCN: '北京',
    // area: '1_72_4211',

    // 地点 Version 2
    province: '北京市',
    cityCN: '北京',
    area: '1_72_4211',
    status: 0,
  },

  onLoad(){
    this.initCount()
   },

  initCount() { //初始化倒计时
    let that = this;
    that.data.time= setInterval(
      function () {
        that.refreshAll()
      }, 1000);  // 1秒钟
  },

  refreshAll() {
    this.data.powerList.forEach(i => {
      this.onClickRefresh(i.sku)
    })
    this.getTime()
  },

  getTime() {
    var d = new Date()
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
    this.setData({
      'time': time
    })
  },

  // onClickRefresh() {
  //   var skuList = ''
  //   this.data.powerList.forEach(i => {
  //     skuList = skuList + ',' + i.sku  
  //   });
  //   skuList = skuList.substring(1,skuList.length)
  //   wx.request({
  //     url: 'https://cd.jd.com/stocks',
  //     method: 'GET',
  //     data: {
  //       'type': 'getstocks',
  //       'skuIds': skuList,
  //       'area': this.data.area,
  //     },
  //     success: (res) => {
  //       var obj = res.data;
  //       if (JSON.stringify(obj) !== '{}') {
  //         var str = JSON.stringify(obj);
  //         var json = JSON.parse(str)
  //         var powerList = this.data.powerList
  //         powerList.forEach(i => {
  //           i.available = json[i.sku]["StockState"]
  //           i.state = json[i.sku]["skuState"]
  //         })
  //         this.setData ({
  //           powerList
  //         })
  //       }
  //     }
  //   })
  // },

  onClickRefresh(sku) {
    wx.request({
      url: 'https://cd.jd.com/stocks',
      method: 'GET',
      data: {
        'type': 'getstocks',
        'skuIds': sku,
        'area': this.data.area,
      },
      success: (res) => {
        var obj = res.data;
        if (JSON.stringify(obj) !== '{}') {
          var str = JSON.stringify(obj);
          var json = JSON.parse(str)
          var skuId = str.substring(2, str.indexOf(":")-1)
          var powerList = this.data.powerList
          powerList.forEach(i => {
            if (i.sku === skuId) {
              i.available = json[skuId]["StockState"]
              i.state = json[skuId]["skuState"]
            }
          })
          this.setData ({
            powerList
          })
        }
      }
    })
  },
  // onClickRefreshBook() {
    // var skuList = ''
    // this.data.powerList.forEach(i => {
    //   skuList = skuList + ',' + i.sku  
    // });
    // skuList = skuList.substring(1,skuList.length)
  //   wx.request({
  //     url: 'https://yushou.jd.com/youshouinfoList.action',
  //     method: 'GET',
  //     data: {
  //       'sku': '100011513445t',
  //       'area': '1_2802_2821',
  //     },
  //     headers: {
  //       'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
  //       'Referer': 'https://item.jd.com/' + '100011513445t' + '.html',
  //     },

  //     success: (res) => {
  //       var obj = res.data;
  //       console.log(obj)

  //       if (JSON.stringify(obj) !== '{}') {
  //         var str = JSON.stringify(obj);
  //         var json = JSON.parse(str)
          
  //         this.data.powerList.forEach(i => {
  //           var subJson = json[i.sku]
  //           console.log(str)

  //         })
  //         // var StockState = json[sku]["StockState"]
  //         // var skuState = json[sku]["skuState"]
  //         // var powerList = this.data.powerList

  //         // this.setData ({
  //         //   powerList
  //         // })
  //       }
  //     }
  //   })
  // },

  getSubscribeInfo() {

  },

  naviToJD(sku) {
    var sku =  sku.currentTarget.dataset.sku
    var path = '/pages/item/detail/detail?sku=' + sku
    wx.navigateToMiniProgram({
      appId: 'wx91d27dbf599dff74',
      path: path,
      success(res) {
        // 打开成功
        console.log(res);
      }
    })
  },
  
  subscript_fail() {
    wx.showToast({
      title: '已订阅~可购买时将为您发送信息',
      icon: 'none',
      duration: 400//持续的时间
    })
  },

  alert() {
    wx.showToast({
      title: '还在努力开发中~希望持续关注',
      icon: 'none',
      duration: 400//持续的时间
    })
  },

  // subscript() {
  //   wx.requestSubscribeMessage({
  //     success: res => {
  //       console.log('调起成功');
  //       if (res[tempId[0]] === 'accept') {
  //           console.log('允许')
  //       }
  //       if (res[tempId[0]] === 'reject') {
  //         console.log('拒绝')
  //       }
  //     },
  //     fail: err => {
  //       if (err.errCode == 20004) {
  //         console.log('关闭小程序主开关')
  //       } else {
  //         console.log('订阅失败')
  //       }
  //     }
  //   });
  // },

  subscript() {
    wx.getSetting({
      withSubscriptions: true,   //  这里设置为true,下面才会返回mainSwitch
      success: function(res){   
        var tmplIds = 'SLSuHC8AS2GgrxN5ucyxOa9-ttpiqdCfSu9s50TvTqg'
        // 调起授权界面弹窗
        if (res.subscriptionsSetting.mainSwitch) {  // 用户打开了订阅消息总开关
          if (res.subscriptionsSetting.itemSettings != null) {   // 用户同意总是保持是否推送消息的选择, 这里表示以后不会再拉起推送消息的授权
            let moIdState = res.subscriptionsSetting.itemSettings[tmplIds];  // 用户同意的消息模板id
            if(moIdState === 'accept'){   
              console.log('接受了消息推送');

            }else if(moIdState === 'reject'){
              console.log("拒绝消息推送");

            }else if(moIdState === 'ban'){
              console.log("已被后台封禁");
              
            }
          }else {
            // 当用户没有点击 ’总是保持以上选择，不再询问‘  按钮。那每次执到这都会拉起授权弹窗
            wx.showModal({
              title: '提示',
              content:'请授权开通服务通知',
              showCancel: true,
              success: function (ress) {
                console.log(ress.confirm)
                if (ress.confirm) {  
                  wx.requestSubscribeMessage({   // 调起消息订阅界面
                    tmplIds: [tmplIds],
                    success (res) { 
                      if(res[tmplIds] === 'accept') {
                        console.log('感谢信任，您将受到信息');
                        console.log(res);
                      } else if(res[tmplIds] === 'reject') {
                        console.log('请允许通知，否则不能提供订阅');
                        console.log(res);
                      } else if(res[tmplIds] === 'ban') {
                        console.log("已被后台封禁");
                      }
                    },
                    fail (er){
                      console.log("订阅消息 失败 ");
                      console.log(er);
                    }
                  })           
                }
              }
            })
          }
        }else {
          console.log('订阅消息未开启')
        }      
      },
      fail: function(error){
        console.log(error);
      },
    })
  },

  close() {
    //点击x号关闭
    this.setData({
      isSuccess: false
    })
  },

  open() {
    //点击按钮打开
    this.setData({
      isSuccess: true
    })
  },

  clickme() {
    this.showModal()
    this.setData({
      FAQ: [{
        ID: 1,
        Q: '1: 下架，配货，无货，采购都是什么？',
        A: 'A: 京东货物有两个状态，一个是库存状态，有现货，无货，配货等，一个是商品状态，有上架和下架之分，这两个状态是独立的。大家只要记住绿色可以下单，红色不可以就好。',
      },{
        ID: 2,
        Q: '2: 查询结果多久刷新一次？是不是最新的？',
        A: '每一秒种刷新一次结果，同时刷新当前的时间，可能会有一些延迟，如果影响使用的话请反馈给我，我尝试一下逻辑/架构的优化。',
      },{
        ID: 3,
        Q: '3: 点击商品后跳转可以直接跳转至App吗？',
        A: '不可以，现在小程序只可以跳转到另外一个小程序，大家可以在小程序内加入购物车，然后购物车或者浏览记录在App里面找到商品。',
      },{
        ID: 4,
        Q: '4: 你为什么做这个软件？今后会有广告吗？',
        A: '这个程序是我的课余作品，完全就是希望帮到大家，没有盈利的目标，所以大家可以放心食用，现在和未来都不会存在任何广告。',
      }
      // ,{
      //   ID: 5,
      //   Q: '我这边遇到BUG怎么办？',
      //   A: '第一次做微信小程序，而且本身我也不是做前端的，所以我做的时候很是折磨，预计也会有很多BUG。如果遇到BUG请一定联系我，希望我可以解决。',
      // },{
      //   ID: 6,
      //   Q: '我有好的想法和建议',
      //   A: '这个程序真的非常非常简单，我个人水平也不高，如果有大佬可以给一些技术上的指点就再好不过了。当然功能上的建议也可以向我提出，但我水平有限不一定能够实现。',
      // },{
      //   ID: 7,
      //   Q: '遇到BUG/有想法，我怎么联系你',
      //   A: '通过微信群/邮箱。',
      // }
      ]
    })
  },

  clickAddress() {
    let that = this
    wx.chooseLocation({
    success: function (res) {
      var latitude = res.latitude
      var longitude = res.longitude
      that.getProvinces(latitude, longitude)
      },
    })
  },

  getProvinces(latitude, longitude) {
    let that = this
    var QQMapWx = require('src/js/qqmap-wx-jssdk.js')
    var qqMapsdk = new QQMapWx({
      key: 'your key',
    })
    qqMapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success(elem) {
        console.log(elem['result']['address_component']['province'])
        var province = elem['result']['address_component']['province']
        that.toJDAddress(province)
      }
    })
  },

  toJDAddress(province) {
    var city = province
    var status = 1
    var area
    var cityCN

    if (city === '北京市') {area = '1_72_4211', cityCN = '北京'}
    else if (city === '上海市') {area = '2_2830_51830', cityCN = '上海'}
    else if (city === '天津市') {area = '3_51043_2907', cityCN = '天津'}
    else if (city === '重庆市') {area = '4_129_10045', cityCN = '重庆'}
    else if (city === '河北省') {area = '5_142_146_5049', cityCN = '河北'}
    else if (city === '山西省') {area = '6_303_36782_36804', cityCN = '山西'}
    else if (city === '河南省') {area = '7_427_45532_52559', cityCN = '河南'}
    else if (city === '辽宁省') {area = '8_560_50825_50829', cityCN = '辽宁'}
    else if (city === '吉林省') {area = '9_639_3306_52218', cityCN = '吉林'}
    else if (city === '黑龙江省') {area = '10_698_700_46114', cityCN = '黑龙江'}
    else if (city === '内蒙古自治区') {area = '11_799_32653_51322', cityCN = '内蒙古'}
    else if (city === '江苏省') {area = '12_904_3375', cityCN = '江苏'}
    else if (city === '山东省') {area = '13_1000_4277', cityCN = '山东'}
    else if (city === '安徽省') {area = '14_1116_3432_50194', cityCN = '安徽'}
    else if (city === '浙江省') {area = '15_1213_1215_50099', cityCN = '浙江'}
    else if (city === '福建省') {area = '16_1315_3486', cityCN = '福建'}
    else if (city === '湖北省') {area = '17_1381_3079_50770', cityCN = '湖北'}
    else if (city === '湖南省') {area = '18_1482_3606', cityCN = '湖南'}
    else if (city === '广东省') {area = '19_1601_3635', cityCN = '广东'}
    else if (city === '广西壮族自治区') {area = '20_1726_22883', cityCN = '广西'}
    else if (city === '江西省') {area = '21_1827_4101_40925', cityCN = '江西'}
    else if (city === '四川省') {area = '22_1930_50948_52157', cityCN = '四川'}
    else if (city === '海南省') {area = '23_3690_4182_53698', cityCN = '海南'}
    else if (city === '贵州省') {area = '24_2144_24463_51707', cityCN = '贵州'}
    else if (city === '云南省') {area = '25_2235_27497_28901', cityCN = '云南'}
    else if (city === '西藏自治区') {area = '26_2951_3921_42212', cityCN = '西藏'}
    else if (city === '陕西省') {area = '27_2376_50231_52707', cityCN = '陕西'}
    else if (city === '甘肃省') {area = '28_2487_21648_52535', cityCN = '甘肃'}
    else if (city === '青海省') {area = '29_2580_21652_51875', cityCN = '青海'}
    else if (city === '宁夏回族自治区') {area = '30_2628_21649_51876', cityCN = '宁夏'}
    else if (city === '新疆维吾尔自治区') {area = '31_2652_2653_36697', cityCN = '新疆'}
    else {area = '1_72_4211' , cityCN = '无法识别您的位置，请联系我获得更多帮助！', status = 2}
  
    this.setData({
      province,
      cityCN,
      area,
      status,
    })
  },

  // clickAddress() {
  //   wx.choosePoi({
  //     success: (res) => {
  //       var city = res['city']
  //       var cityCN
  //       var area
  //       if(res['type'] === 0) {area = '1_72_4211', cityCN = '请显示您的位置！'}
  //       else if(res['type'] === 2) {area = '1_72_4211', cityCN = '请确认您只选择了省会!'}
  //       else if (city === 'Beijing' || city === '北京市') {area = '1_72_4211', cityCN = '北京'}
  //       else if (city === 'Shanghai' || city === '上海市') {area = '2_2830_51830', cityCN = '上海'}
  //       else if (city === 'Tianjin' || city === '天津市') {area = '3_51043_2907', cityCN = '天津'}
  //       else if (city === 'Chongqing' || city === '重庆市') {area = '4_129_10045', cityCN = '北京'}
  //       else if (city === 'Hebei' || city === '河北省') {area = '5_142_146_5049', cityCN = '河北'}
  //       else if (city === 'Shanxi' || city === '山西省') {area = '6_303_36782_36804', cityCN = '山西'}
  //       else if (city === 'Henan' || city === '河南省') {area = '7_427_45532_52559', cityCN = '河南'}
  //       else if (city === 'Liaoning' || city === '辽宁省') {area = '8_560_50825_50829', cityCN = '辽宁'}
  //       else if (city === 'Jilin' || city === '吉林省') {area = '9_639_3306_52218', cityCN = '吉林'}
  //       else if (city === 'Heilongjiang' || city === '黑龙江省') {area = '10_698_700_46114', cityCN = '黑龙江'}
  //       else if (city === 'Neimenggu' || city === '内蒙古自治区') {area = '12_904_3377', cityCN = '内蒙古'}
  //       else if (city === 'Shandong' || city === '山东省') {area = '13_1000_4277', cityCN = '山东'}
  //       else if (city === 'Anhui' || city === '安徽省') {area = '14_1116_3432_50194', cityCN = '安徽'}
  //       else if (city === 'Zhejiang' || city === '浙江省') {area = '15_1213_1215_50099', cityCN = '浙江'}
  //       else if (city === 'Fujian' || city === '福建省') {area = '16_1315_3486', cityCN = '福建'}
  //       else if (city === 'Hubei' || city === '湖北省') {area = '17_1381_3079_50770', cityCN = '湖北'}
  //       else if (city === 'Hunan' || city === '湖南省') {area = '18_1482_3606', cityCN = '湖南'}
  //       else if (city === 'Guangdong' || city === '广东省') {area = '19_1601_3635', cityCN = '广东'}
  //       else if (city === 'Guangxi' || city === '广西壮族自治区') {area = '20_1726_22883', cityCN = '广西'}
  //       else if (city === 'Jiangxi' || city === '江西省') {area = '21_1827_4101_40925', cityCN = '江西'}
  //       else if (city === 'Sichuan' || city === '四川省') {area = '22_1930_50948_52157', cityCN = '四川'}
  //       else if (city === 'Hainan' || city === '海南省') {area = '23_3690_4182_53698', cityCN = '海南'}
  //       else if (city === 'Guizhou' || city === '贵州省') {area = '24_2144_24463_51707', cityCN = '贵州'}
  //       else if (city === 'Yunnan' || city === '云南省') {area = '25_2235_27497_28901', cityCN = '云南'}
  //       else if (city === 'Xizang' || city === '西藏自治区') {area = '26_2951_3921_42212', cityCN = '西藏'}
  //       else if (city === 'Shaanxi' || city === '陕西省') {area = '27_2376_50231_52707', cityCN = '陕西'}
  //       else if (city === 'Gansu' || city === '甘肃省') {area = '28_2487_21648_52535', cityCN = '甘肃'}
  //       else if (city === 'Qinghai' || city === '青海省') {area = '29_2580_21652_51875', cityCN = '青海'}
  //       else if (city === '宁夏回族自治区') {area = '30_2628_21649_51876', cityCN = '宁夏'}
  //       else if (city === '新疆省维吾尔自治区') {area = '31_2652_2653_36697', cityCN = '新疆'}
  //       else {area = '1_72_4211' , cityCN = '无法识别您的位置，请联系我获得更多帮助！（此时为北京）'}
      
  //       this.setData({
  //         city,
  //         cityCN,
  //         area,
  //       })
  //     },
  //     fail(res) {
  //       console.log(res, '失败回调')
  //     },
  //     complete(res) {
  //       console.log(res, '结束回调')
  //     }
  //   })
  // },

  setCityName2AreaNum() {
    this.setData({
      city: 'Beijing',
      code: '1_72_4211',
    },{
      city: 'Shanghai',
      code: '2_2830_51830',
    },{
      city: 'Tianjin',
      code: '3_51043_2907',
    },{
      city: 'Chongqing',
      code: '4_129_10045',
    },{
      city: 'Hebei',
      code: '5_142_146_5049',
    },{
      city: 'Shanxi',
      code: '6_303_36782_36804',
    },{
      city: 'Henan',
      code: '7_427_45532_52559',
    },{
      city: 'Liaoning',
      code: '8_560_50825_50829',
    },{
      city: 'Jilin',
      code: '9_639_3306_52218',
    },{
      city: 'Heilongjiang',
      code: '10_698_700_46114',
    },{
      city: 'Neimenggu',
      code: '11_799_3241_32675',
    },{
      city: 'Jiangsu',
      code: '12_904_3377',
    },{
      city: 'Jinan',
      code: '13_1000_4277',
    },{
      city: 'Anhui',
      code: '14_1116_3432_50194',
    },{
      city: 'Zhejiang',
      code: '15_1213_1215_50099',
    },{
      city: 'Fujian',
      code: '16_1315_3486',
    },{
      city: 'Hubei',
      code: '17_1381_3079_50770',
    },{
      city: 'Hunan',
      code: '18_1482_3606',
    },{
      city: 'Guangdong',
      code: '19_1601_3635',
    },{
      city: 'Guangxi',
      code: '20_1726_22883',
    },{
      city: 'Jiangxi',
      code: '21_1827_4101_40925',
    },{
      city: 'Sichuan',
      code: '22_1930_50948_52157',
    },{
      city: 'Hainan',
      code: '23_3690_4182_53698',
    },{
      city: 'Guizhou',
      code: '24_2144_24463_51707',
    },{
      city: 'Yunnan',
      code: '25_2235_27497_28901',
    },{
      city: 'Xizang',
      code: '26_2951_3921_42212',
    },{
      city: 'Shanxi',
      code: '27_2376_50231_52707',
    },{
      city: 'Gansu',
      code: '28_2487_21648_52535',
    },{
      city: 'Qinghai',
      code: '29_2580_21652_51875',
    },{
      city: 'Ningxia',
      code: '30_2628_21649_51876',
    },{
      city: 'Xinjiang',
      code: '31_2652_2653_36697',
    })
  },

  // 显示对话框
  showModal() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(750).step()
    this.setData({
      animationData: animation.export(),
      showView: true,
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: true,
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(750).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
        showView: false,
      })
    }.bind(this), 200)
  },

  onShareAppMessage () {
    
  }
});


