import {request} from './request'
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}
//这个方法 整合了所有有用的数据， 让项目里面所有的数据指向这个
export class Goods {
  constructor(itemInfo, columns,  services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.columns = columns;
    this.realPrice = itemInfo.lowNowPrice;
    this.services = services;
  }
}
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
    this.goodsSell = shopInfo.cSells;
  }
}
export class Detailinfo {
  constructor(detailInfo) {
    this.desc = detailInfo.desc;
    this.detailImage = detailInfo.detailImage[0].list;
    this.key =  detailInfo.detailImage[0].key
  }
}
export class ItemParams {
  constructor(itemParams) {
    this.set = itemParams.info.set;
    this.tables = itemParams.rule.tables
    this.disclaimer = itemParams.rule.disclaimer
  }
}
export class Comment {
  constructor(comment) {
    this.avatar = comment.user.avatar;
    this.style =  comment.style;
    this.created = comment.created;
    this.images = comment.images;
    this.content = comment.content;
    this.uname = comment.user.uname;
    this.cRate = comment.cRate;
  }
}