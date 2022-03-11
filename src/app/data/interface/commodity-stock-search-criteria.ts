export interface CommodityStockSearchCriteria {
    start?: number;
    limit?: number;
    commodityType?: string;
    clientTextSearch?: string;
    commodityTextSearch?: string;
    clientIdList?: string[];
    commodityIdList?: string[];
}
