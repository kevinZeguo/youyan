package com.claude.wmall.jxc.service.store;

import com.claude.wmall.jxc.domain.store.StoreQiTaRkd;
import com.claude.wmall.jxc.domain.store.StoreQitaRkdQuery;
import com.github.pagehelper.PageInfo;

/**
 * Created by mazeguo on 2016/8/28.
 */
public interface QitaRkdService {
    /**
     * 查询其他入库单列表
     * @param query
     * @return
     * @throws Exception
     */
    PageInfo<StoreQiTaRkd> listByPage(StoreQitaRkdQuery query)throws Exception;

    StoreQiTaRkd findByDanjubh(String danjubh)throws Exception;

    void save(StoreQiTaRkd diaoBoRkd)throws Exception;

    void editDanju(StoreQiTaRkd qiTaRkd)throws Exception;

    void removeDanjubh(String danjubh, Integer userId) throws Exception;
}
