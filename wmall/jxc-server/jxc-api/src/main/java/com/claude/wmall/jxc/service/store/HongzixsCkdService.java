package com.claude.wmall.jxc.service.store;

import com.claude.wmall.jxc.domain.store.StoreHongZiXsckd;
import com.github.pagehelper.PageInfo;

public interface HongzixsCkdService {
     
	 /**
     * 分页查询红字销售入库单
     * @param query
     * @return
     * @throws Exception
     */
    PageInfo<StoreHongZiXsckd> listByPage(StoreHongZiXsckd query)throws Exception;
    
    /**保存出库单
    *
    * @param storeCaiGouRkd
    * @throws Exception
    */
   void save(StoreHongZiXsckd storeHongZiXsckd)throws Exception;
   
   /**删除出库单
   *
   * @param storeCaiGouRkd
   * @throws Exception
   */
   int del(String[] ids)throws Exception;
}
