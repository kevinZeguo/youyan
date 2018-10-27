package com.claude.wmall.jxc.service.store;

import com.claude.wmall.jxc.domain.store.StoreShengChanRkd;
import com.claude.wmall.jxc.domain.store.StoreShengchanRkdQuery;
import com.github.pagehelper.PageInfo;

/**
 * Created by mazeguo on 2016/8/28.
 */
public interface ShengchanRkdService {
    /**
     * 查询生产入库单列表
     *
     * @param query
     * @return
     * @throws Exception
     */
    PageInfo<StoreShengChanRkd> listByPage(StoreShengchanRkdQuery query) throws Exception;

    StoreShengChanRkd findByDanjubh(String danjubh)throws Exception;

    void save(StoreShengChanRkd shengChanRkd)throws Exception;

    void editByDanjubh(StoreShengChanRkd shengChanRkd)throws Exception;

    void removeDanjubh(String danjubh, Integer userId)throws Exception;
}
