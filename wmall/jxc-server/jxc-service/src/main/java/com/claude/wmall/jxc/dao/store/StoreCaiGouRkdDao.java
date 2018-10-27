package com.claude.wmall.jxc.dao.store;

import com.claude.wmall.jxc.domain.store.StoreCaiGouRkd;
import com.claude.wmall.jxc.domain.store.StoreCaiGouRkdQuery;

import java.util.List;

public interface StoreCaiGouRkdDao {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_CAIGOURKD
     *
     * @mbggenerated Thu Aug 11 06:30:48 CST 2016
     */
    int deleteByPrimaryKey(Long banhao);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_CAIGOURKD
     *
     * @mbggenerated Thu Aug 11 06:30:48 CST 2016
     */
    int insert(StoreCaiGouRkd record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_CAIGOURKD
     *
     * @mbggenerated Thu Aug 11 06:30:48 CST 2016
     */
    int insertSelective(StoreCaiGouRkd record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_CAIGOURKD
     *
     * @mbggenerated Thu Aug 11 06:30:48 CST 2016
     */
    StoreCaiGouRkd selectByPrimaryKey(Long banhao);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_CAIGOURKD
     *
     * @mbggenerated Thu Aug 11 06:30:48 CST 2016
     */
    int updateByPrimaryKeySelective(StoreCaiGouRkd record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_CAIGOURKD
     *
     * @mbggenerated Thu Aug 11 06:30:48 CST 2016
     */
    int updateByPrimaryKey(StoreCaiGouRkd record);

    /**
     * 分页查询采购单
     * @param query
     * @return
     * @throws Exception
     */
    List<StoreCaiGouRkd> selectListByPage(StoreCaiGouRkdQuery query)throws Exception;

    /**
     * 查询采购单详情
     * @param danjubh
     * @return
     * @throws Exception
     */
    StoreCaiGouRkd selectByDanjubh(String danjubh)throws Exception;

    /**
     * 删除采购库单
     * @param danjubh
     * @throws Exception
     */
    void deleteByDanjubh(String danjubh)throws Exception ;

    /**
     * 根据单据编号更新单据信息
     * @param storeCaiGouRkd
     * @throws Exception
     */
    void updateByDanjubh(StoreCaiGouRkd storeCaiGouRkd)throws Exception;
}