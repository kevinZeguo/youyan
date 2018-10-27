package com.claude.wmall.jxc.dao.store;

import com.claude.wmall.jxc.domain.store.StoreQiTaRkd;
import com.claude.wmall.jxc.domain.store.StoreQitaRkdQuery;

import java.util.List;

public interface StoreQiTaRkdDao {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_QITARKD
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    int deleteByPrimaryKey(Long banhao);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_QITARKD
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    int insert(StoreQiTaRkd record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_QITARKD
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    int insertSelective(StoreQiTaRkd record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_QITARKD
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    StoreQiTaRkd selectByPrimaryKey(Long banhao);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_QITARKD
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    int updateByPrimaryKeySelective(StoreQiTaRkd record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_QITARKD
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    int updateByPrimaryKey(StoreQiTaRkd record);

    /**
     * 查询其他入库单列表
     * @param query
     * @return
     * @throws Exception
     */
    List<StoreQiTaRkd> selectListByPage(StoreQitaRkdQuery query)throws Exception;

    /**
     * 其他入库单
     * @param danjubh
     * @return
     * @throws Exception
     */
    StoreQiTaRkd selectByDanjubh(String danjubh)throws Exception;

    void deleteByDanjubh(String danjubh)throws Exception;

    void updateByDanjubh(StoreQiTaRkd qiTaRkd)throws Exception;
}