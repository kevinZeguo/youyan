package com.claude.wmall.jxc.service.store.impl;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.jxc.dao.store.StoreChuRuKlsDao;
import com.claude.wmall.jxc.dao.store.StoreDiaoBoCkdDao;
import com.claude.wmall.jxc.dao.store.StoreKudanDao;
import com.claude.wmall.jxc.domain.store.StoreChuRuKls;
import com.claude.wmall.jxc.domain.store.StoreDiaoBoCkd;
import com.claude.wmall.jxc.domain.store.StoreKudan;
import com.claude.wmall.jxc.service.store.DiaoboCkdService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;


/**
 * @author shangchoumeng
 *
 */
@Service
public class DiaoboCkdSerivceImpl   implements DiaoboCkdService {
    @Autowired
    private StoreDiaoBoCkdDao storeDiaoBoCkdDao;
    @Autowired
    private StoreKudanDao storeKudanDao;
    
    @Autowired
    private StoreChuRuKlsDao storeChuRuKlsDao;

    @Override
    public PageInfo<StoreDiaoBoCkd> listByPage(StoreDiaoBoCkd query) throws Exception {
    	PageHelper.startPage(query.getPage(),query.getRows());
        return new PageInfo<StoreDiaoBoCkd>(storeDiaoBoCkdDao.selectListByPage(query));
    }

	@Override
	@Transactional
	public void save(StoreDiaoBoCkd storeDiaoBoCkd) throws Exception {
		 //保存入库单
        StoreKudan kuDan = new StoreKudan();
        kuDan.setKudanlx("-1");//出库
        kuDan.setRukulx(storeDiaoBoCkd.getKudanlx());//库单类型
        kuDan.setShenhebj("0");
        kuDan.setDanjubh(storeDiaoBoCkd.getDanjubh());
        kuDan.setDanjurq(StringUtils.isNotEmpty(storeDiaoBoCkd.getDanjurq()) ? storeDiaoBoCkd.getDanjurq().replace("-", "") : "");
        kuDan.setBeizhu(storeDiaoBoCkd.getBeizhu());

        storeKudanDao.insert(kuDan);

        storeDiaoBoCkd.setBanhao(DocuNumber.getMchBillNo());
        storeDiaoBoCkd.setJihuafhrq(StringUtils.isNotEmpty(storeDiaoBoCkd.getJihuafhrq()) ? storeDiaoBoCkd.getJihuafhrq().replace("-", "") : "");
        //保存采购入库单
        storeDiaoBoCkdDao.insertSelective(storeDiaoBoCkd);

        //保存流水明细
        List<StoreChuRuKls> ruKlsList = storeDiaoBoCkd.getChuruklsList();
        for (StoreChuRuKls kls : ruKlsList) {
            kls.setLiushuih((int) DocuNumber.getMchBillNo());
            kls.setDanjubh(kuDan.getDanjubh());
            storeChuRuKlsDao.insert(kls);
        }

    }

	@Override
	public int del(String[] ids) throws Exception {
		for (int i = 0; i < ids.length; i++) {
			try {
				
				StoreDiaoBoCkd kd = storeDiaoBoCkdDao.selectByPrimaryKey(Long.valueOf(ids[i]));
				storeDiaoBoCkdDao.deleteByPrimaryKey(Long.valueOf(ids[i]));
				storeKudanDao.deleteByPrimaryKey(kd.getDanjubh());
				storeChuRuKlsDao.deleteByKey(kd.getDanjubh());
				
			} catch (Exception e) {
				e.printStackTrace();
			    return 0;
			}
		}
		return 1;
		
	}
		
}
